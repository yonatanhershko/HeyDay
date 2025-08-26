// HeyDayMenu.js
import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Pressable,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';   // <—
import HeyDayText from './Text/HeyDayText';
import { Border, Color, FontFamily, FontSize } from '../../../styles/GlobalStyles';
import { isRTL } from '../../../i18n.config';

// --- helper --------------------------------------------------------------
const clamp = (v, min, max) => Math.min(Math.max(v, min), max);        // <—

/**
 * @param {Array}  menuItems
 * @param {Object} style
 * @param {node}   icon
 * @param {number} menuWidth
 * @param {number} menuMaxHeight
 */
const HeydayMenu = ({
  menuItems = [],
  style,
  icon = null,
  menuWidth = 200,
  menuMaxHeight = 250,
}) => {
  const [visible, setVisible] = useState(false);
  const iconRef = useRef(null);
  const menuRef = useRef(null);

  // anchor information
  const [anchor, setAnchor] = useState({ x: 0, y: 0, h: 0 });
  const [menuPos, setMenuPos] = useState({ top: 0, left: 0 });

  // up‑to‑date screen size (handles rotations)
  const { width: screenW, height: screenH } = useWindowDimensions();
  const insets = useSafeAreaInsets();                                   // <—

  const openMenu = () => {
    iconRef.current?.measureInWindow((x, y, w, h) => {
      setAnchor({ x, y, h, w });
      setVisible(true);
    });
  };

  const closeMenu = () => setVisible(false);

  const handleItemPress = fn => {
    fn?.();
    closeMenu();
  };

  /* -------------------------------------------------------------------- */
  useEffect(() => {
    if (!visible || !menuRef.current) return;

    requestAnimationFrame(() => {
      if (!menuRef.current) return;

      menuRef.current.measureInWindow((_x, _y, mw, mh) => {
        const isWeb = Platform.OS === 'web';
        const useRight = !isWeb && isRTL;

        let top = anchor.y + anchor.h;
        let left = anchor.x;
        const finalMenuWidth = Math.min(menuWidth, screenW - insets.left - insets.right - 16);

        // --- Vertical Overflow
        if (top + mh > screenH - insets.bottom) {
          top = anchor.y - mh;
        }

        top = clamp(top, insets.top + 8, screenH - mh - insets.bottom - 8);

        // --- Horizontal Positioning
        if (useRight && anchor.w != null) {
          const rawLeft = screenW - (anchor.x + anchor.w);
          left = clamp(rawLeft, insets.left + 8, screenW - finalMenuWidth - insets.right - 8);
          setMenuPos({ top, left });
        } else {
          left = clamp(anchor.x, insets.left + 8, screenW - finalMenuWidth - insets.right - 8);
          setMenuPos({ top, left });
        }
      });
    });
  }, [visible, anchor, screenW, screenH, insets]);

  /* -------------------------------------------------------------------- */
  return (
    <View style={[styles.container, style]}>
      <Pressable ref={iconRef} onPress={openMenu} style={styles.menuButton}>
        {icon ?? <HeyDayText style={styles.menuIcon}>⋮</HeyDayText>}
      </Pressable>

      {visible && (
        <Modal transparent visible animationType="none" onRequestClose={closeMenu}>
          <TouchableWithoutFeedback onPress={closeMenu}>
            <View style={styles.overlay}>
              <TouchableWithoutFeedback>
                <View
                  ref={menuRef}
                  style={[
                    styles.menuContainer,
                    {
                      width: Math.min(menuWidth, screenW - insets.left - insets.right - 16),
                      maxHeight: menuMaxHeight,
                      top: menuPos.top,
                      left: menuPos.left,
                    },
                  ]}
                >
                  {menuItems.map((item, i) => (
                    <Pressable
                      key={i}
                      onPress={() => handleItemPress(item.onPress)}
                      style={styles.menuItem}
                    >
                      <HeyDayText style={styles.menuItemText}>{item.label}</HeyDayText>
                    </Pressable>
                  ))}
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </View>
  );
};

export default HeydayMenu;

/* ------------------------------ STYLES -------------------------------- */
const styles = StyleSheet.create({
  container: { justifyContent: 'center' },
  menuButton: { padding: 8 },
  menuContainer: {
    backgroundColor: Color.white,
    borderRadius: Border.br_s,
    elevation: 3,
    overflow: 'hidden',
    paddingVertical: 8,
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  menuIcon: { color: Color.textBlack, fontFamily: FontFamily.rubikRegular, fontSize: 20 },
  menuItem: { paddingHorizontal: 16, paddingVertical: 12 },
  menuItemText: { color: Color.textBlack, fontFamily: FontFamily.rubikRegular, fontSize: FontSize.bodyM_size },
  overlay: { flex: 1 },
});
