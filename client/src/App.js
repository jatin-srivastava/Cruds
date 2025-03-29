
import Update from "./updateUser/Update.jsx";
import User from "./getUser/User.jsx"

import './App.css';
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import AddUser from "./addUser/AddUser.jsx";
function App() {
  const route = createBrowserRouter([{
    path:"/",
    element:<User/>
  },
  {
    path:"/add",
    element:<AddUser/>
  },
  
{
  path:"/update/user/:id",
  element:<Update/>

  }
  ])
  return (
    <>
    <div className="App">
    <RouterProvider router={route}></RouterProvider>

      </div>
    </>
  );
}

export default App;
