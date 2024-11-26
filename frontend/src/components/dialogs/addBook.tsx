import React, { useEffect, useMemo, useRef } from "react";
import { Modal } from "antd";
import { useMutation, useQuery } from "@apollo/client";
import {
  FormBuilder,
  FormBuilderRef,
  FormField,
} from "@/components/formBuilder";
import { GET_AUTHOR_NAMES } from "@/lib/api/authors";
import {
  ADD_BOOK_MUTATION,
  GET_BOOK_LIST_QUERY,
  GET_BOOKS_BY_AUTHOR_ID,
} from "@/lib/api/books";
import { useToast } from "@/hooks/use-toast";

export interface AddBookProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onComplete: () => void;
}

export const AddBookDialog: React.FC<AddBookProps> = ({
  open,
  setOpen,
  onComplete,
}) => {
  const { toast } = useToast();
  const formRef = useRef<FormBuilderRef>(null);
  const addError = useRef<any>(null);

  const [mutateFunction, { data, loading, error }] = useMutation(
    ADD_BOOK_MUTATION,
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
        name: "title",
        label: "Title",
        placeholder: "Enter book's title",
        rules: [{ required: true, message: "Please enter book's title" }],
      },
      {
        type: "textarea",
        name: "description",
        label: "Description",
        placeholder: "Enter book's description",
      },
      {
        type: "date",
        name: "publishedDate",
        label: "Date of Publish",
        placeholder: "Select date of publish",
        rules: [{ required: true, message: "Please select date of publish" }],
      },
      {
        type: "dropdown",
        name: "authorId",
        label: "Author",
        placeholder: "Select author",
        rules: [{ required: true, message: "Please select author" }],
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
      publishedDate: values.publishedDate?.toISOString().substring(0, 10),
    };

    // console.log("variables", variables);
    mutateFunction({ variables: { ...variables } });
    addError.current = error;
    if (!addError.current) {
      toast({
        title: `Book ${values.title} has been added`,
        description: "Thanks for your contibution!",
      });
      setOpen(false);
    }
  };

  useEffect(() => {
    addError.current = null;
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
      title="Add new book"
      open={open}
      okText="SAVE"
      onOk={() => formRef.current?.submit()}
      confirmLoading={loading}
      onCancel={handleCancel}
      onClose={handleCancel}
    >
      <FormBuilder
        ref={formRef}
        formDetails={formDetails}
        onSubmit={handleOk}
      />
      {addError.current && <p>{addError.current.message}</p>}
    </Modal>
  );
};
