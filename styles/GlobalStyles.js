import { isRTL } from '../i18n.config';

/* fonts */
export const FontFamily = {
  rubikMedium: 'Rubik-Medium',
  rubikSemiBold: 'Rubik-SemiBold',
  rubikBold: 'Rubik-Bold',
  rubikRegular: 'Rubik-Regular',
  rubikExstraBold: 'Rubik-ExtraBold',
  sMSMDelete: 'Rubik-Regular',
};
/* font sizes */
export const FontSize = {
  miniTextBold_size: 10,
  bodyM_size: 16,
  h4_size: 18,
  h3_size: 20,
  sMSMDelete_size: 12,
  lGLGStrong_size: 16,
  size_mid_6: 18,
  baseBaseNormal_size: 14,
  size_16xl_2: 35,
  size_3xs: 10,
  size_6xl_5: 26,
  size_4xs_6: 9,
  body_size: 16,
  caption2Bold_size: 12,
  h12_size: 32,
  h3Bold_size: 20,
  bodyBold_size: 16,
  h2_size: 24,
  caption_size: 14,
  caption_size_small: 10,
  h4Bold_size: 18,
  h1_size: 64,
  captionBold_size: 14,
  size_sm: 16,
  rem_09: 14.4, // Converted from 0.9rem
  status_rem: 10.88, // Converted from 0.68rem

};

/* Colors */
export const Color = {
  primary: '#5B2676',
  newPrimary: '#03FF84',
  newSecondary: '#00122D',
  darkestPurple: '#391054',
  lightPurple: '#9C72B2',
  lightestPurple: '#C9A7F1',
  secondery: '#EDE2F9',
  white: '#fff',
  text2: '#fff',
  textBlack: '#363636',
  primaryred: '#f05053',
  colorDarkgray: '#aeaeae',
  colorDarksalmon: '#ffb996',
  superGrey: '#efefef',
  colorOlive: '#929409',
  colorLightgray: '#cdcdcd',
  colorGray_100: 'rgba(0, 0, 0, 0.06)',
  colorGray_200: 'rgba(255, 255, 255, 0.4)',
  colorText: 'rgba(0, 0, 0, 0.88)',
  colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
  colorTextTertiary: 'rgba(0, 0, 0, 0.45)',
  links: '#1677ff',
  color: '#709386',
  colorGold: '#ffd812',
  colorDarkseagreen: '#a1beaa',
  colorErrorBase: '#ff4d4f',
  bordergrey: '#cdcdcd',
  tag: '#f6f7d7',
  disabled: '#aeaeae',
  bGrey: '#efefef', //Todo Or
  colorSaddlebrown_100: '#7e5a09',
  colorSaddlebrown_200: '#643306',
  text: '#aeaeae',
  colorSilver: '#b6b6b6',
  dark: '#45b649',
  colorRoyalblue: '#1677ff',
  categoryselected: '#f7d7d7',
  nrepink: '#ffad84',
  tagreen: '#d7f7da',
  mainPurple: '#5b2676',
  semiPurple: '#EDE2F9',
  txtBtnWhite: '#fff',
  GreyBGC: '#F6F6F6',
  greytext2: '#8B8B8B',
  greyLines: '#E1E1E1',
  greyText3: '#818181',
};

// clamps a value between min and max
export const clamp = (value, min, max) => {
  return Math.min(Math.max(value, min), max);
};

/* Paddings */
export const Padding = {
  p_5xs: 12,
  p_xs: 12,
  p_9xs: 4,
  p_base: 16,
  p_45xl: 64,
  p_10xl: 32,
  p_xl_1: 20,
  p_base_1: 15,
  p_9xs_4: 3,
  p_5xl: 24,
  p_7xs: 6,
  p_47xl: 66,
  p_9xl: 28,
  p_3xs: 10,
  p_6xs: 7,
  p_24xl: 43,
  p_27xl: 46,
  p_sm: 14,
  p_21xl: 40,
  p_8: 8,
  p_16: 16,
};

/* border radiuses */
export const Border = {
  br_5xs: 8,
  br_80xl: 99,
  br_6xs_3: 6,
  br_xs: 12,
  br_12xs: 1,
  br_2xs_3: 10,
  br_31xl: 50,
  br_980xl: 999,
  br_880xl: 899,
  br_7xs: 6,
  br_54xl_8: 74,
  br_s: 20,
  br_9xs: 6,
  br_4: 4,
};

export const widthSize = {
  mobile: 300,
  desktop: 432,
};

export const hardCodeStyles = {
  isRTL: 'rtl',
  isLTR: 'ltr',
}

export const hardCodeModalStyles = {
  isRTL: 'rtl',
  isLTR: 'ltr',
}

export const inputsText = {
  isRTL: isRTL ? 'right' : 'left',
  isLTR: isRTL ? 'left' : 'right',
}
