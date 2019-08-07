import React, {useState, useEffect} from "react";
import axios from "axios"
import {Form, Field, withFormik} from "formik"
import * as Yup from 'yup';


const UserForm = ({ errors, touched, checkbox, handleSubmit, status }) => {


    return (
        <div>
          <h1>User Signup</h1>
          <Form>
              <Field type = "text" name = "name" placeholder = "Name" />
              {touched.name && errors.name && <p>{errors.name}</p>}
              <Field type = "email" name = "email" placeholder = "Email" />
              {touched.email && errors.email && <p>{errors.email}</p>}
              <Field type = "password" name = "password" placeholder = "Password" />
              {touched.password && errors.password && <p>{errors.password}</p>}
              <Field type="checkbox" name="TOS" checked ={checkbox}/>
              {touched.TOS && errors.TOS && <p>{errors.TOS}</p>}
              <button type="submit">Submit</button>
          </Form>
        </div>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, TOS}){
        console.log({name, email, password, TOS})
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            TOS: TOS || false

     }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required(),
        email: Yup.string()
            .email()
            .required(),
        password: Yup.string()
            .min(8)
            .required(),
        TOS: Yup.boolean()
            .oneOf([true], "Must Accept Terms and Conditions")
            .required()
    }),

    handleSubmit(values, {setStatus}) {
        axios 
            .post('https://reqres.in/api/users/', values)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
})(UserForm);


export default FormikUserForm;