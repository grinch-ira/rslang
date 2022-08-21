type AllHTMLKey = keyof HTMLElementTagNameMap;
type AllHTMLElements = HTMLElementTagNameMap[AllHTMLKey];
export type InnerElement = string | undefined | AllHTMLElements | AllHTMLElements[];
