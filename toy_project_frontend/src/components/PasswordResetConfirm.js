import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { apiURL } from "./Default";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router-dom";

const PasswordResetConfirm = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const uid = queryParams.get("uid");
  const token = queryParams.get("token");
  const history = useHistory();

  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const NewPasswordUpdate = async (data) => {
    await axios
      .post(`${apiURL}api/auth/users/reset_password_confirm/`, {
        uid: uid,
        token: token,
        new_password: data.new_password,
      })
      .then((message) => {
        alert("Updated!");
        history.push("/login");
      })
      .catch((err) => {
        alert("Update Failed");
      });
  };

  useEffect(() => {}, []);

  return (
    <div className="container">
      <div className="row text-center justify-content-center">
        <div class="update-block">
          <form
            onSubmit={handleSubmit(NewPasswordUpdate)}
            className="whole_mypage_form col-6 col-lg-3"
          >
            <label for="new_password" className="signup_label">
              New Password
            </label>
            <input
              type={isRevealPassword ? "text" : "password"}
              placeholder="Type New Password"
              className="form-control signup_form"
              {...register("new_password", { required: true, minLength: 6 })}
            />
            {errors.password && (
              <p>Please enter at least 6 single-byte alphanumeric characters</p>
            )}
            <input
              className="btn btn-primary mypage_btn"
              type="submit"
              value="Update"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default PasswordResetConfirm;
