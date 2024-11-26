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
  GET_BOOK_DETAIL_QUERY,
  GET_BOOK_LIST_QUERY,
  GET_BOOKS_BY_AUTHOR_ID,
} from "@/lib/api/books";
import {
  ADD_BOOK_REVIEW_MUTATION,
  GET_BOOK_REVIEWS_QUERY,
} from "@/lib/api/reviews";
import { useToast } from "@/hooks/use-toast";

export interface AddReviewProps {
  bookId: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onComplete: () => void;
}

export const AddReviewDialog: React.FC<AddReviewProps> = ({
  bookId,
  open,
  setOpen,
  onComplete,
}) => {
  const { toast } = useToast();
  const formRef = useRef<FormBuilderRef>(null);
  const writeError = useRef<any>(null);

  const [mutateFunction, { data, loading, error }] = useMutation(
    ADD_BOOK_REVIEW_MUTATION,
    {
      refetchQueries: [GET_BOOK_REVIEWS_QUERY, GET_BOOK_DETAIL_QUERY],
    }
  );

  const formDetails: FormField[] = [
    {
      type: "textarea",
      name: "reviewerName",
      label: "Your Name",
      placeholder: "Enter your name",
      rules: [{ required: true, message: "Please enter your name" }],
    },
    {
      type: "textarea",
      name: "title",
      label: "title",
      placeholder: "Write your review's title",
    },
    {
      type: "textarea",
      name: "content",
      label: "Review",
      placeholder: "Write your review",
    },
    {
      type: "rating",
      name: "rating",
      label: "Rating",
      rules: [{ required: true, message: "Please give a rating" }],
    },
  ];

  formRef.current?.reset();

  const handleOk = (values: any) => {
    const variables = {
      ...values,
      bookId,
    };

    // console.log("variables", variables);
    mutateFunction({ variables: { ...variables } });
    writeError.current = error;
    if (!writeError.current) {
      toast({
        title: `You just reviewed a book`,
        description: "Thanks for your contibution!",
      });
      setOpen(false);
    }
  };

  useEffect(() => {
    writeError.current = null;
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
      title="Write your review"
      open={open}
      okText="REVIEW"
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
      {writeError.current && <p>{writeError.current.message}</p>}
    </Modal>
  );
};
