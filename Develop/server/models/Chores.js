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
    parent_Id: {
        type: Schema.Types.ObjectId, ref: 'Parent'
    },
    child_Id: {
        type: Schema.Types.ObjectId, ref: 'Child'
    }
});
const Chore = model('Chore', choreSchema);
module.exports = Chore;