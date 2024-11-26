"use client";

import { List, Flex, Button, Input, DatePicker, Dropdown } from "antd";
import { useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import debounce from "lodash/debounce";
import { GET_BOOK_LIST_QUERY, GET_BOOKS_BY_AUTHOR_ID } from "@/lib/api/books";
import { Dayjs } from "dayjs";
import PageLoader from "@/components/ui/pageLoader";
import { ErrorPage } from "@/components/ui/errorPage";
import { TextSearchIcon } from "lucide-react";
import { GET_AUTHOR_NAMES } from "@/lib/api/authors";
import { IconButton, Typography } from "@mui/material";
import { IBookListResponse } from "@/interfaces/book.interface";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { BookCard } from "@/components/bookCard";
import { AddBookDialog } from "@/components/dialogs/addBook";

export const BookList: React.FC = () => {
  /**
   * Search by title of the books
   */
  const [searchTitleTerm, setSearchTitleTerm] = useState<string>("");
  /**
   * Filter by published date
   */
  const [fromDate, setFromDate] = useState<Dayjs>();
  const [toDate, setToDate] = useState<Dayjs>();

  /**
   * Filter by author
   */
  const [authorId, setAuthorId] = useState<string>("");
  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [searchFilters, setSearchFilters] = useState<{
    title?: string;
    fromPublishedDate?: string;
    toPublishedDate?: string;
  }>({});
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    pageSize: 10,
  });

  const debouncedSearch = useCallback(
    debounce((params: { title?: string; fromDate?: Dayjs; toDate?: Dayjs }) => {
      console.log(params);
      setSearchFilters({
        ...params,
        fromPublishedDate: params.fromDate?.toISOString() as string,
        toPublishedDate: params.toDate?.toISOString() as string,
      });
    }, 500),
    [setSearchFilters]
  );

  const { loading, error, data, refetch } = useQuery(
    authorId ? GET_BOOKS_BY_AUTHOR_ID : GET_BOOK_LIST_QUERY,
    {
      variables: authorId
        ? {
            authorId,
            ...pagination,
          }
        : { ...pagination, ...searchFilters },
    }
  );

  const {
    loading: authorLoading,
    error: authorError,
    data: authorsData,
  } = useQuery(GET_AUTHOR_NAMES, {
    variables: {
      pageSize: 10000,
    },
  });

  if (loading || authorLoading) return <PageLoader />;

  const parsedData: IBookListResponse = authorId
    ? { ...data.authors.items[0] }
    : { ...data };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitleTerm(e.target.value);
    debouncedSearch({ title: e.target.value, fromDate, toDate });
  };

  const handleFromDateChange = (date?: Dayjs) => {
    console.log("set date", date);
    setFromDate(date);
    debouncedSearch({ title: searchTitleTerm, fromDate: date, toDate });
  };

  const handleToDateChange = (date?: Dayjs) => {
    console.log("set date", date);
    setToDate(date);
    debouncedSearch({ title: searchTitleTerm, fromDate, toDate: date });
  };

  const handleAuthorChange = (authorId: string) => {
    setAuthorId(authorId);
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setPagination({ page, pageSize });
  };

  if (error)
    return (
      <ErrorPage errorMessage="Error fetching books data at the moment. Please try again later" />
    );

  return (
    <Flex vertical>
      <Flex justify="center" style={{ marginBottom: 16 }}>
        <Typography variant="h5" fontStyle={"bold"}>
          Explore our wide range of books!
        </Typography>
      </Flex>
      <Flex justify="space-between" style={{ marginBottom: 16 }}>
        <Flex gap={4}>
          <Input
            placeholder="Search through book titles"
            prefix={<TextSearchIcon />}
            value={searchTitleTerm}
            onChange={handleSearch}
            style={{ width: 300, marginRight: "4px" }}
          />
          <DatePicker
            value={fromDate}
            onChange={handleFromDateChange}
            placeholder="Published From Date"
            style={{ marginRight: "4px" }}
          />
          <DatePicker
            value={toDate}
            onChange={handleToDateChange}
            placeholder="Published Until Date"
            style={{ marginRight: "4px" }}
          />
          <Dropdown
            trigger={["click"]}
            menu={{
              items: [
                ...authorsData?.authors.items.map((author: any) => ({
                  key: author.id,
                  label: author.name,
                  onClick: () => handleAuthorChange(author.id),
                })),
                {
                  key: "all",
                  label: "--All--",
                  onClick: () => handleAuthorChange(""),
                },
              ],
            }}
          >
            <Button title="Author">
              <Typography>Author</Typography>
            </Button>
          </Dropdown>
        </Flex>
        <div>
          <IconButton
            aria-label="add book"
            size="small"
            onClick={() => setShowAddDialog(true)}
          >
            <AddCircleOutlineRoundedIcon fontSize="small" />
          </IconButton>
          <AddBookDialog
            onComplete={refetch}
            open={showAddDialog}
            setOpen={setShowAddDialog}
          />
        </div>
      </Flex>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 3,
          lg: 3,
          xl: 4,
          xxl: 4,
          column: 4,
        }}
        dataSource={parsedData?.books.items ?? []}
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          total: parsedData?.books.total ?? 0,
          onChange: handlePageChange,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} books`,
          pageSizeOptions: ["10", "50", "100"],
          position: "bottom",
          align: "center",
        }}
        renderItem={(book) => (
          <List.Item>
            <BookCard book={book} refetch={refetch} />
          </List.Item>
        )}
      />
    </Flex>
  );
};
