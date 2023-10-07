import { Link } from "react-router-dom";
import retrotoy_about from "../images/retrotoy_about.jpg";

const About = () => {
  return (
    <div className="container col-12 ">
      <div className="row mx-auto text-center justify-content-center">
        <h2 className="about">About</h2>
        <img className="img-about" src={retrotoy_about} alt="About" />
        <p className="retro_toy_is">
          Retro Toy is the web board for people who want to show their Retro
          Toys.
        </p>
        <h2 className="how_to_use">How to use?</h2>
        <h3 className="for_people">For people who is looking for Toys.</h3>
        <p className="if_you">
          If you are looking for Retro Toys, search to find Retro Toys on the
          top page! Once you find a Toy, we don't intervene in any kinds of
          process, so please send a message to the owner and talk about your
          post.
        </p>
        <h3 className="for_people_want">
          For people want to show or sell their Retro Toys.
        </h3>
        <p className="go_to">
          Go to the "Post" page and create a post with precise informations. If
          somebody wants to buy it or have questions, they will contact you.
          Once you receive messages, please talk about how to proceed the
          process. We don't intervene in any kind of process.
        </p>
        <div>
          <Link
            to="/"
            className="btn btn-secondary about_down_btn col-6 col-lg-3"
          >
            Top
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
