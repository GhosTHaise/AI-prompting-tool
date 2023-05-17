"use client"

import { useState , useEffect } from 'react';
import { useSession } from 'next-auth/react'; 
import { useRouter } from 'next/router';

import MyProfil from '@components/Profil';

const Profile = () => {

  const {data : session} = useSession();
  const [posts, setPosts] = useState([]);

  useEffect(()=>{
    const fetchPosts = async ()=>{
      try {
        const response = await fetch(`/api/users/${session?.user.id}/posts`);
        const data = await response.json();

        setPosts(data);
      } catch (error) {
          console.log(error);
      }
    };

    if(session?.user.id) fetchPosts();
  },[]);

    const handleEdit = () => {

    }

    const handleDelete = async () => {

    }

  return (
    <Profile
        name="My"
        desc="Welcome to your personalized profil page"
        data={posts}
        handleEdit={handleEdit}
        hanleDelete={handleDelete}
    />
  )
}

export default MyProfile
