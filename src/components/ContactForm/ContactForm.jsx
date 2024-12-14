import { useId } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { addContact } from "../../redux/contactsSlice";
import { useDispatch } from "react-redux";

import css from "./ContactForm.module.css";

const ContactFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

const initialValues = {
  name: "",
  number: "",
};

export default function ContactForm() {
  const dispatch = useDispatch();
  const nameFieldId = useId();
  const numberFieldId = useId();
  const handleSubmit = (values, actions) => {
    dispatch(addContact(values.name, values.number));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactFormSchema}
    >
      <Form className={css.form}>
        <label className={css.label} htmlFor={nameFieldId}>
          Name
          <Field
            id={nameFieldId}
            className={css.field}
            type="text"
            name="name"
          />
          <ErrorMessage className={css.error} name="name" component="span" />
        </label>
        <label className={css.label} htmlFor={numberFieldId}>
          Number
          <Field
            id={numberFieldId}
            className={css.field}
            type="tel"
            name="number"
          />
          <ErrorMessage className={css.error} name="number" component="span" />
        </label>
        <button className={css.btn} type="submit" onSubmit={handleSubmit}>
          Add contact
        </button>
      </Form>
    </Formik>
  );
}
