import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProfilePage() {
    const accessToken = localStorage.getItem('accessToken');

    const Spinner = () => (
        <div className="spinner">User not found</div>
    );

    let content = <Spinner />;

    const [updateStatus, setUpdateStatus] = useState('');
    const [userData, setUserData] = useState();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8005/updateUser', userData);
            setUpdateStatus('success');
        } catch (error) {
            console.error('Error updating user data:', error);
            setUpdateStatus('error');
        }
    };

    useEffect(() => {
        async function getUser() {
            try {
                let response = await axios.get('http://localhost:8005/user', { params: { accessToken: accessToken } });
                console.log(response.data);
                setUserData(response.data);
            } catch (error) {
                console.error('Error updating user data:', error);
            }
        }
        getUser();
    }, []);

    if (userData) {
        content = (
            <div className="container mt-5">
                {/* Profile widget */}
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <img src={userData.image} alt="Admin" className="rounded-circle" width="150"></img>
                                    <div className="mt-3">
                                        <h4>{userData.name}</h4>
                                        <p className="text-primary mb-1">Rating: {userData.rating}</p>
                                        <p className="text-muted font-size-sm">ciao</p>
                                        <button className="btn btn-primary me-1">Rate</button>
                                        <button className="btn btn-outline-primary">Message</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card mb-3">
                            <div className="card-body">
                                {updateStatus === 'success' && <div className="success-message">Update successful!</div>}
                                {updateStatus === 'error' && <div className="error-message">Update failed. Please try again.</div>}
                                <form onSubmit={handleSubmit}>
                                    <div>
                                        <label>Name:</label>
                                        <input type="text" name="name" value={userData.name} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <label>Email:</label>
                                        <input type="email" name="email" value={userData.email} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <label>Phone number:</label>
                                        <input type="tel" name="phoneNumber" value={userData.phoneNumber} onChange={handleChange} required />
                                    </div>
                                    <div>
                                        <label>Address:</label>
                                        <input type="text" name="address" value={userData.address} onChange={handleChange} required />
                                    </div>
                                    <button type="submit">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-5">
            {content}
        </div>
    );
}

function SocialLink({ iconClass, title, value }) {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
            <h6 className="mb-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${iconClass} mr-2 icon-inline`}>
                    {/* The SVG path should be set based on the icon */}
                </svg>
                {title}
            </h6>
            <span className="text-primary">{value}</span>
        </li>
    );
}

function ProfileField({ title, value }) {
    return (
        <>
            <div className="row">
                <div className="col-sm-3">
                    <h6 className="mb-0">{title}</h6>
                </div>
                <div className="col-sm-9 text-primary">
                    {value}
                </div>
            </div>
            <hr />
        </>
    );
}

export default ProfilePage;