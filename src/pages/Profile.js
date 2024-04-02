import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductListBody from '../components/products/ProductListBody';

function ProfilePage() {
    const accessToken = localStorage.getItem('accessToken');

    let content = <div className="spinner">Loading...</div>;

    const [updateStatus, setUpdateStatus] = useState('');
    const [userData, setUserData] = useState();
    const [userProperties, setUserProperties] = useState();

    const updateUserFields = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleUpdateUserSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8005/updateUser', userData);
            setUpdateStatus('success');
        } catch (error) {
            setUpdateStatus('error');
        }
    };

    useEffect(() => {
        async function getUser() {
            try {
                let response = await axios.get('http://localhost:8005/user', { params: { accessToken: accessToken } });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
                content = <div className="spinner">User not found</div>;
            }
        }
        getUser();

        async function getUserProperties() {
            try {
                let response = await axios.get(`http://localhost:8005/properties/${userData.username}`, { params: { accessToken: accessToken } });
                setUserProperties(response.data);
            } catch (error) {
                console.error('Error fetching user properties:', error);
            }
        }
        getUserProperties();
    }, []);

    if (userData) {
        content = (
            <div className="container mt-5">
                {/* Profile widget */}
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3 flex-fill">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="d-flex flex-column align-items-center text-center">
                                    <div className="mt-3">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150" />
                                        <h4>{userData.username}</h4>
                                        {/* <p className="text-primary mb-1">Rating: {userData.rating}</p>
                                        <p className="text-muted font-size-sm">ciao</p>
                                        <button className="btn btn-primary me-1">Rate</button>
                                        <button className="btn btn-outline-primary">Message</button> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card mb-3">
                            <h4 className="card-header">Personal Details</h4>
                            <div className="card-body">
                                {updateStatus === 'success' && <div className="alert alert-success">Update successful!</div>}
                                {updateStatus === 'error' && <div className="alert alert-danger">Update failed. Please try again.</div>}
                                <form onSubmit={handleUpdateUserSubmit}>
                                    <ProfileField title="Name" type="text" name="name" value={userData.name} onChange={updateUserFields} />
                                    <ProfileField title="Email" type="email" name="email" value={userData.email} onChange={updateUserFields} />
                                    <ProfileField title="Phone Number" type="tel" name="phoneNumber" value={userData.phoneNumber} onChange={updateUserFields} />
                                    <button type="submit" className="btn btn-primary">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="card mb-3">
                            <h4 className="card-header">Your Properties</h4>
                            <div className="card-body">
                                <ProductListBody products={userProperties} />
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

function ProfileField({ title, type, name, value, onChange }) {
    return (
        <>
            <div className="row">
                <div className="col-sm-3">
                    <h6 className="mb-0">{title}</h6>
                </div>
                <div className="col-sm-9 text-primary">
                    <input type={type} name={name} value={value} onChange={onChange} required />
                </div>
            </div>
            <hr />
        </>
    );
}

export default ProfilePage;