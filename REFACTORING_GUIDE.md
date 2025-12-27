# CSS & HTML Refactoring Documentation

## Overview
This document outlines the comprehensive refactoring of the Gradexis splash page CSS and HTML structure. The project has been reorganized for better maintainability, readability, and scalability.

## Key Improvements

### 1. **Semantic CSS Variables** (`variables.css`)
- **Before**: Confusing variable names like `--theme`, `--theme-opposite`, `--themed-gray-1`, `--themed-gray-2`, etc.
- **After**: Clear, semantic naming:
  - Color variables: `--color-primary-light`, `--color-primary-dark`, `--color-success`, `--color-error`
  - Semantic theme variables: `--theme-primary`, `--theme-secondary`, `--theme-hover`
  - Component backgrounds: `--component-bg-primary`, `--component-bg-secondary`
  - Text colors: `--text-color`, `--text-color-secondary`, `--text-color-tertiary`

- **Spacing variables** (standardized):
  - `--spacing-xs` to `--spacing-3xl` for consistent spacing
  - `--font-size-xs` to `--font-size-4xl` for typography scale
  
- **Semantic tokens** for borders, shadows, transitions, z-index, and breakpoints

### 2. **BEM Methodology for Class Names**
Adopted BEM (Block Element Modifier) naming convention for clarity:

#### Before → After Examples:
- `.nav-links` → `.nav-links` (block)
- `.nav-links a:not(.nav-button)` → `.nav-links__link` (element)
- `.nav-button:hover` → modifier states in CSS
- `.feature-cards` → `.features__grid` (more specific)
- `.feature-card` → `.feature-card` (component)
- `.feature-card i` → `.feature-card__icon` (element)
- `.reveal.active` → `.reveal-animate.is-visible` (better semantics)

### 3. **Modular CSS File Structure**

Instead of one 1241-line `style.css`, the stylesheet is now split into:

```
styles/
├── variables.css          # All CSS custom properties
├── base.css              # Global styles and utilities
├── navigation.css        # Header/nav styles
├── hero.css              # Hero section
├── platforms.css         # Platform showcase section
├── safe-secure.css       # Security section
├── features.css          # Features + multi-UI sections
├── how-it-works.css      # How it works section
├── comparison.css        # Comparison table
├── screenshots.css       # Screenshots carousel
├── install.css           # Installation CTA section
├── footer.css            # Footer
└── privacy-policy.css    # Privacy policy page styles
```

**Benefits**:
- Each section is independently maintainable
- Easier to locate and update styles
- Better code organization
- Reduced cognitive load when making changes

### 4. **Improved Class Naming Throughout HTML**

All class names now follow semantic BEM conventions:

#### Navigation
- `nav` → `navbar`
- `nav > div` → `navbar__container`
- `.logo` → `.logo`, `.logo__image`, `.logo__text`
- `.nav-links a:not(.nav-button)` → `.nav-links__link`
- `.sun-icon`, `.moon-icon` → `.icon-sun`, `.icon-moon`

#### Hero Section
- `.main` → `.hero`
- `.hero-text` → `.hero__content`
- `.cta` → `.hero__cta`

#### Platform Cards
- `.platforms` → `.platforms-section`
- `.platforms-section` → `.platform-card`
- `.platform-clickable` → `.platform-card` (with data attributes)

#### Features & Multi-UI
- `.feature-cards` → `.features__grid`
- `.multi-ui` structure reorganized with better child selectors
- `.phoneborder` → `.phone-frame`
- `.website-ui` → `.ui-display--browser`
- `.ios-ui` / `.android-ui` → `.ui-display--ios` / `.ui-display--android`

#### Sections & Utilities
- `.section-theme` → `.section--theme`
- `.section-gray` → `.section--light-bg`
- `.titles` → `.section-title`
- `.titles h1` → `.section-title__heading`
- `.hoverzoom` → `.interactive-hover`
- `.reveal` → `.reveal-animate`
- `.reveal.active` → `.reveal-animate.is-visible`

### 5. **CSS Variables Usage**

All colors now reference semantic variables:

**Before:**
```css
background-color: var(--light-bg);
color: var(--gray-900);
border: 5px solid var(--theme-opposite);
```

**After:**
```css
background-color: var(--background-page);
color: var(--text-color);
border: 5px solid var(--theme-secondary);
```

### 6. **Dark Mode Enhancement**

