export interface IAuthorItem {
  name: string;
  id: string;
  biography: string;
  bornDate: string;
  books?: {
    items: Array<{
      title: string;
      id: string;
      publishedDate: string;
    }>;
  };
  createdAt: string;
  updatedAt: string;
}

export interface IAuthorListResponse {
  authors: {
    items: Array<IAuthorItem>;
    total: number;
  };
}

export interface IAuthorCardProps {
  author: IAuthorItem;
  refetch: () => void;
}
