import React from "react";
import classnames from 'classnames';
import logo from "./logo.svg";
import Test from "./images/test.png";
import Banner from "./components/Banner";
import Stories from "./components/Stories";
import 'bootstrap/dist/css/bootstrap.css';
import "./App.css";
import {tagsArr, cooks]1Arr} from "./utils";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

function App() {
  const [data, setData] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [cooks, setCooks] = React.useState([]);
  const [tags, setTags] = React.useState([]);
  const [recipeInfo, setRecipeInfo] = React.useState([]);
  const [image, setImage] = React.useState(null);
  const [submitStatus, setSubmitStatus] = React.useState(null)
  const [existingEntries, setExistingEntries] = React.useState([]);
  
  const checkboxStyles = {
    display: 'flex',
    flexDirection: 'column'
  }
  const textareaStyles = {
    fontSize: 10
  }

  const handleNameInput = (text) => {
    setName(text.target.value)
  }

  const handleParagraphsInput = (text) => {
    const splitTextToParagraphs = text.target.value.split(/\r?\n/).filter(element => element);
    setRecipeInfo(splitTextToParagraphs)
  }

  const renderTagCheckboxes = tagsArr.map((tag, i) => {
    return (
      <label>
        <input
          type="checkbox"
          name={tag}
          onChange={() => handleTagInput(i)}
        />
        {tag}
      </label>
    )
  });
  
  const renderCooks = () => {
    const people = cooksArr.map((cook, i) => {
      const selected = cooks.includes(cook)
      return (
        <div
          className={classnames("mx-2 cook-item", {
            "selected": selected
          })}
          onClick={() => handleCooksInput(cook)}>{cook}</div>
      )
    })
    return (
      <div className="d-flex flex-wrap w-75 m-auto">
        {people}
      </div>
    )
  };
  
  const handleTagInput = (index) => {
    const tag = tagsArr[index]
    const tagExists = tags.includes(tag)
    if (tagExists) {
      setTags(tags.filter(item => tag !== item))
    } else {
      setTags([
        ...tags,
        tag
      ])
    }
  }
  
  const handleCooksInput = (cook) => {
    const cookExists = cooks.includes(cook)
    if (cookExists) {
      setCooks(cooks.filter(item => cook !== item))
    } else {
      setCooks([
        ...cooks,
        cook
      ])
    }
  }

  const getExistingEntries = async () => {
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    };
    debugger
    if (!existingEntries.length > 0) {
      const res = await fetch(`/recipes`, options);
      const json = await res.json()
      setExistingEntries([...json])
    }
  }
  
  getExistingEntries()  
  
  const submitRecipe = async (event) => {
    event.preventDefault();
    const params = {
      "name": name,
      "tags": tags,
      "cooks": cooks,
      "recipeInfo": recipeInfo,
      "image": image
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)  
    };
    const res = await fetch(`/recipe`, options);
    const json = await res.json()
    setSubmitStatus(json.status)
    setTimeout(() => setSubmitStatus(null), 5000);
  }

  const renderEntries = () => {
    const list = existingEntries.map(recipe => {
      let recipeInfo;
      if (recipe["Recipe Info"]) {
        const length = recipe["Recipe Info"].length;
        const maxLength = 130;
        if (length > maxLength) {
          const test = recipe["Recipe Info"]
          const shortened = test.split("").slice(0, maxLength).concat("...").join("")
          recipeInfo = shortened
        } else {
          recipeInfo = recipe["Recipe Info"]
        }
      } else recipeInfo = null

      const tags = recipe["Tags"].map(t => <span className="recipe-tag">{t} </span>)
      return (
        <div className="recipe-block">
          {/*<img className="image" src={recipe.Image && recipe.Image[0].url}/>*/}
          <div className="info mx-2">
            <h4>{recipe.Name}</h4>
            <div className="recipe-tag-wrap">{tags}</div>
            <p>{recipeInfo} <br/><br/>read more...</p>
          </div>
        </div>
      )
    })
    return <div className="d-grid">{list}</div>
  }
  
  return (
    <div className="App">
      {submitStatus === 200 && <Banner/>}
      <header className="App-header">
         <h1 className="my-4">Hoyt Family Cookbook</h1>
        <p>asdf asdf asdf sdf sdf asdfasdf asdf asdf sdf sdf asdfasdf asdf asdf asdf asdf asdf </p>
      </header>
      <div className="container">
          <div className="">
            <p>submit a recipe here</p>
            {renderEntries()}
            <img style={{height: 300}} src={Test}/>
            <form>
              <label>Recipe Name</label>
              <input onChange={handleNameInput}/>
              <h3>How would you classify this recipe?</h3>
              <div style={{...checkboxStyles}}>{renderTagCheckboxes}</div>
              <h3>Who invented or typically made this recipe?</h3>
              <div style={{...checkboxStyles}}>{renderCooks()}</div>
              <textarea style={{...textareaStyles}} onChange={handleParagraphsInput} rows="20" cols="100"/>
              <label>Select some images:</label>
              <input onChange={e => setImage(e.target.files[0])} type="file" id="imageFile" accept="image/*" multiple/>
              <button onClick={submitRecipe}>click</button>
            </form>
          </div>
          <Stories/>
      </div>
    </div>
  );
}

export default App;
