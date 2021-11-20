import React from 'react';
import { Routes, Route } from "react-router-dom";
import Login from '../../screens/Login';

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/tasks" element={<div>Tasks</div>} />
      <Route path="*" element={<div>not found</div>} />
    </Routes>
  );
}

export default App;