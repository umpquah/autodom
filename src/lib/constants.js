/* eslint-disable no-template-curly-in-string */

export const RESERVED_WORDS = [
  "action",
  "clear",
  "confirmation",
  "description",
  "duration",
  "hidden",
  "initialStage",
  "instruction",
  "message",
  "next",
  "parameters",
  "preamble",
  "resolution",
  "stages",
  "title",
  "wait",
];

const DEBUG_TIMING = true;

const TRUE_SECOND = 1000;
const FAKE_SECOND = 10;

export const TRANSITION_TIME = 0.75 * TRUE_SECOND;
export const ONE_SECOND = DEBUG_TIMING ? FAKE_SECOND : TRUE_SECOND;

export const YML_PATH = "/defaults/game.yml";

export const NSFW_VALUES = {
    decideTitle: "Ulqengvba be Eryvrs?",
    optionOutcomes: ["fbzr [eryvrs]!", "fbzr [ulqengvba]!"],
    optionTitles: ["Eryvrs", "Ulqengvba"],
    rewardUnits: ["bhapr"],
    rewardContent: "=~ 💦Lbh znl crr abj!💦\nHc gb [${jvguHavgf(dhnagvgl, havgf)}], ab zber.",
    rewardConfirmation: "Qbar",
    penaltyUnits: ["bhapr"],
    penaltyContent: "=~ ☕️🥃🥤 Gvzr gb svyy hc!\nQevax [${jvguHavgf(dhnagvgl, havgf)}] bs lbhe snibevgr yvdhvq.",
    penaltyConfirmation: "Qbar",
};

export const SFW_VALUES = {
    decideTitle: "Task or Treat?",
    optionOutcomes: ["a [treat]!", "a [task]!"],
    optionTitles: ["Treat", "Task"],
    rewardUnits: ["piece"],
    rewardContent: "=~ You may eat [${withUnits(quantity, units)}] of candy.",
    rewardConfirmation: "Done",
    penaltyUnits: ["shovelful"],
    penaltyContent: "=~ Dig [${withUnits(quantity, units)}] of dirt.",
    penaltyConfirmation: "Done",
};

export const DEFAULT_YML = `
parameters:
  secondsMultiplier: 60
  baseAmount: 4
  optionTitles: ((optionTitles))
initialStage: waiting
stages:
  waiting:
    title: Waiting
    preamble:
      message: "Time to wait a while..."
      clear: true
    parameters:
      time: =range(1, 3)
      units: minute
    resolution:
      wait:
        instruction: =~ Wait [\${withUnits(time, units)}].
        duration: =time * secondsMultiplier
        hidden: false
      next: decide    
  decide:
    title: ((decideTitle))
    description: Let's find out what's in store for you!
    preamble:
      message: "You get..."
      confirmation: "find out"
      clear: true
      fade: true
    parameters:
      - getReward: =chance(0.5)
        options: ((optionOutcomes))
      - outcome: "=getReward ? options[0] : options[1]"
    resolution:
      action:
        message: "=~ You get... \${outcome}"
        confirmation: "Continue"
        fade: false
      next: "=getReward ? 'reward' : 'penalty'"
  reward:
    title: = optionTitles[0]
    parameters:
      - count: =range(1, 3)
      - quantity: =baseAmount * count
      - units: ((rewardUnits))
    resolution:
      action:
        message: ((rewardContent))
        confirmation: ((rewardConfirmation))
        fade: true
      clearStages: true
      next: waiting
  penalty:
    title: = optionTitles[1]
    parameters:
      - count: =range(1, 3)
      - quantity: =baseAmount * count
      - units: ((penaltyUnits))
    resolution:
      action:
        message: ((penaltyContent))
        confirmation: ((penaltyConfirmation))
        fade: true
      clearStages: true
      next: waiting
`;
