export type Theme = 'light' | 'dark' | 'system';

const THEME_STORAGE_KEY = 'admin-theme';

export function getStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return (stored as Theme) ?? 'system';
  } catch {
    return 'system';
  }
}

export function setStoredTheme(theme: Theme): void {
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme);
  } catch {
    // Handle storage errors silently
  }
}

export function applyTheme(theme: Theme): void {
  const root = document.documentElement;
  
  // Remove existing theme classes
  root.classList.remove('light', 'dark');
  
  // Determine the actual theme to apply
  let resolvedTheme: 'light' | 'dark';
  
  if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    resolvedTheme = prefersDark ? 'dark' : 'light';
  } else {
    resolvedTheme = theme;
  }
  
  // Apply the theme
  root.classList.add(resolvedTheme);
  root.setAttribute('data-theme', resolvedTheme);
  
  // Store the preference
  setStoredTheme(theme);
}

export function initializeTheme(): (() => void) | undefined {
  const storedTheme = getStoredTheme();
  applyTheme(storedTheme);
  
  // Listen for system theme changes when using system preference
  if (storedTheme === 'system') {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (getStoredTheme() === 'system') {
        applyTheme('system');
      }
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    // Return cleanup function
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }
  
  return undefined;
}