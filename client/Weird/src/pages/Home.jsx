import React, { useState } from 'react';
import RegisterForm from './Register';
import LoginForm from './Login';
import './style.scss';

const Home = () => {
  const [isSignUpMode, setSignUpMode] = useState(false);
  const [activeBullet, setActiveBullet] = useState(1);
  const [errors, setErrors] = useState([]);

  const handleToggleClick = () => {
    setSignUpMode((prevMode) => !prevMode);
  };
  const moveSlider = (index) => {
    setActiveBullet(index);
  };

  return (
    <main className={isSignUpMode ? 'sign-up-mode' : ''}>
      <div className="box">
        <div className="inner-box">
          <div className="forms-wrap">
            {isSignUpMode ? (
              <RegisterForm handleToggleClick={handleToggleClick} 
              setErrors={setErrors}
              />
            ) : (
              <LoginForm handleToggleClick={handleToggleClick} />
            )}
          </div>

  

          <div className="carousel">
            <div className="bullets">

            <h4>
              <b>Weird Stories</b>
              <em>is a <strong>platform</strong> where people can</em> <br /> connect, share and interact freely.
            </h4>
              {/* {[1, 2, 3].map((value) => (
                <span
                  key={value}
                  className={activeBullet === value ? 'active' : ''}
                  data-value={value}
                  onClick={() => moveSlider(value)}
                ></span>
              ))} */}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;