import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import axios from "axios";
import { useSelector } from "react-redux";
import { apiURL } from "./Default";
import { useParams, useHistory, Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";

const cookies = new Cookies();

const PostDetail = () => {
  const user_username = useSelector((state) => state.user.Username);
  const { id } = useParams();
  const [update_photo, setUpdatePhoto] = useState(null);
  const [update_photo2, setUpdatePhoto2] = useState(null);
  const [update_photo3, setUpdatePhoto3] = useState(null);
  const [update_photo4, setUpdatePhoto4] = useState(null);
  const [update_photo5, setUpdatePhoto5] = useState(null);
  const [post, setPost] = useState([]);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userID = useSelector((state) => state.user.userID);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [liked, setLiked] = useState(false);
  const [like_numbers, setLikeNumbers] = useState(0);
  useEffect(() => {
    async function fetchData() {
      const result = await axios
        .get(apiURL + "posts/" + id, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((result) => {
          setPost(result.data);
          setValue("title", result.data.title);
          setValue("condition", result.data.condition);
          setValue("maker", result.data.maker);
          setValue("price", result.data.price);
          setValue("description", result.data.description);
          setValue("shipping_price", result.data.shipping_price);
          setLikeNumbers(result.data.like_numbers);
        })
        .catch((err) => {});
    }
    fetchData();
    judgeLiked();
  }, [liked]);

  const conditionList = [
    { text: "Brand New", id: 1 },
    { text: "Mint", id: 2 },
    { text: "Excellent", id: 3 },
    { text: "Very Good", id: 4 },
    { text: "Good", id: 5 },
    { text: "Fair", id: 6 },
    { text: "Poor", id: 7 },
    { text: "Non Functioning", id: 8 },
  ];

  const changeImage = (e) => {
    setUpdatePhoto(() => e.target.files[0]);
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files;
    if (file.type !== "image/jpeg" && file.type !== "image/png") return;
  };
  const changeImage2 = (e) => {
    setUpdatePhoto2(() => e.target.files[0]);
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files;
    if (file.type !== "image/jpeg" && file.type !== "image/png") return;
  };
  const changeImage3 = (e) => {
    setUpdatePhoto3(() => e.target.files[0]);
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files;
    if (file.type !== "image/jpeg" && file.type !== "image/png") return;
  };
  const changeImage4 = (e) => {
    setUpdatePhoto4(() => e.target.files[0]);
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files;
    if (file.type !== "image/jpeg" && file.type !== "image/png") return;
  };
  const changeImage5 = (e) => {
    setUpdatePhoto5(() => e.target.files[0]);
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files;
    if (file.type !== "image/jpeg" && file.type !== "image/png") return;
  };
  const history = useHistory();

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

  const post_update = async (data) => {
    let formdata = new FormData();
    formdata.append("title", data.title);
    formdata.append("maker", data.maker);
    formdata.append("condition", data.condition);
    formdata.append("price", data.price);
    formdata.append("description", data.description);
    formdata.append("shipping_price", data.shipping_price);
    formdata.append("photo", update_photo);
    formdata.append("photo2", update_photo2);
    formdata.append("photo3", update_photo3);
    formdata.append("photo4", update_photo4);
    formdata.append("photo5", update_photo5);

    const result = await axios
      .patch(`${apiURL}posts/` + id + "/", formdata, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: `JWT ${cookies.get("accesstoken")}`,
        },
      })
      .then(function (response) {
        alert("Post is updated!");
        history.push("/");
      })
      .catch((err) => {
        alert("error");
      });
  };

  async function deleteData() {
    const result = await axios
      .delete(apiURL + "posts/" + id, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookies.get("accesstoken")}`,
        },
      })
      .then((result) => {
        alert("Your post is deleted");
        history.push("/");
      })
      .catch((err) => {});
  }

  const changeLiked = async () => {
    const result = await axios
      .get(apiURL + "posts/" + id + "/like/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookies.get("accesstoken")}`,
        },
      })
      .then((result) => {
        setLiked(!liked);
      })
      .catch((err) => {});
  };

  const judgeLiked = async () => {
    const result = await axios
      .get(apiURL + "posts/" + id + "/judgeLiked/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookies.get("accesstoken")}`,
        },
      })
      .then((result) => {
        setLiked(result.data);
      })
      .catch((err) => {});
  };

  return (
    <div className="container">
      <div className="row text-center justify-content-center">
        <div class="wrapper">
          {isLoggedIn && post.user === userID ? (
            <div>
              <h2>My Post Page</h2>
              <p className="top_hello_post_detail">Hello {user_username}!</p>
              <form
                onSubmit={handleSubmit(post_update)}
                className="form-inline  whole_mypage_form col-12 col-lg-12"
              >
                <div className="row">
                  <div className="form-group col-md-6">
                    <label for="title">Title</label>
                    <input
                      placeholder="Title"
                      className="form-control"
                      {...register("title", { required: true })}
                    />
                    {errors.title && <p>Please put title</p>}
                  </div>
                  <div className="form-group col-md-6">
                    <label for="maker">Maker</label>
                    <input
                      placeholder="Maker"
                      className="form-control"
                      {...register("maker", { required: true })}
                    />
                    {errors.maker && <p>Please put maker</p>}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label for="condition">Condition</label>
                    <select
                      className="form-control"
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
                    <label for="price">Price(US$)</label>
                    <input
                      placeholder="Price"
                      className="form-control"
                      type="number"
                      {...register("price", { required: true })}
                    />
                    {errors.price && <p>Please put price</p>}
                  </div>
                </div>
                <div className="row">
                  <div className="form-group col-md-6">
                    <label for="description">Description</label>
                    <input
                      placeholder="Description"
                      className="form-control"
                      {...register("description", { required: true })}
                    />
                    {errors.description && <p>Please put description</p>}
                  </div>
                  <div className="form-group col-md-6">
                    <label for="shipping_price">Shipping Price(US$)</label>
                    <input
                      placeholder="Shipping Price"
                      className="form-control"
                      type="number"
                      {...register("shipping_price", { required: true })}
                    />
                    {errors.shipping_price && <p>Please put shipping price</p>}
                  </div>
                </div>
                <div className="photo_section">
                  {post.photo && (
                    <div>
                      <img src={post.photo} className="post_detail_img" />
                      <br />
                    </div>
                  )}
                  <label for="photo" className="">
                    Photo
                  </label>
                  <input
                    type="file"
                    onChange={changeImage}
                    className="form-control"
                    accept="image/*"
                  />
                </div>
                <div className="photo_section">
                  {post.photo2 && (
                    <div>
                      <img src={post.photo2} className="post_detail_img" />
                      <br />
                    </div>
                  )}
                  <label for="photo2">Photo2</label>
                  <input
                    type="file"
                    onChange={changeImage2}
                    className="form-control"
                    accept="image/*"
                  />
                </div>
                <div className="photo_section">
                  {post.photo3 && (
                    <div>
                      <img src={post.photo3} className="post_detail_img" />
                      <br />
                    </div>
                  )}
                  <label for="photo3">Photo3</label>
                  <input
                    type="file"
                    onChange={changeImage3}
                    className="form-control"
                    accept="image/*"
                  />
                </div>
                <div className="photo_section">
                  {post.photo4 && (
                    <div>
                      <img src={post.photo4} className="post_detail_img" />
                      <br />
                    </div>
                  )}
                  <label for="photo4">Photo4</label>
                  <input
                    type="file"
                    onChange={changeImage4}
                    className="form-control"
                    accept="image/*"
                  />
                </div>
                <div className="photo_section">
                  {post.photo5 && (
                    <div>
                      <img src={post.photo5} className="post_detail_img" />
                      <br />
                    </div>
                  )}
                  <label for="photo5">Photo5</label>
                  <input
                    type="file"
                    onChange={changeImage5}
                    className="form-control"
                    accept="image/*"
                  />
                </div>
                <input
                  className="btn btn-primary mypage_btn col-6 col-lg-3"
                  type="submit"
                  value="Update"
                />
              </form>
              <div className="delete_post">
                <button
                  className="btn btn-danger mypage_btn col-6 col-lg-3"
                  onClick={() => deleteData()}
                >
                  Delete Post
                </button>
                <br></br>
                <Link
                  to={"/my_posts_list_page"}
                  className="btn btn-secondary mypage_btn col-6 col-lg-3"
                >
                  My Posts
                </Link>
                <br></br>
                <Link
                  to="/"
                  className="btn btn-secondary mypage_btn col-6 col-lg-3"
                >
                  Top
                </Link>
              </div>
            </div>
          ) : isLoggedIn ? (
            <div>
              <p className="top_hello_post_detail">Hello {user_username}!</p>
              <div>
                <Carousel
                  interval={null}
                  slide={false}
                  controls={post.photo2 ? true : false}
                >
                  <Carousel.Item>
                    {post.photo && (
                      <img
                        className="deatil_photo col-10 col-lg-8"
                        src={post.photo}
                      />
                    )}
                  </Carousel.Item>
                  {post.photo2 && (
                    <Carousel.Item>
                      <img
                        className="deatil_photo col-10 col-lg-8"
                        src={post.photo2}
                      />
                    </Carousel.Item>
                  )}
                  {post.photo3 && (
                    <Carousel.Item>
                      <img
                        className="deatil_photo col-10 col-lg-8"
                        src={post.photo3}
                      />
                    </Carousel.Item>
                  )}
                  {post.photo4 && (
                    <Carousel.Item>
                      <img
                        className="deatil_photo col-10 col-lg-8"
                        src={post.photo4}
                      />
                    </Carousel.Item>
                  )}
                  {post.photo5 && (
                    <Carousel.Item>
                      <img
                        className="deatil_photo col-10 col-lg-8"
                        src={post.photo5}
                      />
                    </Carousel.Item>
                  )}
                </Carousel>
                <div class="description_section">
                  <div class="row">
                    <div className="col-6">
                      <p className="">Title: {post.title}</p>
                    </div>
                    <div className="col-6">
                      <p className="">User: {post.username}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div className="col-6">
                      <p>Condition: {post.condition_name}</p>
                    </div>
                    <div className="col-6">
                      <p>Maker: {post.maker}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div className="col-6">
                      <p>Price(US$): {post.price}</p>
                    </div>
                    <div className="col-6">
                      <p>Shipping price(US$): {post.shipping_price}</p>
                    </div>
                  </div>
                  <p>Description</p>
                  <p>{post.description}</p>
                </div>
                <div>
                  <div>
                    <button className="like_button" onClick={changeLiked}>
                      {liked ? (
                        <FaHeart className="fa_heart" />
                      ) : (
                        <FaRegHeart className="fa_heart" />
                      )}
                    </button>
                  </div>
                  <div className="likenumber">
                    <p className="number_of_like col-2">{like_numbers} Like</p>
                  </div>
                  <div>
                    <Link
                      to={`/post/` + post.id + `/open_messageroom`}
                      className="btn btn-primary contact_btn col-6 col-lg-3"
                    >
                      Contact {post.username}
                    </Link>
                  </div>
                  <div>
                    <Link
                      to="/"
                      className="btn btn-secondary mypage_btn col-6 col-lg-3"
                    >
                      Top
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <p className="top_hello">Hello Guest!</p>
                <Carousel
                  interval={null}
                  slide={false}
                  controls={post.photo2 ? true : false}
                >
                  <Carousel.Item>
                    {post.photo && (
                      <img
                        className="deatil_photo col-10 col-lg-8"
                        src={post.photo}
                      />
                    )}
                  </Carousel.Item>
                  {post.photo2 && (
                    <Carousel.Item>
                      <img
                        className="deatil_photo col-10 col-lg-8"
                        src={post.photo2}
                      />
                    </Carousel.Item>
                  )}
                  {post.photo3 && (
                    <Carousel.Item>
                      <img
                        className="deatil_photo col-10 col-lg-8"
                        src={post.photo3}
                      />
                    </Carousel.Item>
                  )}
                  {post.photo4 && (
                    <Carousel.Item>
                      <img
                        className="deatil_photo col-10 col-lg-8"
                        src={post.photo4}
                      />
                    </Carousel.Item>
                  )}
                  {post.photo5 && (
                    <Carousel.Item>
                      <img
                        className="deatil_photo col-10 col-lg-8"
                        src={post.photo5}
                      />
                    </Carousel.Item>
                  )}
                </Carousel>
                <div class="description_section">
                  <div class="row">
                    <div className="col-6">
                      <p className="">Title: {post.title}</p>
                    </div>
                    <div className="col-6">
                      <p className="">User: {post.username}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div className="col-6">
                      <p>Condition: {post.condition_name}</p>
                    </div>
                    <div className="col-6">
                      <p>Maker: {post.maker}</p>
                    </div>
                  </div>
                  <div class="row">
                    <div className="col-6">
                      <p>Price(US$): {post.price}</p>
                    </div>
                    <div className="col-6">
                      <p>Shipping price(US$): {post.shipping_price}</p>
                    </div>
                  </div>
                  <p>Description</p>
                  <p>{post.description}</p>
                </div>
                <Link to={"/signup"} className="btn btn-primary col-6 col-lg-3">
                  Sign up for sending message!
                </Link>
                <div>
                  <Link
                    to="/"
                    className="btn btn-secondary mypage_btn col-6 col-lg-3"
                  >
                    Top
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default PostDetail;
