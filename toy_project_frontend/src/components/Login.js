import React, { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { useForm } from "react-hook-form";
import { apiURL } from "./Default";
import { useParams, Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { isLoggedInOn } from "../stores/user";

import { setUserID } from "../stores/user";

const Login = (props) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const [cookies, setCookie] = useCookies();

  const { register, handleSubmit, watch, errors } = useForm();

  const getJwt = async (data) => {
    await axios
      .post(`${apiURL}auth/jwt/create/`, {
        email: data.email,
        password: data.password,
      })

      .then(function (response) {
        setCookie(
          "accesstoken",
          response.data.access,
          { path: "/" },
          { httpOnly: true }
        );

        setCookie(
          "refreshtoken",
          response.data.refresh,
          { path: "/" },
          { httpOnly: true }
        );
        dispatch(isLoggedInOn());

        history.push("/");
      })
      .catch((err) => {
        console.log("miss");
        alert("Email or Password is wrong!");
      });
  };

  return (
    <div className="container">
      <div className="row text-center justify-content-center">
        <div className="wrapper">
          <div class="login">
            <h2>Login</h2>
          </div>
          <div class="login-block">
            <form
              onSubmit={handleSubmit(getJwt)}
              className="form-inline login-block whole_mypage_form col-6 col-lg-3"
            >
              <label for="email" className="login_label_email">
                email
              </label>
              <input
                className="form-control login_form"
                {...register("email")}
              />
              <label for="password" className="login_label_password">
                Password
              </label>
              <input
                className="form-control login_form"
                type="password"
                {...register("password", { required: true })}
              />
              <input
                className="btn btn-primary login_btn "
                type="submit"
                value="Login"
              />
            </form>
            <Link to="/password_reset" className="forget_password">
              Forget Password
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
