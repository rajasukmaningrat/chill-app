import { useState } from "react";

import Navbar from "../components/home/Navbar";
import Hero from "../components/home/Hero";
import Mood from "../components/home/Mood";
import Journal from "../components/home/Journal";
import Music from "../components/home/Music";
import Sleep from "../components/home/Sleep";
import Footer from "../components/home/Footer";

import dontLookup from "../assets/images/desktop/dontlookupD.png";
import batman from "../assets/images/desktop/batmanD.png";
import blackAdam from "../assets/images/desktop/blackadamD.png";
import avatar from "../assets/images/desktop/avatarD.png";
import sonic from "../assets/images/desktop/sonicD.png";

function Home() {
  const movies = [
    {
      id: 1,
      title: "Don't Look Up",
      image: dontLookup,
      rating: "4.5/5",
      age: "13+",
      type: "Movie",
      genres: ["Komedi", "Drama", "Sains & Fiksi"],
    },
    {
      id: 2,
      title: "Batman",
      image: batman,
      rating: "4.5/5",
      age: "13+",
      type: "Movie",
      genres: ["Action", "Drama", "Crime"],
    },
    {
      id: 3,
      title: "Black Adam",
      image: blackAdam,
      rating: "4.8/5",
      age: "13+",
      type: "Movie",
      genres: ["Action", "Adventure", "Fantasy"],
    },
    {
      id: 4,
      title: "Avatar",
      image: avatar,
      rating: "4.8/5",
      age: "13+",
      type: "Movie",
      genres: ["Action", "Adventure", "Fantasy"],
    },
    {
      id: 5,
      title: "Sonic The Hedgehog",
      image: sonic,
      rating: "4.8/5",
      age: "13+",
      type: "Movie",
      genres: ["Action", "Adventure", "Comedy"],
    },
  ];

  const [newMovie, setNewMovie] = useState({
    title: "",
    image: "",
    rating: "",
    age: "13+",
    type: "Movie",
    genres: "",
  });

  return (
    <>
      <Navbar />
      <Hero />

      <main className="main-content">
        <Mood movies={movies}/>
        <Journal />
        <Music />
        <Sleep />
      </main>

      <Footer />
    </>
  );
}

export default Home;