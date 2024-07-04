import Member from "../member/member.schema.js";
import Book from "../book/book.schema.js";

export const borrowBook = async (req, res) => {
    try {
        // get user input
        const input = req.body;

        // validate input
        if (!input.memberCode || !input.bookCode) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Missing memberCode or bookCode",
            });
        }

        // check member exist
        const member = await Member.findOne({ code: input.memberCode });
        if (!member) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Member not found",
            });
        }

        // check book availability
        const book = await Book.findOne({ code: input.bookCode });
        if (!book || book.stock == 0) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Book is not available",
            });
        }

        // check member borrowing limit
        if (member.borrowedBooks.length >= 2) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Member borrowing limit reached",
            });
        }

        // check member penalty date, bandingkan dengan tanggal saat ini
        const currentDate = new Date();
        if (member.penalty && member.penalty > currentDate) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Member is being penalized",
            });
        }

        // update book stock
        book.stock = book.stock - 1;
        await book.save();

        // update member borrowed books
        member.borrowedBooks.push({
            code: input.bookCode,
            borrowDate: new Date(),
            returnDate: new Date(new Date().setDate(new Date().getDate() + 7)),
        });
        await member.save();

        return res.json({
            success: true,
            status: 200,
            message: "Book borrowed successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            status: 500,
            message: error.message,
        });
    }
};

export const returnBook = async (req, res) => {
    try {
        // get user input
        const input = req.body;

        // validate input
        if (!input.memberCode || !input.bookCode) {
            return res.status(400).json({
                success: false,
                status: 400,
                message: "Missing memberCode or bookCode",
            });
        }

        // check member exist
        const member = await Member.findOne({ code: input.memberCode });
        if (!member) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Member not found",
            });
        }

        // check book exist in member borrowed books
        const borrowedBook = member.borrowedBooks.find(
            (book) => book.code == input.bookCode
        );
        if (!borrowedBook) {
            return res.status(404).json({
                success: false,
                status: 404,
                message: "Book not found in borrowal list",
            });
        }

        let message = "Book returned successfully";

        // check penalty date
        const currentDate = new Date();
        if (borrowedBook.returnDate < currentDate) {
            member.penalty = new Date(
                new Date().setDate(new Date().getDate() + 7)
            );
            await member.save();
            message = "Book returned late";
        }

        // update book stock
        const book = await Book.findOne({ code: input.bookCode });
        book.stock = book.stock + 1;
        await book.save();

        // update member borrowed books
        member.borrowedBooks = member.borrowedBooks.filter(
            (book) => book.code != input.bookCode
        );
        await member.save();

        return res.json({
            success: true,
            status: 200,
            message: message,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            status: 500,
            message: error.message,
        });
    }
};
