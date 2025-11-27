import { Link } from "react-router-dom";
import "../styles/home.css";
import barbieImg from "../barbieworld.jpeg";

function Home() {
  return (
    <div className="home-box">
      <h1>Welcome to Barbie Movie World 🎀</h1>
      <p className="home-text">
        Step into a world of pink magic and adventure! Explore every Barbie movie,
        read about your favorite stories, and relive the sparkle ✨.
      </p>
      <img
  src={barbieImg}
  alt="Barbie World"
  className="home-img"
/>
      <div className="home-links">
        <Link to="/items" className="btn-home">View Movies</Link>
        <Link to="/about" className="btn-home">About</Link>
      </div>
    </div>
  );
}

export default Home;
