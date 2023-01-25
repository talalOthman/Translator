import React, { useEffect, useState } from "react";
import axios from "axios";
import "../css/homePage.css";
import { Button, TextField, CircularProgress } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const instance = axios.create({
  headers: {
    "X-RapidAPI-Key": "ffa899c765msh8c6c4802415ff36p18a85ejsn5a1ca67e1269",
    "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
    "content-type": "application/x-www-form-urlencoded",
  },
});

const URL = "https://text-translator2.p.rapidapi.com";

const HomePage = () => {
  const [translateData, setTranslateData] = useState({});
  const [result, setResult] = useState({});
  const [languages, setLanguages] = useState([]);
  const [targetLanguage, setTargetLanguage] = useState("");
  const [sourceLanguage, setSourceLanguage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

    useEffect( () =>{
       setIsLoading(true);
      instance
        .get(`${URL}/getLanguages`)
        .then((response) => {
          const newArray = [...response.data.data.languages];
          setLanguages(newArray);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    instance
      .post(`${URL}/translate`, {
        source_language: sourceLanguage,
        target_language: targetLanguage,
        text: translateData,
      })
      .then((response) => {
        setResult({
          translatedText: response.data.data.translatedText,
        });
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  const handleChange = (event) => {
    setTranslateData(event.target.value);
  };

  const handleTargetChange = (event) => {
    setTargetLanguage(event.target.value);
  };

  const handleSourceChange = (event) => {
    setSourceLanguage(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="mainContainer">
      <div className="translationContainer">
        <div className="inputContainer">
          <FormControl variant="standard">
            <InputLabel id="demo-simple-select-standard-label">
              Source Language
            </InputLabel>
            <Select
              value={sourceLanguage}
              onChange={handleSourceChange}
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              disabled={isLoading ? true : false}
            >
              {languages.map((language, index) => (
                <MenuItem key={index} value={language.code}>
                  {language.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            id="outlined-multiline-static"
            label="Input Text"
            multiline
            rows={4}
            disabled={isLoading ? true : false}
            onChange={handleChange}
          />
        </div>
        <div className="spinner">{isLoading && <CircularProgress />}</div>

        <div className="outputContainer">
          <FormControl variant="standard">
            <InputLabel id="demo-simple-select-standard-label">
              Target Language
            </InputLabel>
            <Select
              value={targetLanguage}
              onChange={handleTargetChange}
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              disabled={isLoading ? true : false}
            >
              {languages.map((language, index) => (
                <MenuItem key={index} value={language.code}>
                  {language.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="outlined-multiline-static"
            label="Translated Text"
            multiline
            defaultValue="    "
            disabled
            minRows={4}
            maxRows={20}
            value={result.translatedText}
            fullHeight
          />
        </div>
      </div>
      <Button variant="contained" type="submit">
        Translate
      </Button>
    </form>
  );
};

export default HomePage;
