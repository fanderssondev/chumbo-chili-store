import { browser } from '$app/environment';

function getInitialTheme(): boolean {
	// Check for a saved theme in local storage
	let savedTheme: string | null = null;

	if (browser) {
		savedTheme = localStorage.getItem('darkMode');

		if (savedTheme) {
			return savedTheme === 'true';
		} else {
			// If no saved theme, check the system preference
			const prefersDark =
				window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
			return prefersDark;
		}
	}
	return false;
}

export function useTheme() {
	let darkMode = $state<boolean>(getInitialTheme());

	// Check system preference changes
	if (browser) {
		window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
			darkMode = event.matches;

			if (darkMode) {
				localStorage.setItem('darkMode', 'true');
			} else {
				localStorage.setItem('darkMode', 'false');
			}
		});
	}

	// Check user preference changes
	if (browser) {
		if (darkMode) {
			localStorage.setItem('darkMode', 'true');
		} else {
			localStorage.setItem('darkMode', 'false');
		}
	}

	function toggleDarkmode() {
		darkMode = !darkMode;

		if (browser) {
			if (darkMode) {
				localStorage.setItem('darkMode', 'true');
			} else {
				// document.body.dataset.theme = '';
				localStorage.setItem('darkMode', 'false');
			}
		}
	}

	return {
		get darkMode() {
			return darkMode;
		},
		toggleDarkmode
	};
}
