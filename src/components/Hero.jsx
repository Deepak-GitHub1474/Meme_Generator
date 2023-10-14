import "./meme.css"

import React, { useState, useEffect } from "react";

export default function Hero(props) {
  let [meme, setMeme] = useState({
    memeImg: "https://i.imgflip.com/30b1gx.jpg",
    topText: "",
    bottomText: "",
  });

  let [allMemes, setAllMemes] = useState([]);

  useEffect(() => {
    async function getMeme() {
      const res = await fetch(`https://api.imgflip.com/get_memes`)
      const data = await res.json()
      setAllMemes(data)
    }
    getMeme()
  }, [])

  function handleClick(event) {
    event.preventDefault();
    let memeArray = allMemes.data.memes;
    let memeUrl = memeArray.map((meme) => meme.url);
    let randomNumber = Math.floor(Math.random() * memeArray.length);
    setMeme((prevMeme) => ({
      ...prevMeme,
      memeImg: memeUrl[randomNumber],
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <main className="hero-container">
      <form onSubmit={handleSubmit} className="form-container">
        <input
          type="text"
          className="form-upper-text"
          placeholder="top-text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          className="form-lower-text"
          placeholder="lower-text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form-btn" onClick={handleClick}>
          Get New Image 🖼️
        </button>
      </form>
      <section className="meme-container">
        <p className="top-text">{meme.topText}</p>
        <p className="bottom-text">{meme.bottomText}</p>
        <img src={meme.memeImg} alt="memeImg" className="memeImg" />
      </section>
    </main>
  );
}
