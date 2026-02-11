import { createContext, PropsWithChildren, use, useEffect, useState } from 'react';
import { LIGHT } from '../constants/theme';

const ThemeContext = createContext
<
	{
		theme: string;
		toggleTheme: () => void;
		getCurrentTheme: () => string;
	}
>
(
	{
		theme: LIGHT,
		toggleTheme: () => {},
		getCurrentTheme: () => LIGHT,
	}
);

export function useTheme ()
{
	const value = use(ThemeContext);

	if (!value) { throw new Error("useTheme must be wrapped in a <ThemeColorProvider />"); }

	return value;
}

export default function ThemeColorProvider ({ children }: PropsWithChildren)
{
	const [theme, setTheme] = useState<string>(LIGHT);

	useEffect(() => {
		console.log("current theme: ", theme);
	}, [theme]);

	function onToggleTheme ()
	{
		setTheme((prevTheme) => (prevTheme === LIGHT ? "dark" : LIGHT));
	}

    return (
        <ThemeContext.Provider
			value={
				{
					theme: theme,
					toggleTheme: () => onToggleTheme(),
					getCurrentTheme: () => theme,
				}
			}
		
		>
        	{children}
        </ThemeContext.Provider>
    );
}