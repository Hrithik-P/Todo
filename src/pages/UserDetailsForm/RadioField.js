import React from "react";
import {  useFormContext } from "react-hook-form";


function RadioField({ name, currentValue, index,handleRadio}) {
  const { register } = useFormContext();
  
  return (
   
      <input {...register(name,{required: true})} type="radio" defaultChecked={currentValue === true} onChange={() => handleRadio(index)} />
    
  );
}

export default RadioField;
