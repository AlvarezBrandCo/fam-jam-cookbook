import React, { useState } from 'react';
import {  useSelector, useDispatch } from 'react-redux';
import { Modal } from "./Modal";

import {
  showModal,
  selectModal
} from '../state/modals/modalSlice';

const Stories = () => {

  const [stories, setStories] = useState([])
  const [storyStatus, setStoryStatus] = useState(null)
  const [selectedRecipe, setSelectedRecipe] = useState("rec2fUQtS9csDoboc")
  const dispatch = useDispatch();
  
  const getExistingStories = async (force = false) => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };

    if (force || !stories.length > 0) {
      debugger
      const res = await fetch(`/stories`, options);
      const json = await res.json()
      setStories([...json])
    }
  }

  const addStory = async event => {
    event.preventDefault();
    const params = {
      recipe: selectedRecipe,
      story: `${Math.random() * 10}`
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)  
    };
    const res = await fetch(`/stories`, options);
    const json = await res.json()
    setStoryStatus(200)
    setTimeout(() => {setStoryStatus(null)}, 4000)
    getExistingStories(true)
  }

  const renderStoryBanner = () => {
    if (storyStatus === 200) {
      return <div style={{position: "fixed", width: "100%", height: "100px", background: "red", top: 0, left: 0}}>Success</div>
    }
    return null
  }
  getExistingStories()
  return (
    <div>
      <h1>Stories</h1>
      <button onClick={() => dispatch(showModal("casey"))}>test</button>
      <Modal name="casey" component={() => <div>test</div>}/>
      {renderStoryBanner()}
      {stories.map(x => <div>{x.Story}</div>)}
      <button onClick={addStory}>add one</button>
    </div>
  )
}

export default Stories
