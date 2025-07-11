import { useState } from "react";
import { Button } from "react-bootstrap";

const UserChoice = ({ visible, options, whenChoiceMade }) => {  
    const [chosen, setChosen] = useState(null);

    const handleChoice = (index, option) => {
        setChosen(index);
        whenChoiceMade(option);
    }

    if (!visible)
        return null;

    const choiceMade = chosen != null;

    return (
        <div className="section buttons">
            {options.map((option, index) => (
                <Button
                    key={index}
                    onClick={() => handleChoice(index, option)}
                    disabled={choiceMade}
                    variant={(!choiceMade || chosen === index ) ? "primary" : "secondary"}
                >
                    {option}
                </Button>
            ))}
        </div>
    )
};
  
export default UserChoice;

