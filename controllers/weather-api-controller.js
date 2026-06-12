import dotenv from 'dotenv';
dotenv.config();

export const fetchWeather = async (req, res) => {
  try {
    const response = await fetch(`https://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${req.body.location}&aqi=no`);
    if (response.ok) {
      const data = await response.json()
      return res.status(200).send(JSON.stringify(data));
    }
    return res.status(500).send("Server Error Occurred")
  } catch (ex) {
    console.log(ex);
    return res.status(400).send("Bad Request");
  }
}
