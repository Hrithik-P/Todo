import { ErrorMessage } from "@hookform/error-message";
import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormFeedback, FormGroup, Input, Label } from "reactstrap";

function InputField({ label, type, placeHolder, name, index }) {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  console.log(errors);
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
