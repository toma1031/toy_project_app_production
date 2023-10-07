import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Cookies from "universal-cookie";
import axios from "axios";
import { useSelector } from "react-redux";
import { apiURL } from "./Default";
import { useParams, Link } from "react-router-dom";
import ic_login_user from "../images/ic_login_user.png";
import ic_not_login_user from "../images/ic_not_login_user.png";
import { useLocation } from "react-router-dom";

const cookies = new Cookies();

const MessageRoom = () => {
  const [messages, setMessages] = useState([]);
  const [message_room, setMessageRoom] = useState([]);
  const [post_message, setPostMessage] = useState(false);
  const { id } = useParams();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const search = useLocation().search;
  const query = new URLSearchParams(search);
  const messageroom_id_params = query.get("messageroom_id");
  const user_username = useSelector((state) => state.user.Username);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const getMessageRoom = async (data) => {
    await axios
      .get(apiURL + "posts/" + id + "/open_messageroom/", {
        params: {
          messageroom_id: messageroom_id_params,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookies.get("accesstoken")}`,
        },
      })
      .then((result) => {
        if (result.status === 200) {
          setMessageRoom(result.data);
          setMessages(result.data.messages);
        } else {
        }
      })
      .catch((err) => {
        if (err.response.status === 406) {
        }
      });
  };

  useEffect(() => {
    getMessageRoom();
  }, [post_message]);

  const PostMessage = async (data) => {
    let formdata = new FormData();
    formdata.append("message", data.message);
    formdata.append("message_room", message_room.id);
    const result = await axios
      .post(apiURL + "messages/", formdata, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookies.get("accesstoken")}`,
        },
      })
      .then((result) => {
        setPostMessage(!post_message);
        reset();
      })
      .catch((err) => {
        alert("error");
      });
  };

  return (
    <div className="container">
      <div className="row text-center justify-content-center">
        {isLoggedIn ? (
          <div class="wrapper col-10 col-lg-12">
            <h2>Message Room</h2>
            {messages && (
              <div className="massages">
                {messages.map((item) => (
                  <div>
                    {item.message_user == user_username ? (
                      <div className="user_message">
                        <div className="login_user justify-content-center">
                          <img
                            className="img_login_user"
                            src={ic_login_user}
                            alt="icon"
                          />
                          <p>{item.message_user}</p>
                        </div>
                        <div className="each_massage_login_user col-10 col-lg-6">
                          <p>{item.message}</p>
                          <p className="login_user_create_time">
                            {item.create_time}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="user_message">
                        <div className="each_massage_not_login_user col-10 col-lg-6">
                          <p>{item.message}</p>
                          <p className="not_login_user_create_time">
                            {item.create_time}
                          </p>
                        </div>
                        <div className="not_login_user justify-content-center">
                          <img
                            className="img_not_login_user"
                            src={ic_not_login_user}
                            alt="icon"
                          />
                          <p>{item.message_user}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <form
              onSubmit={handleSubmit(PostMessage)}
              className="col-12 col-lg-12"
            >
              <div className="form-group message_form col-12 col-md-6">
                <label for="message"></label>
                <input
                  placeholder="Message"
                  className="form-control"
                  {...register("message", { required: true })}
                />
                {errors.title && <p>Please put title</p>}
              </div>
              <input
                className="btn btn-primary col-6 col-lg-3 mypage_btn"
                type="submit"
                value="Send"
              />
            </form>
            <Link
              to={`/post/${id}`}
              className="btn btn-secondary col-6 col-lg-3 mypage_btn"
            >
              Back to Detail
            </Link>
          </div>
        ) : (
          <div>Logout</div>
        )}
      </div>
    </div>
  );
};
export default MessageRoom;
