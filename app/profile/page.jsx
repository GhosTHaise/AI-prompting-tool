"use client"

import { useState , useEffect } from 'react';
import { useSession } from 'next-auth/react'; 
import { useRouter } from 'next/router';

import Profil from '@components/Profil';

const Profile = () => {

    const handleEdit = () => {

    }

    const handleDelete = async () => {

    }

  return (
    <Profile
        name="My"
        desc="Welcome to your personalized profil page"
        data={[]}
        handleEdit={handleEdit}
        hanleDelete={handleDelete}
    />
  )
}

export default Profile
