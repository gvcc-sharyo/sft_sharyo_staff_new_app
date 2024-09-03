import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { styles } from "./styles";

export const CButton = ({
  bg,
  width,
  height,
  color,
  weight,
  padding,
  margin,
  pv,
  ph,
  mv,
  mh,
  label,
  size,
  align,
  disabled,
  radius,
  onPress,
  style,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled ? true : false}
      style={styles.container(
        bg,
        width,
        height,
        margin,
        padding,
        pv,
        ph,
        mv,
        mh,
        align,
        style,
        disabled,
        radius
      )}
      onPress={onPress}
    >
      <Text style={styles.text(color, weight, size)}>{label}</Text>
    </TouchableOpacity>
  );
};
