import mongoose, { Schema } from "mongoose";

const bookSchema= new mongoose.Schema({
    
    name: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
        required: true
    },
    authorId: {
        type: String,
        required: true
    }
})

const bookModel = mongoose.model("Book", bookSchema);
export default bookModel;   