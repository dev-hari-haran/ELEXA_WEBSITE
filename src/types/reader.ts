export type FontFamily = 'serif' | 'sans' | 'mono' | 'dyslexic';
export type PageAnimation = 'slide' | 'fade' | 'flip3d';
export type ColumnMargin = 'narrow' | 'medium' | 'wide';
export type TextAlign = 'left' | 'justify';

export interface ReaderSettings {
  fontFamily: FontFamily;
  fontSize: number; // 12px to 32px
  lineHeight: number; // 1.2 to 2.4
  letterSpacing: number; // -1px to 4px
  columnMargin: ColumnMargin;
  textAlign: TextAlign;
  pageAnimation: PageAnimation;
  focusMode: boolean;
  zenMode: boolean;
  bionicReading: boolean; // Highlights first half of words for fast reading
  autoScroll: boolean;
  autoScrollSpeed: number; // 1 (slow) to 5 (fast)
}
