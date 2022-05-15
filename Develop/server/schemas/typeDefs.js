const { gql } = require('apollo-server-express');

const typeDefs = gql`

    type User {
        _id:ID
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
        _id:ID
        name: String
        totalcredits: Int
        credittype: String
        parent_Id: ID
        user_Id: ID
    }

    type Chore {
        _id:ID
        name: String
        description: String
        status: Boolean
        numcredits: Int
        repeat: String
        datecreated: String
        datecompleted: String
        parent_Id : ID
        child_Id: ID
    }

    type Query {
       username(username: String): User
       user(_id: ID) : User
       parent(user_Id: ID) : Parent
       child(user_Id: ID): Child
       children(parent_Id: ID) : [Child]
       chore(_id: ID): Chore
       parentchores(parent_Id: ID) : [Chore]
       childchores(child_Id: ID) : [Chore]
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, usertype: String!, password: String!, hint: String!) : User
        addParent(name:String!, email:String!, chart: String!,user_Id: String!) : Parent
        addChild(name: String!, totalcredits: Int!, credittype: String!, parent_Id: String!, user_Id: String!) : Child
        addChore(name: String!, description: String!, status: Boolean!, numcredits: Int!, repeat: String!, datecreated: String!, datecompleted: String, parent_Id: String!, child_Id: String!) : Chore
        updChore(chore_id: ID!, name: String!, description: String!, status: Boolean!, numcredits: Int!, parent_Id: String!, child_Id: String!) : Chore
        removeChore(chore_Id: ID!) : Chore
        removeParentChores(parent_Id: ID!) : Chore
        removeChildChores(child_Id: ID!) : Chore
        removeChildren(parent_Id: ID!) : Child
        removeParent(parent_Id: ID!) : Parent
        removeChild(child_Id: ID!) : Child
        removeUser(user_Id: ID!) : User
    }
`;
    module.exports = typeDefs;