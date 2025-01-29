import React, { useEffect, useMemo, useState } from 'react';
import { API_URL } from '../constants';
import { headers } from '../utils';
import { RootState } from '../store';
import { useSelector } from 'react-redux';

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

const Profile = () => {
  const userData = useSelector((state: RootState) => state.user.data);

  if (!userData) return null;

  return <span className='flex items-center justify-center w-[40px] h-[40px] bg-gray-200 rounded-full mt-auto mb-2'><Avatar name={userData.name} /></span>;
}

export default Profile;
