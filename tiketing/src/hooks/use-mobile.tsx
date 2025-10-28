import React from 'react';

const DEFAULT_BREAKPOINT = 768;

const getMatch = (breakpoint: number) => {
  if (typeof window === 'undefined') {
    return false;
  }
  return window.matchMedia(`(max-width: ${breakpoint}px)`).matches;
};

export const useMobile = (breakpoint = DEFAULT_BREAKPOINT) => {
  const [isMobile, setIsMobile] = React.useState<boolean>(() => getMatch(breakpoint));

  React.useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const query = window.matchMedia(`(max-width: ${breakpoint}px)`);

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobile(event.matches);
    };

    handleChange(query);

    query.addEventListener('change', handleChange);
    return () => query.removeEventListener('change', handleChange as EventListener);
  }, [breakpoint]);

  return isMobile;
};
