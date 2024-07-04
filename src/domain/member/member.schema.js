import mongoose from "mongoose";

const memberSchema = mongoose.Schema({
    code: String,
    name: String,
    borrowedBooks: [{ code: String, borrowDate: Date, returnDate: Date }],
    penalty: { type: Date, default: null },
});

memberSchema.method("toJSON", function () {
    const { __v, _id, ...obj } = this.toObject();
    delete obj._id;
    return obj;
});

const Member = mongoose.model("Member", memberSchema);

export default Member;
