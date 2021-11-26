import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Login from '../../screens/Login';
import Tasks from '../../screens/Tasks';

import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom';


const App = () => {
  const [token, setToken] = useLocalStorage<string|null>("token", null);
  let navigate = useNavigate();

  useEffect(() => {
    function checkTokenData() {
      const token = localStorage.getItem('token')
      if (token && token !== 'null') {
        navigate('/tasks');
      } else {
        navigate('/login');
      }
    }
  
    window.addEventListener('storage', checkTokenData)
  
    return () => {
      window.removeEventListener('storage', checkTokenData)
    }
  }, [])

  useEffect(() => {
    if (token) {
      navigate('/tasks');
    } else {
      navigate('/login');
    }
  }, [token]);

  return (
    <Routes>
      <Route path="/login" element={<Login updateToken={(newToken) =>  setToken(newToken)} />} />
      <Route path="/tasks" element={<Tasks updateToken={(newToken) =>  setToken(newToken)}/>} />
      <Route path="*" element={<div>not found</div>} />
    </Routes>
  );
}

export default App;