import Confirmable from "./confirmable";
import Wait from "./wait";
import { StructuredEntity } from "../entity";

export default class Resolution extends StructuredEntity {
    static requiredProps = ["next"];
    static optionalProps = ["action", "wait", "clearStages"];
    static mutexProps = [["action", "wait"]];
    static needOneOf = [["action", "wait"]];
    static subEntityTypes = {
        wait: Wait,
        action: Confirmable,
    };
}   
