import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import { useSelector } from "react-redux";
import { apiURL, apiURL2 } from "./Default";
import { useParams, useHistory, Link } from "react-router-dom";

const cookies = new Cookies();

const MessageRoomList = () => {
  const history = useHistory();
  const [messagerooms] = useState([]);
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const user_username = useSelector((state) => state.user.Username);
  const getMessageRoomList = async (data) => {
    await axios
      .get(apiURL + "messagerooms/my_messagerooms", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookies.get("accesstoken")}`,
        },
      })
      .then((result) => {
        if (result.status === 200) {
        }
      })
      .catch((err) => {
        if (err.response.status === 406) {
          history.push("/");
        }
      });
  };

  useEffect(() => {
    getMessageRoomList();
  }, []);

  return (
    <div className="container">
      <div className="row text-center justify-content-center">
        {isLoggedIn ? (
          <>
            <h2 className="top_title col-10 col-lg-12">Message Room List</h2>
            <p className="top_hello_messageroom_list">Hello {user_username}!</p>
            {messagerooms ? (
              <>
                <div className="row">
                  {messagerooms.map((item, i) => (
                    <div
                      key={i}
                      className="col-6 col-lg-3 roomlist_post_top
                      "
                    >
                      <div className="roomlist_post">
                        <img
                          src={`${apiURL2}` + `${item.post.photo}`}
                          className="d-block w-100 top_post_photo"
                        />
                        <p>Post Title: {item.post.title}</p>
                        <p>Inquiry User: {item.inquiry_user.username}</p>
                        <p>Toy's Owner: {item.username}</p>
                        <Link
                          to={`/post/${item.post.id}/open_messageroom?messageroom_id=${item.id}`}
                          className="btn btn-primary go_to_message_room"
                        >
                          Go to Message Room
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
                <p>Can't find Page</p>
              </div>
            )}
          </>
        ) : (
          <div>Logout</div>
        )}
      </div>
    </div>
  );
};
export default MessageRoomList;
