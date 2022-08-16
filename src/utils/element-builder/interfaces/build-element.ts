export interface ICreate {
  el: keyof HTMLElementTagNameMap;
  classNames?: string;
  child?: string | HTMLElementTagNameMap[keyof HTMLElementTagNameMap]
  | HTMLElementTagNameMap[keyof HTMLElementTagNameMap][];
  parent?: HTMLElement;
  dataAttr?: [string, string][];
  callback?: [string, (event?: Event) => void][];
}

export type AllHTMLKey = keyof HTMLElementTagNameMap;

export type AllHTMLElements = HTMLElementTagNameMap[AllHTMLKey];

export interface IBuildElement {
  addClass(classes: string[]): IBuildElement;
  addListeners(listeners: [listen: string,
    callback: (params?: Event) => void][]): IBuildElement;
  addChild(child: string | AllHTMLElements
  | AllHTMLElements[]): IBuildElement;
  setParent(parent: HTMLElement): IBuildElement;
  addDataAttribute(data: [string, string][]): IBuildElement;
  build(): AllHTMLElements;
}
