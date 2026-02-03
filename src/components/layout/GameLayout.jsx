import { useState } from 'react';
import CodeEditor from '../editor/CodeEditor';
import GameCanvas from '../game/GameCanvas';
import Header from '../ui/Header';
import QuestPanel from '../ui/QuestPanel';
import Console from '../editor/Console';
import CodeExecutor from '../../engine/CodeExecutor';
import '../../styles/game.css';

const executor = new CodeExecutor();

function GameLayout() {
  const [code, setCode] = useState('');
  const [consoleOutput, setConsoleOutput] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(1);
  const [playerStats, setPlayerStats] = useState({
    xp: 0,
    codePoints: 0,
  });

  const handleRunCode = async (userCode) => {
    // Очистити консоль
    setConsoleOutput([{ 
      type: 'info', 
      message: '⚡ Виконую код...' 
    }]);

    // Виконати код
    const result = await executor.execute(userCode, currentLevel);

    // Оновити консоль
    setConsoleOutput(result.output);

    // Якщо є повідомлення від системи
    if (result.message) {
      setConsoleOutput(prev => [...prev, {
        type: result.success ? 'success' : 'info',
        message: result.message,
      }]);
    }

    // Якщо є підказка
    if (result.hint) {
      setConsoleOutput(prev => [...prev, {
        type: 'info',
        message: result.hint,
      }]);
    }

    // Якщо рівень пройдено
    if (result.levelComplete) {
      setTimeout(() => {
        setConsoleOutput(prev => [...prev, {
          type: 'success',
          message: '🎉 Рівень пройдено! +100 XP',
        }]);
        
        setPlayerStats(prev => ({
          xp: prev.xp + 100,
          codePoints: prev.codePoints + 10,
        }));
      }, 500);
    }
  };

  return (
    <div className="game-layout">
      <Header 
        level={currentLevel} 
        module={1}
        xp={playerStats.xp}
        codePoints={playerStats.codePoints}
      />
      
      <div className="game-content">
        <div className="left-panel">
          <CodeEditor 
            code={code}
            onChange={setCode}
            onRun={handleRunCode}
          />
          <Console output={consoleOutput} />
        </div>
        
        <div className="right-panel">
          <GameCanvas 
            level={currentLevel}
            onLevelComplete={() => setCurrentLevel(prev => prev + 1)}
          />
          <QuestPanel level={currentLevel} />
        </div>
      </div>
    </div>
  );
}

export default GameLayout;