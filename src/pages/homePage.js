import React, { useEffect, useState } from "react";
import "../css/homePage.css";
import { Button, TextField, CircularProgress } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useFormik } from "formik";
import * as yup from "yup";
import { instance, URL } from "../api/instance";

const validationSchema = yup.object({
  sourceLanguage: yup.string().required("Source language is required"),
  targetLanguage: yup.string().required("Target language is required"),
  inputText: yup.string("Enter input text").required("Input text is required"),
});

const HomePage = () => {
  const [result, setResult] = useState({});
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
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

  const handleSubmit = (values) => {
    setIsLoading(true);
    instance
      .post(`${URL}/translate`, {
        source_language: values.sourceLanguage,
        target_language: values.targetLanguage,
        text: values.inputText,
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


  const formik = useFormik({
    initialValues: {
      sourceLanguage: "",
      targetLanguage: "",
      inputText: "",
    },
    validationSchema: validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <form onSubmit={formik.handleSubmit} className="mainContainer">
      <div className="translationContainer">
        <div className="inputContainer">
          <FormControl variant="standard">
            <InputLabel id="demo-simple-select-standard-label">
              Source Language
            </InputLabel>
            <Select
              value={formik.values.sourceLanguage}
              onChange={formik.handleChange}
              error={
                formik.touched.sourceLanguage &&
                Boolean(formik.errors.sourceLanguage)
              }
              helperText={
                formik.touched.sourceLanguage && formik.errors.sourceLanguage
              }
              id="sourceLanguage"
              name="sourceLanguage"
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
            value={formik.values.inputText}
            onChange={formik.handleChange}
            error={
              formik.touched.inputText &&
              Boolean(formik.errors.inputText)
            }
            helperText={
              formik.touched.inputText && formik.errors.inputText
            }
            id="inputText"
            name="inputText"
            label="Input Text"
            multiline
            rows={4}
            disabled={isLoading ? true : false}
          />
        </div>
        <div className="spinner">{isLoading && <CircularProgress />}</div>

        <div className="outputContainer">
          <FormControl variant="standard">
            <InputLabel id="demo-simple-select-standard-label">
              Target Language
            </InputLabel>
            <Select
              value={formik.values.targetLanguage}
              onChange={formik.handleChange}
              error={
                formik.touched.targetLanguage &&
                Boolean(formik.errors.targetLanguage)
              }
              helperText={
                formik.touched.targetLanguage && formik.errors.targetLanguage
              }
              id="targetLanguage"
              name="targetLanguage"
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
      <Button
        variant="contained"
        type="submit"
        disabled={isLoading ? true : false}
      >
        Translate
      </Button>
    </form>
  );
};

export default HomePage;
