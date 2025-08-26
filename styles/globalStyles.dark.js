import { StyleSheet } from 'react-native';
import { FontFamily } from './fontFamily';
import { FontSize } from './fontSize';
import { ColorsDark as Color } from './colors.dark';
import { Padding } from './padding';
import { Border } from './border';
import { isRTL } from '../i18n.config';

export const GlobalStylesDark = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Color.primary,
    borderRadius: Border.md,
    justifyContent: 'center',
    paddingHorizontal: Padding.lg,
    paddingVertical: Padding.sm,
  },
  buttonText: {
    color: Color.white,
    fontFamily: FontFamily.rubikMedium,
    fontSize: FontSize.base,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: Color.greyBg,
    flex: 1,
    padding: Padding.md,
  },
  errorText: {
    color: Color.error,
    fontFamily: FontFamily.rubikRegular,
    fontSize: FontSize.base,
  },
  input: {
    backgroundColor: Color.greyBg,
    borderColor: Color.borderGrey,
    borderRadius: Border.md,
    borderWidth: 1,
    color: Color.textBlack,
    fontFamily: FontFamily.rubikRegular,
    fontSize: FontSize.base,
    height: 48,
    paddingHorizontal: Padding.md,
    writingDirection: isRTL ? 'rtl' : 'ltr',
  },
  inputError: {
    borderColor: Color.error,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  smallText: {
    color: Color.greyText2,
    fontFamily: FontFamily.rubikRegular,
    fontSize: FontSize.sm,
  },
  subtitle: {
    color: Color.textSecondary,
    fontFamily: FontFamily.rubikMedium,
    fontSize: FontSize.lg,
  },
  text: {
    color: Color.textBlack,
    fontFamily: FontFamily.rubikRegular,
    fontSize: FontSize.base,
  },
  textBold: {
    color: Color.textBlack,
    fontFamily: FontFamily.rubikBold,
    fontSize: FontSize.base,
  },
  title: {
    color: Color.primary,
    fontFamily: FontFamily.rubikSemiBold,
    fontSize: FontSize.xl,
  },
});
