import { COLORS } from "@constants/colors";
export const styles = {
  container: (
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
  ) => ({
    backgroundColor: disabled ? COLORS.shadow : bg,
    width,
    height,
    margin,
    padding,
    paddingVertical: pv,
    paddingHorizontal: ph,
    marginVertical: mv,
    marginHorizontal: mh,
    alignItems: "center",
    alignSelf: align,
    borderRadius: radius ? radius : radius === 0 ? 0 : 24,
    ...style,
  }),

  text: (color, fontWeight, fontSize) => ({
    color,
    fontWeight,
    fontSize: fontSize && +fontSize,
  }),
};
