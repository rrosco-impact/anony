
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";

const Login = () => {
  const [form, setForm] = useState({ email_address: "", password: "" });
  const navigate = useNavigate();
  const { setUser } = useAuth();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", form);
      localStorage.setItem("token", res.data.token);

      // Fetch user info
      const userRes = await axios.get("http://localhost:3000/api/users/me", {
        headers: { Authorization: `Bearer ${res.data.token}` },
      });
        const role = userRes.data.user?.user_type || userRes.data.user_type;
      setUser(userRes.data.user);
       if (role === "admin") navigate("/admin");
        else if (role === "team_owner") navigate("/owner");
        else if (role === "member") navigate("/member");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div className=" min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-xl my-5">Log in</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 min-w-87 ">
        <input className="rounded-lg border border-slate-300 p-2" name="email_address" placeholder="Email" onChange={handleChange} />
        <input className="rounded-lg border border-slate-300 p-2" name="password" type="password" placeholder="Password" onChange={handleChange} />
        <button className="text-white rounded-lg border border-slate-300 p-2 bg-[#202124]" type="submit">Login</button>
        </form>
          <div className="text-center mt-5">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/register" className="underline text-blue-600 hover:text-blue-500 font-medium">
              Sign up
            </a>
          </p>
        </div>
    </div>
  );
};

export default Login;
