import { AlignItems, AlignSelf, AlignContent, Direction, Display, FlexDirection, JustifyContent, Overflow, PositionType, FlexWrap } from '../stretch-layout';
import { StretchStyleMap } from './style_mapping'

export interface Style {
  [key: string]: string | number,
}

type StretchStyleValue = AlignItems | AlignContent | AlignSelf | Direction | Display | FlexDirection | JustifyContent | Overflow | PositionType | FlexWrap | number


export interface StretchStyle {
  [key: string]: StretchStyleValue
}



const getStretchStyleValue = (key: string, value: string | number): StretchStyleValue => {
  if (StretchStyleMap[key]) {
    return StretchStyleMap[key][value]
  }
  return value as number
}

export const style2StretchStyle = (style: Style): StretchStyle => {
  let stretchStyle: StretchStyle = {};
  Object.keys(style).forEach((key) => {
    stretchStyle[key] = getStretchStyleValue(key, style[key])
  })
  return stretchStyle;
}

