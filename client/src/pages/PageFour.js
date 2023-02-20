import "./PageFour.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function PageFour() {
    // let temp = 0;
    const [weather, setWeather] = useState(null);
    const [ip, setIp] = useState(null);
    const [city, setCity] = useState(null);
    const [region, setRegion] = useState(null);
    const [country, setCountry] = useState(null);
    const [zip, setZip] = useState(null);
    const [org, setOrg] = useState(null);
    const [funFact, setFunFact] = useState(null);
    const [dateTime, setDateTime] = useState(new Date().toLocaleString());

    // get and update the time every second
    useEffect(() => {
        const timer = setInterval(() => {
            setDateTime(new Date().toLocaleString());
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // get the location on page load
    useEffect(() => {
        getLocation();
    }, []);

    // get the weather data when the zip code changes
    useEffect(() => {
        const getWeatherData = async () => {
            try {
                const weather = await fetch(`/api/weather/${zip}`);
                const weatherJson = await weather.json();
                setWeather(Math.round((weatherJson.main.temp - 273) * 1.8 + 32) + "°F and " + weatherJson.weather[0].description);
                console.log(weather);
            } catch (err) {
                console.log(err);
            }
        };

        if (zip) {
            getWeatherData();
        }
    }, [zip]);

    // get the fun fact when the city changes
    useEffect(() => {
        if (city) {
            getFunFact();
        }
    }, [city]);

    // get the location data
    const getLocation = async () => {
        try {
            const location = await fetch('https://ipapi.co/json/');
            const locationJson = await location.json();
            setIp(locationJson.ip);
            setCity(locationJson.city);
            setRegion(locationJson.region);
            setCountry(locationJson.country_name);
            setZip(locationJson.postal);
            setOrg(locationJson.org);
        } catch (err) {
            console.log(err);
        }
    }

    // get the fun fact
    const getFunFact = async () => {
        try {
            const oneStringCity = city.replace(/\s+/g, '-');
            const funFact = await fetch(`/api/loc-fun-fact/${oneStringCity}`);
            const funFactText = await funFact.text();
            setFunFact(funFactText);
            console.log(funFactText);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div id="wrapper">
            <div className="page-four">
                <h2>They know where you are.</h2>
                {city && region && country && <h2>{city}, {region}, {country} at {dateTime}.</h2>}
                <h2>Looks like it's {weather} where you are.</h2>
                {funFact ? <h2>{funFact}</h2> : <h2>Loading fun fact...</h2>}
                <h2>Your network domain is {org}</h2>
                <h2>Your IP address is {ip}</h2>
                <h2>They show you ads based on all this.</h2>
                <Link to="/page-">Wrap up</Link>
                {/* <button onClick={getLocationWeather}>Click me!</button> */}
            </div>
        </div>
    );
}

export default PageFour;