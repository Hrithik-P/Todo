import React from "react";
import {
  FormProvider,
  useFieldArray,
  useForm,
} from "react-hook-form";
import {
  Button,
  Col,
  Form,
  Row,
} from "reactstrap";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import InputField from "./InputField";
import RadioField from "./RadioField";
import { object, array, string } from "yup";

function UserDetailsForm() {
  const formSchema = {
    radio: Yup.string().required(),
    email: Yup.string().when('radio', {
      is: true,
      then: () => Yup.string(),
      otherwise: () => Yup.string().email('Please enter a valid email format!').required('Email is required, please!'),
    }),
    name: Yup.string().when('radio', {
      is: true,
      then: () => Yup.string(),
      otherwise: () => Yup.string().required('Name is required please !'),
    }),
    phone: Yup.string()
      .when('radio', {
        is: true,
        then: () => Yup.string(),
        otherwise: () => Yup.string().min(10, "Phone Should contain Min 10 characters").max(10, "Phone Should contain Max 10 characters").required('Phone is required please !'),
      }),
  };


  const schema = object({
    list: array().of(object().shape(formSchema)),
  });

  const methods = useForm({
    defaultValues: {
      list: [
        {
          name: "",
          email: "",
          phone: "",
          radio: false,
        },
      ],
    },
    resolver: yupResolver(schema),
  });
  const { control, formState: {errors},setValue } = methods;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "list",
  });
  
  
  const onSubmit = (data) => console.log(data);

  const handleRadio = (i) => {
    setValue(`list[${i}].radio`,true);
    fields.forEach((field,index) => {
      if(index !== i){
        setValue(`list[${index}].radio`,false);
      }
  })
  };

  const addMore = () => {
    append({
      name: "",
      email: "",
      phone: "",
      radio: false,
    });
  };

  return (
    <div className="p-5">
      <FormProvider {...methods}>
        <Form onSubmit={methods.handleSubmit(onSubmit)}>
          {fields.map((field, index) => (
            <Row key={field.id} className="d-flex align-items-center">
              <Col md={1}>
                <RadioField name={`list.radio`} currentValue={field.radio} index={index} handleRadio={handleRadio}/>
              </Col>
              <Col md={3}>
                <InputField
                  label="Name"
                  type={"text"}
                 
                  placeHolder={"Enter Your Name"}
                  name={`list.${index}.name`}
                />
              </Col>
              <Col md={3}>
                <InputField
                  label="Phone"
                  type={"tel"}
                 
                  placeHolder={"Enter Your Phone Number"}
                  name={`list.${index}.phone`}
                />
              </Col>
              <Col md={3}>
                <InputField
                  label="Email"
                 
                  type={"email"}
                  placeHolder={"Enter Your Email"}
                  name={`list.${index}.email`}
                />
              </Col>
              <Col md={1}>
                {fields.length > 1 && (
                  <Button color="danger" outline onClick={() => remove(index)}>
                    Remove
                  </Button>
                )}
              </Col>
            </Row>
          ))}

          <div className="d-flex justify-content-end">
            <Button color="dark" outline onClick={() => addMore()}>
              Add More
            </Button>
          </div>
          <div>
            <Button color="primary" type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </FormProvider>
    </div>
  );
}

export default UserDetailsForm;
