import "./PageOne.css";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Granim from "granim";


function PageOne() {

    useEffect(() => {
        new Granim({
            element: '#granim-canvas',
            name: 'granim',
            direction: 'top-bottom',
            states: {
                "default-state": {
                    gradients: [
                        [
                            { color: '#00053c', pos: 0.1 },
                            { color: '#005daf', pos: 0.5 },
                            { color: '#ff8c45', pos: 0.85 }
                        ], [
                            { color: '#002d3c', pos: 0 },
                            { color: '#0092af', pos: 0.3 },
                            { color: '#ffdcc6', pos: 0.8 }
                        ],
                    ],
                    transitionSpeed: 13000
                }
            }
        });
    }, []);

    return (
        <main id="page-one">
            <canvas id="granim-canvas" className="curtain" ></canvas>
            <h2>"Take a byte"</h2>
            <h2>See what happens to your data when you connect to the internet</h2>
            <br></br>
            <Link to="/page-two">
                Step into the light
            </Link>
            <Link className="web-ring" to="https://dgall2.github.io/s1fp/">Run away</Link>
        </main>
    )
    
}

export default PageOne;