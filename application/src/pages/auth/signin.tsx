import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

export default function SignInPage() {
  const [email, setEmail] = useState("abc@xyz.com");
  const [password, setPassword] = useState("abc");
  const [role, setRole] = useState("user"); // Default role is 'user'
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
      role,
    });

    if (result?.error) {
      setError(result.error);
    } else if (result?.ok) {
      const res = await fetch("/api/auth/session");
      const session = await res.json();

      if (session?.user?.role) {
        const userRole = role;
        // Redirect based on the role
        router.push(
          userRole === "admin"
            ? "/admin"
            : userRole === "ngo"
            ? "/ngo/dashboard"
            : "/user/dashboard"
        );
      } else {
        setError("Failed to fetch user role. Please try again.");
      }
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h1 className="form-title">Sign In</h1>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="input-field"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="input-field"
          />
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="select-role"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="ngo">NGO</option>
          </select>
          <button type="submit" className="submit-btn">Sign In</button>
        </form>
        <p className="footer">
          Don't have an account?{" "}
          <a href="/signup" className="footer-link">
            Sign Up
          </a>
        </p>
      </div>

      <style jsx>{`
        .form-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background-color: #f9f9f9; /* Subtle gray background */
        }

        .form-card {
          background-color: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          width: 100%;
          max-width: 400px;
        }

        .form-title {
          font-size: 1.5rem;
          font-weight: bold;
          text-align: center;
          margin-bottom: 1.5rem;
          color: #333; /* Dark gray for text */
        }

        .input-field,
        .select-role {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 1rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          color: #333;
        }

        .input-field:focus,
        .select-role:focus {
          border-color: #000; /* Black border on focus */
          outline: none;
        }

        .submit-btn {
          width: 100%;
          padding: 0.75rem;
          background-color: black;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
          transition: background-color 0.3s ease;
        }

        .submit-btn:hover {
          background-color: #333;
        }

        .error-message {
          color: red;
          font-size: 0.875rem;
          text-align: center;
          margin-bottom: 1rem;
        }

        .footer {
          text-align: center;
          font-size: 0.875rem;
          color: #333;
        }

        .footer-link {
          color: black;
          font-weight: bold;
          text-decoration: none;
        }

        .footer-link:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}
