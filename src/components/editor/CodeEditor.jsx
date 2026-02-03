import { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import '../../styles/editor.css';

function CodeEditor({ code, onChange, onRun }) {
  const editorRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);

  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;
    setIsLoading(false);
    
    // Налаштування теми
    monaco.editor.defineTheme('syntaxa-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: '00d4ff' },
        { token: 'string', foreground: '06ffa5' },
        { token: 'number', foreground: 'ff006e' },
      ],
      colors: {
        'editor.background': '#16213e',
      }
    });
    monaco.editor.setTheme('syntaxa-dark');
  }

  return (
    <div className="code-editor-container">
      <div className="editor-toolbar">
        <span className="editor-title">✨ Магія коду</span>
        <button 
          className="run-button"
          onClick={() => onRun(code)}
          disabled={isLoading}
        >
          ▶ Виконати
        </button>
      </div>
      
      {isLoading && (
        <div style={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--code-primary)',
          fontSize: '14px'
        }}>
          Завантаження редактора коду...
        </div>
      )}
      
      <Editor
        height="100%"
        defaultLanguage="javascript"
        defaultValue="// Напиши свій код тут
let light = true;"
        value={code}
        onChange={onChange}
        onMount={handleEditorDidMount}
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          lineNumbers: 'on',
          scrollBeyondLastLine: false,
          automaticLayout: true,
          tabSize: 2,
          wordWrap: 'on',
        }}
      />
    </div>
  );
}

export default CodeEditor;