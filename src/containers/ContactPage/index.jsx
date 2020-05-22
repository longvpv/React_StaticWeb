import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { Button, FormFeedback, FormGroup, Input, Jumbotron, Label } from "reactstrap";
import InputField from "../../components/CustomFields/InputField";
import RadiosField from "../../components/CustomFields/RadiosField";

Contact.propTypes = {
};

function Contact(props) {

  const initialValues = {
    name: "Long Vu",
    gender: "male",
    age: 26,
    color: "",
    wine: "",
  };

  const handleFormSubmit = (values, formikBag) => {
    console.log("Form submit: ", { values, formikBag });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col" style={{ marginTop: "8rem" }}>
          <Jumbotron style={{backgroundColor:'white'}}>
            <h3 className="display-3" style={{color:'#fe4c50', fontWeight:'bold'}}>Contact</h3>
            <p className="lead">We will call you soon :P</p>
          </Jumbotron>
          <Formik initialValues={initialValues} onSubmit={handleFormSubmit}>
            {(form) => {
              const { values, errors, touched } = form;

              return (
                <Form>
                  <FormGroup>
                    <Label htmlFor="nameControl">Name</Label>
                    <Field
                      id="nameControl"
                      name="name"
                      as={Input}
                      invalid={touched.name && !!errors.name}
                      placeholder="Eg: your name"
                    />

                    <ErrorMessage name="name" component={FormFeedback} />
                  </FormGroup>

                  <Field
                    name="age"
                    component={InputField}
                    label="Age"
                    type="number"
                    placeholder="Eg: your age"
                  />

                  <Field
                    name="gender"
                    component={RadiosField}
                    label="Gender"
                    options={[
                      { value: "male", label: "Male" },
                      { value: "female", label: "Female" },
                    ]}
                  />

                  {values.gender === "male" && (
                    <FormGroup>
                      <Label htmlFor="wine">Favorite wine</Label>
                      <Field
                        id="wine"
                        name="wine"
                        as={Input}
                        invalid={touched.wine && !!errors.wine}
                        placeholder="Eg: your favorite wine"
                      />

                      <ErrorMessage name="wine" component={FormFeedback} />
                    </FormGroup>
                  )}

                  {values.gender === "female" && (
                    <FormGroup>
                      <Label htmlFor="color">Favorite color</Label>
                      <Field
                        id="color"
                        name="color"
                        as={Input}
                        placeholder="Eg: your favorite color"
                      />
                    </FormGroup>
                  )}

                  <Field
                    name="phone"
                    component={InputField}
                    label="Phone number"
                    type="number"
                    placeholder="Your phone number"
                  />

                  <FormGroup>
                    <Button type="submit" color="primary">
                      Submit
                    </Button>
                  </FormGroup>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
}

export default Contact;
