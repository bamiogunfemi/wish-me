import Birthday from "../models/Birthday.js";
import cloudinary from "cloudinary";

export const createBirthday = async (req, res) => {
    try {
        const { name } = req.body;
        let imageUrl = "";

        if (req.file) {
            // Upload the image using a Promise wrapper
            try {
                const result = await new Promise((resolve, reject) => {
                    const stream = cloudinary.v2.uploader.upload_stream(
                        { resource_type: "image", timeout: 120000 },
                        (error, uploaded) => {
                            if (error) return reject(error);
                            resolve(uploaded);
                        }
                    );
                    stream.end(req.file.buffer);
                });

                imageUrl = result.secure_url;
            } catch (error) {
                console.error("Cloudinary upload error:", error);
                return res.status(500).json({ error: "Image upload failed" });
            }
        }

        const newBirthday = new Birthday({ name, imageUrl });
        await newBirthday.save();

        return res.status(201).json(newBirthday);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export const getAllBirthdays = async (req, res) => {
    try {
        const birthdaysWithWishCount = await Birthday.aggregate([
            {
                $lookup: {
                    from: "wishes",           // the Mongo collection name for Wish docs
                    localField: "_id",
                    foreignField: "birthdayId",
                    as: "wishes",
                },
            },
            {
                $addFields: {
                    wishCount: { $size: "$wishes" },
                },
            },
            // We only need certain fields, but let's keep createdAt for sorting:
            {
                $project: {
                    name: 1,
                    imageUrl: 1,
                    wishCount: 1,
                    createdAt: 1,
                },
            },
            {
                $sort: { createdAt: -1 },
            },
        ]);

        return res.status(200).json(birthdaysWithWishCount);
    } catch (error) {
        console.error("get birthday error", error);
        return res.status(500).json({ error: error.message || "Server Error" });
    }
};


export const getSingleBirthday = async (req, res) => {
    try {
        const birthday = await Birthday.findById(req.params.id);
        if (!birthday) {
            return res.status(404).json({ error: "Birthday not found" });
        }
        res.json(birthday);
    } catch (error) {
        res.status(500).json({ error });
    }
};
