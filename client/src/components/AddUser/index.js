import React, { useState } from "react";
import axios from "axios";
import styles from "./index.module.css";

const AddUser = (props) => {
  const [userData, setUserData] = useState({
    userName: "",
    userEmail: "",
    userPhone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateName = (event) => {
    setUserData((prevState) => ({
      ...prevState,
      userName: event.target.value,
    }));
  };

  const updateEmail = (event) => {
    setUserData((prevState) => ({
      ...prevState,
      userEmail: event.target.value,
    }));
  };

  const updatePhone = (event) => {
    setUserData((prevState) => ({
      ...prevState,
      userPhone: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (
      userData.userName === "" ||
      userData.userPhone === "" ||
      userData.userEmail === ""
    ) {
      alert("Fill All Details");
      return;
    }

    setIsSubmitting(true);
    console.log(userData);
    await axios.post("http://localhost:5000/api/user", userData);
    setUserData({
      userName: "",
      userEmail: "",
      userPhone: "",
    });
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
    alert("Employee Details Added");
  };

  return (
    <div className={styles.addEmployee}>
      <div className={styles.container}>
        <div className={styles.heading}>
          <h3>Add New Employee</h3>
          <button
            className={styles.close_btn}
            onClick={props.handleAddEmployee}
          >
            x
          </button>
        </div>
        <form>
          <label className={styles.form_label} htmlFor="name">
            Name:
          </label>
          <input
            className={styles.input_field}
            type="text"
            onChange={updateName}
            value={userData.userName}
          />
          <label className={styles.form_label} htmlFor="email">
            Email:
          </label>
          <input
            className={styles.input_field}
            type="text"
            onChange={updateEmail}
            value={userData.userEmail}
          />
          <label className={styles.form_label} htmlFor="phone">
            Phone:
          </label>
          <input
            className={styles.input_field}
            type="text"
            onChange={updatePhone}
            value={userData.userPhone}
          />
          <button
            className={`${styles.submit_btn} ${
              isSubmitting ? styles.submit_btn_disabled : ""
            }`}
            type="submit"
            onClick={handleSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
