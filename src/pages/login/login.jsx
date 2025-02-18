import axios from "axios";
import "./login.css";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleOnSubmit(e){
    e.preventDefault()
    console.log(email , password)

    axios.post("http://localhost:3000/api/users/login",
      {
        email : email,
        password : password
      }
    ).then((res)=>{

      console.log(res)
      toast.success("Login Success")
      const user = res.data.user
      localStorage.setItem("token",res.data.token)
      console.log(user)
      
      if(user.role === "admin"){
        navigate("/admin/")
      }else{
        navigate("/")
      }
      

    }).catch((err)=>{
      console.log(err)
      toast.error(err.response.data.error)
    })

  }

  return (
    <div className="bg-picture w-full h-screen  flex justify-center items-center">
      <form onSubmit={handleOnSubmit}>
        <div className="w-[400px] h-[450px] backdrop-blur-xl bg-white/10 rounded-2xl shadow-2xl flex flex-col justify-center items-center p-8 relative">
          {/* Logo */}
          <img
            src="/logo.png"
            alt="logo"
            className="w-[100px] h-[100px] object-cover mb-8"
          />

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-6 bg-transparent border-b-2 border-white text-white placeholder-white/80 focus:outline-none focus:border-yellow-400 transition-all"
          />

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-8 bg-transparent border-b-2 border-white text-white placeholder-white/80 focus:outline-none focus:border-yellow-400 transition-all"
          />

          {/* Login Button */}
          <button
            type="submit"
            className="w-full p-3 bg-[#efac38] text-white text-xl font-semibold rounded-lg hover:bg-[#d89b32] focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 transition-all"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
