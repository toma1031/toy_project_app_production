import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { apiURL } from "./Default";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import { useDispatch } from "react-redux";
import { setUserID, setUserEmail, setUsername } from "../stores/user";

import { useForm } from "react-hook-form";

import Carousel from "react-bootstrap/Carousel";

const cookies = new Cookies();

const Top = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userID = useSelector((state) => state.user.userID);

  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [len, setLen] = useState(0);
  const [flug, setFlug] = useState(true);
  const [initial_screen, setInitial] = useState(true);
  const user_email = useSelector((state) => state.user.userEmail);
  const user_username = useSelector((state) => state.user.Username);

  let slideIndex = 1;
  showSlides(slideIndex);

  function plusSlides(n) {
    showSlides((slideIndex += n));
  }

  function currentSlide(n) {
    showSlides((slideIndex = n));
  }

  function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");
    if (n > slides.length) {
      slideIndex = 1;
    }
    if (n < 1) {
      slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
    }
    for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
    }
  }

  const getPosts = async (data) => {
    await axios
      .get(apiURL + "posts/", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        setPost(result.data);
        setLen(result.data.length);
        setInitial(true);
      })
      .catch((err) => {});
  };

  const getLoginID = async (data) => {
    await axios
      .get(apiURL + "mypage/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookies.get("accesstoken")}`,
        },
      })
      .then((get_user) => {
        dispatch(setUserID(get_user.data.id));
        dispatch(setUserEmail(get_user.data.email));
        dispatch(setUsername(get_user.data.username));
      })
      .catch((err) => {});
  };

  useEffect(() => {
    getPosts();
    getLoginID();
  }, [flug]);

  const getSearchResult = async (data) => {
    await axios
      .get(apiURL + "posts/?search=" + data.search, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((result) => {
        setLen(result.data.length);
        setPost(result.data);
        setInitial(false);
      })
      .catch((err) => {});
  };

  return (
    <div className="container">
      <div className="row text-center">
        {isLoggedIn ? (
          <p className="top_hello">Hello {user_username}!</p>
        ) : (
          <p className="top_hello">Hello Guest!</p>
        )}
        <div className="top_search col-12">
          <form
            className="top_search_input form-inline col-12 col-lg-4"
            onSubmit={handleSubmit(getSearchResult)}
          >
            <input
              placeholder="Search Title or Maker"
              className="form-control search_bar"
              {...register("search", { required: true })}
            />
            <input className="btn btn-secondary" type="submit" value="Search" />
          </form>
        </div>
        {len >= 1 ? (
          initial_screen ? (
            <>
              {post.map((item, i) => (
                <div key={i} className="col-6 col-lg-3">
                  <div className="top_post">
                    <div className="">
                      <Carousel
                        variant="dark"
                        interval={null}
                        slide={false}
                        controls={item.photo2 ? true : false}
                        className="d-block w-100 carousel"
                      >
                        <Carousel.Item>
                          {item.photo && (
                            <img
                              className="d-block w-100 top_post_photo"
                              src={item.photo}
                            />
                          )}
                        </Carousel.Item>
                        {item.photo2 && (
                          <Carousel.Item>
                            <img
                              className="d-block w-100 top_post_photo"
                              src={item.photo2}
                            />
                          </Carousel.Item>
                        )}
                        {item.photo3 && (
                          <Carousel.Item>
                            <img
                              className="d-block w-100 top_post_photo"
                              src={item.photo3}
                            />
                          </Carousel.Item>
                        )}
                        {item.photo4 && (
                          <Carousel.Item>
                            <img
                              className="d-block w-100 top_post_photo"
                              src={item.photo4}
                            />
                          </Carousel.Item>
                        )}
                        {item.photo5 && (
                          <Carousel.Item>
                            <img
                              className="d-block w-100 top_post_photo"
                              src={item.photo5}
                            />
                          </Carousel.Item>
                        )}
                      </Carousel>
                    </div>
                    <p>Title: {item.title}</p>
                    <p>Condition: {item.condition_name}</p>
                    <p>Owner: {item.username}</p>
                    <Link
                      to={`/post/${item.id}`}
                      className="btn btn-secondary btn_phone_p"
                    >
                      Detail
                    </Link>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              {post.map((item, i) => (
                <div key={i} className="col-6 col-lg-3">
                  <div className="top_post">
                    <div className="">
                      <Carousel
                        variant="dark"
                        interval={null}
                        slide={false}
                        controls={item.photo2 ? true : false}
                      >
                        <Carousel.Item>
                          {item.photo && (
                            <img
                              className="d-block w-100 top_post_photo"
                              src={item.photo}
                            />
                          )}
                        </Carousel.Item>
                        {item.photo2 && (
                          <Carousel.Item>
                            <img
                              className="d-block w-100 top_post_photo"
                              src={item.photo2}
                            />
                          </Carousel.Item>
                        )}
                        {item.photo3 && (
                          <Carousel.Item>
                            <img
                              className="d-block w-100 top_post_photo"
                              src={item.photo3}
                            />
                          </Carousel.Item>
                        )}
                        {item.photo4 && (
                          <Carousel.Item>
                            <img
                              className="d-block w-100 top_post_photo"
                              src={item.photo4}
                            />
                          </Carousel.Item>
                        )}
                        {item.photo5 && (
                          <Carousel.Item>
                            <img
                              className="d-block w-100 top_post_photo"
                              src={item.photo5}
                            />
                          </Carousel.Item>
                        )}
                      </Carousel>
                    </div>
                    <p>Title: {item.title}</p>
                    <p>Condition: {item.condition_name}</p>
                    <p>Owner: {item.username}</p>
                    <Link to={`/post/${item.id}`} className="btn btn-secondary">
                      Detail
                    </Link>
                  </div>
                </div>
              ))}
              <div>
                <button
                  onClick={() => setFlug(!flug)}
                  className="btn btn-secondary mypage_btn col-6 col-lg-3"
                >
                  Back
                </button>
              </div>
            </>
          )
        ) : (
          <div>
            <p>{len}</p>
            <p>not found!</p>
            <button
              onClick={() => setFlug(!flug)}
              className="btn btn-secondary"
            >
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Top;
