import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { apiURL } from "./Default";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserID } from "../stores/user";

const cookies = new Cookies();

const MyPage = () => {
  const [my_name, setMyname] = useState(null);
  const [my_email, setMyemail] = useState(null);
  const [my_password, setMypassword] = useState(null);
  const [state, setState] = useState(null);
  const [address, setAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [zipcode, setZipcode] = useState(null);
  const [phone_number, setPhonenumber] = useState(null);
  const [my_ID, setMyID] = useState(null);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

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
          setValue("username", result.data.username);
          setValue("email", result.data.email);
          setState(result.data.state);
          setValue("city", result.data.city);
          setValue("address", result.data.address);
          setValue("zipcode", result.data.zipcode);
          setValue("phone_number", result.data.phone_number);
          setMyID(result.data.id);
          dispatch(setUserID(result.data.id));
        })
        .catch((err) => {
        });
    }
    fetchData();
  }, []);

  const stateList = [
    { text: "Alabama", id: 1 },
    { text: "Alaska", id: 2 },
    { text: "Arizona", id: 3 },
    { text: "Arkansas", id: 4 },
    { text: "California", id: 5 },
    { text: "Colorado", id: 6 },
    { text: "Connecticut", id: 7 },
    { text: "Delaware", id: 8 },
    { text: "District Of Columbia", id: 9 },
    { text: "Florida", id: 10 },
    { text: "Georgia", id: 11 },
    { text: "Hawaii", id: 12 },
    { text: "Idaho", id: 13 },
    { text: "Illinois", id: 14 },
    { text: "Indiana", id: 15 },
    { text: "Iowa", id: 16 },
    { text: "Kansas", id: 17 },
    { text: "Kentucky", id: 18 },
    { text: "Louisiana", id: 19 },
    { text: "Maine", id: 20 },
    { text: "Maryland", id: 21 },
    { text: "Massachusetts", id: 22 },
    { text: "Michigan", id: 23 },
    { text: "Minnesota", id: 24 },
    { text: "Mississippi", id: 25 },
    { text: "Missouri", id: 26 },
    { text: "Montana", id: 27 },
    { text: "Nebraska", id: 28 },
    { text: "Nevada", id: 29 },
    { text: "New Hampshire", id: 30 },
    { text: "New Jersey", id: 31 },
    { text: "New Mexico", id: 32 },
    { text: "New York", id: 33 },
    { text: "North Carolina", id: 34 },
    { text: "North Dakota", id: 35 },
    { text: "Ohio", id: 36 },
    { text: "Oklahoma", id: 37 },
    { text: "Oregon", id: 38 },
    { text: "Pennsylvania", id: 39 },
    { text: "Rhode Island", id: 40 },
    { text: "South Carolina", id: 41 },
    { text: "South Dakota", id: 42 },
    { text: "Tennessee", id: 43 },
    { text: "Texas", id: 44 },
    { text: "Utah", id: 45 },
    { text: "Vermont", id: 46 },
    { text: "CVirginia", id: 47 },
    { text: "Washington", id: 48 },
    { text: "West Virginia", id: 49 },
    { text: "Wisconsin", id: 50 },
    { text: "Wyoming", id: 51 },
  ];
  const update = async (data) => {
    await axios
      .patch(`${apiURL}users/` + my_ID + "/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookies.get("accesstoken")}`,
        },
        username: data.username,
        email: data.email,
        state: data.state,
        city: data.city,
        address: data.address,
        zipcode: data.zipcode,
        phone_number: data.phone_number,
      })
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
          <div className="wrapper">
            <h2>My Profile Page</h2>
            <form
              onSubmit={handleSubmit(update)}
              className="form-inline  whole_mypage_form col-12"
            >
              <div className="row">
                <div className="form-group col-md-6">
                  <label for="username" className="mypage_label">
                    Username
                  </label>

                  <input
                    className="form-control mypage_form"
                    defaultValue={my_name}
                    {...register("username", { required: true })}
                  />
                  {errors.username && <p>Please put username</p>}
                </div>
                <div className="form-group col-md-6">
                  <label for="email" className="mypage_label">
                    Email
                  </label>
                  <input
                    className="form-control mypage_form"
                    defaultValue={my_email}
                    type="email"
                    {...register("email", { required: true })}
                  />
                  {errors.email && <p>Please put email</p>}
                </div>
              </div>

              <div className="row">
                <div className="form-group col-md-6">
                  <label for="state" className="mypage_label">
                    State
                  </label>
                  <select
                    className="form-control mypage_form"
                    name="state"
                    {...register("state")}
                  >
                    {stateList.map((item) =>
                      state === item.id ? (
                        <option value={item.id} selected>
                          {item.text}
                        </option>
                      ) : (
                        <option value={item.id}>{item.text}</option>
                      )
                    )}
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label for="city" className="mypage_label">
                    City
                  </label>
                  <input
                    className="form-control mypage_form"
                    defaultValue={city}
                    type="city"
                    {...register("city")}
                  />
                  {errors.city && <p>Please put city</p>}
                </div>
              </div>
              <div class="form-group">
                <label for="address" className="mypage_label">
                  Address
                </label>
                <input
                  className="form-control mypage_form"
                  defaultValue={address}
                  type="address"
                  {...register("address")}
                />
                {errors.address && <p>Please put address</p>}
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label for="zipcode" className="mypage_label">
                    Zipcode
                  </label>
                  <input
                    className="form-control mypage_form"
                    defaultValue={zipcode}
                    type="zipcode"
                    {...register("zipcode")}
                  />
                  {errors.zipcode && <p>Please put zipcode</p>}
                </div>
                <div className="form-group col-md-6">
                  <label for="phone_number" className="mypage_label">
                    Phone number
                  </label>
                  <input
                    className="form-control mypage_form"
                    defaultValue={phone_number}
                    type="phone_number"
                    {...register("phone_number")}
                  />
                  {errors.phone_number && <p>Please put phone_number</p>}
                </div>
              </div>
              <input
                className="btn btn-primary mypage_btn submit_update col-6 col-lg-3"
                type="submit"
                value="Submit Update"
              />
            </form>
            <Link
              to="/mypage_password_update"
              className="btn btn-secondary mypage_btn col-6 col-lg-3"
            >
              Need to Update Password
            </Link>
            <br></br>
            <Link
              to="/cancel_membership"
              className="btn btn-danger mypage_btn col-6 col-lg-3"
            >
              Cancel Membership
            </Link>
            <br></br>
            <Link
              to={`/`}
              className="btn btn-secondary mypage_btn col-6 col-lg-3"
            >
              Top
            </Link>
          </div>
        ) : (
          <div>Logout</div>
        )}
      </div>
    </div>
  );
};

export default MyPage;
