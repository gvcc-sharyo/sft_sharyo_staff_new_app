export const styles = {
  imagePrev: (style, height, width, radius, margin, padding) => ({
    height,
    width,
    borderRadius: radius && +radius,
    margin,
    padding,
    ...style,
  }),
};
