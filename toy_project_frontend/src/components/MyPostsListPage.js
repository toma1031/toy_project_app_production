import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import { apiURL, apiURL2 } from "./Default";
import { useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import Carousel from "react-bootstrap/Carousel";

const cookies = new Cookies();

const MyPostsListPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user_username = useSelector((state) => state.user.Username);
  const [len, setLen] = useState(0);

  const getMyPosts = async (data) => {
    await axios
      .get(apiURL + "users/my_posts/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookies.get("accesstoken")}`,
        },
      })
      .then((result) => {
        setPost(result.data);
        setLen(result.data.length);
      })
      .catch((err) => {
      });
  };

  useEffect(() => {
    getMyPosts();
  }, []);

  return (
    <div className="container">
      <div className="row text-center justify-content-center">
        {isLoggedIn ? (
          <>
            {len >= 1 ? (
              <>
                <h2 className="top_title col-10 col-lg-12">My Posts</h2>
                <p className="top_hello_liked_posts_list_page">
                  Hello {user_username}!
                </p>
                <div className="row">
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
                                  src={`${apiURL2}` + `${item.photo}`}
                                  className="d-block w-100 top_post_photo"
                                />
                              )}
                            </Carousel.Item>
                            {item.photo2 && (
                              <Carousel.Item>
                                <img
                                  src={`${apiURL2}` + `${item.photo2}`}
                                  className="d-block w-100 top_post_photo"
                                />
                              </Carousel.Item>
                            )}
                            {item.photo3 && (
                              <Carousel.Item>
                                <img
                                  src={`${apiURL2}` + `${item.photo3}`}
                                  className="d-block w-100 top_post_photo"
                                />
                              </Carousel.Item>
                            )}
                            {item.photo4 && (
                              <Carousel.Item>
                                <img
                                  src={`${apiURL2}` + `${item.photo4}`}
                                  className="d-block w-100 top_post_photo"
                                />
                              </Carousel.Item>
                            )}
                            {item.photo5 && (
                              <Carousel.Item>
                                <img
                                  src={`${apiURL2}` + `${item.photo5}`}
                                  className="d-block w-100 top_post_photo"
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
                  <div>
                    <Link
                      to={`/`}
                      className="btn btn-secondary col-6 col-lg-3 mypage_btn"
                    >
                      Top
                    </Link>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <p>No posts</p>
              </div>
            )}
          </>
        ) : (
          <div>
            <p>Logout</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPostsListPage;
