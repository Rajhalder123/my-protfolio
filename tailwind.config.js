/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/app/**/*.{ts,tsx}",
        "./src/components/**/*.{ts,tsx}",
        "./src/data/**/*.{ts,tsx}",
    ],
    darkMode: 'class',
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '1rem',
                sm: '1.5rem',
                lg: '2rem',
                xl: '2.5rem',
                '2xl': '3rem',
            },
        },
        extend: {
            fontFamily: {
                sans: [
                    'InterVariable',
                    'Inter',
                    'ui-sans-serif',
                    'system-ui',
                    'sans-serif',
                ],
                mono: [
                    'JetBrains Mono',
                    'SFMono-Regular',
                    'Consolas',
                    'monospace',
                ],
            },
            colors: {
                ink: {
                    950: '#050608',
                    900: '#090b10',
                    850: '#0d1118',
                    800: '#111722',
                    700: '#1a2432',
                },
                pearl: '#f7f7f2',
                mist: '#a7b0bd',
                cyan: {
                    brand: '#5ee7ff',
                },
                signal: {
                    green: '#7cf7c5',
                    amber: '#f8c56b',
                    violet: '#b79bff',
                },
            },
            boxShadow: {
                'premium': '0 24px 80px rgba(0, 0, 0, 0.42)',
                'hairline': 'inset 0 1px 0 rgba(255,255,255,0.08)',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '0% 50%' },
                    '100%': { backgroundPosition: '200% 50%' },
                },
                marquee: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
            },
            animation: {
                float: 'float 6s ease-in-out infinite',
                shimmer: 'shimmer 8s linear infinite',
                marquee: 'marquee 28s linear infinite',
            }
        },
    },
    plugins: [],
}
