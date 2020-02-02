import React, { useState, useEffect } from "react";
import "./App.css";

import dogApi from "../api";

import Header from "../components/Header";
import SettingsForm from "../components/SettingsForm";
import Content from "../components/Content";

function App() {
  //Setting state
  const [breeds, setBreeds] = useState([]);
  const [subBreeds, setSubBreeds] = useState([]);
  const [breedImages, setBreedImages] = useState([]);

  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [subBreed, setSubBreed] = useState("");
  const [fontColor, setFontColor] = useState("black");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [fontSize, setFontSize] = useState("24");

  const [isLoading, setLoading] = useState(true);
  const [isInitialSetupFinished, setInitialSetupFinished] = useState(false);

  useEffect(() => {
    initialSetup();
  }, []);

  useEffect(() => {
    if (Object.keys(breeds).length) {
      const localStateExists = localStorage.getItem("state");
      //set state from local storage data
      if (localStateExists) {
        loadState();
      }
      //or set first result as default value for breed
      else {
        const firstResult = Object.keys(breeds)[0];
        setBreed(firstResult);
      }
    }
  }, [breeds]);

  useEffect(() => {
    if (breed) {
      setLoading(true);
      dogApi
        .searchByBreed(breed)
        .then(response => {
          setBreedImages(response.data.message);
          const subBreedsArr = breeds[breed];
          setSubBreeds(subBreedsArr);

          if (isInitialSetupFinished) {
            //if sub breeds array is not empty set first item as default, otherwise set empty string
            setSubBreed(subBreedsArr.length ? subBreedsArr[0] : "");
          }
          setLoading(false);
          setInitialSetupFinished(true);
        })
        .catch(err => console.error(err));
    }
  }, [breed]);

  async function initialSetup() {
    try {
      const response = await dogApi.listAllBreeds();
      const breedsObj = response.data.message;
      setBreeds(breedsObj);
    } catch (err) {
      console.error(err);
    }
  }

  function handleSave(e) {
    e.preventDefault();
    const state = {
      name,
      breed,
      subBreed,
      fontColor,
      fontFamily,
      fontSize
    };
    localStorage.setItem("state", JSON.stringify(state));
    localStorage.setItem("date", Date());
    alert("Seu dog foi salvo com sucesso");
  }

  function loadState() {
    const state = JSON.parse(localStorage.getItem("state"));
    const { name, breed, subBreed, fontColor, fontFamily, fontSize } = state;
    setName(name);
    setBreed(breed);
    setSubBreed(subBreed);
    setFontColor(fontColor);
    setFontFamily(fontFamily);
    setFontSize(fontSize);
  }

  return (
    <div className="App">
      <Header />
      <div className="container">
        <main>
          <SettingsForm
            onBreedChange={setBreed}
            onSubBreedChange={setSubBreed}
            onFontColorChange={setFontColor}
            onFontFamilyChange={setFontFamily}
            onFontSizeChange={setFontSize}
            onNameChange={setName}
            onSave={handleSave}
            breeds={breeds}
            breed={breed}
            subBreeds={subBreeds}
            subBreed={subBreed}
            name={name}
            fontColor={fontColor}
            fontFamily={fontFamily}
            fontSize={fontSize}
          />
          <Content
            breedImages={
              subBreed
                ? breedImages.filter(img => img.includes(subBreed))
                : breedImages
            }
            name={name}
            fontColor={fontColor}
            fontFamily={fontFamily}
            fontSize={fontSize}
            isLoading={isLoading}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
