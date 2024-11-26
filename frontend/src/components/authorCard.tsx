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
import { useEffect, useState } from "react";
import { IAuthorCardProps } from "@/interfaces/author.interface";
import { DeleteAuthorDialog } from "./dialogs/deleteAuthor";
import { UpdateAuthorDialog } from "./dialogs/updateAuthor";
import { useRouter } from "next/navigation";

export const AuthorCard: React.FC<IAuthorCardProps> = ({ author, refetch }) => {
  const router = useRouter();
  const [showUpdateDialog, setShowUpdateDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const onListItemClick = (id?: string) => {
    if (!id) return;
    router.push(`/authors?id=${id}`);
  };

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        alt="author profile pic"
        height="140"
        image="/author.jpg"
      />
      <CardContent>
        <Typography
          variant="h5"
          fontWeight={"bold"}
          onClick={() => onListItemClick(author.id)}
        >
          {capitalize(author.name)}
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {author.biography}
        </Typography>
        <div
          className="text-sm text-gray-500 dark:text-gray-400"
          style={{ marginTop: "20px" }}
        >
          <Typography fontStyle={"italic"}>
            {`${
              author.createdAt == author.updatedAt ? "Added" : "Updated"
            } ${timeElapsedInText(
              new Date(author.createdAt) === new Date(author.updatedAt)
                ? author.createdAt
                : author.updatedAt
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
        <DeleteAuthorDialog
          open={showDeleteDialog}
          setOpen={setShowDeleteDialog}
          id={author.id}
          onComplete={refetch}
        />
        <IconButton
          aria-label="update"
          size="small"
          onClick={() => setShowUpdateDialog(true)}
        >
          <UpdateIcon fontSize="small" />
        </IconButton>
        <UpdateAuthorDialog
          author={author}
          onComplete={refetch}
          open={showUpdateDialog}
          setOpen={setShowUpdateDialog}
        />
      </CardActions>
    </Card>
  );
};
