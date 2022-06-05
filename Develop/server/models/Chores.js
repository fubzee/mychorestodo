const { Schema, model } = require('mongoose');

const choreSchema = new Schema ({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false,
    },
    numcredits: {
        type: Number,
    },
    repeat: {
        type: String,
        default: "No",
    },
    datecreated: {
        type: Date,
    },
    datecompleted: {
        type: Date,
    },
    parent_Id: {
        type: Schema.Types.ObjectId, ref: 'Parent',
    },
    child_Id: {
        type: Schema.Types.ObjectId, ref: 'Child'
    }
});

choreSchema.pre('save', async function (next) {
    datecreated=Date();
    next();
});

const Chore = model('Chore', choreSchema);
module.exports = Chore;