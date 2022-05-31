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
    creditsearned: {
        type: Number,
        default: 0,
    },
    parent_Id: {
        type: Schema.Types.ObjectId, ref: 'Parent'
    },
    user_Id: {
        required: true,
        type: Schema.Types.ObjectId, ref: 'User'
    }
});

const Child = model('Child', childSchema);

module.exports = Child;