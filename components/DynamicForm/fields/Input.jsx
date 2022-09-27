import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";

export default function Input({ field, ThemeTextField }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Col sm={6} xs={12}>
      <Form.Group controlId={field?.name}>
        <Row>
          <Col xs={12}>
            <Controller
              name={field?.name}
              control={control}
              rules={{ required: true }}
              defaultValue={field?.defaultValue ? field?.defaultValue : ""}
              render={({
                field: { onChange, onBlur, value, ref },
                fieldState: { error },
              }) => (
                <>
                  <ThemeTextField
                    onBlur={onBlur}
                    onChange={onChange}
                    value={value}
                    ref={ref}
                    id={field?.name}
                    helperText={errors[field?.name]?.message}
                    name={field?.name}
                    type={field?.type || "text"}
                    placeholder={field?.placeholder || field.title}
                    label={field?.title}
                    aria-invalid={error?.message ? "true" : "false"}
                  />
                </>
              )}
            />
          </Col>
        </Row>
      </Form.Group>
    </Col>
  );
}
