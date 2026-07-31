declare module 'page-flip' {
  export class PageFlip {
    constructor(element: HTMLElement, options: any);
    loadFromHTML(items: NodeListOf<Element> | Element[]): void;
    flipNext(corner?: string): void;
    flipPrev(corner?: string): void;
    flip(page: number, corner?: string): void;
    on(event: string, callback: (e: any) => void): void;
    destroy(): void;
  }
}
