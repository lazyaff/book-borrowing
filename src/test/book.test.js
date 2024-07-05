import supertest from "supertest";
import createServer from "../infra/server";
import Book from "../domain/book/book.schema";

const app = createServer();

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
];

describe("book", () => {
    beforeEach(async () => {
        // add book
        for (const book of bookPayloads) {
            await Book.create(book);
        }
    });

    describe("check available book", () => {
        it("should return 200", async () => {
            const { body } = await supertest(app).get("/book/check");
            expect(body.data.length).toBe(1);
        });
    });
});
