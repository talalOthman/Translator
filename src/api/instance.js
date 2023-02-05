import axios from "axios";

export const instance = axios.create({
    headers: {
      "X-RapidAPI-Key": "5c6fd180e8mshb61d2eae94daaadp1e54a8jsn03d2e09c8ff5",
      "X-RapidAPI-Host": "text-translator2.p.rapidapi.com",
      "content-type": "application/x-www-form-urlencoded",
    },
  });

export const URL = "https://text-translator2.p.rapidapi.com";