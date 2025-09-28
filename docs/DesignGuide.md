# Tourex Design System Guide

## Overview
This design guide documents the complete Tourex design system used throughout the Jungle Resort PingPe booking platform. It serves as the foundation for all frontend components and provides guidance for consistent backend admin interface styling.

## Color System

### Primary Color Palette
- **Primary**: `#560ce3` (Purple) - Main brand color for CTAs, links, selections
- **Secondary**: `#f74a1f` (Orange) - Accent color for highlights, warnings, secondary actions
- **Black**: `#020615` - Primary text, headings
- **Black Alt**: `#000` - Pure black for high contrast elements
- **White**: `#fff` - Background, inverse text
- **Yellow**: `#ff9901` - Alert/notification color

### Grey Scale System
- **Grey 1**: `#353844` - Primary text color (body text)
- **Grey 2**: `#454546` - Secondary text
- **Grey 3**: `#f3f3f4` - Light backgrounds
- **Grey 4**: `#737374` - Muted text, placeholders
- **Grey 5**: `#f8f8f8` - Subtle backgrounds
- **Grey 6**: `#666` - Mid-tone text
- **Grey 7**: `#f6f6f7` - Card backgrounds
- **Grey 8**: `#f6f4fa` - Section backgrounds

### Border Colors
- **Border 1**: `#e1e1e1` - Default borders, dividers
- **Border 2**: `#c5c5c5` - Hover states, active borders
- **Border 3**: `#e6e6e6` - Subtle separators

### CSS Variable Implementation
All colors are available as CSS variables with the `--tg-` prefix:
```css
:root {
  --tg-theme-primary: #560ce3;
  --tg-theme-secondary: #f74a1f;
  --tg-common-white: #fff;
  --tg-common-black: #020615;
  --tg-common-black-2: #000;
  --tg-common-yellow: #ff9901;
  --tg-grey-1: #353844;
  /* ... complete variable list */
}
```

### Dark Mode Considerations
For future dark mode implementation:
- Invert grey scale relationships (light greys become dark backgrounds)
- Maintain primary/secondary brand colors for consistency
- Use `--tg-common-white` variables that can be toggled
- Ensure WCAG AA contrast ratios (4.5:1 minimum)

## Typography System

### Font Families
- **Primary (Body)**: `"Poppins", sans-serif` - Main content, UI text
- **Display (Outfit)**: `"Outfit", sans-serif` - Headlines, feature text
- **Accent Fonts**: Custom brand fonts for special sections
  - `"segoepr"` - Handwritten style
  - `"chillax"` - Modern display
  - `"quentin"` - Decorative script
  - `"rage"` - Artistic display

### Typography Scale
```scss
h1: 48px (font-weight: 700)
h2: 36px (font-weight: 700)
h3: 24px (font-weight: 700)
h4: 18px (font-weight: 700)
h5: 17px (font-weight: 700)
h6: 16px (font-weight: 700)
body: 16px (font-weight: 400, line-height: 26px)
```

### Responsive Typography
Typography automatically scales on mobile:
- Large screens: Full size
- Tablet: ~85% scale
- Mobile: ~70% scale

### Font Loading
Google Fonts loaded via CDN:
```css
@import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Outfit:wght@100..900&display=swap');
```

## Spacing System

### Padding Classes
Responsive padding utilities with mobile-first approach:

#### Top Padding (pt-*)
- `pt-170` → Desktop: 170px, Tablet: 115px, Mobile: 80px
- `pt-160` → Desktop: 160px, Tablet: 100px, Mobile: 70px
- `pt-150` → Desktop: 150px, Tablet: 100px, Mobile: 70px
- `pt-120` → All: 80px on mobile
- `pt-100` → All: 60px on mobile

#### Bottom Padding (pb-*)
- `pb-170` → All: 100px on mobile
- `pb-160` → All: 100px on mobile
- `pb-120` → All: 80px on mobile
- `pb-100` → All: 60px on mobile

### Grid System Extensions
Bootstrap gutters enhanced:
```scss
.gx-10 { --bs-gutter-x: 10px; }
.gx-15 { --bs-gutter-x: 15px; }
.gx-20 { --bs-gutter-x: 20px; }
.gx-24 { --bs-gutter-x: 24px; }
.gx-30 { --bs-gutter-x: 30px; }
// ... up to gx-100
```

### Container Variations
Custom container sizes for different layouts:
```scss
.container-1860 { max-width: 1860px; }
.container-1790 { max-width: 1790px; }
.container-1630 { max-width: 1630px; }
.container-1545 { max-width: 1545px; }
```

## Button System

### Base Button (`.tg-btn`)
```scss
.tg-btn {
  font-weight: 600;
  font-size: 15px;
  text-transform: uppercase;
  color: var(--tg-common-white);
  border-radius: 6px;
  padding: 12px 27px;
  background: var(--tg-theme-primary);
}
```

### Button Variants
- **`.tg-btn-black`** - Black background variant
- **`.tg-btn-transparent`** - Light purple background with primary text
- **`.tg-btn-header`** - Outlined style for navigation
- **`.tg-btn-gray`** - Grey background with primary text
- **`.tg-btn-su-transparent`** - Custom variant with Outfit font

