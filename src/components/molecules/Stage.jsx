import { useState } from "react";
import { Action, Banner, Description, Preamble, Wait } from ".";

const Stage = ({
  disabled = false,
  whenStageDone,
  setError,
  title,
  description,
  preamble,
  resolution: {
      action,
      wait,
  } = {},
  
}) => {
    const [showResolution, setShowResolution] = useState(!preamble);

    return (
      <div className={`stage ${disabled ? "disabled" : ""}`}>
        <Banner title={`${title}`} />
        {description &&
          <Description description={description} />
        }
        {preamble &&
          <Preamble
            preamble={preamble}
            whenFadeStart={() => setShowResolution(true)}
            whenDone={() => setShowResolution(true)}
            disabled={disabled}
            setError={setError}
          />
        }
        { showResolution && action &&
          <Action
            action={action}
            whenDone={whenStageDone}
            disabled={disabled}
            setError={setError}
          />
        }
        { showResolution && wait &&
          <Wait 
            wait={wait}
            whenDone={whenStageDone}
            disabled={disabled}
            setError={setError}
          />
        }
      </div>
    );
};

export default Stage;