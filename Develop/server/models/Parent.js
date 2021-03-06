const { ObjectId } = require('bson');
const { Schema, model } = require('mongoose');
const Order = require('./Order');

const parentSchema = new Schema ({
    name: {
        type: String,
        required: true
    },
    email: {
        type:  String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    chart: {
        type: String,
        required: true,
    },
    user_Id: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true,
    },
   
});

const Parent= model('Parent', parentSchema);

module.exports = Parent;