"use client";
import { timeElapsedInText, capitalize } from "@/lib/utils";
import {
  CardMedia,
  CardContent,
  CardActions,
  IconButton,
  Card,
  Typography,
} from "@mui/material";
import UpdateIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { UpdateBookDialog } from "./dialogs/updateBook";
import { Flex } from "antd";
import { UserPenIcon } from "lucide-react";
import { useState } from "react";
import { DeleteBookDialog } from "./dialogs/deleteBook";
import { IBookCardProps } from "@/interfaces/book.interface";
import { useRouter } from "next/navigation";

export const BookCard: React.FC<IBookCardProps> = ({ book, refetch }) => {
  const router = useRouter();
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const onListItemClick = (id?: string) => {
    if (!id) return;
    router.push(`/books?id=${id}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="book cover"
        height="140"
        image="/bookstock.png"
      />
      <CardContent>
        <Typography
          variant="h5"
          fontWeight={"bold"}
          onClick={() => onListItemClick(book.id)}
        >
          {book.title}
        </Typography>
        <Flex
          style={{
            flexGrow: 1,
            flexDirection: "row",
            paddingBlock: "10px",
          }}
          gap="10px"
        >
          <UserPenIcon />
          <Typography variant="h6" component="div">
            {capitalize(book.author?.name)}
          </Typography>
        </Flex>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {book.description}
        </Typography>
        <div
          className="text-sm text-gray-500 dark:text-gray-400"
          style={{ marginTop: "20px" }}
        >
          <Typography fontStyle={"italic"}>
            {`${
              book.createdAt == book.updatedAt ? "Added" : "Updated"
            } ${timeElapsedInText(
              new Date(book.createdAt) === new Date(book.updatedAt)
                ? book.createdAt
                : book.updatedAt
            )}`}
          </Typography>
        </div>
      </CardContent>
      <CardActions>
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => setShowDeleteDialog(true)}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
        <DeleteBookDialog
          open={showDeleteDialog}
          setOpen={setShowDeleteDialog}
          id={book.id}
          onComplete={refetch}
        />
        <IconButton
          aria-label="update"
          size="small"
          onClick={() => setShowUpdateDialog(true)}
        >
          <UpdateIcon fontSize="small" />
        </IconButton>
        <UpdateBookDialog
          book={book}
          onComplete={refetch}
          open={showUpdateDialog}
          setOpen={setShowUpdateDialog}
        />
      </CardActions>
    </Card>
  );
};
