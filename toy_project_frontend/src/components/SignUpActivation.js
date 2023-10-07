import { useLocation, useHistory } from "react-router-dom";
import axios from "axios";
import { apiURL } from "./Default";

const SignUpActivation = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const uid = queryParams.get("uid");
  const token = queryParams.get("token");

  const history = useHistory();

  const activation = async () => {
    const res = await axios
      .post(`${apiURL}api/auth/users/activation/`, {
        uid: uid,
        token: token,
      })
      .then(function (response) {
        alert("Signup is completed! Please login.");
        history.push("/login");
      })
      .catch((err) => {
        alert("Email address or user name that has already been registered.");
      });
  };

  return (
    <div className="container">
      <div className="row text-center justify-content-center">
        <div className="wrapper">
          <button className="btn btn-primary" onClick={activation}>
            Activate!
          </button>
        </div>
      </div>
    </div>
  );
};
export default SignUpActivation;
