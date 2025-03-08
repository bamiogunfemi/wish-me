import Wish from "../models/Wish.js";

export const createWish = async (req, res) => {
    try {
        const { birthdayId, name, message } = req.body;

        const newWish = new Wish({ birthdayId, name, message });
        await newWish.save();

        return res.status(201).json(newWish);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

export const getWishesByBirthday = async (req, res) => {
    try {
        const { birthdayId } = req.params;
        const wishes = await Wish.find({ birthdayId }).sort({ createdAt: -1 });
        return res.status(200).json(wishes);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
