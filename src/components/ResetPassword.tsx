import { useState, type FormEvent } from "react";
import { supabase } from "../lib/supabase";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });

    setLoading(false);

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Password reset email sent. Check your inbox.");
  };

  return (
    <div className="card">
      <h2>Reset Password</h2>

      <form onSubmit={handleReset} className="form">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Email"}
        </button>
      </form>

      {message && (
        <p className={message.includes("sent") ? "success" : "error"}>
          {message}
        </p>
      )}
    </div>
  );
}

export default ResetPassword;