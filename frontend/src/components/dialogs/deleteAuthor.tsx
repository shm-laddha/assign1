import React, { useEffect, useRef, useState } from "react";
import { Modal } from "antd";
import { useMutation } from "@apollo/client";
import { Typography } from "@mui/material";
import {
  DELETE_AUTHOR_MUTATION,
  GET_AUTHOR_LIST_QUERY,
  GET_AUTHOR_NAMES,
} from "@/lib/api/authors";
import { useToast } from "@/hooks/use-toast";

export interface DeleteAuthorProps {
  id: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onComplete: () => void;
}

export const DeleteAuthorDialog: React.FC<DeleteAuthorProps> = ({
  onComplete,
  id,
  open,
  setOpen,
}) => {
  const { toast } = useToast();
  const deleteError = useRef<any>(null);
  const [mutateFunction, { data, loading, error }] = useMutation(
    DELETE_AUTHOR_MUTATION,
    {
      refetchQueries: [GET_AUTHOR_LIST_QUERY, GET_AUTHOR_NAMES],
    }
  );

  const handleOk = () => {
    mutateFunction({
      variables: {
        deleteAuthorId: id,
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
      title="Delete Author?"
      open={open}
      onOk={handleOk}
      okButtonProps={{ danger: true }}
      confirmLoading={loading}
      onCancel={handleCancel}
    >
      <Typography>Are you sure you want to delete this author?</Typography>
      {deleteError.current && <p>{deleteError.current.message}</p>}
    </Modal>
  );
};
