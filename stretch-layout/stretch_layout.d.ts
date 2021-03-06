/* tslint:disable */
/* eslint-disable */
/**
*/
export enum AlignItems {
  FlexStart,
  FlexEnd,
  Center,
  Baseline,
  Stretch,
}
/**
*/
export enum AlignSelf {
  Auto,
  FlexStart,
  FlexEnd,
  Center,
  Baseline,
  Stretch,
}
/**
*/
export enum AlignContent {
  FlexStart,
  FlexEnd,
  Center,
  Stretch,
  SpaceBetween,
  SpaceAround,
}
/**
*/
export enum Direction {
  Inherit,
  LTR,
  RTL,
}
/**
*/
export enum Display {
  Flex,
  None,
}
/**
*/
export enum FlexDirection {
  Row,
  Column,
  RowReverse,
  ColumnReverse,
}
/**
*/
export enum JustifyContent {
  FlexStart,
  FlexEnd,
  Center,
  SpaceBetween,
  SpaceAround,
  SpaceEvenly,
}
/**
*/
export enum Overflow {
  Visible,
  Hidden,
  Scroll,
}
/**
*/
export enum PositionType {
  Relative,
  Absolute,
}
/**
*/
export enum FlexWrap {
  NoWrap,
  Wrap,
  WrapReverse,
}
/**
*/
export class Allocator {
  free(): void;
/**
*/
  constructor();
}
/**
*/
export class Layout {
  free(): void;
/**
* @param {number} at
* @returns {Layout}
*/
  child(at: number): Layout;
/**
* @returns {number}
*/
  readonly childCount: number;
/**
* @returns {number}
*/
  readonly height: number;
/**
* @returns {number}
*/
  readonly width: number;
/**
* @returns {number}
*/
  readonly x: number;
/**
* @returns {number}
*/
  readonly y: number;
}
/**
*/
export class Node {
  free(): void;
/**
* @param {Allocator} allocator
* @param {any} style
*/
  constructor(allocator: Allocator, style: any);
/**
* @param {any} measure
*/
  setMeasure(measure: any): void;
/**
* @param {Node} child
*/
  addChild(child: Node): void;
/**
* @param {Node} child
*/
  removeChild(child: Node): void;
/**
* @param {number} index
* @param {Node} child
*/
  replaceChildAtIndex(index: number, child: Node): void;
/**
* @param {number} index
*/
  removeChildAtIndex(index: number): void;
/**
* @returns {any}
*/
  getStyle(): any;
/**
* @param {any} style
*/
  setStyle(style: any): void;
/**
*/
  markDirty(): void;
/**
* @returns {boolean}
*/
  isDirty(): boolean;
/**
* @param {any} size
* @returns {Layout}
*/
  computeLayout(size: any): Layout;
/**
* @returns {number}
*/
  readonly childCount: number;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_layout_free: (a: number) => void;
  readonly __wbg_get_layout_width: (a: number) => number;
  readonly __wbg_get_layout_height: (a: number) => number;
  readonly __wbg_get_layout_x: (a: number) => number;
  readonly __wbg_get_layout_y: (a: number) => number;
  readonly __wbg_get_layout_childCount: (a: number) => number;
  readonly layout_child: (a: number, b: number) => number;
  readonly __wbg_allocator_free: (a: number) => void;
  readonly allocator_new: () => number;
  readonly __wbg_node_free: (a: number) => void;
  readonly __wbg_get_node_childCount: (a: number) => number;
  readonly node_new: (a: number, b: number) => number;
  readonly node_setMeasure: (a: number, b: number) => void;
  readonly node_addChild: (a: number, b: number) => void;
  readonly node_removeChild: (a: number, b: number) => void;
  readonly node_replaceChildAtIndex: (a: number, b: number, c: number) => void;
  readonly node_removeChildAtIndex: (a: number, b: number) => void;
  readonly node_getStyle: (a: number) => number;
  readonly node_setStyle: (a: number, b: number) => void;
  readonly node_markDirty: (a: number) => void;
  readonly node_isDirty: (a: number) => number;
  readonly node_computeLayout: (a: number, b: number) => number;
  readonly __wbindgen_malloc: (a: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
