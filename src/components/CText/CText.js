import React from "react";
import { Text } from "react-native";
import { styles } from "./styles";
export const CText = ({ onPress, color, weight, size, family, children, style, required, numOfLines }) => (
  <Text
    style={styles.text(color, weight, size, family, style)}
    onPress={onPress}
    numberOfLines={numOfLines}
  >
    {children}
    {required && <Text style={{color: 'red'}}> *</Text>}
  </Text>
);
