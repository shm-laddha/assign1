"use client";
import { ReviewList } from "@/components/reviewList";
import { ErrorPage } from "@/components/ui/errorPage";
import PageLoader from "@/components/ui/pageLoader";
import { Separator } from "@/components/ui/separator";
import { IAuthorItem } from "@/interfaces/author.interface";
import { GET_AUTHOR_DETAIL_QUERY } from "@/lib/api/authors";
import { formatDate } from "@/lib/utils";
import { useQuery } from "@apollo/client";
import { Typography } from "@mui/material";
import { Card, Flex, List, Rate } from "antd";
import { CalendarRangeIcon, SunIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

const AuthorDetail: React.FC<any> = () => {
  const searchParams = useSearchParams();
  const authorId = searchParams.get("id");

  const { loading, error, data, refetch } = useQuery(GET_AUTHOR_DETAIL_QUERY, {
    variables: { authorId },
  });

  const authorData: IAuthorItem = data?.authors?.items[0];

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <ErrorPage errorMessage={error?.message ?? "Something went wrong"} />
    );
  }

  return (
    <Flex style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <div style={{ flex: 2, marginTop: "3%", marginLeft: "3%" }}>
        <Typography variant="h4" fontWeight={"bold"}>
          {authorData?.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: "text.secondary" }}
          style={{ marginTop: "20px", minHeight: "400px", flexGrow: 1 }}
        >
          {authorData?.biography}
        </Typography>
        <Typography variant="inherit" style={{ display: "flex", gap: "10px" }}>
          <SunIcon /> Born on {formatDate(authorData?.bornDate)}
        </Typography>
      </div>
      <Separator orientation="vertical" />
      <div style={{ flex: 2 }}>
        <Typography
          variant="inherit"
          fontWeight={"bold"}
          style={{ marginTop: "3%" }}
        >
          Some notable works by {authorData?.name}
        </Typography>
        <List
          grid={{ gutter: 16, column: 2 }}
          style={{ marginTop: "2%", marginRight: "3%" }}
          dataSource={authorData.books?.items}
          renderItem={(item) => (
            <List.Item>
              <Card
                title={
                  <Typography
                    fontWeight="bold"
                    style={{
                      display: "block",
                      width: "100%",
                      wordWrap: "break-word",
                      overflowWrap: "break-word",
                      whiteSpace: "normal",
                      margin: 0,
                    }}
                  >
                    {item.title}
                  </Typography>
                }
              >
                Published on {formatDate(item.publishedDate)}
              </Card>
            </List.Item>
          )}
        />
      </div>
    </Flex>
  );
};

export default AuthorDetail;
