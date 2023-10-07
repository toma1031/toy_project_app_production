import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import axios from "axios";
import { useSelector } from "react-redux";
import { apiURL } from "./Default";
import { useHistory, Link } from "react-router-dom";
const cookies = new Cookies();

const Post = () => {
  const [photo, setPhoto] = useState("");
  const [photo2, setPhoto2] = useState("");
  const [photo3, setPhoto3] = useState("");
  const [photo4, setPhoto4] = useState("");
  const [photo5, setPhoto5] = useState("");
  const changeImage = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (file.type !== "image/jpeg" && file.type !== "image/png") return;
    setPhoto(() => e.target.files[0]);
  };
  const changeImage2 = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (file.type !== "image/jpeg" && file.type !== "image/png") return;
    setPhoto2(() => e.target.files[0]);
  };
  const changeImage3 = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (file.type !== "image/jpeg" && file.type !== "image/png") return;
    setPhoto3(() => e.target.files[0]);
  };
  const changeImage4 = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (file.type !== "image/jpeg" && file.type !== "image/png") return;
    setPhoto4(() => e.target.files[0]);
  };
  const changeImage5 = (e) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    if (file.type !== "image/jpeg" && file.type !== "image/png") return;
    setPhoto5(() => e.target.files[0]);
  };
  const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

  const userID = useSelector((state) => state.user.setUserID);

  const condition_tag = [
    { text: "Brand New", id: 1 },
    { text: "Mint", id: 2 },
    { text: "Excellent", id: 3 },
    { text: "Very Good", id: 4 },
    { text: "Good", id: 5 },
    { text: "Fair", id: 6 },
    { text: "Poor", id: 7 },
    { text: "Non Functioning", id: 8 },
  ];

  const post = async (data) => {
    let formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("maker", data.maker);
    formdata.append("condition", data.condition);
    formdata.append("price", data.price);
    formdata.append("description", data.description);
    formdata.append("shipping_price", data.shipping_price);
    formdata.append("photo", photo);
    formdata.append("photo2", photo2);
    formdata.append("photo3", photo3);
    formdata.append("photo4", photo4);
    formdata.append("photo5", photo5);
    const result = await axios
      .post(apiURL + "posts/", formdata, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `JWT ${cookies.get("accesstoken")}`,
        },
      })
      .then(function (response) {
        alert("Post is completed!");
        history.push("/");
      })
      .catch((err) => {
        alert("error");
      });
  };
  return (
    <div className="container">
      <div className="row text-center justify-content-center">
        {isLoggedIn ? (
          <div className="wrapper">
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit(post)} className="form-inline col-12">
              <div className="row">
                <div className="form-group col-md-6">
                  <label for="title" className="post_label">
                    Title
                  </label>
                  <input
                    placeholder="Title"
                    className="form-control post_form"
                    {...register("title", { required: true })}
                  />
                  {errors.title && <p>Please put title</p>}
                </div>
                <div className="form-group col-md-6">
                  <label for="maker" className="post_label">
                    Maker
                  </label>
                  <input
                    placeholder="Maker"
                    className="form-control post_form"
                    {...register("maker", { required: true })}
                  />
                  {errors.maker && <p>Please put maker</p>}
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label for="condition" className="post_label">
                    Condition
                  </label>
                  <select
                    className="form-control post_form"
                    name="condition"
                    {...register("condition", { required: true })}
                  >
                    {condition_tag.map((item) => (
                      <option value={item.id} selected>
                        {item.text}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label for="price" className="post_label">
                    Price($)
                  </label>
                  <input
                    placeholder="Price"
                    className="form-control post_form"
                    type="number"
                    {...register("price", { required: true })}
                  />
                  {errors.price && <p>Please put price</p>}
                </div>
              </div>
              <div className="row">
                <div className="form-group col-md-6">
                  <label for="description" className="post_label">
                    Description
                  </label>
                  <input
                    placeholder="Description"
                    className="form-control post_form"
                    {...register("description", { required: true })}
                  />
                  {errors.description && <p>Please put description</p>}
                </div>
                <div className="form-group col-md-6">
                  <label for="shipping_price" className="post_label">
                    Shipping Price($)
                  </label>
                  <input
                    placeholder="Shipping Price"
                    className="form-control post_form"
                    type="number"
                    {...register("shipping_price", { required: true })}
                  />
                  {errors.shipping_price && <p>Please put shipping price</p>}
                </div>
              </div>
              <label for="photo" className="post_label">
                Photo
              </label>
              <input
                type="file"
                onChange={changeImage}
                className="form-control post_form"
                accept="image/*"
              />
              <label for="photo2" className="post_label">
                Photo2
              </label>
              <input
                type="file"
                onChange={changeImage2}
                className="form-control post_form"
                accept="image/*"
              />
              <label for="photo3" className="post_label">
                Photo3
              </label>
              <input
                type="file"
                onChange={changeImage3}
                className="form-control post_form"
                accept="image/*"
              />
              <label for="photo4" className="post_label">
                Photo4
              </label>
              <input
                type="file"
                onChange={changeImage4}
                className="form-control post_form"
                accept="image/*"
              />
              <label for="photo5" className="post_label">
                Photo5
              </label>
              <input
                type="file"
                onChange={changeImage5}
                className="form-control post_form"
                accept="image/*"
              />

              <input
                className="btn btn-primary post_btn col-6 col-lg-3"
                type="submit"
                value="Post"
              />
            </form>
            <div>
              <Link
                to={`/`}
                className="btn btn-secondary mypage_btn col-6 col-lg-3"
              >
                Top
              </Link>
            </div>
          </div>
        ) : (
          <div>Logout</div>
        )}
      </div>
    </div>
  );
};
export default Post;
