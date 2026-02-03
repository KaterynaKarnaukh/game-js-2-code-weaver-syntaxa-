import { useState } from 'react';
import '../../styles/ui.css';

function MainMenu({ onStart }) {
  const [showIntro, setShowIntro] = useState(false);

  return (
    <div className="main-menu">
      <div className="menu-container">
        <h1 className="game-title">
          CODE WEAVER
          <span className="subtitle">Syntaxa</span>
        </h1>
        
        {!showIntro ? (
          <div className="menu-buttons">
            <button className="menu-btn primary" onClick={() => setShowIntro(true)}>
              Нова гра
            </button>
            <button className="menu-btn" disabled>
              Продовжити (скоро)
            </button>
            <button className="menu-btn" disabled>
              Налаштування (скоро)
            </button>
          </div>
        ) : (
          <div className="intro-text">
            <p>Світ Syntaxa існує лише тому, що його код виконується.</p>
            <p>Ти - відьма, яка володіє магією коду.</p>
            <p>Інквізиція переслідує тебе за цю "єресь".</p>
            <p>Твоя ціль - втекти до легендарного міста Code Haven.</p>
            <button className="menu-btn primary" onClick={onStart}>
              Почати втечу →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default MainMenu;