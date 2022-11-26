import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, updateUser } = useContext(AuthContext);
  const [signUpError, setSignUpError] = useState("");
  
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
        .then(() => {})
        .catch(err => console.log(err))
        
       
      })
      .catch((error) => {
        console.log(error);
        setSignUpError(error.message)
      });
  };

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
