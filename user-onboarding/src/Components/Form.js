import React, {useState, useEffect} from "react";
import axios from "axios"
import {Form, Field, withFormik} from "formik"
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core/styles';

import UserCard from "./user.js";

const useStyles = makeStyles({
    mainContainer: {
      margin: "30px"
    },
    formContainer: {
        display: "flex",
        width: "500px",
        flexDirection: "column",
        margin: "auto",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#fffd9d"
        },
    title: {
      fontSize: "2rem",
      textDecoration: "underline #00a388",
      color: "#ff6138"
    },
    field: {
      width: "50%",
      margin: "10px",
      height: "20px",
      borderRadius: "5px",
      backgroundColor: "#bdeb9f"
    },
    checkbox: {
        display: "flex",
        flexDirection: "row",
        
        margin: "10px 230px 10px 0px",
    },
    error: {
        color: "red",
        fontSize: ".75rem",
        marginTop: "0",
        marginBottom: "10px"
        
    },
    errorCheckbox: {
        color: "red",
        fontSize: ".75rem",
        marginTop: "-23px",
        marginBottom: "20px",
        
    },
    TOS: {
        color: "#00a388",
        fontSize: ".9rem"
    },
    button: {
        width: "80px",
        padding: "5px 10px",
        backgroundColor: "#bdeb9f",
        border: "2px solid #7abd8f",
        borderRadius: "10px"
    },
    userCards: {
        display: "flex",
        flexFlow: "row wrap",
        margin: "10px",
    },
    dropDown: {
        margin: "10px",
    }

  });




const UserForm = ({ errors, touched, checkbox, status }) => {
    const classes = useStyles();


    const [users, setUsers] = useState([{name: "Seth", email:"seth.nadu@gmail.com", createdAt: "placeholder", role: "Front End"}]);
    
    const emailsUsed = [];
    users.map(user =>  emailsUsed.push(user.email))

    useEffect(() => {
        if(status) {
            setUsers([...users, status])
        }
    }, [status])
    console.log(users)
    return (
        <div className={classes.mainContainer}>
          <div >
           
          <Form className={classes.formContainer}>
           <h2 className={classes.title}>User Signup</h2>      
              <Field className={classes.field} type = "text" name = "name" placeholder = "Name" />
              {touched.name && errors.name && <p className={classes.error}>{errors.name}</p>}
              <Field className={classes.field} type = "email" name = "email" placeholder = "Email" />
              {touched.email && errors.email && <p className={classes.error}>{errors.email}</p>}
              <Field className={classes.field} type = "password" name = "password" placeholder = "Password" />
              {touched.password && errors.password && <p className={classes.error}>{errors.password}</p>}
              <Field className={classes.dropDown} name="role" component="select">
                  <option>Please Choose a Role</option>
                  <option value = "Back End">Back End</option>
                  <option value = "Front End">Front End</option>
                  <option value = "Team Lead">Team Lead</option>
                  <option value = "UI Developer">UI Developer</option>
                  <option value = "UX Designer">UX Designer</option>
              </Field>
              {touched.role && errors.role && <p className={classes.error}>{errors.role}</p>}

              <label className={classes.TOS}>
              Accept Terms and Conditions
              <Field className={classes.checkbox} type="checkbox" name="TOS" checked ={checkbox}/>
              </label>
              {touched.TOS && errors.TOS && <span className={classes.errorCheckbox}>{errors.TOS}</span>}
              <button className={classes.button} type="submit">Submit</button>
          </Form>
          </div>
           <h2 className={classes.title}>Users</h2> 
          <div className={classes.userCards}>
          {users.map(user => {
             return <UserCard key={user.id} user={user} />
          })}
          </div>

    
        </div>
    )
}

const FormikUserForm = withFormik({
    mapPropsToValues({name, email, password, TOS, role}, userEmail){
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            TOS: TOS || false, 
            role: role || ''

     }
    },

    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required("Name is Required"),
        email: Yup.string()
            .email("Needs to be an Email")
            .required("Email is Required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is Required"),
        TOS: Yup.boolean()
            .oneOf([true], "Must Accept Terms and Conditions")
            .required(),
        role: Yup.string()
            .required("Role is Required")
            
    }),

    handleSubmit(values, {resetForm, setStatus, setErrors, setSubmitting}) {
        console.log(values)
        setTimeout(() => {
            if(values.email === "seth.nadu@gmail.com") {
                setErrors({email: "That email is already taken"})
                
            } else {
                axios 
                    .post('https://reqres.in/api/users/', values)
                    .then(res => setStatus(res.data))
                    .catch(err => console.log(err.response))
                resetForm();
            }
            setSubmitting(false)
        }, 2000)
        
        }
    
})(UserForm);


export default FormikUserForm;