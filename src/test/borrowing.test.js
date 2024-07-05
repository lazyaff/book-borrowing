import supertest from "supertest";
import createServer from "../infra/server";
import Member from "../domain/member/member.schema";
import Book from "../domain/book/book.schema";

const app = createServer();

const memberPayloads = [
    {
        code: "M001",
        name: "Angga",
        borrowedBooks: [],
        penalty: null,
    },
    {
        code: "M002",
        name: "Ferry",
        borrowedBooks: [
            {
                code: "TW-11",
                borrowDate: new Date(
                    new Date().setDate(new Date().getDate() - 14)
                ),
                returnDate: new Date(
                    new Date().setDate(new Date().getDate() - 7)
                ),
            },
            {
                code: "SHR-1",
                borrowDate: new Date(),
                returnDate: new Date(
                    new Date().setDate(new Date().getDate() + 7)
                ),
            },
        ],
        penalty: null,
    },
    {
        code: "M003",
        name: "Putri",
        borrowedBooks: [],
        penalty: new Date(new Date().setDate(new Date().getDate() + 2)),
    },
];

const bookPayloads = [
    {
        code: "JK-45",
        title: "Harry Potter",
        author: "J.K Rowling",
        stock: 1,
    },
    {
        code: "SHR-1",
        title: "A Study in Scarlet",
        author: "Arthur Conan Doyle",
        stock: 0,
    },
    {
        code: "TW-11",
        title: "The Wind in the Willows",
        author: "Margaret Mitchell",
        stock: 0,
    },
];

describe("borrowing", () => {
    beforeEach(async () => {
        // add member
        for (const member of memberPayloads) {
            await Member.create(member);
        }
        // add book
        for (const book of bookPayloads) {
            await Book.create(book);
        }
    });

    // test for borrow book
    describe("borrow book", () => {
        it("should return 400 because of invalid input", async () => {
            const { body, statusCode } = await supertest(app)
                .post("/borrowing/borrow")
                .send({
                    memberCode: "M001",
                    bookCode: null,
                });
            expect(statusCode).toBe(400);
            expect(body.message).toBe("Missing memberCode or bookCode");
        });

        it("should return 404 because of member not found", async () => {
            const { body, statusCode } = await supertest(app)
                .post("/borrowing/borrow")
                .send({
                    memberCode: "M099",
                    bookCode: "JK-45",
                });
            expect(statusCode).toBe(404);
            expect(body.message).toBe("Member not found");
        });

        it("should return 404 because of book not available", async () => {
            const { body, statusCode } = await supertest(app)
                .post("/borrowing/borrow")
                .send({
                    memberCode: "M001",
                    bookCode: "SHR-1",
                });
            expect(statusCode).toBe(404);
            expect(body.message).toBe("Book is not available");
        });

        it("should return 400 because of member borrowing limit reached", async () => {
            const { body, statusCode } = await supertest(app)
                .post("/borrowing/borrow")
                .send({
                    memberCode: "M002",
                    bookCode: "JK-45",
                });
            expect(statusCode).toBe(400);
            expect(body.message).toBe("Member borrowing limit reached");
        });

        it("should return 400 because of member is being penalized", async () => {
            const { body, statusCode } = await supertest(app)
                .post("/borrowing/borrow")
                .send({
                    memberCode: "M003",
                    bookCode: "JK-45",
                });
            expect(statusCode).toBe(400);
            expect(body.message).toBe("Member is being penalized");
        });

        it("should return 200 and borrow book", async () => {
            const { body, statusCode } = await supertest(app)
                .post("/borrowing/borrow")
                .send({
                    memberCode: "M001",
                    bookCode: "JK-45",
                });
            expect(statusCode).toBe(200);
            expect(body.message).toBe("Book borrowed successfully");
        });
    });

    // test for return book
    describe("return book", () => {
        it("should return 400 because of invalid input", async () => {
            const { body, statusCode } = await supertest(app)
                .post("/borrowing/return")
                .send({
                    memberCode: "M001",
                    bookCode: null,
                });
            expect(statusCode).toBe(400);
            expect(body.message).toBe("Missing memberCode or bookCode");
        });

        it("should return 404 because of member not found", async () => {
            const { body, statusCode } = await supertest(app)
                .post("/borrowing/return")
                .send({
                    memberCode: "M099",
                    bookCode: "JK-45",
                });
            expect(statusCode).toBe(404);
            expect(body.message).toBe("Member not found");
        });

        it("should return 404 because of book not found or not borrowed", async () => {
            const { body, statusCode } = await supertest(app)
                .post("/borrowing/return")
                .send({
                    memberCode: "M002",
                    bookCode: "JK-45",
                });
            expect(statusCode).toBe(404);
            expect(body.message).toBe("Book not found in borrowal list");
        });

        it("should return 200 and book returned late", async () => {
            const { body, statusCode } = await supertest(app)
                .post("/borrowing/return")
                .send({
                    memberCode: "M002",
                    bookCode: "TW-11",
                });
            expect(statusCode).toBe(200);
            expect(body.message).toBe("Book returned late");
        });

        it("should return 200 and book returned successfully", async () => {
            const { body, statusCode } = await supertest(app)
                .post("/borrowing/return")
                .send({
                    memberCode: "M002",
                    bookCode: "SHR-1",
                });
            expect(statusCode).toBe(200);
            expect(body.message).toBe("Book returned successfully");
        });
    });
});
