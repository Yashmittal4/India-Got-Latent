import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './components/Home';


import "./App.css"
import Participate from './components/Participate';
import Collaborate from './components/Collabrate';
import Login from './components/Login';
import Signup from './components/Signup';
import Admin from './components/Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          
          <Route path="participate" element={<Participate />} />
          <Route path="collabrate" element={<Collaborate />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          
         
          
        </Route>
          <Route path="admin" element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
