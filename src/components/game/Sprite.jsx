import classNames from 'classnames';
import '../../styles/sprites.css';

function Sprite({ type, variant, style = {}, className = '', onClick }) {
  const spriteClass = classNames(
    'sprite',
    'pixelated',
    'no-select',
    {
      'witch-sprite': type === 'witch',
      [`witch-sprite ${variant}`]: type === 'witch' && variant,
      
      'tile': type === 'tile',
      [`tile-${variant}`]: type === 'tile' && variant,
      
      [`object-${variant}`]: type === 'object' && variant,
      
      [`particle-${variant}`]: type === 'particle' && variant,
      [`effect-${variant}`]: type === 'effect' && variant,
    },
    className
  );

  return (
    <div 
      className={spriteClass} 
      style={style}
      onClick={onClick}
    />
  );
}

export default Sprite;