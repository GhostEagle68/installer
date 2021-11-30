'use strict';

const reactComponentsSafeList = require('@flybywiresim/react-components/build/usedCSSClasses.json');

module.exports = {
    purge: {
        options: { safelist: [...reactComponentsSafeList] },
        content: [
            './src/**/*.html',
            './src/**/*.jsx',
            './src/**/*.tsx',
        ],
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            height: {
                '450px': '450px',
            },
            width: {
                '520px': '520px',
                '700px': '700px',
            },
            colors: {
                'quasi-white': '#fafafa',
                navy: {
                    'lightest': '#273347',
                    'lighter': '#222c3d',
                    'dark': '#0E131B',
                    'navy2': '#171E2C',
                    'light': '#1F2A3C',
                },
                red: {
                    'DEFAULT': '#FC3A3A',
                    'dark': '#F70404',
                    'darker': '#E40303',
                    'darkest': "#D10303",
                    'offred' : '#FF2D1A',
                },
                blue: {
                    'cyan': '#00E0FE',
                    'sky': '#00CCFF',
                    'bluegray': '#47536B'
                },
                green: {
                    'lime': '#7AF53D',
                    'stop': '#6AF425'
                },
                white: {
                    'titleContrast': '#FFFFFFDD',
                }
            },
            boxShadow: {
                'inner-sm': 'inset 0 1px 2px 0 rgba(0, 0, 0, 0.05)'
            },
            animation: {
                'spin-reverse': 'spin 1s linear infinite reverse',
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ['first']
        }
    },
    plugins: [require('@flybywiresim/tailwind-config')],
};
