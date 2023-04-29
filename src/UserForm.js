import React, { useEffect, useState } from "react";
// using formik for user form
import { Formik, Form, ErrorMessage } from "formik";
// yup for form validation
import * as Yup from "yup";
//react-toastify using for display message
import { toast } from "react-toastify";

import { v4 as uuidv4 } from "uuid";

//Using Functional Component
const UserForm = ({
  onSave,
  isEdit,
  selectedUser,
  initialValues,
  users,
  setUsers,
  setIsEdit,
  setSelectedUser,
  setInitialValues,
  setLoading,
}) => {
  //userInput validation using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("Required"),
    email: Yup.string().email("Invalid email format").required("Required"),
  });

  //form submit function
  const handleSubmit = (values, { resetForm, setSubmitting }) => {
    setSubmitting(true);
    setLoading(true);
    const newUser = {
      id: uuidv4(),
      name: values.name,
      email: values.email,
    };
    if (isEdit) {
      const updatedUsers = users.map((user) =>
        user.id === selectedUser.id ? { ...user, ...newUser } : user
      );
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setSubmitting(false);
      setLoading(false);
      toast.success("User details have been updated");
    } else {
      if (users && users.length > 0) {
        setUsers([...users, newUser]);
        localStorage.setItem("users", JSON.stringify([...users, newUser]));
      } else {
        setUsers([newUser]);
        localStorage.setItem("users", JSON.stringify([newUser]));
      }
      setSubmitting(false);
      setLoading(false);
      toast.success("User details have been saved");
    }
    setIsEdit(false);
    setSelectedUser(null);
    setInitialValues({ name: "", email: "" });
    resetForm();
  };

  const handleClear = (resetForm) => {
    resetForm();
    setInitialValues({
      name: "",
      email: "",
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
      enableReinitialize={true}
    >
      {({ values, isSubmitting, handleChange, resetForm }) => (
        <Form>
          <label htmlFor="name" className="label-name">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            className="input-name"
            required
          />
          <label htmlFor="email" className="label-email">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={values.email}
            onChange={handleChange}
            className="input-email"
            required
          />
          <button type="submit" disabled={isSubmitting} className="submitbtn">
            Submit
          </button>
          <button
            type="reset"
            className="clearbtn"
            onClick={() => handleClear(resetForm)}
          >
            Clear
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default UserForm;
