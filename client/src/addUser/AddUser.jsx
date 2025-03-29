import React, { useState } from 'react';
import "../addUser/addUser.css";
import axios from 'axios';
import toast from "react-hot-toast";
import { useNavigate  } from "react-router-dom";

const AddUser = () => {
    const users = {
        name: "",
        email: "",
        address: ""
    };
    
    const [user, setUser] = useState(users);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        console.log(name, value);

        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post("http://localhost:4000/api/user", user);
            toast.success(response.data.message, { position: "top-right" });
            setUser(users); // Reset form after successful submission
            navigate("/"); // Redirect to home or any other page
        } catch (error) {
            toast.error("Error creating user. Please try again.", { position: "top-right" });
            console.error("There was an error creating the user:", error);
        }
    };

    const handleBack = () => {
        navigate(-1); // Goes back to the previous page
    };

    return (
        <div className="form-container">
            <h2>Add User</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="address">Address:</label>
                    <textarea
                        id="address"
                        name="address"
                        value={user.address}
                        onChange={handleChange}
                        placeholder="Enter your address"
                        required
                    />
                </div>
                <div className="button-group">
                    <button type="submit" className="submit-btn">Submit</button>
                    <button to="/" type="button" className="back-btn" onClick={handleBack}>Back</button>
                </div>
            </form>
        </div>
    );
};

export default AddUser;
