import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  addStudent,
  Student,
  studentSelector,
  updateStudent,
} from "../redux/studentSlice";
import { v4 as uuidv4 } from "uuid";

/// Validation Schema
const validationSchema = Yup.object({
  roll: Yup.number().required("Roll number is required").integer().min(1),
  name: Yup.string()
    .required("Name is required")
    .min(5, "Name must be at least 5 characters")
    .max(50, "Name must be at most 50 characters"),
  dob: Yup.date()
    .required("Date of birth is required")
    .max(new Date(), "Date of birth cannot be a future date"),
  email: Yup.string().email("Invalid email address"),
  phone: Yup.string().matches(
    /^[0-9]{10}$/,
    "Phone number must be exactly 10 digits"
  ),
  address: Yup.string().min(10, "Address must be at least 10 characters"),
});

interface FormValues extends Student {}

const Form: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const students = useSelector(studentSelector);
  const existingStudent = students.find((student) => student.id === id);

  const formik = useFormik<FormValues>({
    initialValues: {
      id: "",
      roll: 0,
      name: "",
      dob: "",
      email: "",
      phone: "",
      address: "",
    },
    validationSchema,
    onSubmit: (values: Student) => {
      //existing
      const existingRoll = students.find(
        (student) => student.roll === values.roll && student.id !== id
      );
      if (existingRoll) {
        formik.setErrors({ roll: "Roll number already exists" });
        return;
      }
      const existingEmail = students.find(
        (student) => student.email === values.email && student.id !== id
      );
      if (existingEmail) {
        formik.setErrors({ email: "Email already exists" });
        return;
      }

      if (id) {
        dispatch(updateStudent({ id, updatedData: values }));
      } else {
        const newId = uuidv4();
        dispatch(addStudent({ ...values, id: newId }));
      }
      navigate("/");
    },
  });

  useEffect(() => {
    if (id && existingStudent) {
      formik.setValues(existingStudent);
      document.title = `Update Student - ${existingStudent.name}`;
    } else document.title = "Add Student";
  }, [id, existingStudent]);

  return (
    <div className="container mt-4">
      <h2>{id ? "Update Student" : "Add Student"}</h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          {/* Roll Number */}
          <div className="col-md-6 mb-3">
            <label htmlFor="roll" className="form-label">
              Roll Number
            </label>
            <input
              type="number"
              id="roll"
              name="roll"
              className={`form-control ${
                formik.touched.roll && formik.errors.roll ? "is-invalid" : ""
              }`}
              value={formik.values.roll}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.roll && formik.errors.roll && (
              <div className="invalid-feedback">{formik.errors.roll}</div>
            )}
          </div>

          {/* Name */}
          <div className="col-md-6 mb-3">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className={`form-control ${
                formik.touched.name && formik.errors.name ? "is-invalid" : ""
              }`}
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.name && formik.errors.name && (
              <div className="invalid-feedback">{formik.errors.name}</div>
            )}
          </div>
        </div>

        <div className="row">
          {/* Date of Birth */}
          <div className="col-md-6 mb-3">
            <label htmlFor="dob" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              id="dob"
              name="dob"
              className={`form-control ${
                formik.touched.dob && formik.errors.dob ? "is-invalid" : ""
              }`}
              value={formik.values.dob}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.dob && formik.errors.dob && (
              <div className="invalid-feedback">{formik.errors.dob}</div>
            )}
          </div>

          {/* Email */}
          <div className="col-md-6 mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${
                formik.touched.email && formik.errors.email ? "is-invalid" : ""
              }`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>
        </div>

        <div className="row">
          {/* Phone */}
          <div className="col-md-6 mb-3">
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              name="phone"
              className={`form-control ${
                formik.touched.phone && formik.errors.phone ? "is-invalid" : ""
              }`}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="invalid-feedback">{formik.errors.phone}</div>
            )}
          </div>

          {/* Address */}
          <div className="col-md-6 mb-3">
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <textarea
              id="address"
              name="address"
              className={`form-control ${
                formik.touched.address && formik.errors.address
                  ? "is-invalid"
                  : ""
              }`}
              value={formik.values.address}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.address && formik.errors.address && (
              <div className="invalid-feedback">{formik.errors.address}</div>
            )}
          </div>
        </div>
        <Link to={`/`} className="btn btn-danger me-3">
          Cancel
        </Link>
        <button type="submit" className="btn btn-success">
          {id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default Form;
