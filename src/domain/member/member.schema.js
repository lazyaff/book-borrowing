import mongoose from "mongoose";

const schema = mongoose.Schema({
    code: String,
    name: String,
    borrowedBooks: [{ code: String, borrowDate: Date, returnDate: Date }],
    penalty: { type: Date, default: null },
});

schema.method("toJSON", function () {
    const { __v, _id, ...obj } = this.toObject();
    delete obj._id;
    return obj;
});

const Member = mongoose.model("Member", schema);

export default Member;
