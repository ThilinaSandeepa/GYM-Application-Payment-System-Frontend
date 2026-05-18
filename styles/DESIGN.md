---
name: FitCore Precision
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#c5c9ac'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#8f9379'
  outline-variant: '#444933'
  surface-tint: '#aed500'
  primary: '#ffffff'
  on-primary: '#293500'
  primary-container: '#c7f300'
  on-primary-container: '#576c00'
  inverse-primary: '#526600'
  secondary: '#c8c6c5'
  on-secondary: '#303030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#ffffff'
  on-tertiary: '#00363f'
  tertiary-container: '#aaedfe'
  on-tertiary-container: '#256d7c'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#c7f300'
  primary-fixed-dim: '#aed500'
  on-primary-fixed: '#171e00'
  on-primary-fixed-variant: '#3d4d00'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#aaedfe'
  tertiary-fixed-dim: '#8ed1e1'
  on-tertiary-fixed: '#001f25'
  on-tertiary-fixed-variant: '#004e5b'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  headline-lg:
    fontFamily: Archivo Narrow
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: 0.02em
  headline-md:
    fontFamily: Archivo Narrow
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.02em
  headline-sm:
    fontFamily: Archivo Narrow
    fontSize: 16px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.04em
  body-lg:
    fontFamily: Geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: '0'
  body-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: '0'
  label-caps:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: '1'
    letterSpacing: 0.1em
  data-mono:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1'
    letterSpacing: -0.01em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 48px
  gutter: 16px
  margin-mobile: 16px
  margin-desktop: 32px
---

## Brand & Style

The design system is engineered for high-performance gym management, prioritizing data density, clarity, and a technical aesthetic. The brand personality is disciplined, energetic, and professional, aimed at gym owners and staff who require a no-nonsense interface for complex scheduling and member analytics.

The visual style is **Minimalist-Technical**. It utilizes a "Dark Mode First" approach to reduce eye strain in gym environments and emphasizes "Active" states using high-visibility neon accents. The aesthetic avoids all decorative gradients and soft shadows in favor of sharp lines, high-contrast borders, and clear tonal layering. The emotional response should be one of control, precision, and athletic intensity.

## Colors

The palette is built on a "Deep Night" foundation to ensure the Lime yellow-green accent (#C8F400) provides maximum functional contrast. 

- **Foundation:** The background hierarchy uses `#0D0D0D` for the base canvas, `#111111` for structural navigation (sidebar), and `#1A1A1A` for interactive containers (cards).
- **Accents:** The primary Lime color is reserved for critical actions, active states, and focus indicators.
- **Semantic Logic:** Status colors use low-brightness backgrounds with high-vibrancy text to ensure legibility without distracting from the primary UI flow. "Delete" and "Error" states utilize a pure `#DC2626` to signal urgency.
- **Typography:** Pure white (#FFFFFF) is used for all primary data points, while `#9CA3AF` provides a clear secondary hierarchy for labels and metadata.

## Typography

This design system employs a dual-typeface strategy to balance technical efficiency with athletic aggression.

- **Headlines & Headers:** `Archivo Narrow` provides a semi-condensed, authoritative look. All headers must be set in **Uppercase** with a slight positive tracking to evoke a "broadcast" or "scoreboard" feel.
- **Body & Interface:** `Geist` is used for its geometric precision and excellent legibility in dark mode. It handles the bulk of the data entry and member management tasks.
- **Data Display:** For numerical values (weights, membership counts, financial figures), use the `data-mono` style to ensure columns of numbers align perfectly for quick scanning.

## Layout & Spacing

The system follows a strict **8px grid** to ensure mathematical consistency. 

- **Layout Model:** A fluid grid system with fixed-width sidebars. The main content area expands to fill the viewport but caps at 1440px to maintain readability of data tables.
- **Sidebar:** Fixed at 260px. It remains persistent on desktop and collapses into a drawer on mobile.
- **Data Density:** Spacing is intentionally tight (`8px` and `16px`) to allow gym managers to view more information at once without excessive scrolling.
- **Breakpoints:**
  - Mobile: < 768px (Single column, 16px margins).
  - Tablet: 768px - 1024px (2-column cards, 24px margins).
  - Desktop: > 1024px (Multi-column dashboard, 32px margins).

## Elevation & Depth

Depth is conveyed through **Tonal Layering** and **High-Contrast Outlines** rather than shadows. In a dark, data-forward interface, shadows often create "muddiness."

1. **Level 0 (Base):** `#0D0D0D` — The primary canvas.
2. **Level 1 (Secondary):** `#111111` — Navigation and sidebar.
3. **Level 2 (Containers):** `#1A1A1A` — Cards and content modules.
4. **Level 3 (Interactive):** `#222222` — Form inputs and hover states.

To distinguish elements, use a 1px solid border of `#333333` for cards and `#C8F400` for active/focused elements. This creates a "glass-less" architectural feel that is sharp and modern.

## Shapes

The shape language is **Soft-Geometric**. We use a baseline `4px` (Soft) radius for most UI elements. This provides just enough refinement to feel modern while maintaining the "sharp lines" requested.

- **Small elements (Checkboxes, Tags):** 2px radius.
- **Standard elements (Buttons, Inputs, Cards):** 4px radius.
- **Large containers (Modals):** 8px radius.
- **Exceptions:** No pill-shaped buttons; all buttons must have squared-off corners with the 4px radius to maintain the professional, industrial aesthetic.

## Components

- **Buttons:** Primary buttons use `#C8F400` background with `#0D0D0D` text. Secondary buttons are outlined in `#333333` with white text. All buttons use `label-caps` typography.
- **Input Fields:** Background `#222222` with a 1px border of `#333333`. On focus, the border changes to `#C8F400`. Labels are placed above the field in `label-caps` muted text.
- **Cards:** Background `#1A1A1A`. No shadow. 1px border `#222222`. Header sections within cards should have a thin bottom border to separate titles from content.
- **Badges:** 
  - *Paid:* Background `#0F2D0F`, Text `#4ADE80`.
  - *Pending:* Background `#2D1A00`, Text `#FB923C`.
  - Both use `label-caps` at a smaller size (10px).
- **Data Tables:** Row hover state should use `#222222`. Use thin `#1F1F1F` dividers between rows. Column headers must be uppercase `label-caps`.
- **Sidebar Items:** Active state uses a vertical 4px bar of `#C8F400` on the left edge and `#FFFFFF` text. Inactive items use `#9CA3AF`.
- **Metric Widgets:** Large numerical values in `data-mono` with the primary accent color to highlight key gym performance indicators.