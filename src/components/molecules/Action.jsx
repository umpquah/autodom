import { Block } from "../atoms"

const Action = ({ action, whenDone, disabled, setError }) => {
  return (
    <Block 
      className="action" 
      content={action}
      confirmation="Done"
      buttonFades={action?.fade}
      spinnerFirst={true}
      whenDone={whenDone}
      disabled={disabled}
      setError={setError}
    />
  );
}

export default Action;

