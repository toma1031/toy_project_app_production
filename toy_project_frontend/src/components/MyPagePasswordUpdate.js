import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { apiURL } from "./Default";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

const cookies = new Cookies();

const MyPagePasswordUpdate = () => {
  const [my_password, setValue] = useState(null);
  const [my_ID, setMyID] = useState(null);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const { register, handleSubmit, errors } = useForm();

  useEffect(() => {
    async function fetchData() {
      const result = await axios
        .get(apiURL + "mypage/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${cookies.get("accesstoken")}`,
          },
        })
        .then((result) => {
          setValue(result.data.password);
          setMyID(result.data.id);
        })
        .catch((err) => {
        });
    }
    fetchData();
  }, []);

  const update = async (data) => {
    await axios
      .patch(
        `${apiURL}users/` + my_ID + "/",
        {
          password: data.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `JWT ${cookies.get("accesstoken")}`,
          },
        }
      )
      .then((message) => {
        alert("Updated!");
      })
      .catch((err) => {
        alert("The characters are invalid");
      });
  };

  return (
    <div className="container">
      <div className="row text-center justify-content-center">
        {isLoggedIn ? (
          <div class="update-block">
            <form
              onSubmit={handleSubmit(update)}
              className="whole_mypage_form col-6 col-lg-3"
            >
              <label for="password" className="mypage_label">
                Update Password
              </label>
              <input
                className="form-control mypage_form"
                type="password"
                {...register("password")}
                placeholder="New Password"
              />
              <input
                className="btn btn-primary mypage_btn"
                type="submit"
                value="Update"
              />
            </form>
            <Link to="/mypage" className="btn btn-secondary mypage_btn">
              Back to My Pgae
            </Link>
          </div>
        ) : (
          <div>Logout</div>
        )}
      </div>
    </div>
  );
};

export default MyPagePasswordUpdate;
