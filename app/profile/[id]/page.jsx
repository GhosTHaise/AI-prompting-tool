"use client"

import { useState , useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

import Profil from '@components/Profil';

const MyProfile = ({params}) => {

  const searchParams = useSearchParams();
  const username = searchParams.get("name");
  
  const [userPosts, setUserPosts] = useState([]);
  
  useEffect(()=>{
    const fetchPosts = async ()=>{
      try {
        const response = await fetch(`/api/users/${params?.id}/posts`);
        const data = await response.json();

        setUserPosts(data);
      } catch (error) {
          console.log(error);
      }
    };

    if(params?.id) fetchPosts();
  },[params?.id]);


  return (
    <Profil
        name={username}
        desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
        data={userPosts}
    />
  )
}

export default MyProfile
