import * as Colors from './colors';
import * as Typography from './typography';
import { SCALE_0, SCALE_1, SCALE_2, SCALE_3, SCALE_4 } from './spacings';
import { RAD_0, RAD_1, RAD_2, RAD_3, RAD_ROUND } from './radius';

const theme = {
  palette: {
    primary: Colors.PRIMARY,
    primaryDark: Colors.PRIMARY_DARK,
    primaryTint: Colors.PRIMARY_TINT,
    bg: Colors.BACKGROUND,
    surface: Colors.SURFACE,
    border: Colors.BORDER,
    label: Colors.LABEL,
    secondaryLabel: Colors.SECONDARY_LABEL,
    tertiaryLabel: Colors.TERTIARY_LABEL,
    white: Colors.WHITE,
    black: Colors.BLACK,
    error: Colors.ERROR,
    success: Colors.SUCCESS,
    warning: Colors.WARNING,
    info: Colors.INFO,
  },
  typography: {
    size: {
      title: Typography.FONT_SIZE_TITLE,
      h1: Typography.FONT_SIZE_H1,
      h2: Typography.FONT_SIZE_H2,
      body: Typography.FONT_SIZE_BODY,
      sub: Typography.FONT_SIZE_SUB,
      caption: Typography.FONT_SIZE_CAPTION,
    },
    weight: {
      regular: Typography.WEIGHT_REGULAR,
      medium: Typography.WEIGHT_MEDIUM,
      semibold: Typography.WEIGHT_SEMIBOLD,
      bold: Typography.WEIGHT_BOLD,
    },
  },
  spacing: {
    xs: SCALE_0,
    sm: SCALE_1,
    md: SCALE_2,
    lg: SCALE_3,
    xl: SCALE_4,
  },
  radius: {
    r0: RAD_0,
    r1: RAD_1,
    r2: RAD_2,
    r3: RAD_3,
    round: RAD_ROUND,
  },
};

export default theme;
