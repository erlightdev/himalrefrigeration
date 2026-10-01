import { Button } from "@himalref/ui/components/button";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export function ModeToggle() {
	const [isDark, setIsDark] = useState(false);

	useEffect(() => {
		const isDarkMode = document.documentElement.classList.contains("dark");
		setIsDark(isDarkMode);
	}, []);

	const toggleTheme = () => {
		if (isDark) {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
			setIsDark(false);
		} else {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
			setIsDark(true);
		}
	};

	return (
		<Button
			variant="outline"
			size="icon"
			onClick={toggleTheme}
			title="Toggle theme"
			className="relative rounded-md border-border bg-background text-foreground hover:bg-accent"
		>
			{isDark ? (
				<Moon className="h-[1.2rem] w-[1.2rem] text-primary" />
			) : (
				<Sun className="h-[1.2rem] w-[1.2rem] text-primary" />
			)}
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
