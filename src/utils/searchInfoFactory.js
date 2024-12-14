import SearchInfo from "../objects/SearchInfo";

const rapidKey = process.env.REACT_APP_RAPID_KEY;

export const getCitySearchInfo = (city) => {
  return city
    ? new SearchInfo(
        "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
        { namePrefix: city, limit: 6 },
        {
          "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          "X-RapidAPI-Key": rapidKey,
        }
      )
    : new SearchInfo();
};

export const getWeatherSearchInfo = (latitude, longitude) => {
  return latitude && longitude
    ? new SearchInfo(
        "https://weatherapi-com.p.rapidapi.com/current.json",
        { q: `${latitude},${longitude}` },
        {
          "X-RapidAPI-Host": "weatherapi-com.p.rapidapi.com",
          "X-RapidAPI-Key": rapidKey,
        }
      )
    : new SearchInfo();
};
