import React, { useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Login from '../../screens/Login';
import Tasks from '../../screens/Tasks';

import { useLocalStorage } from '../../hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom';
import { TokenProps } from '../../hooks/useAxios';

const App = () => {
  const [tokenObj, setTokenObj] = useLocalStorage<TokenProps>("token", {token:null});
  let navigate = useNavigate();

  useEffect(() => {
    function checkTokenData() {
      const localToken = localStorage.getItem('token');
      if (localToken) {
        const localTokenObj:TokenProps = JSON.parse(localToken);
        if(localTokenObj.token){
          navigate('/tasks');
        } else {
          navigate('/login');
        }
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
    if (tokenObj.token !== null) {
      navigate('/tasks');
    } else {
      navigate('/login');
    }
  }, [tokenObj]);

  return (
    <Routes>
      <Route path="/login" element={<Login updateToken={(token) =>  setTokenObj({token})} />} />
      <Route path="/tasks" element={<Tasks updateToken={(token) =>  setTokenObj({token})}/>} />
      <Route path="*" element={<div>not found</div>} />
    </Routes>
  );
}

export default App;