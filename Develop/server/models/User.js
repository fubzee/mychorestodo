const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema ({
    username:{
        type: String,
        unique: true,
        required: true,
    },

    usertype: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    hint: {
        type: String,
    },

});
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    
    next();
    });
    
    // compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
return bcrypt.compare(password, this.password);
};

    userSchema.methods.typeValidator = async function (usertype) {
        if (usertype !== 'Parent' && usertype !== 'Child') {
            throw new Error ("Invalid User Type Entered");
        }
    } 
const User = model('User', userSchema);

module.exports = User;
    