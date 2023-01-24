import React, { useEffect, useState } from "react";
import axios from "axios";

const instance = axios.create({
  headers: {
    "X-RapidAPI-Key": "ffa899c765msh8c6c4802415ff36p18a85ejsn5a1ca67e1269",
    "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    'content-type': 'application/x-www-form-urlencoded',
  },
});

const URL = "https://text-translator2.p.rapidapi.com";

const HomePage = () => {
  const [translateData, setTranslateData] = useState({});
  const [result, setResult] = useState({});
  const [languages, setLanguages] = useState([]);
  const [targetLanguage, setTargetLanguage] = useState("es");
  const [sourceLanguage, setSourceLanguage] = useState("en");

//   useEffect( () =>{
//     instance
//       .get(`${URL}/getLanguages`)
//       .then((response) => {
//         // console.log(response.data.data.languages);
//         const newArray = [...response.data.data.languages];
//         setLanguages(newArray);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    instance
      .post(`${URL}/translate`, {
        
            source_language: sourceLanguage,
            target_language: targetLanguage,
            text: translateData
      })
      .then((response) => {
        setResult({
          translatedText: response.data.data.translatedText,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    // setTranslateData({source_language: sourceLanguage,target_language: targetLanguage,text: event.target.value})
    setTranslateData(event.target.value);
  };

  const handleTargetChange = (event) => {
    setTargetLanguage(event.target.value);
  };

  const handleSourceChange = (event) => {
    setSourceLanguage(event.target.value);
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="translateData"
          onChange={handleChange}
          placeholder="Input data here"
        />
        <button type="submit">Submit</button>
      </form>
      <label>Source language:</label>
      <select value={sourceLanguage} onChange={handleSourceChange}>
        {languages.map((language, index) => (
          <option key={index} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
      <label>Target language:</label>
      <select value={targetLanguage} onChange={handleTargetChange}>
        {languages.map((language, index) => (
          <option key={index} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
      <h1>Translated text: {result.translatedText}</h1>
    </div>
  );
};

export default HomePage;
