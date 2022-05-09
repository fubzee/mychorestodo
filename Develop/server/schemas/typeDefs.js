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
        user_id: ID
        children: [Child]
    }

    type Child {
        _id:ID
        name: String
        totalcredits: Int
        credittype: String
        parent: Parent
        chores: [Chore]
    }

    type Chore {
        _id:ID
        name: String
        description: String
        status: Boolean
        numcredits: Int
        parent: Parent
        child: Child
    }

    type Query {
       username(username: String): User
       userid(_id: ID) : User
       parent( _id: ID) : Parent
       child(_id: ID): Child
       children(parent_Id: ID) : Child
       chore(_id: ID): Chore
       parentchores(parent_Id: ID) : Chore
       childchores(child_Id: ID) : Chore
    }

    type Mutation {
        login(username: String!, password: String!): Auth
        addUser(username: String!, usertype: String!, password: String!, hint: String!) : User
        addParent(name:String!, email:String!, chart: String!,user_Id: String!) : Parent
        addChild(name: String, totalcredits: Int, credittype: String!, parent_Id: String!, user_Id: String) : Child
        addChore(name: String!, description: String, status: Boolean, numcredits: Int!, parent_Id: String!, child_Id: String!) : Chore
        updChore(name: String!, description: String, status: Boolean, numcredits: Int!, parent_Id: String!, child_Id: String!) : Chore
        removeChore(chore_Id: ID!) : Chore
        removeChores(parent_Id: ID!) : Chore
        removeChildren(child_Id: ID!) : Child
    }
`;
    module.exports = typeDefs;