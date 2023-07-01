const mongoose = require("mongoose")

const PropertySchema = new mongoose.Schema({
    currentOwner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    title: {
        type: String,
        required: true,
        min: 6,
    },
    country: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true,
        min: 50,
    },
    img: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    sqmeters: {
        type: Number,
        required: true,
        min: 15
    },
    beds: {
        type: Number,
        required: true,
        min: 1
    },
    bookmarkedUsers: {
        type: [String],
        default: []
    }
}, { timestamps: true })

export default mongoose?.models?.Property || mongoose.model("Property", PropertySchema)
