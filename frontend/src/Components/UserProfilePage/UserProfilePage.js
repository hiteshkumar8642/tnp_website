import React, { useState } from 'react';
import './UserProfilePage.css';

function ProfilePage() {
    const initialData = JSON.parse(localStorage.getItem('user_detail'));
    const [userData, setUserData] = useState(initialData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/dashboard/api/update-details/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken') // Django CSRF token for security
                },
                body: JSON.stringify(userData),
            });
            if (response.ok) {
                alert('Details updated successfully!');
                // Optionally update local storage
                localStorage.setItem('user_detail', JSON.stringify(userData));
            } else {
                alert('Failed to update details.');
            }
        } catch (error) {
            console.error('Error updating details:', error);
            alert('An error occurred while updating details.');
        }
    };

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            const cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                const cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === `${name}=`) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    };


    const openPDF = (pdfPath) => {
        window.open(pdfPath, '_blank', 'toolbar=0,location=0,menubar=0');
    };

    return (
        <div className="profile-page">
            {/* Navbar Top */}
            

            {/* Sidenav */}
            <div className="sidenav">
                <div className="profile">
                    <img src={userData.photo} alt="Profile" width="100" height="100" />
                    <div className="name">
                        <p>{userData.user.first_name} {userData.user.last_name}</p>
                    </div>
                    <div className="job">{userData.user.username}</div>
                </div>

                <div className="sidenav-url">
                    <div className="url">
                       
                        <hr align="center" />
                    </div>
                    <div className="url">
                        <a href="#" onClick={() => openPDF(userData.resume)}>Resume</a>
                    </div>
                    <div className="url">
                        <a href="#" onClick={() => openPDF(userData.graduation_marksheet)}>Graduation Marksheet</a>
                    </div>
                    <div className="url">
                        <a href="#" onClick={() => openPDF(userData.twelfth_marksheet)}>XII Marksheet</a>
                    </div>
                    <div className="url">
                        <a href="#" onClick={() => openPDF(userData.tenth_marksheet)}>X Marksheet</a>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="main">
                <div className="card">
                    <div className="card-body">
                        <table>
                            <tbody>
                                <tr><td>First name</td><td>:</td><td>{userData.user.first_name}</td></tr>
                                <tr><td>Last name</td><td>:</td><td>{userData.user.last_name}</td></tr>
                                <tr><td>Email</td><td>:</td><td>{userData.user.email}</td></tr>
                                <tr><td>Department</td><td>:</td><td>{userData.department}</td></tr>
                                <tr><td>Mobile</td><td>:</td><td>{userData.mobile}</td></tr>
                                <tr><td>10th marks percentage</td><td>:</td><td>{userData.tenth_percentage}</td></tr>
                                <tr><td>12th marks percentage</td><td>:</td><td>{userData.twelfth_percentage}</td></tr>
                                <tr><td>Graduation CGPA</td><td>:</td><td>{userData.graduation_cgpa}</td></tr>
                                <tr><td>Gap after 12th</td><td>:</td><td>{userData.gap_after_twelfth}</td></tr>
                                <tr><td>Gap after graduation</td><td>:</td><td>{userData.gap_after_graduation}</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Current CGPA</td><td>:</td>
                                        <td><input type="number" name="current_cgpa" value={userData.current_cgpa} min="0" max="10" step="0.01" onChange={handleChange} required /></td>
                                    </tr>
                                    <tr>
                                        <td>No. of Backlogs</td><td>:</td>
                                        <td><input type="number" name="backlogs" value={userData.backlogs} onChange={handleChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Codeforces</td><td>:</td>
                                        <td><input type="url" name="codeforces_profile" value={userData.codeforces_profile} onChange={handleChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Codechef</td><td>:</td>
                                        <td><input type="url" name="codechef_profile" value={userData.codechef_profile} onChange={handleChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Leetcode</td><td>:</td>
                                        <td><input type="url" name="leetcode_profile" value={userData.leetcode_profile} onChange={handleChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>GitHub</td><td>:</td>
                                        <td><input type="url" name="github_profile" value={userData.github_profile} onChange={handleChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Portfolio</td><td>:</td>
                                        <td><input type="url" name="portfolio_link" value={userData.portfolio_link} onChange={handleChange} /></td>
                                    </tr>
                                    <tr>
                                        <td>Other website</td><td>:</td>
                                        <td><input type="url" name="other_website_link" value={userData.other_website_link} onChange={handleChange} /></td>
                                    </tr>
                                    <tr><td><input className="save-button" type="submit" value="Update details" /></td></tr>
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;