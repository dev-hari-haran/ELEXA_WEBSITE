export type ThemeMode = 'light' | 'cream' | 'sepia' | 'dark' | 'charcoal' | 'amoled';

export interface CircadianSchedule {
  enabled: boolean;
  morningTheme: ThemeMode; // 06:00 - 12:00
  afternoonTheme: ThemeMode; // 12:00 - 18:00
  eveningTheme: ThemeMode; // 18:00 - 22:00
  nightTheme: ThemeMode; // 22:00 - 06:00
}
