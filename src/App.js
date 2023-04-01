import React from 'react';

import {
  BrowserRouter,
  Routes, // instead of "Switch"
  Route,
} from "react-router-dom";
import Home from './components/Home';
import InfoPage from './components/InfoPage';



function App() {
  return (
    <>
      
        <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Home />} />
          </Routes>
          <Routes>
            <Route exact path="/info/:id" element={<InfoPage />} />
          </Routes>

        </BrowserRouter>
      




    </>
  );
}

export default App;
