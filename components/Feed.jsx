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
  const filterPrompts = (searchText) => {
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
        const searchedResult = filterPrompts(searchText);
        console.log("I search : ",searchedResult);
        setSearchedResults(searchedResult);
      },500)
    )
  };

  const handleTagClick  = (tagname) => {
    setSearchText(tagname);
    
    const searchResult = filterPrompts(searchText);
    setSearchedResults(searchResult);
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
    
    {
      searchText ?
        <PromptCardList
        data={searchedResults}
        handleTagClick={handleTagClick}
        /> 
          :
        <PromptCardList
          data={posts}
          handleTagClick={handleTagClick}
        />
    }
    </section>
  )
}
 
export default Feed