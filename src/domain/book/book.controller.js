import Book from "./book.schema.js";

export const check = async (req, res) => {
    try {
        const books = await Book.aggregate([
            {
                $project: {
                    _id: 0,
                },
            },
            {
                $match: { stock: { $gt: 0 } },
            },
        ]);
        res.json({
            success: true,
            status: 200,
            message: "success",
            data: books,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            status: 500,
            message: error.message,
        });
    }
};
