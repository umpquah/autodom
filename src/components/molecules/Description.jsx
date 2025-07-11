import { Block } from "../atoms"

const Preamble = ({ description }) => {
  return (
    <Block 
      className="description" 
      content={{message: description}} 
    />
  );
}

export default Preamble;