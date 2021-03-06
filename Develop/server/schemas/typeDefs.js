const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    usertype: String
    password: String
    hint: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Parent {
    _id: ID
    name: String
    email: String
    chart: String
    user_Id: ID
  }

  type Child {
    _id: ID
    name: String
    totalcredits: Int
    credittype: String
    creditsearned: Int
    parent_Id: ID
    user_Id: ID
  }

  type Chore {
    _id: ID
    name: String
    description: String
    status: Boolean
    numcredits: Int
    repeat: String
    datecreated: String
    datecompleted: String
    parent_Id: ID
    child_Id: ID
  }

  type Category {
    _id: ID
    name: String
  }

  type Product {
    _id: ID
    name: String
    description: String
    image: String
    quantity: Int
    price: Float
    category: Category
  }

  type Order {
    _id: ID
    purchaseDate: String
    products: [Product]
  }
  type Checkout {
    session: ID
  }

  type All {
    parent: [Parent]
    child: [Child] 
    chore: [Chore]
  }

  type Query {

    all (parent_Id: ID) : All
    username(username: String!): User
    user(_id: ID): User
    contextuser(_id: ID): User
    me: User
    parent(user_Id: ID): Parent
    child(user_Id: ID): Child
    getChildrec(_id: ID): Child
    chore(_id: ID): Chore
    parentchores(parent_Id: ID): [Chore]
    childchores(child_Id: ID): [Chore]
    categories: [Category]
    products(category: ID, name: String): [Product]
    product(_id: ID!): Product
    order(_id: ID!): Order
    checkout(products: [ID]!): Checkout
    children(parent_Id: ID): [Child] 

  }

  type Mutation {
    login(
      username: String!
      password: String!
    ): Auth

    addUser(
      username: String!
      usertype: String!
      password: String!
      hint: String!
    ): User

    addChildUser(
      username: String!
      usertype: String!
      password: String!
      hint: String!
    ): User

    addAuthUser(
      username: String!
      usertype: String!
      password: String!
      hint: String!
    ): Auth

    addParent(
      name: String!
      email: String!
      chart: String!
      user_Id: String!
    ): Parent

    getParent(user_Id: ID): Parent
    getChild(user_Id: ID): Child

    addChild(
      name: String!
      totalcredits: Int!
      credittype: String!
      creditsearned: Int
      parent_Id: String!
      user_Id: String!
    ): Child
    updateChild(
      child_Id: ID
      name: String!
      totalcredits: Int!
      credittype: String!
      creditsearned: Int
      parent_Id: String!
      user_Id: String!
    ): Child
     
    UpdateChildcredits(
      child_Id: ID
      creditsearned: Int!
    ): Child

    addChore(
      name: String!
      description: String!
      status: Boolean!
      numcredits: Int!
      repeat: String!
      datecreated: String!
      datecompleted: String
      parent_Id: String!
      child_Id: String!
    ): Chore

    updateChore(
      chore_Id: ID!
      status: Boolean!
      datecompleted: String
    ): Chore

    removeChore(chore_Id: ID!): Chore
    removeParentChores(parent_Id: ID!): Chore
    removeChildChores(child_Id: ID!): Chore
    removeChildren(parent_Id: ID!): Child
    removeParent(parent_Id: ID!): Parent
    removeChild(child_Id: ID!): Child
    removeUser(user_Id: ID!): User
    addOrder(products: [ID]!): Order
    updateProduct(_id: ID!, quantity: Int!): Product
    chore(_id: ID): Chore
  
    childname(name: String!): [Child]
  }
`;
module.exports = typeDefs;
