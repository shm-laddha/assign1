"use client";
import { ReviewList } from "@/components/reviewList";
import { ErrorPage } from "@/components/ui/errorPage";
import PageLoader from "@/components/ui/pageLoader";
import { IBookItem } from "@/interfaces/book.interface";
import { GET_BOOK_DETAIL_QUERY } from "@/lib/api/books";
import { GET_BOOK_REVIEWS_QUERY } from "@/lib/api/reviews";
import { formatDate } from "@/lib/utils";
import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import { Flex, Rate } from "antd";
import { CalendarRangeIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

const BookDetail: React.FC<any> = () => {
  const searchParams = useSearchParams();
  const bookId = searchParams.get("id");

  const { loading, error, data, refetch } = useQuery(GET_BOOK_DETAIL_QUERY, {
    variables: { bookId },
  });

  const {
    loading: reviewsLoading,
    error: reviewsError,
    data: bookReviews,
    refetch: reviewsFetch,
  } = useQuery(GET_BOOK_REVIEWS_QUERY, {
    variables: {
      bookId,
      page: 1,
      pageSize: 1,
    },
  });

  const bookData: IBookItem = data?.books?.items[0];

  if (loading || reviewsLoading) {
    return <PageLoader />;
  }

  if (error || reviewsError) {
    return (
      <ErrorPage
        errorMessage={
          error?.message ?? reviewsError?.message ?? "Something went wrong"
        }
      />
    );
  }

  return (
    <Flex style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <div style={{ flex: 2, marginTop: "3%", marginLeft: "3%" }}>
        <Typography variant="h4" fontWeight={"bold"}>
          {bookData?.title}
        </Typography>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Written by{" "}
          <a href={`/authors?id=${bookData?.author?.id}`}>
            {bookData.author?.name}{" "}
          </a>
        </div>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
          style={{ marginTop: "20px", minHeight: "400px", flexGrow: 1 }}
        >
          {bookData?.description}
        </Typography>
        <Typography variant="inherit" style={{ display: "flex", gap: "10px" }}>
          <CalendarRangeIcon /> Published on{" "}
          {formatDate(bookData?.publishedDate)}
        </Typography>
        <div style={{ marginTop: "20px", gap: "10px", display: "flex" }}>
          <Rate disabled value={bookReviews?.bookReviews?.overallRating} />(
          {bookReviews?.bookReviews?.reviews?.total} reviews)
        </div>
      </div>
      <div style={{ flex: 2 }}>
        <ReviewList bookId={bookId ?? ""} />
      </div>
    </Flex>
  );
};

export default BookDetail;
