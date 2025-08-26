import React from 'react';
import ErrorPage  from '../components/general/low_level/ErrorPage';
import i18n from '../i18n.config';

const NotFoundScreen = () => {
  return <ErrorPage
    title={i18n.t('NotFoundScreen.title')}
    description={i18n.t('NotFoundScreen.description')}
  />;
}

export default NotFoundScreen;
