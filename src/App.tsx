import { useState } from "react";
import confetti from "canvas-confetti";
import HeartRain from "./HeartRain";
import "./App.css";

import askImg from "./assets/ask.png";
import successImg from "./assets/success.png";

function App() {
  const [yesPressed, setYesPressed] = useState(false);
  const [noBtnPosition, setNoBtnPosition] = useState({ top: "auto", left: "auto", position: "static" });

  function handleYesClick() {
    setYesPressed(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#7c3aed', '#fbbf24', '#a78bfa']
    });
  }

  function moveNoButton() {
    // 1. Get the button's width/height (approx) to prevent it going off screen
    const btnWidth = 150;
    const btnHeight = 50;
    
    // 2. Calculate available space
    // We limit the movement area to 90% of screen to avoid edges
    const maxWidth = window.innerWidth - btnWidth - 20;
    const maxHeight = window.innerHeight - btnHeight - 20;

    // 3. Generate random coordinates
    const randomX = Math.max(10, Math.random() * maxWidth);
    const randomY = Math.max(10, Math.random() * maxHeight);

    setNoBtnPosition({ 
      position: "fixed" as any, 
      left: `${randomX}px`, 
      top: `${randomY}px` 
    });
  }

  return (
    <>
      <HeartRain />
      
      <div className="valentine-container">
        {yesPressed ? (
          <>
            <img src={successImg} alt="Celebration" className="main-image" />
            <div className="text-container">YAY! Happy Valentine's Day!</div>
          </>
        ) : (
          <>
            <img src={askImg} alt="Asking" className="main-image" />
            <h1 className="text-container">Will you be my Valentine?</h1>
            
            <div className="button-container">
              <button
                className="valentine-btn"
                onClick={handleYesClick}
              >
                Yes
              </button>

              <button
                className="valentine-btn"
                style={{ 
                  position: noBtnPosition.position as any, 
                  top: noBtnPosition.top, 
                  left: noBtnPosition.left 
                }} 
                onMouseEnter={moveNoButton} // For Mouse
                onTouchStart={moveNoButton} // For Touch Screens (Mobile)
                onClick={moveNoButton}      // Backup
              >
                No
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;