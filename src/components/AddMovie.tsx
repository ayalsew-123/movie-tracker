import { useState, type FormEvent } from "react";
import { supabase } from "../lib/supabase";

interface AddMovieProps {
  onAdded: () => void;
  userId: string;
}

function AddMovie({ onAdded, userId }: AddMovieProps) {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState<number | "">(2024);
  const [runtime, setRuntime] = useState<number | "">(120);
  const [rating, setRating] = useState<number | "">(8);
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");

    const { error } = await supabase.from("movies").insert([
      {
        title,
        director,
        genre,
        year: Number(year),
        runtime: Number(runtime),
        rating: Number(rating),
        description,
        user_id: userId,
      },
    ]);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Movie added!");

    setTitle("");
    setDirector("");
    setGenre("");
    setYear(2024);
    setRuntime(120);
    setRating(8);
    setDescription("");

    onAdded();
  };

  return (
    <div className="card">
      <h3>Add Movie</h3>

      <form onSubmit={handleSubmit} className="form">
        <label>Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter movie title"
          required
        />

        <label>Director</label>
        <input
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          placeholder="Enter director name"
          required
        />

        <label>Genre</label>
        <input
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Enter genre"
          required
        />

        <label>Year</label>
        <input
          type="number"
          value={year}
          onChange={(e) =>
            setYear(e.target.value === "" ? "" : Number(e.target.value))
          }
          placeholder="Enter release year"
          required
        />

        <label>Runtime (minutes)</label>
        <input
          type="number"
          value={runtime}
          onChange={(e) =>
            setRuntime(e.target.value === "" ? "" : Number(e.target.value))
          }
          placeholder="Enter runtime"
          required
        />

        <label>Rating (1–10)</label>
        <input
          type="number"
          step="0.1"
          min="1"
          max="10"
          value={rating}
          onChange={(e) =>
            setRating(e.target.value === "" ? "" : Number(e.target.value))
          }
          placeholder="Enter rating"
          required
        />

        <label>Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter movie description"
          required
        />

        <button type="submit">Add Movie</button>
      </form>

      {message && <p className="success">{message}</p>}
    </div>
  );
}

export default AddMovie;