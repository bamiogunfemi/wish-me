import mongoose from "mongoose";

const BirthdaySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            default: ""
        }
    },
    { timestamps: true }
);

export default mongoose.model("Birthday", BirthdaySchema);
