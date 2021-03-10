import { AlignItems, AlignSelf, AlignContent, Direction, Display, FlexDirection, JustifyContent, Overflow, PositionType, FlexWrap } from '../stretch-layout';
import { StretchStyleMap } from './style_mapping'

export interface Style {
  [key: string]: string,
}

type StretchStyleValue = AlignItems | AlignContent | AlignSelf | Direction | Display | FlexDirection | JustifyContent | Overflow | PositionType | FlexWrap


export interface StretchStyle {
  [key: string]: StretchStyleValue
}



const getStretchStyleValue = (key: string, value: string): StretchStyleValue => StretchStyleMap[key][value]

export const style2StretchStyle = (style: Style): StretchStyle => {
  let stretchStyle: StretchStyle = {};
  Object.keys(style).forEach((key) => {
    stretchStyle[key] = getStretchStyleValue(key, style[key])
  })
  return stretchStyle;
}

