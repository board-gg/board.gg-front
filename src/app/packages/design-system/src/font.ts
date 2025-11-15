import { css } from "@emotion/react";

const fontGenerator = (weight: number) => css`
  font-family: "Pretendard";
  font-weight: ${weight};
  line-height: auto;
`;

const font = {
  D1: fontGenerator(100),
  D2: fontGenerator(200),
  D3: fontGenerator(300),
  D4: fontGenerator(400),
  D5: fontGenerator(500),
  D6: fontGenerator(600),
  D7: fontGenerator(700),
  D8: fontGenerator(800),
  D9: fontGenerator(900),
};

export default font;