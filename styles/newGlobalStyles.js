import { StyleSheet } from 'react-native';
import { FontFamily } from './fontFamily';
import { FontSize } from './fontSize';
import { ColorsLight as Color } from './colors';
import { Padding } from './padding';
import { Border } from './border';
import { isRTL } from '../i18n.config';

export const GlobalStyles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: Color.primaryAlt,
    borderRadius: Border.md,
    justifyContent: 'center',
    paddingHorizontal: Padding.lg,
    paddingVertical: Padding.sm,
  },
  buttonText: {
    color: Color.onPrimary,
    fontFamily: FontFamily.rubikMedium,
    fontSize: FontSize.base,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: Color.white,
    flex: 1,
    padding: Padding.md,
  },
  errorText: {
    color: Color.error,
    fontFamily: FontFamily.rubikRegular,
    fontSize: FontSize.base,
  },
  input: {
    color: Color.textBlack,
    fontFamily: FontFamily.rubikRegular,
    fontSize: FontSize.base,
    height: 48,
    outlineStyle: 'none',
    paddingHorizontal: Padding.md,
    textAlign: isRTL ? 'right' : 'left',
    writingDirection: isRTL ? 'rtl' : 'ltr',
  },
  inputError: {
    borderColor: Color.error,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  shadowMedium: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
  },
  smallText: {
    color: Color.greyText2,
    fontFamily: FontFamily.rubikRegular,
    fontSize: FontSize.sm,
  },
  smallTitle: {
    fontFamily: FontFamily.rubikBold,
    fontSize: FontSize.base,
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
