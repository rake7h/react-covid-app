import axios from "axios";
const API = "https://api.covid19api.com/summary";

export const fetchSummary = () => {
  return axios
    .get(API)
    .then(response => {
      const summary = response.data;
      return summary;
    })
    .catch(error => {
      console.log("error", error);
    });
};
