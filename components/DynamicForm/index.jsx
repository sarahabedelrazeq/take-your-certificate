import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TransitionInput from "./fields/TransitionInput";
import AutocompleteInput from "./fields/AutocompleteInput";
import Input from "./fields/Input";
import ThemeTextField from "./fields/ThemeTextField";
import RadioInput from "./fields/RadioInput";

function DynamicForm({ fields, defaultValues, schema, onSubmit, submitText }) {
  const methods = useForm({
    defaultValues: defaultValues ? { ...defaultValues } : {},
    resolver: yupResolver(schema),
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  console.log("errors", errors);
  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="g-4 align-items-center">
          {Object.values(fields)?.map((field, index) =>
            field.component === "transition-input" ? (
              <TransitionInput
                key={index}
                field={field}
                ThemeTextField={ThemeTextField}
              />
            ) : field.component === "autocomplete" ? (
              <AutocompleteInput
                key={index}
                field={field}
                ThemeTextField={ThemeTextField}
              />
            ) : field.component === "radio" ? (
              <RadioInput
                key={index}
                field={field}
                ThemeTextField={ThemeTextField}
              />
            ) : (
              <Input
                key={index}
                field={field}
                ThemeTextField={ThemeTextField}
              />
            )
          )}
          <Col sm={6} xs={12}>
            <Button variant="primary" type="submit" className="text-white">
              {submitText ? submitText : "submit"}
            </Button>
          </Col>
        </Row>
      </Form>
    </FormProvider>
  );
}

export default React.memo(DynamicForm);
