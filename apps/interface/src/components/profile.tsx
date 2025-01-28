import React, { useEffect, useMemo, useState } from 'react';
import { API_URL } from '../constants';
import { headers } from '../utils';

const Avatar: React.FC<{ name: string }> = ({ name }) => {

  const initials = useMemo(() => {
    const words = name.split(' ');
    const firstName = words[0];
    if (words.length === 1) return firstName[0];
    const lastName = words[words.length - 1];
    return `${firstName[0]} ${lastName[0]}`;
  }, [name]);

  return <span>{initials.toUpperCase()}</span>
}

type UserData = {
  name: string;
  email: string;
}

const Profile = () => {
  const [userData, setUserData] = useState<UserData|null>(null);

  useEffect(() => {
    (async function () {
      try {
        const response = await fetch(`${API_URL}/api/v1/user//me`, {
          method: 'GET',
          headers: headers(),
        });
  
        const data = await response.json();

        if (response.ok) {
          setUserData(data)
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    })();
  }, []);

  if (!userData) return null;

  return <span className='flex items-center justify-center w-[40px] h-[40px] bg-gray-200 rounded-full mt-auto mb-2'><Avatar name={userData.name} /></span>;
}

export default Profile;
