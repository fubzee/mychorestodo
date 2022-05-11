import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      user {
        username
      }
    }
  }
`;
export const ADD_USER = gql`
mutation AddUser($username: String!, $usertype: String!, $password: String!, $hint: String!) {
    addUser(username: $username, usertype: $usertype, password: $password, hint: $hint) {
      _id
      username
      usertype
      password
      hint
    }
  }
`;

export const ADD_PARENT = gql`
mutation AddParent($name: String!, $email: String!, $chart: String!, $userId: String!) {
    addParent(name: $name, email: $email, chart: $chart, user_Id: $userId) {
      _id
      name 
      email
      chart
      user_Id
    }
  }
`;

export const ADD_CHILD = gql`
mutation AddChild($name: String, $totalcredits: Int, $credittype: String!, $parentId: String!, $userId: String) {
    addChild(name: $name, totalcredits: $totalcredits, credittype: $credittype, parent_Id: $parentId, user_Id: $userId) {
      _id
      name
      totalcredits
      credittype
      parent_Id
      user_Id
    }
  }
`;

export const ADD_CHORE = gql`
mutation AddChore($name: String!, $description: String!, $status: Boolean!, $numcredits: Int!, $parentId: String!, $childId: String!, $repeat: String!, $datecreated: String!, $datecompleted: String) {
    addChore(name: $name, description: $description, status: $status, numcredits: $numcredits, parent_Id: $parentId, child_Id: $childId, repeat: $repeat, datecreated: $datecreated, datecompleted: $datecompleted) {
      _id
      name
      description
      status
      numcredits
      parent_Id
      child_Id
      repeat
      datecreated
    }
  }
`;

export const UPD_CHORE = gql`
mutation UpdChore($choreId: ID!, $name: String!, $description: String!, $status: Boolean!, $numcredits: Int!, $parentId: String!, $childId: String!) {
    updChore(chore_id: $choreId, name: $name, description: $description, status: $status, numcredits: $numcredits, parent_Id: $parentId, child_Id: $childId) {
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

  export const REM_CHORE=gql`
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