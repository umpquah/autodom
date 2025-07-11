import Confirmable from "./confirmable";
import Resolution from "./resolution";
import StructuredWithParameters from "./parameters";

export default class Stage extends StructuredWithParameters {
  static requiredProps = ["title"];
  static optionalProps = ["description", "parameters", "preamble", "resolution"];

  static subEntityTypes = {
    preamble: Confirmable,
    resolution: Resolution,
  };
}

