export const styles = {
  text: (color, weight, size, family, style) => ({
    color: color ? color : "black",
    fontWeight: weight,
    fontSize: size ? +size : 14,
    fontFamily: family,
    ...style,
  }),
};
