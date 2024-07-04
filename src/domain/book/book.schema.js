import mongoose from "mongoose";

const schema = mongoose.Schema({
    code: String,
    title: String,
    author: String,
    stock: Number,
});

schema.method("toJSON", function () {
    const { __v, _id, ...obj } = this.toObject();
    delete obj._id;
    return obj;
});

const Book = mongoose.model("Book", schema);

export default Book;
