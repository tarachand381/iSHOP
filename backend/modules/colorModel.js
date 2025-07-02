const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
        },
        colorCode: {
            type: String,
            required: true,
            unique: true,
        },

        status: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true,
    }
);

const colorModel = mongoose.model('color', colorSchema);

module.exports = colorModel;
