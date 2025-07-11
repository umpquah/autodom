import { useState } from 'react';
import { Button as BootstrapButton } from 'react-bootstrap';
import { TRANSITION_TIME } from '../../lib';

const Button = ({
  label,
  active = true,
  useFading,
  whenFadeStart,
  whenDone,
}) => {
  // For setting button visual state, possibly triggering
  // CSS transition
  const [buttonDone, setButtonDone] = useState(false);

  const handleDone = () => {
    if (whenDone)
      whenDone();
  }

  const handleClick = () => {
    setButtonDone(true);
    if (useFading) {
      if (whenFadeStart)
        whenFadeStart();
      setTimeout(handleDone, TRANSITION_TIME);
    } else {
      handleDone();
    }
  }

  return (
    <BootstrapButton 
      variant="success"
      className={`button ${useFading ? 'fading' : ''} ${buttonDone ? 'done' : ''}`}
      disabled={!active || buttonDone}
      onClick={handleClick}
    >
      {label}
    </BootstrapButton>
  );
};

export default Button;