### Advanced Button Effects
- **`.tg-btn-switch-animation`** - Complex hover animations with icon transitions
- **`.tg-btn-hover`** - Black hover state

## Component Patterns

### Form Elements
```scss
input, textarea {
  height: 56px;
  font-size: 15px;
  color: var(--tg-grey-1);
  padding: 0 26px;
  border: 1px solid #a2a9ac;
  background-color: #fff;
}
```

### Utility Classes
- **Positioning**: `.p-relative`, `.p-absolute`, `.top-sticky`
- **Z-index**: `.z-index-1` through `.z-index-999`
- **Border radius**: `.tg-round-15`, `.tg-round-25`
- **Line height**: `.lh-28`
- **Font size**: `.fs-40`

### Interactive States
- **Underline effects**: `.underline-black`, `.underline-white`
- **Selection color**: Primary theme color background
- **Focus states**: No outline, custom styling
- **Transitions**: 0.3s ease for most elements

## Responsive Breakpoints

```scss
$x4l: 'only screen and (min-width: 1700px) and (max-width: 1800px)';
$x3l: 'only screen and (min-width: 1600px) and (max-width: 1700px)';
$xxl: 'only screen and (min-width: 1400px) and (max-width: 1599px)';
$xl: 'only screen and (min-width: 1200px) and (max-width: 1399px)';
$lg: 'only screen and (min-width: 992px) and (max-width: 1199px)';
$md: 'only screen and (min-width: 768px) and (max-width: 991px)';
$sm: 'only screen and (min-width: 576px) and (max-width: 767px)';
$xs: '(max-width: 575px)';
```

## Animation & Transitions

### Standard Transitions
- Default: `all 0.3s ease`
- Custom: `.tg-transition()` mixin with customizable timing
- Complex animations: Cubic-bezier timing functions for button effects

### Common Animations
- Hover effects on buttons and links
- Image scaling on hover
- Slide transitions for carousels
- Fade effects for modals and overlays

## Accessibility Guidelines

### Color Contrast
- Primary text on white: WCAG AA compliant
- White text on primary: WCAG AA compliant
- Grey text maintains readability standards

### Touch Targets
- Minimum 44px touch target size
- Adequate spacing between interactive elements
- Focus indicators for keyboard navigation

### Typography Accessibility
- Scalable font sizes using rem/em
- Sufficient line-height (1.6 minimum)
- Clear hierarchy with heading structure

## Backend Admin Interface Guidelines

When implementing admin interfaces or dashboard components:

### Color Usage
- Use `--tg-grey-5` or `--tg-grey-7` for dashboard backgrounds
- `--tg-theme-primary` for primary actions and navigation highlights
- `--tg-grey-1` for body text, `--tg-common-black` for headings
- `--tg-border-1` for table borders and card separators

### Layout Patterns
- Use existing `.container-*` classes for consistent spacing
- Apply `.pt-120` or `.pb-120` for section spacing
- Utilize Bootstrap grid with custom gutters (`.gx-24`, `.gx-30`)

### Form Styling
- Follow existing form input styles (56px height, consistent padding)
- Use `.tg-btn` variants for form submission buttons
- Maintain consistent border-radius (6px for buttons, input styling)

### Data Tables
- Use `--tg-grey-7` for table headers
- `--tg-border-1` for borders
- Alternate row colors using `--tg-grey-5` and white

## Implementation Notes

### CSS Architecture
- SCSS variables converted to CSS custom properties
- Utility-first approach for common patterns
- Component-specific styles in dedicated files
- Responsive design using mobile-first methodology

### Performance Considerations
- Font loading optimization with `font-display: swap`
- Critical CSS inlined for above-the-fold content
- Efficient use of CSS variables for theming
- Minimal use of expensive properties (box-shadow, gradients)

### Browser Support
- Modern browsers (Chrome 88+, Firefox 78+, Safari 14+)
- CSS custom properties support required
- Flexbox and Grid layout support
- No IE11 support due to CSS variables usage

## Design Tokens Summary

```scss
// Primary Design Tokens
$primary-color: #560ce3;
$secondary-color: #f74a1f;
$text-primary: #353844;
$text-heading: #020615;
$background-primary: #fff;
$background-secondary: #f6f6f7;
$border-primary: #e1e1e1;

// Typography Tokens
$font-family-primary: "Poppins", sans-serif;
$font-family-display: "Outfit", sans-serif;
$font-size-base: 16px;
$line-height-base: 1.625;

// Spacing Tokens
$spacing-xs: 8px;
$spacing-sm: 16px;
$spacing-md: 24px;
$spacing-lg: 32px;
$spacing-xl: 48px;
$spacing-xxl: 64px;

// Border Tokens
$border-radius-sm: 6px;
$border-radius-md: 15px;
$border-radius-lg: 25px;
$border-radius-pill: 100px;
```

This design system ensures consistency across all Tourex components and provides a solid foundation for any backend administration interfaces that may be developed.