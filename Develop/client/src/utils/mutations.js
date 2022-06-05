import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        _id
        username
        usertype
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser(
    $usertype: String!
    $username: String!
    $password: String!
    $hint: String!
  ) {
    addUser(
      usertype: $usertype
      username: $username
      password: $password
      hint: $hint
    ) 
    {
        _id
        username
        usertype
      
    }
  }
`;

export const ADD_CHILD_USER = gql`
  mutation AddChildUser(
    $username: String!
    $usertype: String!
    $password: String!
    $hint: String!
  ) {
    addChildUser(
      username: $username
      usertype: $usertype
      password: $password
      hint: $hint
    ) {
      _id
      username
      usertype
      password
      hint
    }
  }
`;

export const ADD_PARENT = gql`
  mutation AddParent(
    $name: String!
    $email: String!
    $chart: String!
    $userId: String!
  ) {
    addParent(name: $name, email: $email, chart: $chart, user_Id: $userId) {
      _id
      name
      email
      chart
      user_Id
    }
  }
`;
export const QUERY_SINGLE_PARENT = gql`
  mutation getParent($userId: ID) {
    getParent(user_Id: $userId) {
      _id
      name
      email
      chart
      user_Id
    }
  }
`;
export const QUERY_SINGLE_CHILD = gql`
  mutation getChild($userId: ID) {
    getChild(user_Id: $userId) {
      _id
      name
      totalcredits
      credittype
      creditsearned
      parent_Id
      user_Id
    }
  }
`;
export const ADD_CHILD = gql`
  mutation AddChild(
    $name: String!
    $totalcredits: Int!
    $credittype: String!
    $creditsearned:Int
    $parentId: String!
    $userId: String!
  ) {
    addChild(
      name: $name
      totalcredits: $totalcredits
      credittype: $credittype
      creditsearned: $creditsearned
      parent_Id: $parentId
      user_Id: $userId
    ) {
      _id
      name
      totalcredits
      credittype
      creditsearned
      parent_Id
      user_Id
    }
  }
`;

export const UPD_CHILD = gql`
  mutation UpdChild(
    $name: String!
    $totalcredits: Int!
    $credittype: String!
    $creditsearned:Int
    $parentId: String!
    $userId: String!
  ) {
    addChild(
      name: $name
      totalcredits: $totalcredits
      credittype: $credittype
      creditsearned: $creditsearned
      parent_Id: $parentId
      user_Id: $userId
    ) {
      _id
      name
      totalcredits
      credittype
      creditsearned
      parent_Id
      user_Id
    }
  }
`;
export const UPD_CHILD_CRD = gql`
  mutation UpdateChildCredits(
    $childId: ID!
    $creditsearned:Int!
  ) {
    UpdateChildcredits(
      child_Id: $childId
      creditsearned: $creditsearned
    ) {
      _id
      creditsearned
    }
  }
`;

export const ADD_CHORE = gql`
  mutation AddChore(
    $name: String!
    $description: String!
    $status: Boolean!
    $numcredits: Int!
    $parentId: String!
    $childId: String!
    $repeat: String!
    $datecreated: String!
    $datecompleted: String
  ) {
    addChore(
      name: $name
      description: $description
      status: $status
      numcredits: $numcredits
      parent_Id: $parentId
      child_Id: $childId
      repeat: $repeat
      datecreated: $datecreated
      datecompleted: $datecompleted
    ) {
      _id
      name
      description
      status
      numcredits
      parent_Id
      child_Id
      repeat
      datecreated
      datecompleted
    }
  }
`;

export const UPDATE_CHORE = gql`
  mutation UpdateChore(
    $choreId: ID!
    $status: Boolean!
    $datecompleted: String
  ) {
    updateChore(
      chore_Id: $choreId
      status: $status
      datecompleted: $datecompleted
    ) {
      _id
      name
      description
      status
      numcredits
      repeat
      datecreated
      datecompleted
      parent_Id
      child_Id
    }
  }
`;

export const REM_CHORE = gql`
  mutation Mutation($choreId: ID!) {
    removeChore(chore_Id: $choreId) {
      _id
    }
  }
`;

export const REM_PARENT_CHORES = gql`
  mutation RemoveParentChores($parentId: ID!) {
    removeParentChores(parent_Id: $parentId) {
      _id
      name
      description
      status
      numcredits
      repeat
      datecreated
      datecompleted
      parent_Id
      child_Id
    }
  }
`;

export const REM_CHILD_CHORES = gql`
  mutation RemoveChildChores($childId: ID!) {
    removeChildChores(child_Id: $childId) {
      _id
      name
      description
      status
      numcredits
      parent_Id
      child_Id
    }
  }
`;

export const REM_CHILDREN = gql`
  mutation RemoveChildren($parentId: ID!) {
    removeChildren(parent_Id: $parentId) {
      _id
      name
      totalcredits
      credittype
      creditsearned
      parent_Id
      user_Id
    }
  }
`;

export const REM_SINGLE_CHILD = gql`
  mutation RemoveChild($childId: ID!) {
    removeChild(child_Id: $childId) {
      _id
      name
      totalcredits
      creditsearned
      credittype
      parent_Id
      user_Id
    }
  }
`;

export const REM_PARENT = gql`
  mutation RemoveParent($parentId: ID!) {
    removeParent(parent_Id: $parentId) {
      _id
      name
      email
      chart
      user_Id
    }
  }
`;

export const REM_USER = gql`
  mutation RemoveUser($userId: ID!) {
    removeUser(user_Id: $userId) {
      _id
      username
      usertype
      password
      hint
    }
  }
`;

export const ADD_ORDER = gql`
  mutation addOrder($products: [ID]!) {
    addOrder(products: $products) {
      purchaseDate
      products {
        _id
        name
        description
        price
        quantity
        category {
          name
        }
      }
    }
  }
`;



export const QUERY_ALL_PARENT_CHORES = gql`
  mutation Parentchores($parentId: ID) {
    parentchores(parent_Id: $parentId) {
      _id
      name
      description
      status
      numcredits
      repeat
      datecreated
      datecompleted
      child_Id
      parent_Id
    }
  }
`;

// export const QUERY_ALL_CHILDREN_CHORES = gql`
//   mutation Childchores($childId: ID) {
//     childchores(child_Id: $childId) {
//       _id
//       name
//       description
//       status
//       numcredits
//       parent_Id
//       child_Id
//     }
//   }
// `;

export const QUERY_PARENT_CHILD = gql`
  mutation Childname($name: String!) {
    childname(name: $name) {
      _id
      name
      parent_Id
    }
  }
`;
