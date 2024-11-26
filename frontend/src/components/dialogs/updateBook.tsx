import React, { useEffect, useMemo, useRef, useState } from "react";
import { Modal } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import {
  FormBuilder,
  FormBuilderRef,
  FormField,
} from "@/components/formBuilder";
import { GET_AUTHOR_NAMES } from "@/lib/api/authors";
import {
  GET_BOOK_LIST_QUERY,
  GET_BOOKS_BY_AUTHOR_ID,
  UPDATE_BOOK_MUTATION,
} from "@/lib/api/books";
import { useToast } from "@/hooks/use-toast";

export interface UpdateBookProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onComplete: () => void;
  book: {
    id: string;
    title?: string;
    description?: string;
    publishedDate?: string;
    authorId?: string;
  };
}

export const UpdateBookDialog: React.FC<UpdateBookProps> = ({
  open,
  setOpen,
  onComplete,
  book,
}) => {
  const { toast } = useToast();
  const formRef = useRef<FormBuilderRef>(null);
  const updateError = useRef<any>(null);

  let [mutateFunction, { data, loading, error }] = useMutation(
    UPDATE_BOOK_MUTATION,
    {
      refetchQueries: [GET_BOOK_LIST_QUERY, GET_BOOKS_BY_AUTHOR_ID],
    }
  );

  const { data: authorsData, refetch: refetchAuthors } = useQuery(
    GET_AUTHOR_NAMES,
    {
      variables: {
        pageSize: 10000,
      },
    }
  );

  const formDetails: FormField[] = useMemo(
    () => [
      {
        type: "textarea",
        name: "description",
        label: "Description",
        placeholder: "Enter new book description",
      },
      {
        type: "date",
        name: "publishedDate",
        label: "Date of Publish",
        placeholder: "Select date of publish",
      },
      {
        type: "dropdown",
        name: "authorId",
        label: "Author",
        placeholder: "Select author",
        options: authorsData?.authors?.items?.map(
          (item: { name: string; id: string }) => ({
            label: item?.name ?? "",
            value: item?.id ?? "",
          })
        ),
      },
    ],
    [authorsData]
  );

  formRef.current?.reset();
  refetchAuthors({
    page: 1,
    pageSize: 10000,
  });

  const handleOk = (values: any) => {
    const variables = {
      ...values,
      publishedDate: values.publishedDate?.toISOString(),
    };

    mutateFunction({ variables: { updateBookId: book.id, ...variables } });
    updateError.current = error;
    if (!updateError.current) {
      toast({
        title: `You provided an update for the book ${book.title}`,
        description: "Thanks for your contibution!",
      });
      setOpen(false);
    }
  };

  useEffect(() => {
    updateError.current = null;
  }, [open]);

  useEffect(() => {
    if (data) {
      onComplete();
    }
  }, [data, onComplete]);

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal
      title="Edit book detail"
      open={open}
      onOk={() => formRef.current?.submit()}
      confirmLoading={loading}
      onCancel={handleCancel}
      onClose={handleCancel}
    >
      <FormBuilder
        ref={formRef}
        formDetails={formDetails}
        onSubmit={handleOk}
        initialValues={{
          ...book,
          publishedDate: book.publishedDate
            ? book.publishedDate.substring(0, 10)
            : undefined,
        }}
      />
      {updateError.current && <p>{updateError.current.message}</p>}
    </Modal>
  );
};
