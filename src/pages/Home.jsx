import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Journal from "../components/home/Journal";
import Mood from "../components/home/Mood";
import Music from "../components/home/Music";
import Sleep from "../components/home/Sleep";
import Footer from "../components/home/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />

      <main className="main-content">
        <Mood />
        <Journal />
        <Music />
        <Sleep />
      </main>

      <Footer />
    </>
  );
}

export default Home;