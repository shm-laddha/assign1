"use client";

import { List, Flex, Input, DatePicker } from "antd";
import { useQuery } from "@apollo/client";
import { useCallback, useState } from "react";
import debounce from "lodash/debounce";
import { Dayjs } from "dayjs";
import PageLoader from "@/components/ui/pageLoader";
import { ErrorPage } from "@/components/ui/errorPage";
import { TextSearchIcon } from "lucide-react";
import { GET_AUTHOR_LIST_QUERY } from "@/lib/api/authors";
import { IconButton, Typography } from "@mui/material";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { IAuthorListResponse } from "@/interfaces/author.interface";
import { AddAuthorDialog } from "./dialogs/addAuthor";
import { AuthorCard } from "./authorCard";

export const AuthorList: React.FC = () => {
  /**
   * Search by title of the books
   */
  const [searchTitleTerm, setSearchTitleTerm] = useState<string>("");
  /**
   * Filter by published date
   */
  const [fromDate, setFromDate] = useState<Dayjs>();
  const [toDate, setToDate] = useState<Dayjs>();

  const [showAddDialog, setShowAddDialog] = useState<boolean>(false);
  const [searchFilters, setSearchFilters] = useState<{
    name?: string;
    fromBornDate?: string;
    toBornDate?: string;
  }>({});
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    pageSize: 10,
  });

  const debouncedSearch = useCallback(
    debounce((params: { name?: string; fromDate?: Dayjs; toDate?: Dayjs }) => {
      setSearchFilters({
        ...params,
        fromBornDate: params.fromDate?.toISOString() as string,
        toBornDate: params.toDate?.toISOString() as string,
      });
    }, 500),
    [setSearchFilters]
  );

  const { loading, error, data, refetch } = useQuery(GET_AUTHOR_LIST_QUERY, {
    variables: { ...pagination, ...searchFilters },
  });

  if (loading) return <PageLoader />;

  const parsedData: IAuthorListResponse = { ...data };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTitleTerm(e.target.value);
    debouncedSearch({ name: e.target.value, fromDate, toDate });
  };

  const handleFromDateChange = (date?: Dayjs) => {
    setFromDate(date);
    debouncedSearch({ name: searchTitleTerm, fromDate: date, toDate });
  };

  const handleToDateChange = (date?: Dayjs) => {
    setToDate(date);
    debouncedSearch({ name: searchTitleTerm, fromDate, toDate: date });
  };

  const handlePageChange = (page: number, pageSize: number) => {
    setPagination({ page, pageSize });
  };

  if (error)
    return (
      <ErrorPage errorMessage="Error fetching authors data at the moment. Please try again later" />
    );

  return (
    <Flex vertical>
      <Flex justify="center" style={{ marginBottom: 16 }}>
        <Typography variant="h5" fontStyle={"bold"}>
          Search thorugh the authors
        </Typography>
      </Flex>
      <Flex justify="space-between" style={{ marginBottom: 16 }}>
        <Flex gap={4}>
          <Input
            placeholder="Search by author name"
            prefix={<TextSearchIcon />}
            value={searchTitleTerm}
            onChange={handleSearch}
            style={{ width: 300, marginRight: "4px" }}
          />
          <DatePicker
            value={fromDate}
            onChange={handleFromDateChange}
            placeholder="Born From Date"
            style={{ marginRight: "4px" }}
          />
          <DatePicker
            value={toDate}
            onChange={handleToDateChange}
            placeholder="Born Until Date"
            style={{ marginRight: "4px" }}
          />
        </Flex>
        <div>
          <IconButton
            aria-label="add author"
            size="small"
            onClick={() => setShowAddDialog(true)}
          >
            <AddCircleOutlineRoundedIcon fontSize="small" />
          </IconButton>
          <AddAuthorDialog
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
        dataSource={parsedData?.authors.items ?? []}
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          total: parsedData?.authors.total ?? 0,
          onChange: handlePageChange,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} authors`,
          pageSizeOptions: ["10", "50", "100"],
          position: "bottom",
          align: "center",
        }}
        renderItem={(author) => (
          <List.Item>
            <AuthorCard author={author} refetch={refetch} />
          </List.Item>
        )}
      />
    </Flex>
  );
};
