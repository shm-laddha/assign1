import { gql } from "@apollo/client";

export const GET_AUTHOR_NAMES = gql`
  query Query($pageSize: Int) {
    authors(pageSize: $pageSize) {
      items {
        id
        name
      }
    }
  }
`;

export const ADD_AUTHOR_MUTATION = gql`
  mutation AddAuthor(
    $name: String!
    $biography: String
    $bornDate: bornDate_String_format_date
  ) {
    addAuthor(name: $name, biography: $biography, bornDate: $bornDate) {
      id
    }
  }
`;

export const GET_AUTHOR_LIST_QUERY = gql`
  query GetAuthors(
    $page: Int
    $pageSize: Int
    $name: String
    $fromBornDate: String
    $toBornDate: String
  ) {
    authors(
      page: $page
      pageSize: $pageSize
      name: $name
      fromBornDate: $fromBornDate
      toBornDate: $toBornDate
    ) {
      items {
        name
        id
        biography
        createdAt
        updatedAt
      }
      total
    }
  }
`;

export const DELETE_AUTHOR_MUTATION = gql`
  mutation DeleteAuthor($deleteAuthorId: String!) {
    deleteAuthor(id: $deleteAuthorId)
  }
`;

export const UPDATE_AUTHOR_MUTATION = gql`
  mutation UpdateAuthor(
    $updateAuthorId: id_String_NotNull_format_uuid!
    $name: String
    $biography: biography_String_maxLength_1000
    $bornDate: bornDate_String_format_date
  ) {
    updateAuthor(
      id: $updateAuthorId
      name: $name
      biography: $biography
      bornDate: $bornDate
    ) {
      id
    }
  }
`;

export const GET_AUTHOR_DETAIL_QUERY = gql`
  query GetAuthorDetail($authorId: String) {
    authors(authorId: $authorId) {
      items {
        name
        id
        biography
        bornDate
        books {
          items {
            title
            id
            publishedDate
          }
        }
      }
      total
    }
  }
`;
