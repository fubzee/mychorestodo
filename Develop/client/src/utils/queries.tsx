import { gql } from '@apollo/client';

export const QUERY_USERNAME = gql`
query Username($username: String) {
    username(username: $username) {
      _id
      username
      usertype
      password
      hint
    }
  }
`;

export const QUERY_SINGLE_USER = gql`
query Userid($id: ID) {
    userid(_id: $id) {
      username
      usertype
      hint
    }
  }
`;
export const QUERY_SINGLE_PARENT = gql`
query Parent($userId: ID) {
    parent(user_Id: $userId) {
      _id
      name
      email
      chart
    }
  }
`;
export const QUERY_SINGLE_CHILD = gql`
query Query($userId: ID) {
    child(user_Id: $userId) {
      _id
      name
      totalcredits
      credittype
      parent_Id
      user_Id
    }
  }
`;
export const QUERY_ALL_CHILDREN = gql`
query Children($parentId: ID) {
    children(parent_Id: $parentId) {
      _id
      name
      totalcredits
      credittype
      user_Id
    }
  }
`;
export const QUERY_SINGLE_CHORE = gql`
query Query($id: ID) {
    chore(_id: $id) {
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

export const QUERY_ALL_PARENT_CHORES = gql`
query Parentchores($parentId: ID) {
    parentchores(parent_Id: $parentId) {
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

export const QUERY_ALL_CHILDREN_CHORES = gql`
query Childchores($childId: ID) {
    childchores(child_Id: $childId) {
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