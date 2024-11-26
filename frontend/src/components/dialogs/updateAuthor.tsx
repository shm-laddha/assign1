import React, { useEffect, useRef } from "react";
import { Modal } from "antd";
import { useMutation } from "@apollo/client";
import {
  FormBuilder,
  FormBuilderRef,
  FormField,
} from "@/components/formBuilder";
import {
  GET_AUTHOR_LIST_QUERY,
  GET_AUTHOR_NAMES,
  UPDATE_AUTHOR_MUTATION,
} from "@/lib/api/authors";
import { useToast } from "@/hooks/use-toast";

export interface UpdateAuthorProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onComplete: () => void;
  author: {
    id: string;
    name?: string;
    biography?: string;
    bornDate?: string;
  };
}

export const UpdateAuthorDialog: React.FC<UpdateAuthorProps> = ({
  open,
  setOpen,
  onComplete,
  author,
}) => {
  const { toast } = useToast();
  const formRef = useRef<FormBuilderRef>(null);
  const updateError = useRef<any>(null);

  const [mutateFunction, { data, loading, error }] = useMutation(
    UPDATE_AUTHOR_MUTATION,
    {
      refetchQueries: [GET_AUTHOR_NAMES, GET_AUTHOR_LIST_QUERY],
    }
  );

  const formDetails: FormField[] = [
    {
      type: "textarea",
      name: "name",
      label: "Name",
      placeholder: "Enter author's name",
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
    },
  ];

  formRef.current?.reset();

  const handleOk = (values: any) => {
    const variables = {
      ...values,
      bornDate: values.bornDate?.toISOString(),
    };

    mutateFunction({ variables: { updateAuthorId: author.id, ...variables } });
    updateError.current = error;

    if (!updateError.current) {
      toast({
        title: `You provided an update for ${author.name}`,
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
      title="Edit author detail"
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
          ...author,
          bornDate: author.bornDate
            ? author.bornDate.substring(0, 10)
            : undefined,
        }}
      />
      {updateError.current && <p>{updateError.current.message}</p>}
    </Modal>
  );
};
