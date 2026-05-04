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

    // reset form
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
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
          required
        />

        <input
          value={director}
          onChange={(e) => setDirector(e.target.value)}
          placeholder="Director"
          required
        />

        <input
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          placeholder="Genre"
          required
        />

        <input
          type="number"
          value={year}
          onChange={(e) =>
            setYear(e.target.value === "" ? "" : Number(e.target.value))
          }
          placeholder="Year"
          required
        />

        <input
          type="number"
          value={runtime}
          onChange={(e) =>
            setRuntime(e.target.value === "" ? "" : Number(e.target.value))
          }
          placeholder="Runtime (minutes)"
          required
        />

        <input
          type="number"
          step="0.1"
          value={rating}
          onChange={(e) =>
            setRating(e.target.value === "" ? "" : Number(e.target.value))
          }
          placeholder="Rating (1–10)"
          required
        />

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />

        <button type="submit">Add Movie</button>
      </form>

      {message && <p className="success">{message}</p>}
    </div>
  );
}

export default AddMovie;