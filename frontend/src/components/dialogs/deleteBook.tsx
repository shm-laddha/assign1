import React, { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import { useMutation } from "@apollo/client";
import {
  DELETE_BOOK_MUTATION,
  GET_BOOK_LIST_QUERY,
  GET_BOOKS_BY_AUTHOR_ID,
} from "@/lib/api/books";
import { Typography } from "@mui/material";
import { useToast } from "@/hooks/use-toast";

export interface DeleteBookProps {
  id: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onComplete: () => void;
}

export const DeleteBookDialog: React.FC<DeleteBookProps> = ({
  onComplete,
  id,
  open,
  setOpen,
}) => {
  const { toast } = useToast();
  const deleteError = useRef<any>(null);
  const [mutateFunction, { data, loading, error }] = useMutation(
    DELETE_BOOK_MUTATION,
    {
      refetchQueries: [GET_BOOK_LIST_QUERY, GET_BOOKS_BY_AUTHOR_ID],
    }
  );

  const handleOk = () => {
    mutateFunction({
      variables: {
        deleteBookId: id,
      },
    });
    deleteError.current = error;
    if (!deleteError.current) {
      toast({
        title: `Deletion Successful!`,
      });
      setOpen(false);
    }
  };

  useEffect(() => {
    if (data) {
      onComplete();
      setOpen(false);
    }
  }, [data, onComplete]);

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      title="Delete Book?"
      open={open}
      onOk={handleOk}
      okButtonProps={{ danger: true }}
      confirmLoading={loading}
      onCancel={handleCancel}
    >
      <Typography>Are you sure you want to delete this book?</Typography>
      {deleteError.current && <p>{deleteError.current.message}</p>}
    </Modal>
  );
};
