import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type Role = "admin" | "teacher" | "student";

interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  role?: Role;
  userId?: string;

}

function Login() {
  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [role, setRole] = useState<"teacher" | "student">("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      if (isRegister) {
        if (password !== confirmPassword) {
          setError("Passwords do not match");
          setLoading(false);
          return;
        }

        await axios.post<AuthResponse>(
          "http://localhost:5000/api/auth/register",
          {
            name,
            email,
            password,
            role,
          }
        );

        setIsRegister(false);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        alert("Registration successful. Please login.");
      } else {
        const res = await axios.post<AuthResponse>(
          "http://localhost:5000/api/auth/login",
          {
            email,
            password,
          }
        );

        const { token, role, userId } = res.data;

        localStorage.setItem("token", token!);
        localStorage.setItem("role", role!);
        localStorage.setItem("userId", userId!);
        localStorage.setItem("isAuthenticated", "true");

        if (role === "admin") {
          navigate("/admin/dashboard", { replace: true });
        } else if (role === "teacher") {
          navigate("/teacher/dashboard", { replace: true });
        } else if (role === "student") {
          navigate("/student/dashboard", { replace: true });
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(
          error.response?.data?.message || "Something went wrong"
        );
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white border rounded-2xl shadow-lg p-8">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900">
              {isRegister ? "Create Account" : "Welcome Back"}
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              {isRegister
                ? "Create your account"
                : "Login to your account"}
            </p>
          </div>

          {error && (
            <div className="mb-5 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {isRegister && (
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  type="text"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}

            {isRegister && (
              <div className="space-y-2">
                <Label>Role</Label>

                <select
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value as "teacher" | "student")
                  }
                  className="w-full h-10 border rounded-md px-3"
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                </select>
              </div>
            )}

            <div className="space-y-2">
              <Label>Email</Label>

              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Password</Label>

              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {isRegister && (
              <div className="space-y-2">
                <Label>Confirm Password</Label>

                <Input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  required
                />
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700"
            >
              {loading
                ? isRegister
                  ? "Registering..."
                  : "Logging in..."
                : isRegister
                ? "Register"
                : "Login"}
            </Button>
          </form>

          <div className="text-center mt-6 text-sm">
            {isRegister ? (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(false);
                    setError("");
                  }}
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Login
                </button>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <button
                  type="button"
                  onClick={() => {
                    setIsRegister(true);
                    setError("");
                  }}
                  className="text-indigo-600 font-medium hover:underline"
                >
                  Register
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;