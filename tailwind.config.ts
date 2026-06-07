import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
		fontFamily: {
			'courier': ['"Courier Prime"', '"Courier New"', 'Courier', 'monospace'],
			'mono': ['"Courier Prime"', '"Courier New"', 'Courier', 'ui-monospace', 'monospace'],
		},
			colors: {
				ink: {
					black: '#000000',
					void: '#05070a',
					950: '#020617',
					850: '#0f172a',
					700: '#334155'
				},
				neon: {
					cyan: '#00f5ff',
					link: '#00d9ff',
					deep: '#0096c7'
				},
				cyan: {
					100: '#cffafe',
					200: '#a5f3fc',
					300: '#67e8f9',
					400: '#22d3ee',
					glow: '#d6fbff'
				},
				faint: 'rgba(255,255,255,0.50)',
				'text-secondary': '#cbd5e1',
				'text-muted': '#94a3b8',
				terminal: {
					bg: 'var(--terminal-bg)',
					text: 'var(--terminal-text)',
					secondary: 'var(--terminal-text-secondary)',
					muted: 'var(--terminal-text-muted)',
					faint: 'var(--terminal-text-faint)',
					accent: 'var(--terminal-accent)',
					'accent-soft': 'var(--terminal-accent-soft)',
					'accent-strong': 'var(--terminal-accent-strong)',
					hero: 'var(--terminal-hero)',
					glass: 'var(--terminal-glass)',
					'glass-strong': 'var(--terminal-glass-strong)',
					panel: 'var(--terminal-panel)',
					border: 'var(--terminal-border)',
					'border-strong': 'var(--terminal-border-strong)',
					'border-hover': 'var(--terminal-border-hover)',
					'button-text': 'var(--terminal-button-text)'
				},
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			backgroundColor: {
				glass: 'rgba(255,255,255,0.05)',
				'glass-strong': 'rgba(255,255,255,0.08)',
				panel: 'rgba(15,23,42,0.65)'
			},
			borderColor: {
				subtle: 'rgba(255,255,255,0.10)',
				strong: 'rgba(255,255,255,0.15)',
				'cyan-hover': 'rgba(103,232,249,0.45)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'vwj-blink': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0'
					}
				}
			},
			animation: {
				'vwj-blink': 'vwj-blink 1s steps(1) infinite'
			},
			letterSpacing: {
				tightest: '-0.08em',
				wide: '0.025em',
				label: '0.22em'
			},
			lineHeight: {
				relaxed: '1.65'
			},
			transitionTimingFunction: {
				out: 'cubic-bezier(0.22, 1, 0.36, 1)',
				standard: 'cubic-bezier(0.4, 0, 0.2, 1)'
			},
			transitionDuration: {
				base: '300ms'
			},
			boxShadow: {
				'cyan-scan': '0 0 12px #22d3ee',
				'terminal-scan': 'var(--terminal-scan-shadow)',
				'terminal-panel': 'var(--terminal-panel-shadow)',
				'terminal-toggle': 'var(--terminal-toggle-shadow)'
			},
			maxWidth: {
				content: '1080px'
			}
		}
	},
	plugins: [],
} satisfies Config;
