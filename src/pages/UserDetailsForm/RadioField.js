import React from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FormGroup, Input } from "reactstrap";

function RadioField({ name }) {
  const { register } = useFormContext();
  return (
    <FormGroup>
      <input
        {...register(name, { required: true })}
        type="radio"
        value="true"
      />
    </FormGroup>
  );
}

export default RadioField;
