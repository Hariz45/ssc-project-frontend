// import React, { useState } from 'react'
// import {Link,useNavigate} from "react-router-dom";

// const Register = () => {
//   const [form,SetForm]=useState({
//     name:"",
//     email:"",
//     password:""
//   }) 



// const navigate =useNavigate()

// const handleChange=(e)=>{
//   SetForm((prev)=>({
//     ...prev,[e.target.name]:e.target.value
//   }))
// } 
// const handleRegister= async(e)=>{
//   try{
//     const res=await api.post("/auth/register",form)
//     alert(res.data.message || "Registered Successfully");
//     navigate("/")
//   }catch(error){
//     console.log("error")
//   }
// }
//   return (
//     <div>
//       <h2>Register</h2>

//       <form onSubmit={handleRegister}>
//         <input 
//         type="text"
//         name="name"
//         placeholder='Enter Your Name'
//         onChange={handleRegister}
//          /> 

//          <input 
//         type="email"
//         name="email"
//         placeholder='Enter Your Email'
//         onChange={handleRegister}
//          />

//          <input 
//         type="password"
//         name="password"
//         placeholder='Enter Your password'
//         onChange={handleRegister}
//          /> 
//       </form>

//       <button>Register</button>

//       <p>
//         Already Have an Account?{""}

//         <Link to="/"/>
//         Login
//       </p>
//     </div>
//   )
// }

// export default Register

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/register", form);
      alert(res.data.message || "Registered successfully");
      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Register failed");
    }
  };

  return (
    <div className="reg-container">
      <h2 className="reg-title">Register</h2>

      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="Enter name"
          value={form.name}
          onChange={handleChange}
         className="reg-input"
        />

        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={form.email}
          onChange={handleChange}
         className="reg-input"
        />

        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={form.password}
          onChange={handleChange}
         className="reg-input"
        />

        <button className="reg-btn" type="submit">
          Register
        </button>
      </form>

      <p className="mt-4 text-sm">
        Already have an account?{" "}
        <Link to="/" className="font-semibold underline">
          Login
        </Link>
      </p>
    </div>
  );
}

export default Register;