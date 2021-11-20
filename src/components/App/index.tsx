import React from 'react';
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Routes>
      <Route path="/login" element={<div>Login</div>} />
      <Route path="/tasks" element={<div>Tasks</div>} />
      <Route path="*" element={<div>not found</div>} />
    </Routes>
  );
}

export default App;