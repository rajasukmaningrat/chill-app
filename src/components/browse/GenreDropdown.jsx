import { ChevronDown } from "lucide-react";

import { ALL_GENRE } from "../../utils/browse";

function GenreDropdown({ genres, value, onChange }) {
  return (
    <div className="genre-dropdown">
      <select
        className="genre-select"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label="Pilih genre"
      >
        <option value={ALL_GENRE}>{ALL_GENRE}</option>

        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      <ChevronDown className="genre-dropdown-icon" size={18} />
    </div>
  );
}

export default GenreDropdown;
