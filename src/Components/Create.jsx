import React, { useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import "../App.css"
import Inputmask from "inputmask";
import { NavLink } from "react-router-dom";

// creating initialValues for formik 
const initialValues = {
  fullName: "",
  cnic:"",
  course: "",
  checkbox: false,
};

// const onSubmit = (values) => {
// //   console.log(`Form Data :`, values);
// };

// creating Validation for all inputs 
const validate = (values) => {
  let errors = {};
  if (!values.fullName) {
    errors.fullName = "Required";
  }
  if(!values.cnic){
    errors.cnic = "Required";
  }
  if (!values.course) {
    errors.course = "Required";
   } 
  // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.course)) {
  //   errors.course = "Invalid course Format";
  // }
  if (!values.checkbox) {
    errors.checkbox = "Required";
  }
  return errors;
};

        // Main Function 

const Create = () => {

    // Post Data on Onsubmit  usin axios
  const onSubmit = (values, { resetForm }) => {
    axios.post(`https://65aa006b081bd82e1d95d7eb.mockapi.io/fakeData`, values);
    try {
        resetForm()
    } catch (error) {
        console.error('Error submitting form:', error);
    }

    alert("Submited Succefully")
  };

  useEffect(() => {

    Inputmask({
      mask: '99999-9999999-9',
      
    }).mask(document.getElementById("cnic"));

  }, []); 

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  
  return (
    <>
    <div className="mb-3">
      <button className=" rounded-sm font-serif py-2 px-6 bg-green-600"><NavLink to="/">Add New Data</NavLink></button>
    </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-control">
          <label htmlFor="fullName">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
          />
          {formik.touched.fullName && formik.errors.fullName ? (
            <div className="error">{formik.errors.fullName}</div>
          ) : null}
        </div>
        <div className="form-control">
          <label htmlFor="cnic">National Identity 'CNIC'</label>
          <input
             placeholder="XXXXX-XXXXXXX-X"  
            type="text"
            id="cnic"
            name="cnic"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.cnic}
          />
          {formik.touched.cnic && formik.errors.cnic ? (
            <div className="error">{formik.errors.cnic}</div>
          ) : null}
        </div>

        <div className="form-control">
          <label htmlFor="course">Course</label>
          <input
            type="text"
            name="course"
            id="course"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.course}
          />
          {formik.touched.course && formik.errors.course ? (
            <div className="error">{formik.errors.course}</div>
          ) : null}
        </div>

        <div className="form-control-checkbox">
          <input
            type="checkbox"
            name="checkbox"
            id="checkbox"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.checkbox}
          />

          <label className="labelTerm" htmlFor="checkbox">
            I Agree To The Terms & Conditions
          </label>
        </div>

        <div className="flex justify-between">
        <button  className="py-3 px-8 bg-orange-600 rounded-lg hover:bg-orange-500" type="submit">Submit</button>
        <NavLink  to="/Dashboard">
        <button
        
        className="py-3 px-8 bg-orange-600 rounded-lg hover:bg-orange-500"
        type="submit"
      >
        DashBoard
      </button>
        </NavLink>
        </div>
      </form>
    </>
  );
};

export default Create;
