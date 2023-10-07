import axios from "axios";
import Cookies from "universal-cookie";
import { apiURL } from "./Default";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { clearUserID } from "../stores/user";
import { isLoggedInOff } from "../stores/user";

const cookies = new Cookies();

const CancelMembership = () => {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const userID = useSelector((state) => state.user.userID);
  const dispatch = useDispatch();
  const history = useHistory();
  async function deleteData() {
    const result = await axios
      .delete(apiURL + "users/" + userID, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `JWT ${cookies.get("accesstoken")}`,
        },
      })
      .then((result) => {
        alert("Your account is deleted");
        dispatch(clearUserID(result.data.id));
        dispatch(isLoggedInOff());
        history.push("/");
      })
      .catch((err) => {});
  }

  return (
    <div className="container">
      <div className="row text-center justify-content-center">
        {isLoggedIn ? (
          <div className="cancel">
            <h2>Cancel membership and delete your account?</h2>
            <button
              className="btn btn-danger mypage_btn col-6 col-lg-3"
              onClick={() => deleteData()}
            >
              Yes
            </button>
            <br></br>
            <Link
              to="/mypage"
              className="btn btn-secondary mypage_btn col-6 col-lg-3"
            >
              Back to My Pgae
            </Link>
          </div>
        ) : (
          <div>Logout</div>
        )}
      </div>
    </div>
  );
};

export default CancelMembership;
