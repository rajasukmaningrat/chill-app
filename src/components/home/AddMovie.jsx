import { Plus } from "lucide-react";

function AddMovie({newMovie, setNewMovie, onAddMovie}) {
  return (
    <section className="add-movie-section">
      <h2 className="section-title">Tambah Film</h2>

      <form className="add-movie-form" onSubmit={onAddMovie}>
        <input
          type="text"
          placeholder="Judul film"
          value={newMovie.title}
          onChange={(event) => setNewMovie({...newMovie, title: event.target.value})}
        />

        <input
          type="text"
          placeholder="URL gambar"
          value={newMovie.image}
          onChange={(event) => setNewMovie({...newMovie, image: event.target.value})}
        />

        <input
          type="text"
          placeholder="Rating"
          value={newMovie.rating}
          onChange={(event) => setNewMovie({...newMovie, rating: event.target.value})}
        />

        <input
          type="text"
          placeholder="Genre, contoh: Action, Drama, Fantasy"
          value={newMovie.genres}
          onChange={(event) => setNewMovie({...newMovie, genres: event.target.value})}
        />

        <button type="submit">
          <Plus size={18} />
          Tambah Film
        </button>
      </form>
    </section>
  );
}

export default AddMovie;