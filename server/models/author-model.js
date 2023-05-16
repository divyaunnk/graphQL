import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }
});

const authorModel = mongoose.model("Author", authorSchema);
export default authorModel;   