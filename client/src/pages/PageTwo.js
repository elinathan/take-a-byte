import "./PageTwo.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import platform from 'platform';
import { drawBlobs } from '../visuals/blobs.js';

function PageTwo() {

    const info = platform.parse(navigator.userAgent);
    const name = info.name;
    const version = info.version;
    const os = info.os.toString();
    const manufacturer = info.manufacturer;
    const product = info.product;
    // const description = info.description;
    const osVersion = info.os.version;
    const [batteryPercentage, setBatteryPercentage] = useState("100%");
    const [batteryCharging, setBatteryCharging] = useState("charging");

    const cpuCores = navigator.hardwareConcurrency;

    useEffect(() => {
        drawBlobs(6);
    }, []);


    useEffect(() => {
        navigator.getBattery().then(function (battery) {
            // Assign the battery level to a variable
            setBatteryPercentage(battery.level * 100 + '%');
            // Assign the charging status to a variable
            if (battery.charging) {
                setBatteryCharging('charging');
            } else {
                setBatteryCharging('not charging');
            }
        });
    });


    // console.log(info.name)
    // console.log(info.version)
    // console.log(info.os.toString())
    // console.log(info.manufacturer)
    // console.log(info.product)
    // console.log(info.description)
    // console.log(info.os.version)

    return (
        <div className="page-two">
            <canvas id="bubble"></canvas>
            <h2 style={{ color: "#ffd100" }}>They know what you use</h2>
            {name &&
                <div className="info">
                    <h2>Browser</h2>
                    <h1>{name}</h1>
                </div>}
            {version &&
                <div className="info">
                    <h2>{name} version</h2>
                    <h1>{version}</h1>
                </div>}
            {os &&
                <div className="info">
                    <h2>Operating system</h2>
                    <h1>{os}</h1>
                </div>}

            {manufacturer &&
                <div className="info">
                    <h2>Manufacturer</h2>
                    <h1>{manufacturer}</h1>
                </div>}

            {product &&
                <div className="info">
                    <h2>Product</h2>
                    <h1>{product}</h1>
                </div>}
            {osVersion &&
                <div className="info">
                    <h2>Operating system version</h2>
                    <h1>{osVersion}</h1>
                </div>}

            {(batteryPercentage !== '100%' || batteryCharging !== "charging") &&
                <div className="info">
                    <h2>Battery level</h2>
                    <h1>{batteryPercentage}</h1>
                </div>}
            {(batteryPercentage !== '100%' || batteryCharging !== "charging") &&
                <div className="info">
                    <h2>Battery status</h2>
                    <h1>{batteryCharging}</h1>
                </div>}

            {cpuCores && 
            <div className="info">
                <h2>CPU cores</h2>
                <h1>{cpuCores}</h1>
            </div>}

            <Link to="/page-three">See what you see</Link>

        </div>
    );
}

export default PageTwo;