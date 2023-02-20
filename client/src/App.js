import './App.css';
import React from 'react';
import {Route, Routes} from 'react-router-dom';
import PageOne from './pages/PageOne';
import PageTwo from './pages/PageTwo';
import PageThree from './pages/PageThree';
import PageFour from './pages/PageFour';
import PageFive from './pages/PageFive';

function App() {
  return (
    <main>
      <Routes>
        <Route path="/" element={<PageOne />} />
        <Route path="/page-two" element={<PageTwo />} />
        <Route path="/page-three" element={<PageThree />} />
        <Route path="/page-four" element={<PageFour />} />
        <Route path="/page-five" element={<PageFive />} />
      </Routes>
    </main>
  );
}

export default App;
