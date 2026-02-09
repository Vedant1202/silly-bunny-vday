import { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import HeartRain from "./HeartRain";
import "./App.css";

// Images
import askImg from "./assets/bear.gif";
import successImg from "./assets/success.png";

// Audio (Importing them fixes the path issues on GitHub Pages)
import bgMusicFile from "./assets/bg-music.mp3";
import noSoundFile from "./assets/no-sound.mp3";
import successMusicFile from "./assets/success-music.mp3";

function App() {
  const [started, setStarted] = useState(false); // New state for "Click to Enter"
  const [yesPressed, setYesPressed] = useState(false);
  const [noBtnPosition, setNoBtnPosition] = useState({ top: "auto", left: "auto", position: "static" });

  // Audio Refs
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const successMusicRef = useRef<HTMLAudioElement | null>(null);
  const noSoundRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio Objects
  useEffect(() => {
    bgMusicRef.current = new Audio(bgMusicFile);
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.4;

    successMusicRef.current = new Audio(successMusicFile);
    successMusicRef.current.volume = 0.6;

    noSoundRef.current = new Audio(noSoundFile);
  }, []);

  // Function to Start the Experience
  const handleStart = () => {
    setStarted(true);
    // Attempt to play music immediately after user interaction
    bgMusicRef.current?.play().catch(e => console.error("Audio play failed:", e));
  };

  function handleYesClick() {
    setYesPressed(true);

    // Stop BG Music
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
      bgMusicRef.current.currentTime = 0;
    }

    // Play Success Music
    successMusicRef.current?.play().catch(e => console.error("Success audio failed:", e));

    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#590000', '#451d01', '#ffffff']
    });
  }

  function moveNoButton() {
    // Play "No" sound
    if (noSoundRef.current) {
      // Clone the node so we can play overlapping sounds if they hover fast
      const soundClone = noSoundRef.current.cloneNode() as HTMLAudioElement;
      soundClone.volume = 0.5;
      soundClone.play().catch(() => {}); 
    }

    const btnWidth = 150;
    const btnHeight = 50;
    
    const maxWidth = window.innerWidth - btnWidth - 20;
    const maxHeight = window.innerHeight - btnHeight - 20;

    const randomX = Math.max(10, Math.random() * maxWidth);
    const randomY = Math.max(10, Math.random() * maxHeight);

    setNoBtnPosition({ 
      position: "fixed" as any, 
      left: `${randomX}px`, 
      top: `${randomY}px` 
    });
  }

  // Render the "Click to Enter" screen if not started
  if (!started) {
    return (
      <div className="valentine-container">
        <h1 className="text-container">💌</h1>
        <button className="valentine-btn" onClick={handleStart}>
          Click to Open
        </button>
      </div>
    );
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
                className="valentine-btn yes-btn"
                onClick={handleYesClick}
              >
                Yes
              </button>

              <button
                className="valentine-btn no-btn"
                style={{ 
                  position: noBtnPosition.position as any, 
                  top: noBtnPosition.top, 
                  left: noBtnPosition.left 
                }} 
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton} 
                onClick={moveNoButton}
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