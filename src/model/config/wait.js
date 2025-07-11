import { StructuredEntity } from "../entity";

export default class Wait extends StructuredEntity {
    static requiredProps = ["duration"];
    static optionalProps = ["hidden", "instruction"];
}