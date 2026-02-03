import '../../styles/ui.css';

function Header({ level, module, xp = 0, codePoints = 0 }) {
  return (
    <header className="game-header">
      <div className="header-left">
        <h2 className="location-name">Village of Origins</h2>
        <span className="level-indicator">Рівень {level}</span>
      </div>
      
      <div className="header-right">
        <div className="stat">
          <span className="stat-label">XP:</span>
          <span className="stat-value">{xp}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Code Points:</span>
          <span className="stat-value">{codePoints}</span>
        </div>
      </div>
    </header>
  );
}

export default Header;