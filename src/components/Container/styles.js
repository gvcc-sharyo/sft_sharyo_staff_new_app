import { COLORS } from "@constants/colors";
export const styles = {
  container: (
    style,
    direction,
    justify,
    align,
    bg,
    width,
    height,
    padding,
    margin,
    pv,
    ph,
    mv,
    mh,
    border,
    radius,
    shadow
  ) => {
    const viewShadow = shadow
      ? {
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 0 },
          shadowOpacity: 0.6,
          shadowColor: COLORS.MajorColor,
          elevation: 4,
          backgroundColor: bg ? bg : "white",
        }
      : {};
    return {
      flexDirection: direction,
      justifyContent: justify,
      alignItems: align,
      backgroundColor: bg,
      width,
      height,
      padding,
      margin,
      paddingVertical: pv,
      paddingHorizontal: ph,
      marginVertical: mv,
      marginHorizontal: mh,
      borderWidth: border ? +border : 0,
      borderRadius: radius ? +radius : 0,
      ...style,
      ...viewShadow,
    };
  },
};
