/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        // Core system colors
        background: 'var(--color-background)', // white
        foreground: 'var(--color-foreground)', // gray-800
        surface: 'var(--color-surface)', // slate-50
        
        // Border and input colors
        border: 'var(--color-border)', // gray-200
        input: 'var(--color-input)', // white
        ring: 'var(--color-ring)', // blue-600
        
        // Card colors
        card: {
          DEFAULT: 'var(--color-card)', // white
          foreground: 'var(--color-card-foreground)' // gray-800
        },
        
        // Popover colors
        popover: {
          DEFAULT: 'var(--color-popover)', // white
          foreground: 'var(--color-popover-foreground)' // gray-800
        },
        
        // Muted colors
        muted: {
          DEFAULT: 'var(--color-muted)', // slate-50
          foreground: 'var(--color-muted-foreground)' // gray-500
        },
        
        // Primary colors
        primary: {
          DEFAULT: 'var(--color-primary)', // blue-600
          foreground: 'var(--color-primary-foreground)' // white
        },
        
        // Secondary colors
        secondary: {
          DEFAULT: 'var(--color-secondary)', // indigo-500
          foreground: 'var(--color-secondary-foreground)' // white
        },
        
        // Accent colors
        accent: {
          DEFAULT: 'var(--color-accent)', // amber-500
          foreground: 'var(--color-accent-foreground)' // white
        },
        
        // Success colors
        success: {
          DEFAULT: 'var(--color-success)', // emerald-500
          foreground: 'var(--color-success-foreground)' // white
        },
        
        // Warning colors
        warning: {
          DEFAULT: 'var(--color-warning)', // amber-500
          foreground: 'var(--color-warning-foreground)' // white
        },
        
        // Error/Destructive colors
        error: {
          DEFAULT: 'var(--color-error)', // red-500
          foreground: 'var(--color-error-foreground)' // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-500
          foreground: 'var(--color-destructive-foreground)' // white
        },
        
        // Brand-specific colors
        brand: {
          primary: 'var(--color-brand-primary)', // blue-600
          secondary: 'var(--color-brand-secondary)', // blue-500
        },
        
        // Conversion colors
        conversion: {
          accent: 'var(--color-conversion-accent)', // amber-500
        },
        
        // Trust and CTA colors
        trust: 'var(--color-trust-builder)', // emerald-500
        cta: 'var(--color-cta)', // blue-700
        
        // Text colors
        text: {
          primary: 'var(--color-text-primary)', // gray-900
          secondary: 'var(--color-text-secondary)' // gray-500
        }
      },
      
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Courier New', 'monospace'],
      },
      
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      
      borderRadius: {
        'brand': '8px',
      },
      
      boxShadow: {
        'brand': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'brand-lg': '0 8px 25px rgba(37, 99, 235, 0.15)',
        'brand-hover': '0 4px 12px rgba(29, 78, 216, 0.3)',
      },
      
      animation: {
        'shimmer': 'shimmer 1.5s infinite',
        'dash': 'dash 1s linear infinite',
        'pulse-glow': 'pulse-glow 2s infinite',
      },
      
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
        dash: {
          'to': { strokeDashoffset: '-10' },
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 0 4px rgba(37, 99, 235, 0.3)' },
          '50%': { boxShadow: '0 0 0 8px rgba(37, 99, 235, 0.1)' },
        },
      },
      
      aspectRatio: {
        'product': '4/3',
      },
      
      minHeight: {
        'hero': '60vh',
        'thumb': '44px',
      },
      
      minWidth: {
        'thumb': '44px',
      },
      
      backdropBlur: {
        'brand': '8px',
      },
      
      transitionTimingFunction: {
        'brand': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      
      transitionDuration: {
        '200': '200ms',
        '300': '300ms',
        '400': '400ms',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
  ],
}