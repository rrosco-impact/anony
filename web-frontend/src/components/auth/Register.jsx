
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    email_address: "",
    password: "",
    user_type: "member", 
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3000/api/auth/register", form);
      alert("Registration successful! Please login.");
       navigate("/login");
    } catch (err) {
       alert("Registration failed: " + (err.response?.data?.error || "Unknown error"));
    }
  };

  return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">

        <h1 className="text-xl my-5">Register</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
             <span className="font-medium">Personal Information</span>
            <div className="flex gap-3">
                <input className="rounded-lg border border-slate-300 p-2" name="first_name" placeholder="First Name" onChange={handleChange} />
                <input className="rounded-lg border border-slate-300 p-2" name="middle_name" placeholder="Middle Name" onChange={handleChange} />
            </div>
            <input className="rounded-lg border border-slate-300 p-2" name="last_name" placeholder="Last Name" onChange={handleChange} />
           
              <span className="font-medium">Credentials</span>
            <input className="rounded-lg border border-slate-300 p-2" name="email_address" placeholder="Email" onChange={handleChange} />
            <input className="rounded-lg border border-slate-300 p-2" type="password" name="password" placeholder="Password"  onChange={handleChange} />
            <select className="rounded-lg border border-slate-300 p-2" name="user_type" onChange={handleChange}>
                <option value="member">Member</option>
                <option value="team_owner">Owner</option> 

            </select>
            <button className="text-white rounded-lg border border-slate-300 p-2 bg-[#202124]" type="submit">Register</button>
        </form>
        <div className="text-center mt-5">
          <p className="text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="underline text-blue-600 hover:text-blue-500 font-medium">
              Sign in
            </a>
          </p>
        </div>
    </div>
  );
};

export default Register;