Dark mode is now properly scoped with `html.dark` selector and all color overrides are clear and maintainable.

## Migration Guide

### For JavaScript Updates
All querySelector/querySelectorAll calls have been updated:

```javascript
// Before
document.querySelectorAll(".reveal")
document.querySelector(".install-buttons-desktop")
document.querySelector(".screenshots-tab")

// After
document.querySelectorAll(".reveal-animate")
document.querySelector(".install__buttons--desktop")
document.querySelector(".screenshots__tab")
```

### For Adding New Components

When adding new sections, follow this pattern:

1. **Create a new CSS file** in `styles/section-name.css`
2. **Use BEM naming**: `.component`, `.component__element`, `.component--modifier`
3. **Reference semantic variables**: `--color-*`, `--spacing-*`, `--background-*`
4. **Import in HTML** before other stylesheets (if needed)

Example:
```css
/* styles/my-section.css */
.my-component {
  padding: var(--spacing-lg);
  background-color: var(--component-bg-primary);
  border-radius: var(--border-radius-md);
}

.my-component__title {
  font-size: var(--font-size-xl);
  color: var(--text-color);
}

.my-component--featured {
  background-color: var(--theme-primary);
}
```

## Variable Reference

### Color Variables
- `--color-primary-light`: Main brand color (light mode)
- `--color-primary-dark`: Main brand color (dark mode)
- `--color-text-*`: Text colors at different hierarchy levels
- `--color-surface-*`: Background colors for surfaces
- `--color-success`, `--color-warning`, `--color-error`: Status colors
- `--color-border-*`: Border colors

### Spacing Scale
```
--spacing-xs:   0.25rem (4px)
--spacing-sm:   0.5rem  (8px)
--spacing-md:   1rem    (16px)
--spacing-lg:   1.5rem  (24px)
--spacing-xl:   2rem    (32px)
--spacing-2xl:  3rem    (48px)
--spacing-3xl:  4rem    (64px)
```

### Typography
- Font families: `--font-family-primary` (Lexend), `--font-family-serif` (Bree Serif)
- Font sizes: `--font-size-xs` through `--font-size-4xl`
- Font weights: `--font-weight-normal`, `--font-weight-semibold`, `--font-weight-bold`
- Line heights: `--line-height-tight`, `--line-height-normal`, `--line-height-relaxed`

### Other Utilities
- Border radius: `--border-radius-sm` through `--border-radius-full`
- Shadows: `--shadow-sm` through `--shadow-xl`
- Transitions: `--transition-fast` through `--transition-slowest`
- Z-index: `--z-index-dropdown`, `--z-index-modal`, etc.

## Responsive Design

Breakpoints are now defined as variables:
```css
--breakpoint-sm: 550px
--breakpoint-md: 600px
--breakpoint-lg: 768px
--breakpoint-xl: 800px
--breakpoint-2xl: 900px
--breakpoint-3xl: 970px
--breakpoint-4xl: 1024px
--breakpoint-5xl: 1300px
```

Use in media queries:
```css
@media (max-width: var(--breakpoint-xl)) {
  /* Tablet and below */
}
```

## File Size Comparison

- **Before**: 1 file (`style.css`) - 1241 lines
- **After**: 12 files totaling ~1400 lines (with better organization and comments)

Each file is focused and easier to maintain. The slight increase in total lines is due to:
- Better spacing and organization
- Comprehensive comments and documentation
- No code duplication

## Testing Checklist

- [x] All colors render correctly in light mode
- [x] All colors render correctly in dark mode
- [x] Theme toggle works correctly
- [x] Responsive design maintains at all breakpoints
- [x] Carousel/Swiper functionality works
- [x] Animations and reveal effects work
- [x] All links and buttons are functional
- [x] Cross-browser compatibility maintained

## Future Improvements

1. **CSS Grid Layout**: Convert fixed widths to more flexible layouts
2. **Component Variants**: Add more modifier classes for component variations
3. **Accessibility**: Enhance focus states and keyboard navigation
4. **Performance**: Consider using CSS containment for performance-critical sections
5. **Design System**: Document and expand the design token system

## Notes for Developers

- Always use semantic variable names - never hardcode colors
- Follow BEM naming convention for new classes
- Keep section-specific styles in their respective files
- Use `var()` for all spacing, colors, and typography
- Update both HTML class names AND CSS when refactoring

---

**Refactoring Date**: December 27, 2025  
**Refactored by**: Gradexis Development Team
