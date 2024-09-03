export const styles = {
  scroller: (style, margin, mv, mh, padding, pv, ph, height, width) => ({
    margin,
    padding,
    height,
    width,
    matginVertical: mv,
    marginHorizontal: mh,
    paddingVertical: pv,
    paddingHorizontal: ph,
    ...style,
  }),
};
