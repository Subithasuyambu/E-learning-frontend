import React from 'react';
import ReactDOM from 'react-dom/client';
import { UserContextProvider } from './context/UserContext';  // Correct import
import App from './App';
import { CourseContextProvider } from './context/CourseContext';

export const server='http://localhost:5000'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <CourseContextProvider>
        <App />
        </CourseContextProvider>
    </UserContextProvider>
  </React.StrictMode>
);
