import dotenv from 'dotenv';
import axios from 'axios';
dotenv.config();

export const fetchWeather = async (req, res) => {
  try {
    const weatherData = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${req.body.location}&aqi=no`);
    res.status(200).send(JSON.stringify(weatherData.data));
  } catch(ex) {
    console.log(ex);
    res.status(400).send("Bad Request");
  }
}