import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
// import useToken from "../../hooks/useToken";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUser } = useContext(AuthContext);
  const [signUpError, setSignUpError] = useState("");
  // const [createdUserEmail, setCreateUserEmail] = useState("");
  // const [token] = useToken(createdUserEmail);
  const navigate = useNavigate()

  // if (token) {
  //   navigate("/");
  // }
  
  const handleSignUp = (data) => {
    console.log(data)
    setSignUpError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("User Created Successfully");
        const userInfo = {
          displayName: data.name
        }
        updateUser(userInfo)
        .then(() => {
          saveUser(data.name, data.email, data.role);
        })
        .catch(err => console.log(err))             
      })
      .catch((error) => {
        console.log(error);
        setSignUpError(error.message)
      });
  };

  const saveUser = (name, email, role) => {
    const user = {name, email, role}
    fetch('http://localhost:5000/users', {
      method: "POST",
      headers: {
        "content-type": 'application/json'
      },
      body: JSON.stringify(user)
    })
    .then(res => res.json())
    .then(data => {
      getUserToken(email)
      
    })
  }

  const getUserToken = email => {
    fetch(`http://localhost:5000/jwt?email=${email}`)
    .then(res => res.json())
    .then(data => {
      if(data.accessToken){
        localStorage.setItem('accessToken', data.accessToken)
        navigate('/')
      }
    })
  }



  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7 shadow-md rounded-lg">
        <h2 className="text-xl text-center">Sign Up</h2>

        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input
              type="text"
              {...register("name", {
                required: "name is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.name && (
              <p className="text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              {...register("email", {
                required: "email is required",
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              {...register("password", {
                required: "password is required",
                minLength: {
                  value: 6,
                  message: "password must be 6 character long",
                },
                pattern: {
                  value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                  message:
                    "password must uppercase number and special character",
                },
              })}
              className="input input-bordered w-full max-w-xs"
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
          <label className="label">
              <span className="label-text">Role</span>
            </label>
            <select {...register("role", { required: "role is required" })} className="input input-bordered w-full max-w-xs">
              <option value="">Select...</option>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </select>
            {errors.role && (
              <p className="text-red-500">{errors.role.message}</p>
            )}
          </div>

          <input
            className="btn btn-primary text-white w-full mt-4"
            value="Sign Up"
            type="submit"
          />
          {signUpError && <p className="text-red-600">{signUpError}</p>}
        </form>

        <p className="mt-2">
          Already have an account.
          <Link to="/login" className="text-primary font-bold ml-1">
            Login
          </Link>
        </p>
        <div className="divider">OR</div>
        <button className="btn btn-outline btn-primary w-full">
          continue with google
        </button>
      </div>
    </div>
  );
};

export default SignUp;
