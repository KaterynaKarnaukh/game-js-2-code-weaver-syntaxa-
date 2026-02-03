import '../../styles/ui.css';

function QuestPanel({ level }) {
  const questData = {
    1: {
      title: "Темрява камери",
      description: "Створи світло, щоб побачити вихід з камери.",
      objectives: [
        { text: "Оголоси змінну light", completed: false },
        { text: "Встанови значення true", completed: false }
      ],
      hint: "Спробуй: let light = true;"
    }
  };

  const quest = questData[level] || questData[1];

  return (
    <div className="quest-panel">
      <div className="quest-header">
        <h3>📜 Завдання</h3>
      </div>
      
      <div className="quest-content">
        <h4 className="quest-title">{quest.title}</h4>
        <p className="quest-description">{quest.description}</p>
        
        <div className="quest-objectives">
          <p className="objectives-label">Цілі:</p>
          {quest.objectives.map((obj, index) => (
            <div key={index} className="objective">
              <span className={`checkbox ${obj.completed ? 'checked' : ''}`}>
                {obj.completed ? '☑' : '☐'}
              </span>
              <span className={obj.completed ? 'completed' : ''}>
                {obj.text}
              </span>
            </div>
          ))}
        </div>
        
        <div className="quest-hint">
          <p className="hint-label">💡 Підказка:</p>
          <code>{quest.hint}</code>
        </div>
      </div>
    </div>
  );
}

export default QuestPanel;