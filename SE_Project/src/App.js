import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Map from './Map/Map'
import Phone from './PhoneNum/Phone'
import Register from "./Register/Register";
import Menu from './menu/Menu'

function App() {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route index element={<Phone></Phone>}></Route>
          <Route path="/phone" element = {<Phone></Phone>}></Route>
          <Route path='/register' element={<Register></Register>}></Route>
          <Route path="/map" element={<Map></Map>}></Route>
          <Route path="/menu" element={<Menu></Menu>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
