import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import {  FormGroup, Input, Label } from "reactstrap";

function InputField({ label, type, placeHolder, name }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  
  return (
    <FormGroup>
      <Label for={`for${label}`}>{label}</Label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <>
              <Input
                id={`for${label}`}
                placeholder={placeHolder}
                type={type}
                {...field}
              />

              <ErrorMessage
                errors={errors}
                name={name}
                render={({ message }) => (
                  <p className="text-danger">{message}</p>
                )}
              />
            </>
          );
        }}
      />
    </FormGroup>
  );
}

export default InputField;
