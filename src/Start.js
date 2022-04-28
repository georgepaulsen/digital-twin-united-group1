import { StrictMode } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import App from './App';
import Input from './Input';
import TextIndex from './components/TextIndex';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import AppsIcon from '@mui/icons-material/Apps';

export default function Start() {
  const [isStart, setIsStart] = useState(true);

  return (
    <StrictMode>
      <Router>
        <div>
          {isStart ? (
            <>
              <TextIndex />
              <ul>
                <p>
                  <Link
                    to="/App"
                    onClick={() => {
                      setIsStart(false);
                    }}
                  >
                    {/* <AppsIcon /> */}
                    App
                  </Link>
                </p>
                <p>
                  <Link
                    to="/Input"
                    onClick={() => {
                      setIsStart(false);
                    }}
                  >
                    Input
                  </Link>
                </p>
              </ul>
            </>
          ) : (
            <>
              <Button
                onClick={() => {
                  setIsStart(true);
                }}
              />
              <hr />
              <Routes>
                <Route path="App" element={<App />} />
                <Route path="/Input" element={<Input />} />
              </Routes>
            </>
          )}
        </div>
      </Router>
    </StrictMode>
  );
}
