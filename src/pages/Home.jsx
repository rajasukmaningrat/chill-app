import { useState } from "react";
import AddMovie from "../components/home/AddMovie";

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
  const [movies, setMovies] = useState([
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
  ]);

  const [newMovie, setNewMovie] = useState({
    title: "",
    image: "",
    rating: "",
    age: "13+",
    type: "Movie",
    genres: "",
  });

  const [editMovie, setEditMovie] = useState(null);

  const deleteMovie = (id) => {
    setMovies((currentMovies) =>
      currentMovies.filter((movie) => movie.id !== id)
    );
  };

  const addMovie = (event) => {
    event.preventDefault();

    if (!newMovie.title || !newMovie.image || !newMovie.rating) return;

    const movie = {
      id: Date.now(),
      title: newMovie.title,
      image: newMovie.image,
      rating: newMovie.rating,
      age: newMovie.age,
      type: newMovie.type,
      genres: newMovie.genres.split(",").map((genre) => genre.trim()),
    };

    setMovies((currentMovies) => [...currentMovies, movie]);

    setNewMovie({
      title: "",
      image: "",
      rating: "",
      age: "13+",
      type: "Movie",
      genres: "",
    });
  };

  const updateMovie = (updatedMovie) => {
    setMovies((currentMovies) =>
      currentMovies.map((movie) =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      )
    );

    setEditMovie(null);
  };

  return (
    <>
      <Navbar />
      <Hero />

      <main className="main-content">
        <Mood
          movies={movies}
          onDeleteMovie={deleteMovie}
          onEditMovie={setEditMovie}
        />

        <AddMovie
          newMovie={newMovie}
          setNewMovie={setNewMovie}
          onAddMovie={addMovie}
        />

        <Journal />
        <Music />
        <Sleep />
      </main>

      <Footer />
    </>
  );
}

export default Home;