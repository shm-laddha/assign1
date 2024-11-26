import {
  Select,
  FormItemProps,
  Form,
  Input,
  InputNumber,
  DatePicker,
} from "antd";
import { useForm } from "antd/es/form/Form";
import React, { forwardRef } from "react";
import { RatingInput } from "./ui/rating";

const { Option } = Select;

export interface FormField {
  type: "text" | "number" | "dropdown" | "date" | "textarea" | "rating";
  name: string;
  label: string;
  placeholder?: string;
  rules?: FormItemProps["rules"];
  options?: { label: string; value: string | number }[];
}

export interface FormBuilderProps {
  formDetails: FormField[];
  onSubmit: (values: Record<string, any>) => void;
  initialValues?: Record<string, any>;
}

export interface FormBuilderRef {
  submit: () => void;
  reset: () => void;
  setFieldsValue: (values: Record<string, any>) => void;
}

const FormBuilder = forwardRef<FormBuilderRef, FormBuilderProps>(
  function FormBuilderInternal({ formDetails, onSubmit, initialValues }, ref) {
    const [form] = useForm();

    const renderFormElement = (item: FormField) => {
      const { type, name, label, rules, placeholder, options } = item;

      switch (type) {
        case "text":
          return (
            <Form.Item key={name} label={label} name={name} rules={rules}>
              <Input placeholder={placeholder} />
            </Form.Item>
          );
        case "textarea":
          return (
            <Form.Item key={name} label={label} name={name} rules={rules}>
              <Input.TextArea placeholder={placeholder} />
            </Form.Item>
          );
        case "number":
          return (
            <Form.Item key={name} label={label} name={name} rules={rules}>
              <InputNumber
                placeholder={placeholder}
                style={{ width: "100%" }}
              />
            </Form.Item>
          );
        case "dropdown":
          return (
            <Form.Item key={name} label={label} name={name} rules={rules}>
              <Select placeholder={placeholder}>
                {options?.map(({ value, label: optionLabel }) => (
                  <Option key={value} value={value}>
                    {optionLabel}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          );
        case "date":
          return (
            <Form.Item key={name} label={label} name={name} rules={rules}>
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          );
        case "rating":
          return (
            <Form.Item key={name} label={label} name={name} rules={rules}>
              <RatingInput
                initialValue={0}
                onChange={(value) => {
                  form.setFieldsValue({ [name]: value });
                }}
              />
            </Form.Item>
          );
        default:
          return null;
      }
    };

    const onFinish = (values: any) => {
      onSubmit(values);
    };

    React.useImperativeHandle(
      ref,
      () => ({
        submit: () => {
          form.submit();
        },
        reset: () => {
          form.resetFields();
        },
        setFieldsValue: (values: Record<string, any>) => {
          form.setFieldsValue(values);
        },
      }),
      [form]
    );

    return (
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        preserve={false}
        initialValues={initialValues}
      >
        {formDetails.map((item) => renderFormElement(item))}
      </Form>
    );
  }
);

export { FormBuilder };
