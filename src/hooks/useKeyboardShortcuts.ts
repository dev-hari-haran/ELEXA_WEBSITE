import { useEffect } from 'react';
import { useCommandStore } from '../stores/useCommandStore';
import { useReaderStore } from '../stores/useReaderStore';
import { useThemeStore } from '../stores/useThemeStore';

export const useKeyboardShortcuts = () => {
  const { toggleCommandPalette } = useCommandStore();
  const { settings, updateSettings, toggleToc, toggleSearch, currentPage, setCurrentPage } = useReaderStore();
  const { setTheme } = useThemeStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore when typing inside input or textarea
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        return;
      }

      // Command/Ctrl + K -> Open Command Palette
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        toggleCommandPalette();
        return;
      }

      // Reader shortcuts
      switch (e.key.toLowerCase()) {
        case 'j':
        case 'arrowright':
          e.preventDefault();
          setCurrentPage(currentPage + 1);
          break;
        case 'k':
        case 'arrowleft':
          if (!e.metaKey && !e.ctrlKey) {
            e.preventDefault();
            setCurrentPage(Math.max(1, currentPage - 1));
          }
          break;
        case 'f':
          e.preventDefault();
          updateSettings({ focusMode: !settings.focusMode });
          break;
        case 'z':
          e.preventDefault();
          updateSettings({ zenMode: !settings.zenMode });
          break;
        case 't':
          e.preventDefault();
          toggleToc();
          break;
        case '/':
          e.preventDefault();
          toggleSearch();
          break;
        case '1':
          setTheme('light');
          break;
        case '2':
          setTheme('cream');
          break;
        case '3':
          setTheme('sepia');
          break;
        case '4':
          setTheme('dark');
          break;
        case '5':
          setTheme('charcoal');
          break;
        case '6':
          setTheme('amoled');
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleCommandPalette, settings, updateSettings, toggleToc, toggleSearch, currentPage, setCurrentPage, setTheme]);
};
