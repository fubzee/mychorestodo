const { Schema, model } = require('mongoose');

const childSchema = new Schema ({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    totalcredits: {
        type: Number,
        default: 0,
    },
    credittype: {
        type: String,
    },
    parent_Id: {
        type: String,
    },
    user_Id: {
        required: true,
        type: String
    }
});

const Child = model('Child', childSchema);

module.exports = Child;