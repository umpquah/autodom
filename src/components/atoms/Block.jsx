import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import Button from "./Button";
import { TRANSITION_TIME } from "../../lib";

const Block = ({
    className,
    visible = true,
    disabled = false,
    setError,
    content: { message, confirmation, clear },
    confirmation: defaultConfirmation,
    whenFadeStart,
    whenDone,
    spinnerFirst = false,
    buttonFades = false,
    innerComponent: InnerComponent,
    ...innerProps
}) => {
  const [blockVisible, setBlockVisible] = useState(visible);
  const [spinning, setSpinning] = useState(visible && spinnerFirst);
  const [buttonActive, setButtonActive] = useState(!InnerComponent);

  const spans = message ? _makeSpans(message) : null;

  confirmation = confirmation ?? defaultConfirmation;

  useEffect(() => {
      if (spinning) {
        setTimeout(() => {
            setSpinning(false);
        }, TRANSITION_TIME);
      }
    }, [spinning, setSpinning]
  );

  const handleFadeStart = () => {
    if (whenFadeStart)
      whenFadeStart();
  }

  const handleDone = () => {
    if (clear)
        setBlockVisible(false);
    if (whenDone)
      whenDone();
    else
      console.warn("Block: whenDone callback not provided");
  };

  const handleInnerDone = () => {
    // avoiding an annoying React error about state updates while rendering
    setTimeout(() => {
     setButtonActive(true);
    }, 100);
  };

  return (blockVisible &&
    <div className={`block ${className}`}>
      {spinning &&
        <Spinner variation="success" animation="border" />
      }
      {!spinning &&
        <>
          <div className="content">
            {spans &&
              <div className="upper">
                {spans}
              </div>
            }
            {InnerComponent &&
              <div className="lower">
                <InnerComponent disabled={disabled} whenDone={handleInnerDone} {...innerProps} />
              </div>
            }
          </div>
          {confirmation &&
            <div className="right">
              <Button
                label={confirmation}
                active={!disabled && buttonActive}
                useFading={buttonFades}
                whenFadeStart={handleFadeStart}
                whenDone={handleDone}
              />
            </div>
          }
        </> 
      }
    </div>
  );
};

const _makeSpans = (str) => {
  const spans = str.match(/([^[\]]+)|(\[.+?\])/g).map(
    (str, index) => (
      (str[0] === "[")
          ? <span className="callout" key={index}>{(str.substring(1, str.length - 1))}</span>
          : <span key={index}>{str}</span>
    )
  );
  return spans;
};

export default Block;