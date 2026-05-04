import { useState, type FormEvent } from "react";
import { supabase } from "../lib/supabase";

function SignIn({ onSignInSuccess }: { onSignInSuccess: () => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Signed in successfully!");

    setTimeout(() => {
      onSignInSuccess();
    }, 800);
  };

  const handleResetPassword = async () => {
    setMessage("");

    if (!email) {
      setMessage("Please enter your email first.");
      return;
    }

    setResetLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });

    setResetLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Password reset email sent. Please check your inbox.");
  };

  return (
    <div className="card">
      <h2>Sign In</h2>

      <form onSubmit={handleSignIn} className="form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <button
          type="button"
          onClick={handleResetPassword}
          disabled={resetLoading}
        >
          {resetLoading ? "Sending..." : "Forgot Password?"}
        </button>
      </form>

      {message && (
        <p className={message.includes("success") || message.includes("sent") ? "success" : "error"}>
          {message}
        </p>
      )}
    </div>
  );
}

export default SignIn;