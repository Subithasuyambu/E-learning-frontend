import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserContextProvider } from './context/UserContext';  // Correct import
import App from './App';
import { CourseContextProvider } from './context/CourseContext';

export const server='https://e-learning-2-53lz.onrender.com'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <CourseContextProvider>
        <App />
        </CourseContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
