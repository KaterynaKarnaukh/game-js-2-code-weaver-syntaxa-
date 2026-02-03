import { useState } from 'react';
import GameLayout from './components/layout/GameLayout';
import MainMenu from './components/layout/MainMenu';

export function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="app">
      {!gameStarted ? (
        <MainMenu onStart={() => setGameStarted(true)} />
      ) : (
        <GameLayout />
      )}
    </div>
  );
}

export default App;