"use client"

import { useState, useEffect } from 'react';
import PromptCard from './PromptCard';

const PromptCardList = ({data, handleTagClick})=>{
  return(
    <div className='mt-16 prompt_layout'>
      {data.map((post)=>(
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}


const 
Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);
  const [searchPost,setSearchPost] = useState([])

  const handleSearchChange=(e)=>{
    setSearchText(e.target.value);
  };

  useEffect(()=>{
    const fetchPosts = async ()=>{
      const response = await fetch('/api/prompt');
      const data=await response.json();
      setSearchPost(data)
      setPosts(data);
    }
    fetchPosts();
  },[]);

  useEffect(()=>{
    if(searchText === ''){
      setSearchPost(posts);
    }
    else{
      const filterPosts=posts.filter((item)=>{
        return (
          item.prompt.toLowerCase().includes(searchText.toLowerCase()) || item.tag.toLowerCase().includes(searchText.toLowerCase())
        );
      });
      setSearchPost(filterPosts)
    }
  })

  // useEffect(()=>{
  //   if(searchText === ''){
  //     setSearchPost(posts)
  //   }
  //   else {
      // const filterPosts=posts.filter((item)=>{
      //   return (
      //     item.prompt.toLowerCase().includes(searchText.toLowerCase()) || item.tag.toLowerCase().includes(searchText.toLowerCase())
      //   );
      // });
      // setSearchPost(filterPosts)
  //   }
  // },[searchPost,posts]);

  return (
    <section className='feed'>
      <form className='realative w-full flex-center'>
        <input
          type="text" 
          placeholder='Search for a tag or a username'
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>
      <PromptCardList
        data={searchPost}
        handleTagClick={()=>{}}
      />
    </section>
  )
}

export default Feed
