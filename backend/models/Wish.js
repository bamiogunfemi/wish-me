import mongoose from "mongoose";

const WishSchema = new mongoose.Schema(
    {
        birthdayId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Birthday",
            required: true
        },
        name: {
            type: String,
            required: true
        },
        message: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

export default mongoose.model("Wish", WishSchema);
