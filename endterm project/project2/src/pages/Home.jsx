import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/Home.css"
export default function Home() {
  return (
    <>
      <Navbar />
      <main className="home-page">
        <h1>Welcome to Ocdrify</h1>
        <p>
          Ocdrify is your ultimate music companion. Explore a wide collection of songs,
          discover new artists, and enjoy your favorite tracks anytime, anywhere.
          Whether you're relaxing, studying, or just spending time with friends,
          Ocdrify makes every moment more enjoyable with seamless music streaming.
          Dive in, find your rhythm, and let the music take over!
        </p>
      </main>
      <Footer />
    </>
  );
}

