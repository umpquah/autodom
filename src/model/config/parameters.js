import { Bindings, StructuredEntity } from "../entity";

export default class StructuredWithParameters extends StructuredEntity {
  static specialProps = ["parameters"];

  _handleSpecialProps(spec) {
    if (spec.parameters) {
      const params = new Bindings("parameters", spec.parameters, this, this.scope);
      this.parameters = params;
      this.scope = params.innerScope;
    }
  }
}

