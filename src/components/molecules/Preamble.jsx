import { Block } from "../atoms"

const Preamble = ({ preamble, whenDone, whenFadeStart, disabled, setError }) => {
  return (
    <Block 
      className="preamble" 
      content={preamble}
      confirmation="Ok"
      buttonFades={preamble?.fade}
      spinnerFirst={false}
      whenDone={whenDone}
      whenFadeStart={whenFadeStart}
      disabled={disabled}
      setError={setError}
    />
  );
}

export default Preamble;

