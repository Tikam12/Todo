const mongoose = require("mongoose");

const conn = async (req, res) => {
    try {
        await mongoose
            .connect(
                "mongodb+srv://tikam:Tikam12@cluster0.shvnchu.mongodb.net/"
            )
            .then(() => {
                console.log("conncted");
            })

    } catch (error) {
        console.log(error)
    }
};
conn();