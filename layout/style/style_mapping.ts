import { AlignItems, AlignSelf, AlignContent, Direction, Display, FlexDirection, JustifyContent, Overflow, PositionType, FlexWrap } from '../stretch-layout';

export const StretchStyleMap = {
  alignContent: {
    "center": AlignContent.Center,
    "flex-end": AlignContent.FlexEnd,
    "flex-start": AlignContent.FlexStart,
    "space-around": AlignContent.SpaceAround,
    "space-between": AlignContent.SpaceBetween,
    "stretch": AlignContent.Stretch
  },
  alignSelf: {
    "auto": AlignSelf.Auto,
    "flex-start": AlignSelf.FlexStart,
    "flex-end": AlignSelf.FlexEnd,
    "center": AlignSelf.Center,
    "baseline": AlignSelf.Baseline,
    "stretch": AlignSelf.Stretch,
  },
  alignItems: {
    "flex-start": AlignItems.FlexStart,
    "flex-end": AlignItems.FlexEnd,
    "center": AlignItems.Center,
    "baseline": AlignItems.Baseline,
    "stretch": AlignItems.Stretch,
  },
  direction: {
    "inherit": Direction.Inherit,
    "ltr": Direction.LTR,
    "rtl": Direction.RTL,
  },
  display: {
    "flex": Display.Flex,
    "none": Display.None
  },
  flexDirection: {
    "row": FlexDirection.Row,
    "column": FlexDirection.Column,
    "row-reverse": FlexDirection.RowReverse,
    "column-reverse": FlexDirection.ColumnReverse,
  },
  justifyContent: {
    "flex-start": JustifyContent.FlexStart,
    "flex-end": JustifyContent.FlexEnd,
    "center": JustifyContent.Center,
    "space-between": JustifyContent.SpaceBetween,
    "space-around": JustifyContent.SpaceAround,
    "space-evenly": JustifyContent.SpaceEvenly,
  },
  overflow: {
    "visible": Overflow.Visible,
    "hidden": Overflow.Hidden,
    "scroll": Overflow.Scroll
  },
  positionType: {
    "relative": PositionType.Relative,
    "absolute": PositionType.Absolute,
  },
  flexWrap: {
    "no-wrap": FlexWrap.NoWrap,
    "wrap": FlexWrap.Wrap,
    "wrap-reverse": FlexWrap.WrapReverse,
  }
}