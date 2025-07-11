
import { useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { CircularProgressbar } from 'react-circular-progressbar';
import { ONE_SECOND } from "../../lib";
import 'react-circular-progressbar/dist/styles.css';

const Timer = ({
  duration,
  hidden,
  whenDone,
  timerDisabled = false,
}) => {
    const [remaining, setRemaining] = useState(duration);
    const [running, setRunning] = useState(!timerDisabled && duration > 0);

    useEffect(() => {
      if (running) {
        const interval = setInterval(() => {
          setRemaining((prev) => {
              if (prev === 0) {
                  clearInterval(interval);
                  setRunning(false);
                  if (whenDone)
                    whenDone();
                  else 
                    console.warn("Timer: whenDone callback not provided");
                  return 0;
              } else {
                  return prev - 1;
              }
          });
        }, ONE_SECOND);
        return () => clearInterval(interval);
      }
    }, [running, setRunning, whenDone]);

    const timeDisplay = formatTime(remaining);
    const realPercent = 100 * (1 - remaining / duration);
    let percent = realPercent;
    if (hidden && remaining > 0) {
        // randomly sweep between lower half and upper half (up to 90%)
        percent = ((remaining % 2) + Math.random()) * 45;
    }
    return (
      <div className="timer">
        {(hidden && remaining > 0)
          ? <>
            <Spinner
            animation="border" 
            />
            <div className="overlay">??</div>
          </>
          : <CircularProgressbar 
            strokeWidth={10}
            value={percent} 
            text={timeDisplay} 
          />
        }
      </div>
    );
};

const formatTime = (seconds) => {
    let hours = Math.floor(seconds / 3600);
    seconds %= 3600;
    let minutes = Math.floor(seconds / 60);
    seconds = (seconds % 60).toString().padStart(2, "0");
    let hoursPrefix;
    if (hours > 1) {
        minutes = minutes.toString().padStart(2, "0");
        hoursPrefix = `${hours}:`;
    } else {
        hoursPrefix = "";
    }
    return `${hoursPrefix}${minutes}:${seconds}`;
};

export default Timer;