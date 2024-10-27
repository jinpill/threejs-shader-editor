import { useEffect, useRef, useState } from 'react';
import Paper from '@mui/material/Paper';
import { InputLabel } from '@mui/material';
import style from './style.module.scss';

const VERTEX_SHADER_KEY = 'glsl-test__vertex-shader';
const FRAGMENT_SHADER_KEY = 'glsl-test__fragment-shader';

const Editor = () => {
  const vertexRef = useRef<HTMLTextAreaElement>(null);
  const fragmentRef = useRef<HTMLTextAreaElement>(null);

  const [vertex, setVertex] = useState('');
  const [fragment, setFragment] = useState('');
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    const savedVertex = window.localStorage.getItem(VERTEX_SHADER_KEY);
    const savedFragment = window.localStorage.getItem(FRAGMENT_SHADER_KEY);
    setVertex(savedVertex || '');
    setFragment(savedFragment || '');
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 's') {
        event.preventDefault();
        window.localStorage.setItem(
          VERTEX_SHADER_KEY,
          vertexRef.current?.value || ''
        );
        window.localStorage.setItem(
          FRAGMENT_SHADER_KEY,
          fragmentRef.current?.value || ''
        );
        setIsChanged(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={style.editorContainer}>
      <InputLabel
        sx={{
          fontSize: '0.875rem',
          color: 'white',
        }}
      >
        Sample Input
      </InputLabel>
      <Paper variant="outlined" className={style.paperBox}>
        <textarea
          ref={vertexRef}
          value={vertex}
          onChange={(e) => {
            setIsChanged(true);
            setVertex(e.target.value);
          }}
          className={style.textarea}
        />
      </Paper>
    </div>
  );
};

export default Editor;
