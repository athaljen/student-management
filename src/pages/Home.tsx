import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState } from "../redux/store";
import { deleteStudent } from "../redux/studentSlice";

const Home: React.FC = () => {
  const [search, setSearch] = useState("");
  const students = useSelector((state: RootState) => state.students.students);
  const dispatch = useDispatch();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value.toLowerCase());
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      dispatch(deleteStudent(id));
    }
  };

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(search) ||
      (student.email && student.email.toLowerCase().includes(search))
  );

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-3">Student Management System</h2>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          className="form-control w-50"
          placeholder="Search by name or email"
          value={search}
          onChange={handleSearchChange}
        />
        <Link to="/add" className="btn btn-primary">
          Add Student
        </Link>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Roll</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.roll}</td>
                <td>{student.name}</td>
                <td>{student.dob}</td>
                <td>{student.email || "N/A"}</td>
                <td>{student.phone || "N/A"}</td>
                <td>{student.address || "N/A"}</td>
                <td>
                  <div className="d-flex gap-2">
                    <Link
                      to={`/update/${student.id}`}
                      className="btn btn-warning btn-sm"
                    >
                      Update
                    </Link>
                    <button
                      onClick={() => handleDelete(student.id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center text-muted">
                No Students Available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
