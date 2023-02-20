import "./PageThree.css";
import React, {useState, useCallback, useEffect} from "react";
import { Link } from "react-router-dom";


function PageThree() {
    const [browserWidth, setBrowserWidth] = useState(window.innerWidth);
    const [browserHeight, setBrowserHeight] = useState(window.innerHeight);
    const browserColorDepth = window.screen.colorDepth;
    const [browserConnection, setBrowserConnection] = useState(0);
    const numberOfEntries = window.history.length;
    const [speedTested, setSpeedTested] = useState(false);

    // update the browser width and height on resize
    window.addEventListener('resize', throttle(() => {
        setBrowserWidth(window.innerWidth);
        setBrowserHeight(window.innerHeight);
    }, 100));

    function throttle(callback, delay) {
        let timeoutId;
        return (...args) => {
            if (!timeoutId) {
                timeoutId = setTimeout(() => {
                    callback(...args);
                    timeoutId = null;
                }, delay);
            }
        };
    }

    // test the download connection speed in megabits per second
    const testDownloadSpeed = useCallback(() => {
        if (speedTested) return;
        const startTime = performance.now();
        const download = new Image();
        download.onload = () => {
            const endTime = performance.now();
            const duration = (endTime - startTime) / 1000;
            const bitsLoaded = download.width * download.height * 8;
            const speedBps = (bitsLoaded / duration).toFixed(2);
            const speedKbps = (speedBps / 1024).toFixed(2);
            const speedMbps = (speedKbps / 1024).toFixed(2);
            setSpeedTested(true);
            setBrowserConnection(speedMbps);
        };
        download.onerror = (err, msg) => {
            console.log(err);
        };
        download.src = `https://freight.cargo.site/t/original/i/89d9410e0400656adcc2c91992904057053af01e2ce038ac0df1427b3a7ac143/IMG_4363-Pano.jpg`;
    }, [speedTested]);

    testDownloadSpeed();
    return (
        <div className="page-three">
            <h2 style={{ color: "#ffd100" }}>They know how you see</h2>
            <h1>Your browser is <span className="data">{browserWidth} pixels wide</span> and <span className="data">{browserHeight} pixels tall</span></h1>
            <h1>Your browser color depth is <span className="data">{browserColorDepth} bits</span> per pixel</h1>
            <h1>You've visited <span className="data">{numberOfEntries} webpages</span> in this window</h1>
            {browserConnection ? <h1>Your connection speed is <span className="data">{browserConnection} Mbps</span></h1> : <h1>Testing your connection speed...</h1>}

            <Link to="/page-four">There's more</Link>
        </div>
    )
}

export default PageThree;