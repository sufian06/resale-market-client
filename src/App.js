import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import "./App.css";
import router from "./Routes/Routes/Routes";

function App() {
  return (
    <div >
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;

/**
 * https://ibb.co/GQkT0vV
https://ibb.co/HD1MgnT
https://ibb.co/hXhP6dB
 */
