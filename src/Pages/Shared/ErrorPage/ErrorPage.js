import React, { useContext } from "react";
import { useNavigate, useRouteError } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";
import useTitle from "../../../hooks/useTitle";

const ErrorPage = () => {
  useTitle("ErrorPage")
  const { logOut } = useContext(AuthContext);
  const error = useRouteError();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((error) => console.error(error));
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <p className="text-red-500">Something went wrong!</p>
      <h2 className="text-red-500 text-4xl">404</h2>
      <p className="text-red-400 text-2xl">{error.statusText || error.message}</p>
      <h4 className="text-2xl">
        Please <button onClick={handleLogOut} className="text-primary font-bold">Sign out</button> and log back in
      </h4>
    </div>
  );
};

export default ErrorPage;
