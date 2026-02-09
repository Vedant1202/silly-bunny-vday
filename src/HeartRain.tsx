import './HeartRain.css';

const HeartRain = () => {
  const drops = Array.from({ length: 50 });

  return (
    <div className="rain-container">
      {drops.map((_, index) => {
        const style = {
          left: `${Math.random() * 100}vw`,
          animationDuration: `${Math.random() * 2 + 3}s`,
          animationDelay: `${Math.random() * 5}s`,
        } as React.CSSProperties;

        // Switching to Red and Brown hearts to match the theme
        const emoji = Math.random() > 0.5 ? '🤎' : '❤️';

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