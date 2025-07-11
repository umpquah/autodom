const _range = (min, max) => {
  if (!(Number.isInteger(min) && Number.isInteger(max)))
    throw new TypeError("must be integers");
  if (max < min)
    throw new TypeError("must be in non-decreasing order");
  return Math.floor(min + Math.random() * (max - min + 1))
}

const _chance = (probability) => {
  if (typeof probability !== "number")
    throw new TypeError("must be a number");
  if (probability < 0 || probability > 1)
    throw new TypeError("must be between 0 and 1");
  return Math.random() < probability;
}

const _select = (options) => {
  if (!Array.isArray(options) || options.length === 0)
    throw new TypeError("must be a non-empty array");
  return options[Math.floor(Math.random() * options.length)];
}

const _withUnits = (value, unitOrUnits) => {
  let singular, plural;
  if (!(Array).isArray(unitOrUnits)) {
    singular = unitOrUnits;
    plural = unitOrUnits + "s"
  } else {
    singular = unitOrUnits[0];
    plural = unitOrUnits.length > 1 ? unitOrUnits[1] : unitOrUnits[0] + "s";
  }
  return `${value} ${value === 1 ? singular : plural}`;
}

const BUILTINS = {
  "range": _range,
  "chance": _chance,
  "select": _select,
  "withUnits": _withUnits,
}

export default BUILTINS;