import React, { useEffect, useState } from "react";
import axios from "axios";
import AddUser from "../AddUser/index";
import UpdateUser from "../UpdateUser/index";
import styles from "./index.module.css";

const ViewUser = () => {
  const [employees, setEmployees] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [showUpdate, setShowUpdate] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [updateEmployeeDetails, setUpdateEmployeeDetails] = useState("");
  const [selectedOption, setSelectedOption] = useState("default");

  const sortArray = (field) => {
    const sortedArray = [...employees].sort((a, b) => {
      if (field === "default") {
        getEmployeeData();
        return 0;
      } else if (field === "userPhone") {
        const phoneA = parseInt(a[field]);
        const phoneB = parseInt(b[field]);
        return phoneA - phoneB;
      } else {
        const fieldA = a[field].toLowerCase();
        const fieldB = b[field].toLowerCase();
        if (fieldA < fieldB) {
          return -1;
        }
        if (fieldA > fieldB) {
          return 1;
        }
        return 0;
      }
    });
    setEmployees(sortedArray);
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue); // Update the state first
    sortArray(selectedValue); // Then call sortArray with the updated value
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleDelete = (userId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this employee?"
    );
    if (confirmDelete) {
      axios
        .delete("http://localhost:5000/api/user", {
          data: { employeeId: userId },
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
  };

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setCheckedItems((prevItems) => [...prevItems, value]);
    } else {
      setCheckedItems((prevItems) =>
        prevItems.filter((item) => item !== value)
      );
    }
  };

  const handleSelectedEmployee = () => {
    for (let i = 0; i < checkedItems.length; i++) {
      axios
        .delete("http://localhost:5000/api/user", {
          data: { employeeId: checkedItems[i] },
        })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.error(error);
        });
    }
    alert("Employees Deleted");
  };

  const handleAddEmployee = () => {
    setShowAddEmployee(!showAddEmployee);
  };

  const handleUpdate = (event) => {
    setShowUpdate(!showUpdate);
    const { value } = event.target;

    const userDetails = employees?.find((employee) => employee._id === value);
    console.log(userDetails);
    setUpdateEmployeeDetails(userDetails);
  };

  const getEmployeeData = () => {
    axios
      .get("http://localhost:5000/api/user")
      .then(function (response) {
        setEmployees(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getEmployeeData();
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <h2>Manage Employees</h2>
        <div>
          <label className={styles.label} htmlFor="">
            Sort by:
          </label>
          <select
            className={styles.select}
            name=""
            id=""
            value={selectedOption}
            onChange={handleSelectChange}
          >
            <option value="default">Default</option>
            <option value="userName">Name</option>
            <option value="userEmail">Email</option>
            <option value="userPhone">Phone</option>
          </select>
          <button className={styles.add_button} onClick={handleAddEmployee}>
            Add Employee
          </button>
          <button
            className={styles.delete_button}
            onClick={handleSelectedEmployee}
          >
            Delete
          </button>
          <button className={styles.refresh_button} onClick={getEmployeeData}>
            Refresh
          </button>
        </div>
      </div>
      {showAddEmployee ? (
        <AddUser handleAddEmployee={handleAddEmployee} />
      ) : null}
      {showUpdate ? (
        <UpdateUser
          employeeDetails={updateEmployeeDetails}
          handleUpdate={handleUpdate}
        />
      ) : null}
      {employees.length === 0 ? (
        "No Data Available"
      ) : (
        <table className={styles.employee_table}>
          <tbody>
            <tr>
              <th>Select</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
            {employees?.map((employee, index) => {
              return (
                <tr key={employee?._id}>
                  <td>
                    <input
                      type="checkbox"
                      name=""
                      id=""
                      value={employee?._id}
                      onChange={handleCheckboxChange}
                    />
                  </td>
                  <td>{employee?.userName}</td>
                  <td>{employee?.userEmail}</td>
                  <td>{employee?.userPhone}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(employee._id)}
                      className={styles.delete_button}
                    >
                      Delete
                    </button>
                    <button
                      value={employee?._id}
                      onClick={handleUpdate}
                      className={styles.update_button}
                    >
                      Update
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ViewUser;
