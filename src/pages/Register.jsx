import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      await registerUser(name, email, password);
      navigate("/login"); // Redirect to login after successful registration
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-white text-2xl font-semibold mb-4 text-center">Register</h2>
        {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Email</label>
            <input
            placeholder="Enter your email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Enter your password again"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white focus:ring focus:ring-blue-500"
              required
            />
            {confirmPassword && password !== confirmPassword && (
              <p className="text-red-500 text-xs mt-1">Passwords do not match!</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600"
            disabled={password !== confirmPassword} // Disable button if passwords don't match
          >
            Register
          </button>
        </form>
        <p className="text-gray-400 text-sm text-center mt-3">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Login Here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
