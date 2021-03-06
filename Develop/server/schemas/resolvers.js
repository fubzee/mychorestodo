const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { Parent } = require("../models");
const { Child } = require("../models");
const { Chore } = require("../models");
const { Product, Category, Order } = require("../models");
const { signToken } = require("../utils/auth");
const stripe = require("stripe")(
  "sk_test_51L0PLVBkde7Q0covwMq2dM7jl9M5Aplv5msgcr2NLKiugwz80vY2cRcsROgPvRhK13Ab7080BxEyflU7vR6dspyA008sgpnhVK"
);

const resolvers = {
  Query: {
    user: async (parent, { _id }) => {
      return User.findById({ _id: _id });
    },

    categories: async () => {
      return await Category.find();
    },
    products: async (parent, { category, name }) => {
      const params = {};

      if (category) {
        params.category = category;
      }

      if (name) {
        params.name = {
          $regex: name,
        };
      }

      return await Product.find(params).populate("category");
    },
    product: async (parent, { _id }) => {
      return await Product.findById(_id).populate("category");
    },
    contextuser: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        user.orders.sort((a, b) => b.purchaseDate - a.purchaseDate);

        return user;
      }

      throw new AuthenticationError("Not logged in");
    },
    order: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate({
          path: "orders.products",
          populate: "category",
        });

        return user.orders.id(_id);
      }

      throw new AuthenticationError("Not logged in");
    },

    children: async (parent, { parent_Id }) => {
      return Child.find({ parent_Id: parent_Id });
      
    },

    getChildrec: async (parent, { child_Id }) => {
      return Child.findOne({ _id: child_Id });
    },

    childchores: async (parent, { child_Id }) => {
      return Chore.find({ child_Id: child_Id });
    },

    chore: async (parent, { _id }) => {
      return Chore.findById({ _id: _id });
    },
    parentchores: async (parent, { parent_Id }) => {
      return Chore.find({ parent_Id: parent_Id });
    },

    // parentchildchores: ( parent, { parent_Id }) => {
    //   chores: async ({ child_Id })
    //   return (await Chore.find({ child_Id: child_Id }).toArray()).map(prepare)
    // },


    checkout: async (parent, args, context) => {
      try {
        const url = new URL(context.headers.referer).origin;
        console.log("URL", URL);
        const order = new Order({ products: args.products });
        const line_items = [];

        const { products } = await order.populate("products");

        for (let i = 0; i < products.length; i++) {
          const product = await stripe.products.create({
            name: products[i].name,
            description: products[i].description,
            images: [`${url}/images/${products[i].image}`],
          });

          const price = await stripe.prices.create({
            product: product.id,
            unit_amount: products[i].price * 100,
            currency: "usd",
          });

          line_items.push({
            price: price.id,
            quantity: 1,
          });
        }

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          line_items,
          mode: "payment",
          success_url: `${url}/success?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${url}/`,
        });

        return { session: session.id };
      } catch (error) {
        console.log(error);
      }
    },
  },
  Mutation: {
    addUser: async (parent, { usertype, username, password, hint }) => {
      const user = await User.create({ usertype, username, password, hint });
      // const token = signToken(user);
      return user;
    },

    addChildUser: async (parent, { username, usertype, password, hint }) => {
      const childuser = await User.create({ username, usertype, password, hint });
      return  childuser ;
    },

    login: async (parent, { username, password }) => {
      const user = await User.findOne({ username });

      if (!user) {
        throw new AuthenticationError(
          "We are having an issue with logging you in please try again."
        );
      }
      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError(
          "We are having an issue with logging you in please try again!"
        );
      }

      const token = signToken(user);

      return  {token, user};
    },

    getParent: async (parent, { user_Id }) => {
      return Parent.findOne({ user_Id: user_Id });
    },

    getChild: async (parent, { user_Id }) => {
      return Child.findOne({ user_Id: user_Id });
    },



    addParent: async (parent, { name, email, chart, user_Id }) => {
      const newParent = await Parent.create({ name, email, chart, user_Id });
      return newParent;
    },

    addChild: async (
      parent,
      { name, totalcredits, credittype, creditsearned, parent_Id, user_Id }
    ) => {
      const child = await Child.create({
        name,
        totalcredits,
        credittype,
        creditsearned,
        parent_Id,
        user_Id,
      });
      return child;
    },

    updateChild: async (
      parent,
      { child_Id, name, totalcredits, credittype, creditsearned, parent_Id, user_Id }
    ) => {
      const child = await Child.findByIdAndUpdate({ _id: child_Id},
        {name: name,
        totalcredits:totalcredits,
        credittype:credittype,
        creditsearned:creditsearned,
        parent_Id: parent_Id,
        user_Id: user_Id,
        });
      return child;
    },

    UpdateChildcredits: async (
      parent,
      { child_Id, creditsearned }
    ) => {
      const child = await Child.findByIdAndUpdate({ _id: child_Id},
        {
        creditsearned:creditsearned,
        });
      return child;
    },

    addChore: async (
      parent,
      {
        name,
        description,
        status,
        numcredits,
        parent_Id,
        child_Id,
        repeat,
        datecreated,
        datecompleted,
      }
    ) => {
      const chore = await Chore.create({
        name,
        description,
        status,
        numcredits,
        parent_Id,
        child_Id,
        repeat,
        datecreated,
        datecompleted,
      });
      return chore;
    },

    updateChore: async (parent, {chore_Id, status, datecompleted }) => {
      const chore = await Chore.findByIdAndUpdate({ _id: chore_Id },
        {
        status: status,
        datecompleted: datecompleted
        });

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
      return Chore.deleteMany({ child_Id: child_Id });
    },
    removeChildren: async (parent, { parent_Id }) => {
      return Child.deleteMany({ parent_Id: parent_Id });
    },
    addOrder: async (parent, { products }, context) => {
      console.log(context);
      if (context.user) {
        const order = new Order({ products });

        await User.findByIdAndUpdate(context.user._id, {
          $push: { orders: order },
        });

        return order;
      }

      throw new AuthenticationError("Not logged in");
    },
    updateProduct: async (parent, { _id, quantity }) => {
      const decrement = Math.abs(quantity) * -1;

      return await Product.findByIdAndUpdate(
        _id,
        { $inc: { quantity: decrement } },
        { new: true }
      );
    },
    childname: async (parent, { name }) => {
      return Child.find({ name: name });
    },
  },
};

module.exports = resolvers;
