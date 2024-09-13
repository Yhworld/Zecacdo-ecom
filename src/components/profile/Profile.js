// Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Profile() {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const token = sessionStorage.getItem('access_token');
            try {
                const response = await axios.get('http://localhost:8080/api/profile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    if (!profile) {
        return <div>Loading profile...</div>;
    }

    return (
        <div>
            <h1>Profile</h1>
            <pre>{JSON.stringify(profile, null, 2)}</pre>
        </div>
    );
}

export default Profile;
