import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { apiURL } from "./Default";
import { useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";

const Signup = () => {
  // HookのuseFormを使う
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const [removeCookie] = useCookies();

  const [isRevealPassword, setIsRevealPassword] = useState(false);
  const signup = async (data) => {
    console.log("Body sent to server", {
      email: data.email,
      username: data.name,
      password: data.password,
      re_password: data.re_password,
    });
    removeCookie("accesstoken", { path: "/" }, { httpOnly: true });
    removeCookie("refreshtoken", { path: "/" }, { httpOnly: true });
    const res = await axios
      .post(`${apiURL}users/`, {
        email: data.email,
        username: data.name,
        password: data.password,
        re_password: data.re_password,
      })
      .then(function (res) {
        alert("Signup is completed! Please login.");
        history.push("/login");
      })
      .catch((err) => {
        alert("Email address or user name that has already been registered.");
        console.log(err);
      });
  };
  return (
    <div className="container">
      <div className="row text-center justify-content-center">
        <div className="wrapper">
          <h2>Sign Up</h2>
          <form
            onSubmit={handleSubmit(signup)}
            className="form-inline  whole_mypage_form col-6 col-lg-3"
          >
            <label for="email" className="signup_label">
              Email
            </label>
            <input
              placeholder="Email address"
              className="form-control signup_form"
              {...register("email", {
                required: true,
                pattern:
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              })}
            />
            {errors.email && <p>Please enter a valid email address</p>}
            <label for="name" className="signup_label">
              UserName
            </label>
            <input
              placeholder="Username"
              className="form-control signup_form"
              {...register("name", { required: true })}
            />
            {errors.name && <p>Please enter your username</p>}

            <label for="password" className="signup_label">
              Password
            </label>
            <input
              type={isRevealPassword ? "text" : "password"}
              placeholder="Please enter at least 6 single-byte alphanumeric characters"
              className="form-control signup_form"
              {...register("password", { required: true, minLength: 6 })}
            />
            {errors.password && (
              <p>Please enter at least 6 single-byte alphanumeric characters</p>
            )}

            <label for="re_password" className="signup_label">
              Re Password
            </label>
            <input
              type={isRevealPassword ? "text" : "password"}
              placeholder="Please enter at least 6 single-byte alphanumeric characters"
              className="form-control signup_form"
              {...register("re_password", { required: true, minLength: 6 })}
            />
            {errors.password && (
              <p>Please enter at least 6 single-byte alphanumeric characters</p>
            )}

            <input
              className="btn btn-primary signup_btn"
              type="submit"
              value="Signup"
            />
          </form>
        </div>
      </div>
    </div>
  );
};
export default Signup;
