import { Op } from 'sequelize';
import { InputMaybe } from 'src/graphql/grqphql';

export interface PaginationParams {
  pageSize?: number;
  page?: number;
}

export type FilterParams = Record<string, any>;

export const createPaginationQuery = (pageSize = 10, page = 1) => {
  return {
    limit: pageSize ?? 10,
    offset: ((page || 1) - 1) * (pageSize ?? 10)
  };
};

export const createMongoPaginationQuery = (pageSize = 10, page = 1) => {
  return {
    limit: pageSize ?? 10,
    skip: ((page || 1) - 1) * (pageSize ?? 10)
  };
};

export const createFilterQuery = (filterOptions: FilterParams) => {
  return Object.fromEntries(
    Object.entries(filterOptions).filter(([_, val]) => !!val)
  );
};

export const createFullTextSearchFilterQuery = (
  filterOptions: FilterParams
) => {
  return Object.fromEntries(
    Object.entries(filterOptions)
      .filter(([_, val]) => !!val)
      .map(([key, val]) => [key, { [Op.iLike]: `%${val}%` }])
  );
};

export const createDateFilterQuery = (
  filterOptions: Record<
    string,
    {
      gte?: InputMaybe<string>;
      lte?: InputMaybe<string>;
    }
  >
) => {
  const result: Record<string, any> = {};

  for (const [key, { gte, lte }] of Object.entries(filterOptions)) {
    if (!gte && !lte) continue;

    result[key] = {};

    if (gte) result[key][Op.gte] = new Date(gte);
    if (lte) result[key][Op.lte] = new Date(lte);
  }

  return result;
};
