import { gql } from "@apollo/client";

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
  query User($id: ID) {
    user(_id: $id) {
      username
      usertype
      hint
    }
  }
`;

export const QUERY_PRODUCTS = gql`
  query getProducts($category: ID) {
    products(category: $category) {
      _id
      name
      description
      price
      quantity
      image
      category {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($products: [ID]!) {
    checkout(products: $products) {
      session
    }
  }
`;

export const QUERY_ALL_PRODUCTS = gql`
  {
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
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;
export const QUERY_ALL_CHILDREN_CHORES = gql`
  query Childchores($childId: ID) {
    childchores(child_Id: $childId) {
      _id
      name
      description
      repeat
      datecreated
      status
      numcredits
      parent_Id
      child_Id
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
      creditsearned
      user_Id
    }
  }
`;

export const QUERY_SINGLE_CHORE = gql`
 query Chore($id: ID) {
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
    repeat
    datecreated
    datecompleted
    parent_Id
    child_Id
  }
}
`;

