import '../../styles/editor.css';

function Console({ output }) {
  return (
    <div className="console-container">
      <div className="console-header">
        <span>📟 Консоль</span>
      </div>
      <div className="console-output">
        {output.length === 0 ? (
          <div className="console-line empty">
            Очікую виконання коду...
          </div>
        ) : (
          output.map((line, index) => (
            <div 
              key={index} 
              className={`console-line ${line.type}`}
            >
              <span className="console-icon">
                {line.type === 'error' ? '❌' : 
                 line.type === 'success' ? '✅' : 'ℹ️'}
              </span>
              {line.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Console;