import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import "../App.css";
import { NavLink } from "react-router-dom";

// creating initialValues for formik
const initialValues = {
  fullName: "",
  cnic: "",
  course:"",
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
  if (!values.cnic) {
    errors.cnic = "Required";
  } 
  if (!values.course) {
    errors.course = "Required";
  } 
  // else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.cnic)) {
  //   errors.cnic = "Invalid Email Format";
  // }
  if (!values.checkbox) {
    errors.checkbox = "Required";
  }
  return errors;
};

// ____________________________Main Function_______________________________________

const Update = () => {
  const [id, setID] = useState(null);
  const [fullName, setfullName] = useState();
  const [cnic, setCnic] = useState();
  const [course, setCourse]=useState();
  const [checkbox, setCheckbox] = useState();

  // Post Data on Onsubmit  usin axios
  const onSubmit = (values, { resetForm }) => {
    try {
      axios.put(
        `https://65aa006b081bd82e1d95d7eb.mockapi.io/fakeData/${id}`,
        values
      );
      resetForm();

      // Clear local state values
      setfullName("");
      setCnic("");
      setCourse("")
      setCheckbox(false);

      // Clear local storage values
      localStorage.removeItem('ID');
      localStorage.removeItem('Full Name');
      localStorage.removeItem('cnic');
      localStorage.removeItem('course');
      localStorage.removeItem('Checkbox Value');

    } catch (error) {
      console.error("Error submitting form:", error);
    }

    alert("Update  succefully");
  };

  // ___________________first time getting data into input fields from localStorage

  useEffect(() => {
    setID(localStorage.getItem("ID"));
    setfullName(localStorage.getItem("Full Name"));
    setCnic(localStorage.getItem("cnic"));
    setCourse(localStorage.getItem("course"));
    setCheckbox(localStorage.getItem("Checkbox Value"));
  }, []);

  // const handleEmpty = () => {
  //   setfullName("");
  //   setCnic("");
  //   setCourse("")
  //   setCheckbox(false);
  // };
  // useEffect(() => {}, [handleEmpty]);

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate,
  });

  return (
    <>
    <div className="mb-3">
      <h1 className=" font-serif py-2 px-16 bg-orange-600">Update Data</h1>
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
            value={formik.values.fullName || fullName}
          />
          {formik.touched.fullName && formik.errors.fullName ? (
            <div className="error">{formik.errors.fullName}</div>
          ) : null}
        </div>

        <div className="form-control">
          <label htmlFor="cnic">Nationa Identity "CNIC" </label>
          <input
            type="text"
            name="cnic"
            id="cnic"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
             value={formik.values.cnic || cnic}
          />
          {formik.touched.cnic && formik.errors.cnic ? (
            <div className="error">{formik.errors.cnic}</div>
          ) : null}
        </div>

        <div className="form-control">
          <label htmlFor="course">Course </label>
          <input
            type="text"
            name="course"
            id="course"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
             value={formik.values.course || course}
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
            value={formik.values.checkbox || checkbox}
          />

          <label className="labelTerm" htmlFor="checkbox">
            I Agree To The Terms & Conditions
          </label>
        </div>

       <div className="flex justify-between">
       <button
          // onClick={handleEmpty}
          className="py-3 px-8 bg-orange-600 rounded-lg hover:bg-orange-500"
          type="submit"
        >
          Update
        </button>
        <NavLink  to="/DashBoard">
        <button
        
        className="py-3 px-8 bg-orange-600 rounded-lg hover:bg-orange-500"
        
      >
        DashBoard
      </button>
        </NavLink>
       </div>
      </form>
    </>
  );
};

export default Update;
