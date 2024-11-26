import {
  IBookReviewResponse,
  IReviewListProps,
} from "@/interfaces/book.interface";
import { GET_BOOK_REVIEWS_QUERY } from "@/lib/api/reviews";
import { timeElapsedInText } from "@/lib/utils";
import { useQuery } from "@apollo/client";
import { Avatar, IconButton, Typography } from "@mui/material";
import { Flex, List, Rate, Skeleton } from "antd";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { useState } from "react";
import { AddReviewDialog } from "./dialogs/addReview";
import { ErrorPage } from "@/components/ui/errorPage";
import PageLoader from "@/components/ui/pageLoader";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ReviewList: React.FC<IReviewListProps> = ({ bookId }) => {
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    pageSize: 10,
  });
  const [showWriteReviewDialog, setShowWriteReviewDialog] = useState(false);

  const handlePageChange = (page: number, pageSize: number) => {
    setPagination({ page, pageSize });
  };

  const { loading, error, data, refetch } = useQuery(GET_BOOK_REVIEWS_QUERY, {
    variables: {
      bookId,
      ...pagination,
    },
  });

  const reviewData: IBookReviewResponse = data;

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return <ErrorPage errorMessage={error.message ?? "Something went wrong"} />;
  }

  return (
    <Flex style={{ flexDirection: "column", marginBlock: "10px" }} gap="md">
      <Flex style={{ justifyContent: "right" }}>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <IconButton
                aria-label="delete"
                size="large"
                onClick={() => setShowWriteReviewDialog(true)}
              >
                <EditNoteIcon fontSize="large" />
              </IconButton>
            </TooltipTrigger>
            <TooltipContent>
              <p>Write a review</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <AddReviewDialog
          bookId={bookId}
          open={showWriteReviewDialog}
          setOpen={setShowWriteReviewDialog}
          onComplete={refetch}
        />
      </Flex>
      <List
        style={{ marginLeft: "2%", marginRight: "3%" }}
        pagination={{
          position: "bottom",
          align: "center",
          current: pagination.page,
          pageSize: pagination.pageSize,
          total: reviewData.bookReviews.reviews.total ?? 0,
          onChange: handlePageChange,
          showSizeChanger: true,
          showTotal: (total) => `Total ${total} reviews`,
          pageSizeOptions: ["50", "100", "150"],
        }}
        dataSource={reviewData.bookReviews.reviews.items ?? []}
        renderItem={(item) => (
          <List.Item>
            <Skeleton avatar title={true} loading={loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar>{item.reviewerName.charAt(0).toUpperCase()}</Avatar>
                }
                title={
                  <Flex style={{ flexDirection: "column" }}>
                    <Flex style={{ flexDirection: "column" }}>
                      <Typography fontWeight="bold">{item.title}</Typography>
                      <Rate value={item.rating} disabled />
                    </Flex>
                    <Typography
                      className="text-gray-500"
                      lineHeight="25px"
                      variant="inherit"
                      marginTop="10px"
                    >
                      {`reviewed by ${item.reviewerName}`}
                    </Typography>
                    <Separator orientation="horizontal" />
                  </Flex>
                }
                description={<p style={{ color: "black" }}>{item.content}</p>}
              />
              <Flex
                className="text-sm text-gray-500"
                style={{ paddingLeft: "10px" }}
              >
                Added {timeElapsedInText(item.createdAt)}
              </Flex>
            </Skeleton>
          </List.Item>
        )}
      />
    </Flex>
  );
};
