import React, { useState, useEffect } from "react";
import axios from "axios";
import { apiURL } from "./Default";
import { useParams } from "react-router-dom";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const LikeButton = () => {
  const [like, setLike] = useState({ count: 0, liked: false });
  const { id } = useParams();

  const onClick = () => {
    setLike({
      count: like.count + (like.liked ? -1 : 1),
      liked: !like.liked,
    });
  };

  const Like = async (data) => {
    await axios
      .get(apiURL + "posts/" + id + "/like/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookies.get("accesstoken")}`,
        },
      })
      .then((result) => {
        if (result.status === 200) {
          setLike(result.data);
        }
      })
      .catch((err) => {
        if (err.response.status === 406) {
        }
      });
  };

  useEffect(() => {
    Like();
  }, [true]);

  return (
    <>
      <button onClick={onClick}>{like.liked ? "✔" : ""}いいね！</button>
      {like.count}
    </>
  );
};

export default LikeButton;
