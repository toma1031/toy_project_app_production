import React, { useEffect } from "react";
import axios from "axios";
import { apiURL } from "./Default";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const PasswordReset = () => {
  const { register, handleSubmit } = useForm();

  useEffect(() => {}, []);

  const ResetPassword = async (data) => {
    await axios
      .post(`${apiURL}api/auth/users/reset_password/`, {
        email: data.email,
      })
      .then((result) => {
        alert("Sent reset link");
      })
      .catch((err) => {
        alert("Error");
      });
  };

  return (
    <div className="container">
      <div className="row text-center justify-content-center">
        <div class="update-block">
          <form
            onSubmit={handleSubmit(ResetPassword)}
            className="whole_mypage_form col-6 col-lg-3"
          >
            <label for="password" className="mypage_label">
              Reset Password
            </label>
            <input
              className="form-control mypage_form"
              type="email"
              {...register("email")}
              placeholder="Your Email Adress"
            />
            <input
              className="btn btn-primary mypage_btn"
              type="submit"
              value="Send Reset Link"
            />
          </form>
          <Link to="/login" className="btn btn-secondary mypage_btn">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
