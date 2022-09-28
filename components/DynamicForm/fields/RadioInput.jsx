import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { Col, Form, Row } from "react-bootstrap";
import { Controller, useFormContext } from "react-hook-form";

export default function RadioInput({ field, ThemeTextField }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <Col xs={12}>
      <Form.Group controlId={field?.name}>
        <Row>
          <Col xs={12}>
            <Controller
              name={field?.name}
              control={control}
              rules={{ required: true }}
              defaultValue={field?.defaultValue}
              render={({
                field: { onChange, onBlur, value, ref },
                fieldState: { error },
              }) => (
                <FormControl>
                  <FormLabel
                    id="demo-radio-buttons-group-label"
                    style={{ color: "white" }}
                  >
                    {field?.title}
                  </FormLabel>
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="female"
                    name="radio-buttons-group"
                    value={value}
                    onChange={onChange}
                  >
                    {field?.options &&
                      field?.options.map(({ value, label }, index) => (
                        <FormControlLabel
                          key={index}
                          value={value || index + 1}
                          control={<Radio className="text-white" />}
                          label={label || ""}
                        />
                      ))}
                  </RadioGroup>
                </FormControl>
              )}
            />
          </Col>
          <Col xs={12}>
            {errors[field?.name] && (
              <p className="text-danger" role="alert">
                {errors &&
                  errors[field?.name] &&
                  errors[field?.name] &&
                  errors[field?.name].message}
              </p>
            )}
          </Col>
        </Row>
      </Form.Group>
    </Col>
  );
}
