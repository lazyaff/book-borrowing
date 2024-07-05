import supertest from "supertest";
import createServer from "../infra/server";
import Member from "../domain/member/member.schema";

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
                borrowDate: new Date("2024-07-05T09:05:55.018Z"),
                returnDate: new Date("2024-07-12T09:05:55.018Z"),
            },
        ],
        penalty: null,
    },
];

describe("member", () => {
    beforeEach(async () => {
        // add member
        for (const member of memberPayloads) {
            await Member.create(member);
        }
    });

    describe("check existing members", () => {
        it("should return 200 and show member with borrowed book data", async () => {
            const { body, statusCode } = await supertest(app).get(
                "/member/check"
            );
            expect(statusCode).toBe(200);
            expect(body.data.length).toBe(2);
            expect(body.data[0].borrowedBooks).toBe(0);
            expect(body.data[1].borrowedBooks).toBe(1);
        });
    });
});
