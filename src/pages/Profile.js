import React, { useState, useEffect } from 'react';
import ProductResultsBody from '../components/products/ProductResultsBody';
import SimpleProductList from '../components/products/SimpleProductList';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function ProfilePage() {
    const accessToken = localStorage.getItem('accessToken');

    let content = <div className="spinner">Loading...</div>;

    const [updateStatus, setUpdateStatus] = useState('');
    const [userData, setUserData] = useState();
    const [userProperties, setUserProperties] = useState();
    const [UserInterests, setUserInterests] = useState();
    const navigate = useNavigate();
    const idToken = localStorage.getItem('idToken');
    const decoded = jwtDecode(idToken);
    const userId = decoded.sub;

    const updateUserFields = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleUpdateUserSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post('/updateUser', userData);
            setUpdateStatus('success');
        } catch (error) {
            setUpdateStatus('error');
        }
    };

    const handleDeleteUser = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.get('/deleteUser', { params: { accessToken: accessToken } });
            localStorage.removeItem('accessToken');
            navigate('/');
        } catch (error) {
            navigate('/');
        }
    };

    useEffect(() => {
        async function getUserProperties(username) {
            try {
                let response = await axiosInstance.get(`/fetchPropertiesByUser`, { params: { userId: username } });

                setUserProperties(response.data);
            } catch (error) {
                console.error('Error fetching user properties:', error);
            }
        }
        async function getUserInterests(userId) {
            try {
                //let response = await axiosInstance.get(`/fetchInterestsByUser`, { params: { userId: username /*accessToken: accessToken*/ } });
                const response = await axios.get(`http://localhost:7200/fetchInterestsByUser?userId=${encodeURIComponent(userId)}`);
                const interestIds = response.data.map(interest => interest.propertyId);
                setUserInterests(interestIds);
            } catch (error) {
                console.error('Error fetching user properties:', error);
            }
        }

        async function getUserData() {
            try {
                let response = await axiosInstance.get('/user', { params: { accessToken: accessToken } });
                setUserData(response.data);
                getUserInterests(userId);
                getUserProperties(response.data.username);
            } catch (error) {
                console.error('Error fetching user data:', error);
                content = <div className="spinner">User not found</div>;
            }
        }

        getUserData();
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
                                        <button className="btn btn-danger me-1" onClick={handleDeleteUser}>
                                            <FontAwesomeIcon icon="fa-solid fa-trash" />
                                        </button>
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
                                <ProductResultsBody properties={userProperties} />
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12">
                        <div className="card mb-3">
                            <h4 className="card-header">Properties you are interested in</h4>
                            <div className="card-body">
                                <SimpleProductList propertyIds={UserInterests} />
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