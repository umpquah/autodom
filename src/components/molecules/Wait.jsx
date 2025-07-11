import { Block, Timer } from "../atoms";

const Wait = ({ 
  wait: { instruction, fade, ...rest },
  whenDone,
  disabled,
  setError,
}) => {
  return (
    <Block
      className="wait"
      content={{message: instruction, confirmation: "Continue"}}
      spinnerFirst={true}
      buttonFades={fade}
      whenDone={whenDone}
      disabled={disabled}
      setError={setError}
      innerComponent={Timer}
      timerDisabled={disabled}
      {...rest}
    />
  );
}

export default Wait;