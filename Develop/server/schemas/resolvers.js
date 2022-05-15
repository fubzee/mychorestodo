const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { Parent } = require('../models');
const { Child } = require('../models');
const { Chore } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    username: async (parent, { username }) => {
      return User.findOne({ username:username } );
    },

    user: async (parent, { _id }) => {
      return User.findById({ _id: _id });
    },

    parent: async (parent, { user_Id }) => {
        return Parent.findOne({ user_Id: user_Id });
      },

    child: async (parent, { user_Id }) => {
    return Child.findOne({ user_Id: user_Id });
    },

    children: async (parent, { parent_Id }) => {
      return Child.find({ parent_Id: parent_Id } );
      },

    chore: async (parent, { _id }) => {
    return Chore.findById({ _id: _id });
    },
    
    parentchores: async (parent, { parent_Id }) => {
    return Chore.find({parent_Id: parent_Id });
    },
    childchores: async (parent, { child_Id }) => {
    return Chore.find({ child_Id: child_Id });
    },
  },

  Mutation: {
    addUser: async (parent, { username, usertype, password, hint }) => {
      const user = await User.create({ username, usertype, password, hint });
      const token = signToken(User);
      return user;
     },

    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });
      console.log(username,password);
      if (!user) {
        throw new AuthenticationError('We are having an issue with logging you in please try again.');
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('We are having an issue with logging you in please try again!');
      }

      const token = signToken(user);
      return { token, user };
    },

    addParent: async (parent, { name, email, chart, user_Id }) => {
      const newParent = await Parent.create({ name, email, chart, user_Id });
      return newParent;
    },

    addChild: async (parent, { name, totalcredits, credittype, parent_Id, user_Id }) => {
        const child = await Child.create({  name, totalcredits, credittype, parent_Id, user_Id });
        return child;
    },

    addChore: async (parent, { name, description, status, numcredits, parent_Id, child_Id, repeat, datecreated, datecompleted }) => {
        const chore = await Chore.create({ name, description, status, numcredits, parent_Id, child_Id, repeat, datecreated, datecompleted });
        return chore;
    },

    updChore: async (parent, { chore_id, name, description, status, numcredits, parent_Id, child_Id  }) => {
        const chore = await Chore.findOneAndUpdate({ chore_id, name, description, status, numcredits, parent_Id, child_Id });
        return chore;
    },

    removeChore: async (parent, { chore_Id }) => {
      return Chore.findOneAndDelete({ _id: chore_Id });
    },
    removeUser: async (parent, { user_Id }) => {
      return User.findOneAndDelete({ _id: user_Id });
    },
    removeParent: async (parent, { parent_Id }) => {
      return Parent.findOneAndDelete({ _id: parent_Id });
    },
    removeChild: async (parent, { child_Id }) => {
      return Child.findOneAndDelete({ _id: child_Id });
    },
    removeParentChores: async (parent, { parent_Id }) => {
        return Chore.deleteMany({ parent_Id: parent_Id });
    },
    removeChildChores: async (parent, { child_Id }) => {
      return Chore.deleteMany({ child_Id : child_Id });
  },
    removeChildren: async (parent, { parent_Id }) => {
        return Child.deleteMany({ parent_Id : parent_Id });
    },
  },
};

module.exports = resolvers;