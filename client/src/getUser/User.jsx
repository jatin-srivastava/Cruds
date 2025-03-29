import React, { useEffect, useState } from "react";
import "../getUser/user.css"; // Import your CSS file
import axios from "axios";
import { Link } from "react-router-dom";
import toast from "react-hot-toast"

function User() {
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/users");
        setUser(response.data);
      } catch (error) {
        console.log("Error when fetching data:", error);
      }
    };
    fetchData();
  }, []);
  const deleteUser = async (userId)=>{
    await axios.delete(`http://localhost:4000/api/delete/user/${userId}`)
    .then((response)=>{
      setUser((prevUser)=>prevUser.filter((user)=>user._id !==userId))
      toast.success(response.data.message,{position:"top-right"})
    })
    
    .catch((err)=>{
      console.log(err);
    })
  }

  return (
    <>
      <div className="userTable">
        {/* Add User button with icon */}
        <Link to="/add" type="button" className="btn btn-primary">
          <i className="fas fa-user-plus" aria-hidden="true"></i> Add User
        </Link>
        {
  user.length === 0 ? (
    <div>
      <h2>No data available</h2>
      <p>plz add new user</p>
    </div>
  ):(
    <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">S no.</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Address</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {
            user.map((user, index) => {
              return (
                <tr key={user.id || index}> {/* Use user ID as key if available */}
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.address}</td>
                  <td>
                    <Link to={`/update/user/`+user._id} className="btn btn-warning btn-sm">
                      <i className="fas fa-pen" aria-hidden="true"></i> Update
                    </Link>

                    <button   
                    onClick={()=>deleteUser(user._id)}
                    className="btn btn-danger btn-sm">
                      <i className="fas fa-trash" aria-hidden="true"></i> Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
  ) }

        
      </div>
    </>
  );
}

export default User;
 