import { useEffect, useRef, useState } from 'react';
import Sprite from './Sprite';
import '../../styles/game.css';

function GameCanvas({ level, onLevelComplete }) {
  const containerRef = useRef(null);
  const [playerPos, setPlayerPos] = useState({ x: 3, y: 3 });
  const [playerState, setPlayerState] = useState('idle');
  const [showLight, setShowLight] = useState(false);
  const [tileSize, setTileSize] = useState(48);

  const levelMap = [
    ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
    ['wall', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'wall'],
    ['wall', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'wall'],
    ['wall', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'wall'],
    ['wall', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'wall'],
    ['wall', 'floor', 'floor', 'floor', 'floor', 'floor', 'floor', 'wall'],
    ['wall', 'floor', 'floor', 'floor', 'floor', 'floor', 'door', 'wall'],
    ['wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall', 'wall'],
  ];

  const [objects, setObjects] = useState([
    { id: 'door', type: 'door-closed', x: 6, y: 6 },
  ]);

  // Адаптивний розмір тайлів
  useEffect(() => {
    const updateTileSize = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth - 40;
        const containerHeight = containerRef.current.offsetHeight - 100;
        const maxTileSize = Math.min(
          Math.floor(containerWidth / 8),
          Math.floor(containerHeight / 8)
        );
        setTileSize(Math.max(32, Math.min(64, maxTileSize)));
      }
    };

    updateTileSize();
    window.addEventListener('resize', updateTileSize);
    return () => window.removeEventListener('resize', updateTileSize);
  }, []);

  useEffect(() => {
    const handleCodeMove = (direction) => {
      let newX = playerPos.x;
      let newY = playerPos.y;

      switch (direction) {
        case 'north':
          newY -= 1;
          break;
        case 'south':
          newY += 1;
          break;
        case 'east':
          newX += 1;
          setPlayerState('walk-right');
          break;
        case 'west':
          newX -= 1;
          setPlayerState('walk-left');
          break;
      }

      if (levelMap[newY] && levelMap[newY][newX] !== 'wall') {
        setPlayerPos({ x: newX, y: newY });
        setTimeout(() => setPlayerState('idle'), 300);
      }
    };

    window.gameMove = handleCodeMove;
    return () => delete window.gameMove;
  }, [playerPos]);

  useEffect(() => {
    window.gameSetLight = (value) => {
      setShowLight(value);
      
      if (value) {
        setTimeout(() => {
          setObjects(prev => prev.map(obj => 
            obj.id === 'door' 
              ? { ...obj, type: 'door-open' }
              : obj
          ));
        }, 1000);
      }
    };

    return () => {
      delete window.gameSetLight;
    };
  }, []);

  return (
    <div className="game-canvas-container" ref={containerRef}>
      <div 
        className="game-world"
        style={{
          position: 'relative',
          width: tileSize * 8,
          height: tileSize * 8,
          margin: '0 auto',
        }}
      >
        {levelMap.map((row, y) => (
          row.map((tile, x) => (
            <Sprite
              key={`tile-${x}-${y}`}
              type="tile"
              variant={tile === 'wall' ? 'wall-brick' : 'floor-stone'}
              style={{
                position: 'absolute',
                left: x * tileSize,
                top: y * tileSize,
                width: tileSize,
                height: tileSize,
              }}
            />
          ))
        ))}

        {objects.map((obj) => (
          <Sprite
            key={obj.id}
            type="object"
            variant={obj.type}
            style={{
              position: 'absolute',
              left: obj.x * tileSize,
              top: obj.y * tileSize - 16,
              zIndex: 10,
            }}
          />
        ))}

        {showLight && (
          <Sprite
            type="object"
            variant="light-orb"
            style={{
              position: 'absolute',
              left: (playerPos.x * tileSize) + (tileSize / 2) - 8,
              top: (playerPos.y * tileSize) - 24,
              zIndex: 5,
            }}
          />
        )}

        <Sprite
          type="witch"
          variant={playerState}
          style={{
            position: 'absolute',
            left: playerPos.x * tileSize + (tileSize / 2) - 16,
            top: playerPos.y * tileSize + (tileSize / 2) - 16,
            zIndex: 20,
          }}
        />
      </div>

      <div className="game-hint">
        {!showLight ? (
          <p>✨ Створи змінну light, щоб побачити шлях...</p>
        ) : (
          <p>🚪 Двері попереду. Використай код, щоб відчинити їх.</p>
        )}
      </div>
    </div>
  );
}

export default GameCanvas;