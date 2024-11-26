import { gql } from "@apollo/client";

export const GET_BOOK_LIST_QUERY = gql`
  query Query(
    $page: Int
    $pageSize: Int
    $title: String
    $fromPublishedDate: String
    $toPublishedDate: String
  ) {
    books(
      page: $page
      pageSize: $pageSize
      title: $title
      fromPublishedDate: $fromPublishedDate
      toPublishedDate: $toPublishedDate
    ) {
      items {
        title
        author {
          id
          name
        }
        description
        id
        createdAt
        updatedAt
      }
      page
      total
    }
  }
`;

export const GET_BOOKS_BY_AUTHOR_ID = gql`
  query Query($authorId: String, $pageSize: Int, $page: Int) {
    authors(authorId: $authorId) {
      items {
        books(pageSize: $pageSize, page: $page) {
          total
          items {
            title
            description
            id
            author {
              id
              name
            }
            createdAt
            updatedAt
          }
        }
      }
    }
  }
`;

export const UPDATE_BOOK_MUTATION = gql`
  mutation Mutation(
    $updateBookId: id_String_NotNull_format_uuid!
    $title: String
    $description: String
    $publishedDate: String
    $authorId: String
  ) {
    updateBook(
      id: $updateBookId
      title: $title
      description: $description
      publishedDate: $publishedDate
      authorId: $authorId
    ) {
      id
    }
  }
`;

export const ADD_BOOK_MUTATION = gql`
  mutation Mutation(
    $title: String!
    $description: String
    $publishedDate: publishedDate_String_format_date
    $authorId: authorId_String_format_uuid
  ) {
    addBook(
      title: $title
      description: $description
      publishedDate: $publishedDate
      authorId: $authorId
    ) {
      id
    }
  }
`;

export const DELETE_BOOK_MUTATION = gql`
  mutation Mutation($deleteBookId: String!) {
    deleteBook(id: $deleteBookId)
  }
`;

export const GET_BOOK_DETAIL_QUERY = gql`
  query GetBookDetail($bookId: String) {
    books(bookId: $bookId) {
      items {
        id
        title
        createdAt
        updatedAt
        publishedDate
        description
        author {
          name
          id
        }
      }
    }
  }
`;
