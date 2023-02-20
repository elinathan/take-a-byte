import "./PageFive.css";
import React, { useEffect } from "react";
import Granim from "granim";


function PageFive() {

    useEffect(() => {
        new Granim({
            element: '#granim-canvas',
            name: 'granim',
            direction: 'top-bottom',
            states: {
                "default-state": {
                    gradients: [
                        [
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
        <main id="page-five">
            <canvas id="granim-canvas" className="curtain" ></canvas>
            <h2 id="copy">Every time you connect to the internet, you leave a digital trail of data that can reveal your personal information, location, behavior, and preferences. This data can be used for many purposes, some of which may not be in your best interest.</h2>
        </main>
    );
}

export default PageFive;