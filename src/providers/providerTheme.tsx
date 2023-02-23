import { createContext, useState, useMemo, useEffect } from 'react';

import { fonts, fontsSizes } from '@styles/theme';
import DarkTheme from '@styles/dark';
import LightTheme from '@styles/light';

const ThemeContext = createContext();
const ThemeProvider = ({
  children,
}: {
  children?: JSX.Element | JSX.Element[];
}): JSX.Element => {
  const [dark, darkTheme] = useState(false),
    [theme, setTheme] = useState({ fonts, fontsSizes }),
    values = useMemo(
      () => ({
        theme,
        darkTheme,
      }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [dark],
    );

  useEffect(() => {
    console.log(`🎨 Changing theme to ${dark ? 'dark' : 'light'}`);
    setTheme({ fonts, fontsSizes, ...(dark ? DarkTheme : LightTheme) });
  }, [dark]);

  return (
    <ThemeContext.Provider
      value={{
        ...values,
        dark,
        theme,
      }}>
      {children}
    </ThemeContext.Provider>
  );
};

export { ThemeContext };
export default ThemeProvider;
