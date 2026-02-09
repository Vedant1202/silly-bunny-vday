import { useState, useRef, useEffect } from "react";
import confetti from "canvas-confetti";
import HeartRain from "./HeartRain";
import "./App.css";

import askImg from "./assets/bear.gif";
import successImg from "./assets/success.png";

function App() {
  const [yesPressed, setYesPressed] = useState(false);
  const [noBtnPosition, setNoBtnPosition] = useState({ top: "auto", left: "auto", position: "static" });

  // --- AUDIO REFS ---
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const successMusicRef = useRef<HTMLAudioElement | null>(null);
  const noSoundRef = useRef<HTMLAudioElement | null>(null);

  // Initialize Audio
  useEffect(() => {
    bgMusicRef.current = new Audio("/bg-music.mp3"); // Path from public folder
    bgMusicRef.current.loop = true;
    bgMusicRef.current.volume = 0.4; // 40% volume

    successMusicRef.current = new Audio("/success-music.mp3");
    successMusicRef.current.volume = 0.6;

    noSoundRef.current = new Audio("/no-sound.mp3");
    
    // Attempt to play background music on first user interaction
    const playAudio = () => {
      bgMusicRef.current?.play().catch(() => {
        // Autoplay was prevented
        console.log("Interaction required for music");
      });
      // Remove listener after first interaction
      window.removeEventListener('click', playAudio);
    };

    window.addEventListener('click', playAudio);
    
    return () => {
      window.removeEventListener('click', playAudio);
      // Cleanup audio on unmount
      bgMusicRef.current?.pause();
      successMusicRef.current?.pause();
    };
  }, []);

  function handleYesClick() {
    setYesPressed(true);

    // Stop background music
    if (bgMusicRef.current) {
      bgMusicRef.current.pause();
      bgMusicRef.current.currentTime = 0;
    }

    // Play Success Music
    successMusicRef.current?.play();

    // Trigger confetti
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#590000', '#451d01', '#ffffff'] // Red, Brown, White confetti
    });
  }

  function moveNoButton() {
    // Play the "No" sound effect
    if (noSoundRef.current) {
      noSoundRef.current.currentTime = 0; // Rewind to start for rapid hovering
      noSoundRef.current.play().catch(() => {}); // Catch error if user hasn't interacted yet
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