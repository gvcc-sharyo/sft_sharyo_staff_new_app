import React from "react";
import { Image } from "react-native";
import { styles } from "./styles";

export const CImage = ({
  style,
  source,
  height,
  width,
  radius,
  margin,
  padding,
  resize
}) => (
  <Image
  resizeMode={resize && resize}
    source={source}
    style={styles.imagePrev(style, height, width, radius, margin, padding)}
  />
);
