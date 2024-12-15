import SearchInfo from "../models/SearchInfo";

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

export const getCurrentTempSearchInfo = (latitude, longitude) => {
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

export const getAttractionSearchInfo = (
  latitude,
  longitude,
  selectedCategories
) => {
  const radius = 5000; // distance from the point of search (city) in metres
  const limit = 500 * selectedCategories.length;
  const preparedCategories = selectedCategories.join(",");
  return latitude && longitude && selectedCategories
    ? new SearchInfo(
        "https://opentripmap-places-v1.p.rapidapi.com/en/places/radius",
        {
          kinds: preparedCategories,
          format: "json",
          limit: limit,
          lon: longitude,
          radius: radius,
          lat: latitude,
        },
        {
          "X-RapidAPI-Host": "opentripmap-places-v1.p.rapidapi.com",
          "X-RapidAPI-Key": rapidKey,
        }
      )
    : new SearchInfo();
};
