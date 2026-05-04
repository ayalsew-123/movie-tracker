import { useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "./lib/supabase";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import MovieList from "./components/MovieList";

function App() {
  const [session, setSession] = useState<Session | null>(null);
  const [view, setView] = useState<"home" | "signin" | "signup" | "movies">(
    "home"
  );

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      <nav>
        <div className="nav-left">
          <h1 className="logo" onClick={() => setView("home")}>
            🎬 MovieTracker
          </h1>

          <button onClick={() => setView("home")}>Home</button>
          <button onClick={() => setView("movies")}>Movies</button>
        </div>

        <div>
          {session ? (
            <>
              <span className="user-email">{session.user.email}</span>
              <button
                onClick={() => {
                  supabase.auth.signOut();
                  setView("home");
                }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <button onClick={() => setView("signin")}>Sign In</button>
              <button onClick={() => setView("signup")}>Sign Up</button>
            </>
          )}
        </div>
      </nav>

      {view === "home" && (
        <div className="card">
          <h2>🎬 Movie Tracker</h2>

          <p>Browse movies, search, filter, and explore your collection.</p>

          <ul style={{ marginTop: "1rem", lineHeight: "1.8" }}>
            <li>🔍 Search movies by title</li>
            <li>🎬 Filter by genre</li>
            <li>⭐ Sort by rating and year</li>
            <li>🔐 Sign in to add, edit, and delete movies</li>
          </ul>

          {!session && (
            <div style={{ marginTop: "1.5rem" }}>
              <button onClick={() => setView("signin")}>Get Started</button>
            </div>
          )}
        </div>
      )}

      {view === "signin" && (
        <SignIn onSignInSuccess={() => setView("movies")} />
      )}

      {view === "signup" && <SignUp />}

      {view === "movies" && <MovieList userId={session?.user.id || ""} />}
    </>
  );
}

export default App;