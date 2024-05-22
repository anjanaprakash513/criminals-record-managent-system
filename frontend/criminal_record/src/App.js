import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './components/Auth/Signup';
import Login from './components/Auth/Login';
import ListCriminals from './components/crudCriminals/ListCriminals';
import AddCriminals from './components/crudCriminals/AddCriminalsRecord';





function App() {
  return (
    <div>
      <Router>
        {/* <Navbar/> */}
        
        <Routes>
        <Route path='/' element={<Signup/>} />,
        <Route path='/login' element={<Login/>} />,
        <Route path='/listcriminals' element={<ListCriminals/>} />,
        <Route path='/addcriminals' element={<AddCriminals/>} />,
        </Routes>
      </Router>
    </div>
  );
}

export default App;