import { View, StyleSheet, Image } from 'react-native';
import { Link } from 'expo-router';
import { FontFamily, Color, FontSize } from '../../../styles/GlobalStyles';
import HeyDayText from './Text/HeyDayText';
import i18n from '../../../i18n.config';

function ErrorPage ({ title, description }) {
  return (
    <View style={styles.container}>
      <Image
        source={require('./../../../assets/images/general/not-found.png')}
        style={styles.image}
      />
      <HeyDayText style={styles.title}>{title}</HeyDayText>
      <HeyDayText style={styles.description}>{description}</HeyDayText>
      
        <Link href="/" style={styles.link}>
          <HeyDayText style={styles.linkText}>{i18n.t('ErrorPage.homeLink')}</HeyDayText>
        </Link>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Color.white,
    justifyContent: 'center',
    marginTop: 100,
    padding: 20,
  },
  description: {
    color: Color.textGray,
    fontFamily: FontFamily.rubikRegular,
    fontSize: FontSize.bodyBold_size,
    marginBottom: 20,
    textAlign: 'center',
  },
  image: {
    height: 200,
    marginBottom: 20,
    width: 350,
  },
  link: {
    marginTop: 20,
  },
  linkText: {
    color: Color.primary,
    fontFamily: FontFamily.rubikMedium,
    fontSize: FontSize.bodyBold_size,
    textDecorationLine: 'underline',
  },
  title: {
    color: Color.textBlack,
    fontFamily: FontFamily.rubikBold,
    fontSize: FontSize.h1_size,
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default ErrorPage;
