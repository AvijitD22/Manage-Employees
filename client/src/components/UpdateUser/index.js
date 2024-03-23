import React, { useState } from "react";
import axios from "axios";
import styles from "./index.module.css";

const UpdateUser = (props) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const employee = props.employeeDetails;

  const handleName = (event) => {
    setUserName(event.target.value);
  };

  const handleEmail = (event) => {
    setUserEmail(event.target.value);
  };

  const handlePhone = (event) => {
    setUserPhone(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(employee._id);
    await axios
      .put("http://localhost:5000/api/user", {
        employeeId: employee._id,
        userName: userName,
        userEmail: userEmail,
        userPhone: userPhone,
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
    setUserName("");
    setUserEmail("");
    setUserPhone("");
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
    alert("Details Updated.");
  };

  return (
    <div className={styles.updateEmployee}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h3>Update Employee Details</h3>
          <button className={styles.close_btn} onClick={props.handleUpdate}>
            x
          </button>
        </div>
        <h4>Old Details</h4>
        <p>Name: {employee.userName}</p>
        <p>Email: {employee.userEmail}</p>
        <p>Phone: {employee.userPhone}</p>
        <hr />
        <h3>Enter New Details:</h3>
        <form action="">
          <label htmlFor="" className={styles.form_label}>
            Name
          </label>
          <input
            className={styles.input_field}
            type="text"
            value={userName}
            onChange={handleName}
          />
          <label htmlFor="" className={styles.form_label}>
            Email
          </label>
          <input
            className={styles.input_field}
            type="text"
            value={userEmail}
            onChange={handleEmail}
          />
          <label htmlFor="" className={styles.form_label}>
            Phone
          </label>
          <input
            className={styles.input_field}
            type="text"
            value={userPhone}
            onChange={handlePhone}
          />
          <button
            className={`${styles.submit_btn} ${
              isSubmitting ? styles.submit_btn_disabled : ""
            }`}
            type="submit"
            onClick={handleSubmit}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;
