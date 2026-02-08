import './HeartRain.css';

const HeartRain = () => {
  // Create an array of 50 drops
  const drops = Array.from({ length: 50 });

  return (
    <div className="rain-container">
      {drops.map((_, index) => {
        // Randomize the animation styles for each drop
        const style = {
          left: `${Math.random() * 100}vw`,
          animationDuration: `${Math.random() * 2 + 3}s`, // Between 3s and 5s
          animationDelay: `${Math.random() * 5}s`,
        } as React.CSSProperties;

        // Randomly choose between a Purple Heart and a Fleur-de-lis (Iris symbol)
        const emoji = Math.random() > 0.6 ? '⚜️' : '💜';

        return (
          <div key={index} className="heart-drop" style={style}>
            {emoji}
          </div>
        );
      })}
    </div>
  );
};

export default HeartRain;