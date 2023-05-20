"use client"

import { useState , useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react'; 


import Profil from '@components/Profil';

const MyProfile = () => {

  const router = useRouter();
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

    const handleEdit = (post) => {
      router.push(`/update-prompt?id=${post._id}`);
    }

    const handleDelete = async () => {

    }

  return (
    <Profil
        name="My"
        desc="Welcome to your personalized profil page"
        data={posts}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
    />
  )
}

export default MyProfile
