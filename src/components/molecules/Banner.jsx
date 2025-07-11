import { Block } from "../atoms"

const Banner = ({ title }) => {
  return (
    <Block 
      className="banner" 
      content={{message: title}} 
    />
  );
}

export default Banner;