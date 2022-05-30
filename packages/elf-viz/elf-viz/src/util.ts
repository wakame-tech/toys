export const toHex = (val: number, digits: number = 16): string => {
  const hex = val.toString(16);
  return "0x" + "0".repeat(digits - hex.length) + hex;
};

const PF_X = 1 << 0;
const PF_W = 1 << 1;
const PF_R = 1 << 2;

export type PHFlag = "X" | "W" | "R";
export const PhFlagMap = {
  [PF_X]: "X",
  [PF_W]: "W",
  [PF_R]: "R",
} as const;

export const parsePhdrFlags = (flags: number): PHFlag[] => {
  const res: PHFlag[] = [];
  for (let i = 0; i < 3; i++) {
    if (flags & (1 << i)) {
      res.push(PhFlagMap[1 << i]);
    }
  }
  return res;
};
