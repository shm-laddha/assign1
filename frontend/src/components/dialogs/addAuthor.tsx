import React, { useEffect, useMemo, useRef } from "react";
import { Modal } from "antd";
import { useMutation } from "@apollo/client";
import {
  FormBuilder,
  FormBuilderRef,
  FormField,
} from "@/components/formBuilder";
import {
  ADD_AUTHOR_MUTATION,
  GET_AUTHOR_LIST_QUERY,
  GET_AUTHOR_NAMES,
} from "@/lib/api/authors";
import { useToast } from "@/hooks/use-toast";

export interface AddAuthorProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onComplete: () => void;
}

export const AddAuthorDialog: React.FC<AddAuthorProps> = ({
  open,
  setOpen,
  onComplete,
}) => {
  const { toast } = useToast();
  const formRef = useRef<FormBuilderRef>(null);
  const addError = useRef<any>(null);

  let [mutateFunction, { data, loading, error }] = useMutation(
    ADD_AUTHOR_MUTATION,
    {
      refetchQueries: [GET_AUTHOR_LIST_QUERY, GET_AUTHOR_NAMES],
    }
  );

  const formDetails: FormField[] = [
    {
      type: "textarea",
      name: "name",
      label: "Name",
      placeholder: "Enter author's name",
      rules: [{ required: true, message: "Please enter author's name" }],
    },
    {
      type: "textarea",
      name: "biography",
      label: "Biography",
      placeholder: "Enter author's biography",
    },
    {
      type: "date",
      name: "bornDate",
      label: "Date of Born",
      placeholder: "Select date of born",
      rules: [{ required: true, message: "Please select date of born" }],
    },
  ];

  formRef.current?.reset();

  const handleOk = (values: any) => {
    const variables = {
      ...values,
      bornDate: values.bornDate?.toISOString().substring(0, 10),
    };

    // console.log("variables", variables);
    mutateFunction({ variables: { ...variables } });
    addError.current = error;
    if (!addError.current) {
      toast({
        title: `Author ${values.name} has been added`,
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
      title="Add new auhtor"
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
