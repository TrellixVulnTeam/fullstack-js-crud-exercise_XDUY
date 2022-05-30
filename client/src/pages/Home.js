import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./Home.css";
import {toast} from "react-toastify";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    const response = await axios.get("http://localhost:5000/employees");
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteEmployee = (id) => {
    if(window.confirm("Are you sure you want to delete this employee?")) {
      axios.delete(`http://localhost:5000/employees/${id}`);
      toast.success("Employee Deleted Successfully");
      setTimeout(() => loadData(), 500);
    }
  }
  return (
    <div style={{marginTop: "150px"}}>
      <Link to="/add-employee">
        <button className="btn btn-add">Add Employee</button>
      </Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{textAlign: "center"}}>Name</th>
            <th style={{textAlign: "center"}}>Code</th>
            <th style={{textAlign: "center"}}>Profession</th>
            <th style={{textAlign: "center"}}>Color</th>
            <th style={{textAlign: "center"}}>City</th>
            <th style={{textAlign: "center"}}>Branch</th>
            <th style={{textAlign: "center"}}>Active</th>
            <th style={{textAlign: "center"}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.code}</td>
                <td>{item.profession}</td>
                <td>{item.color}</td>
                <td>{item.city}</td>
                <td>{item.branch}</td>
                <td>{item.active}</td>
                <td>
                  <Link to={`/update-employee/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button className="btn btn-delete" onClick={() => deleteEmployee(item.id)}>Delete</button>
                  <Link to={`/view-employee/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default Home