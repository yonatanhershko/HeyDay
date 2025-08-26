import React from 'react';
import { Modal, View, Pressable, StyleSheet, Animated } from 'react-native';
import { FontFamily, FontSize, Color, Padding, Border } from '../../../../styles/GlobalStyles';
import HeyDayText from '../../low_level/Text/HeyDayText';
import i18n from '../../../../i18n.config';

const VersionModal = ({ visible, onConfirm, message, description }) => {
  const scaleValue = new Animated.Value(0);

  if (visible) {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }

  if (!visible) return null;

  return (
    <Modal animationType="none">
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[
            styles.modalContainer,
            { transform: [{ scale: scaleValue }] },
          ]}
        >
          <HeyDayText style={styles.modalMessage}>{message}</HeyDayText>
          <HeyDayText style={styles.modalDescription}>{description}</HeyDayText>
          <View style={styles.modalActions}>
            <Pressable
              style={[styles.button, styles.confirmButton]}
              onPress={onConfirm}
            >
              <HeyDayText style={styles.confirmButtonText}>{i18n.t('VersionModal.updateNow')}</HeyDayText>
            </Pressable>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: Border.br_xs,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: Padding.p_3xs,
    paddingVertical: Padding.p_sm,
  },
  confirmButton: {
    backgroundColor: Color.primary,
  },
  confirmButtonText: {
    color: Color.white,
    fontFamily: FontFamily.rubikBold,
    fontSize: FontSize.body_size,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalContainer: {
    alignItems: 'center',
    backgroundColor: Color.white,
    borderRadius: Border.br_xs,
    elevation: 5,
    maxWidth: 400,
    padding: Padding.p_5xl,
    shadowColor: Color.colorText,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: '85%',
  },
  modalDescription: {
    color: Color.colorTextSecondary,
    fontFamily: FontFamily.rubikRegular,
    fontSize: FontSize.body_size,
    lineHeight: 20,
    marginBottom: Padding.p_5xs,
    textAlign: 'center',
  },
  modalMessage: {
    color: Color.colorText,
    fontFamily: FontFamily.rubikBold,
    fontSize: FontSize.h2_size,
    marginBottom: Padding.p_5xs,
    textAlign: 'center',
  },
  modalOverlay: {
    alignItems: 'center',
    backgroundColor: Color.colorGray_200,
    flex: 1,
    justifyContent: 'center',
  },
});

export default VersionModal;
