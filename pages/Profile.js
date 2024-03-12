import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

function ProfilePage() {
    //const [name, setName] = useState('John Doe'); 
    //const [location, setLocation] = useState('Bay Area, San Francisco, CA'); 
    const [website, setWebsite] = useState('https://bootdey.com'); 
    const [github, setGithub] = useState('bootdey'); 
    const [twitter, setTwitter] = useState('@bootdey'); 
    const [instagram, setInstagram] = useState('bootdey'); 
    const [facebook, setFacebook] = useState('bootdey'); 
    const [email, setEmail] = useState('fip@jukmuh.al'); 
    const [phone, setPhone] = useState('239-816-9029'); 
    const [mobile, setMobile] = useState('320-380-4539'); 
    const [address, setAddress] = useState('Bay Area, San Francisco, CA'); 

    const Spinner = () => (
        <div className="spinner">User not found</div>
      );
    
    const location = useLocation();
    const agent = location.state ? location.state.agent : null;
    console.log("agent " + JSON.stringify(agent));

    let content = <Spinner />;

    if (agent) {
        content = (
            <div className="container mt-5">
            {/* Profile widget */}
            <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <div className="d-flex flex-column align-items-center text-center">
                                <img src={agent.image} alt="Admin" className="rounded-circle" width="150"></img>
                                <div className="mt-3">
                                    <h4>{agent.name}</h4>
                                    <p className="text-primary mb-1">Rating: {agent.rating}</p>
                                    <p className="text-muted font-size-sm">ciao</p>
                                    <button className="btn btn-primary me-1">Rate</button>
                                    <button className="btn btn-outline-primary">Message</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card mt-3">
                        <ul className="list-group list-group-flush">
                            <SocialLink iconClass="feather feather-globe" title="Website" value={website} />
                            <SocialLink iconClass="feather feather-github" title="Github" value={github} />
                            <SocialLink iconClass="feather feather-twitter" title="Twitter" value={twitter} />
                            <SocialLink iconClass="feather feather-instagram" title="Instagram" value={instagram} />
                            <SocialLink iconClass="feather feather-facebook" title="Facebook" value={facebook} />
                        </ul>
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="card mb-3">
                        <div className="card-body">
                            <ProfileField title="Full Name" value={agent.name} />
                            <ProfileField title="Email" value={agent.email} />
                            <ProfileField title="Phone" value={agent.phone} />
                            <ProfileField title="Mobile"  value={agent.phone} />
                            <ProfileField title="Address" value={agent.adress} />
                            <div className="row">
                                <div className="col-sm-12">
                                    <a className="btn btn-dark" target="__blank" href="https://www.bootdey.com/snippets/view/profile-edit-data-and-skills">Edit</a>
                                </div>
                            </div>
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