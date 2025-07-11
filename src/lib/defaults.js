import { map, mapValues, toPairs } from "lodash";
import { parse } from "yaml";
import rot13Cipher from "rot13-cipher";
import { SFW_VALUES, NSFW_VALUES, DEFAULT_YML } from "./constants";

export const generateDefaultYaml = (yamlBase, valueMap = SFW_VALUES) => {
  let yaml = yamlBase;
  toPairs(valueMap).forEach(([key, value]) => {
    const regex = new RegExp(`\\(\\(${key}\\)\\)`, 'mg');
    yaml = yaml.replace(regex, JSON.stringify(value));
  });
  return yaml;
};

export const loadDefaultSpec = (sfw = true) => {
  const values = sfw ? SFW_VALUES : _translatedValues(NSFW_VALUES);
  try {
    const defaultYaml = generateDefaultYaml(DEFAULT_YML, values);
    const spec = parse(defaultYaml);
    return spec;
  } catch (e) {
    throw new Error("Error parsing YAML:", e);
  } 
};

const _translatedValues = (orig_values) => {
  return mapValues(orig_values, (value) => {
    if (Array.isArray(value)) {
      return map(value, (item) => rot13Cipher(item));
    } else {
      return rot13Cipher(value);
    }
  });
}
