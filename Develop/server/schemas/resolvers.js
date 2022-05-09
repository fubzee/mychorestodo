const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { Parent } = require('../models');
const { Child } = require('../models');
const { Chore } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    username: async (parent, { username }) => {
      return User.findOne({ username:username });
    },

    userid: async (parent, { user_Id }) => {
      return User.findOne({ _Id: user_Id });
    },

    parent: async (parent, { user_Id }) => {
        return Parent.findOne({ user_Id: user_Id });
      },

    children: async (parent, { parent_Id }) => {
    return Child.findAll({ _id: parent_Id });
    },

    child: async (parent, { child_Id }) => {
    return Child.findOne({ _id: child_Id });
    },

    chore: async (parent, { chore_Id }) => {
    return Chore.find({ _id: chore_Id });
    },
    
    parentchores: async (parent, { parent_Id }) => {
    return Chore.findMany({parent_Id: parent_Id });
    },
    childchores: async (parent, { child_Id }) => {
    return Chore.findMany({ child_Id: child_Id });
    },
  },

  Mutation: {
    addUser: async (parent, { username, usertype, password, hint }) => {
      const user = await User.create({ username, usertype, password, hint });
      const token = signToken(User);
    //   const correctUt = await User.typeValidator(usertype);
    },

    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError('We are having an issue with logging you in please try again.');
      }
      const correctPw = await User.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError('We are having an issue with logging you in please try again!');
      }

      const token = signToken(user);
      return { token, User };
    },

    addParent: async (parent, { name, email, chart, user_Id }) => {
      const newParent = await Parent.create({ name, email, chart, user_Id });
      return { Parent };
    },

    addChild: async (parent, { name, totalcredits, creditType, parent_Id, user_Id }) => {
        const child = await Child.create({  name, totalcredits, creditType, parent_Id, user_Id });
        return { Child };
    },

    addChore: async (parent, { name, description, status, numcredits, parent_Id, child_Id }) => {
        const chore = await Chore.create({ name, description, status, numcredits, parent_Id, child_Id });
        return { Chore };
    },

    updChore: async (parent, { name, description, status, numcredits, parent_Id, child_Id }) => {
        const chore = await Chore.set({ name, description, status, numcredits, parent_Id, child_Id });
        return { Chore };
    },

    removeChore: async (parent, { chore_Id }) => {
      return Chore.findOneAndDelete({ _id: chore_Id });
    },

    removeChores: async (parent, { parent_Id }) => {
        return Chore.findManyAndDelete({ _id: parent_Id });
    },

    removeChildren: async (parent, { parent_Id }) => {
        return Child.findManyAndDelete({ _id: parent_Id });
    },
  },
};

module.exports = resolvers;