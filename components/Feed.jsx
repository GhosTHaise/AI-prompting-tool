"use client"

import {useState,useEffect } from 'react'
import PromptCard from './PromptCard'


const PromptCardList = ({data,handleTagClick}) => 
<div className='mt-16 prompt_layout'>
    {
      data.map((post)=> (
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))
    }
</div>;


const Feed = () => {

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const [posts, setPosts] = useState([]);

  //Regexp for search
  const filterSearch = (searchText) => {
      const regexp = new RegExp(searchText,"i");//ignore sensitive case

      return posts.filter(
        (item) => 
        regexp.test(item.username) 
        ||
        regexp.test(item.prompt)
        ||
        regexp.test(item.tag)
      );
  };
  const handleSearchChange = (e) => {
    if(searchTimeout) clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    //debounce method
    setSearchTimeout(
      setTimeout(()=>{
        const searchedResult = filterSearch(posts);
        setSearchedResults(searchedResult);
      },500)
    )
  };

  const handleTagClick  = () => {
    
  }
  useEffect(()=>{
    const fetchPosts = async ()=>{
      try {
        const response = await fetch("/api/prompt");
        const data = await response.json();

        setPosts(data);
      } catch (error) {
          console.log(error);
      }
    };

    fetchPosts();
  },[]);
  return (
    <section className='feed'>
      <form className='relative w-full flex-center' >
          <input 
            type="text"
            placeholder="Search for a tag or username"
            value={searchText}
            onChange={handleSearchChange}
            required
            className='search_input peer'
          />
      </form>
    
    <PromptCardList
      data={posts}
      handleTagClick={() => {}}
    />
    </section>
  )
}
 
export default Feed