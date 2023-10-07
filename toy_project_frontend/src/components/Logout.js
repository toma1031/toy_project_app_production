import React, { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useCookies } from "react-cookie";
import { Row, Container } from "react-bootstrap";

// useDispatchは更新用
import { useDispatch } from "react-redux";
import { isLoggedInOff } from "../stores/user";
import { clearUserID } from "../stores/user";

const Logout = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [cookies, setCookie, removeCookie] = useCookies();
  useEffect(() => {
    removeCookie("accesstoken", { path: "/" }, { httpOnly: true });
    removeCookie("refreshtoken", { path: "/" }, { httpOnly: true });
    dispatch(isLoggedInOff());
    dispatch(clearUserID());
    history.push("/");
  });

  return (
    <Container className="center">
      <Row className="justify-content-md-center">
        <div>
          <h2>Logged out!</h2>
          <div className="text-center">
            <Link to="/login">Go to login page</Link>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Logout;
