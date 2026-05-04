import { useCallback, useEffect, useMemo, useState } from "react";
import { supabase } from "../lib/supabase";
import AddMovie from "./AddMovie";

type Movie = {
  id: number;
  title: string;
  director: string;
  genre: string;
  year: number;
  runtime: number;
  rating: number;
  description: string;
};

function MovieList({ userId }: { userId: string }) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("All");
  const [sortBy, setSortBy] = useState("newest");

  const isLoggedIn = userId !== "";

  const loadMovies = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");

    const { data, error } = await supabase
      .from("movies")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      setErrorMessage(error.message);
      setLoading(false);
      return;
    }

    setMovies(data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadMovies();
  }, [loadMovies]);

  const genres = useMemo(() => {
    return ["All", ...new Set(movies.map((movie) => movie.genre).filter(Boolean))];
  }, [movies]);

  const filteredMovies = useMemo(() => {
    let result = [...movies];

    if (searchTerm.trim()) {
      result = result.filter((movie) =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (genreFilter !== "All") {
      result = result.filter((movie) => movie.genre === genreFilter);
    }

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "year") {
      result.sort((a, b) => b.year - a.year);
    }

    if (sortBy === "title") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [movies, searchTerm, genreFilter, sortBy]);

  const handleUpdate = async (movie: Movie) => {
    if (!userId) return;

    const newTitle = prompt("Enter new title:", movie.title);
    if (!newTitle) return;

    const { error } = await supabase
      .from("movies")
      .update({ title: newTitle })
      .eq("id", movie.id);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    await loadMovies();
  };

  const handleDelete = async (id: number) => {
    if (!userId) return;

    const confirmed = window.confirm("Are you sure you want to delete this movie?");
    if (!confirmed) return;

    const { error } = await supabase.from("movies").delete().eq("id", id);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    await loadMovies();
  };

  if (loading) {
    return (
      <section className="card">
        <h2>Movie List</h2>
        <p className="loading">Loading movies...</p>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>Movie List</h2>

      {errorMessage && <p className="error">{errorMessage}</p>}

      {isLoggedIn ? (
        <AddMovie onAdded={loadMovies} userId={userId} />
      ) : (
        <p>Sign in to add, edit, or delete movies.</p>
      )}

      <div className="controls">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select value={genreFilter} onChange={(e) => setGenreFilter(e.target.value)}>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="rating">Highest Rating</option>
          <option value="year">Newest Year</option>
          <option value="title">Title A-Z</option>
        </select>
      </div>

      {filteredMovies.length === 0 ? (
        <p>No movies found.</p>
      ) : (
        <div className="movie-grid">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <h3
  style={{ cursor: "pointer", color: "#2563eb" }}
  onClick={() =>
    alert(
      `${movie.title}\n\nDirector: ${movie.director}\nGenre: ${movie.genre}\nYear: ${movie.year}\nRuntime: ${movie.runtime} min\nRating: ${movie.rating}\n\n${movie.description}`
    )
  }
>
  {movie.title}
</h3>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Genre:</strong> {movie.genre}</p>
              <p><strong>Year:</strong> {movie.year}</p>
              <p><strong>Runtime:</strong> {movie.runtime} min</p>
              <p><strong>Rating:</strong> ⭐ {movie.rating}</p>
              <p><strong>Description:</strong> {movie.description}</p>

              {isLoggedIn && (
                <div>
                  <button className="edit-btn" onClick={() => handleUpdate(movie)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => handleDelete(movie.id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default MovieList;