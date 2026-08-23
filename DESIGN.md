---
name: "生理期倒计时"
description: "A calm private countdown built around one decisive number and deliberate date correction."
colors:
  surface: "#ffffff"
  surface-subtle: "#f7f8fa"
  surface-pressed: "#eff1f4"
  ink: "#15181d"
  text: "#2c3138"
  muted: "#68717d"
  faint: "#969da6"
  line: "#e2e5e9"
  line-strong: "#cbd0d6"
  berry: "#ca4164"
  berry-strong: "#a92e50"
  berry-soft: "#fae9ee"
  green: "#2f7864"
  amber: "#a65337"
  focus: "#416e9f"
typography:
  display:
    fontFamily: '"Manrope Display", "SF Pro Display", "PingFang SC", "Microsoft YaHei UI", sans-serif'
    fontSize: "128px"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0"
  headline:
    fontFamily: '-apple-system, "SF Pro Text", "PingFang SC", "Microsoft YaHei UI", "Noto Sans SC", sans-serif'
    fontSize: "21px"
    fontWeight: 730
    lineHeight: 1.7
    letterSpacing: "0"
  title:
    fontFamily: '-apple-system, "SF Pro Text", "PingFang SC", "Microsoft YaHei UI", "Noto Sans SC", sans-serif'
    fontSize: "19px"
    fontWeight: 700
    lineHeight: 1.35
    letterSpacing: "0"
  body:
    fontFamily: '-apple-system, "SF Pro Text", "PingFang SC", "Microsoft YaHei UI", "Noto Sans SC", sans-serif'
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0"
  label:
    fontFamily: '-apple-system, "SF Pro Text", "PingFang SC", "Microsoft YaHei UI", "Noto Sans SC", sans-serif'
    fontSize: "15px"
    fontWeight: 650
    lineHeight: 1.7
    letterSpacing: "0"
  control:
    fontFamily: '-apple-system, "SF Pro Text", "PingFang SC", "Microsoft YaHei UI", "Noto Sans SC", sans-serif'
    fontSize: "14px"
    fontWeight: 720
    lineHeight: 1.7
    letterSpacing: "0"
rounded:
  tight: "6px"
  compact: "7px"
  surface: "8px"
  field: "9px"
  control: "10px"
  pill: "999px"
  circle: "50%"
spacing:
  xs: "6px"
  sm: "8px"
  md: "12px"
  control: "18px"
  sheet: "22px"
  page: "24px"
  page-wide: "30px"
  action-gap: "40px"
components:
  countdown-readout:
    textColor: "{colors.berry}"
    typography: "{typography.display}"
    height: "160px"
    width: "100%"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.surface}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "0 18px"
  button-primary-hover:
    backgroundColor: "#2b3037"
    textColor: "{colors.surface}"
  button-primary-disabled:
    backgroundColor: "{colors.surface-pressed}"
    textColor: "{colors.faint}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.control}"
    rounded: "{rounded.control}"
    padding: "0 18px"
  icon-button:
    backgroundColor: "transparent"
    textColor: "{colors.text}"
    rounded: "{rounded.circle}"
    height: "42px"
    width: "42px"
  password-input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body}"
    rounded: "{rounded.field}"
    padding: "0 12px 0 38px"
    height: "44px"
    width: "100%"
  sync-footer:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.muted}"
    height: "48px"
    width: "100%"
  top-bar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    height: "64px"
    width: "100%"
  editor-sheet:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text}"
    height: "100dvh"
    width: "min(500px, 100%)"
---

# Design System: 生理期倒计时

## Overview

**Creative North Star: "The Quiet Countdown"**

This system answers one private, practical question with a single commanding number. Cool white space, graphite typography, fine neutral rules, and one berry focal accent make the next expected date understandable within seconds without turning a personal utility into a health dashboard.

Routine viewing remains nearly weightless; correction appears only in a deliberate full-height editor. Cloud availability, cached read-only behavior, overdue state, saving, success, and failure stay explicit through restrained functional color and plain language rather than decorative wellness imagery.

The final reviewer disposition is **ship**. The focal type, muted-text contrast, and keyboard-focus findings were resolved in the production implementation.

**Key Characteristics:**

- One centered countdown dominates the first viewport.
- Main content sits on pure white; the sync footer alone uses a quiet cool-gray field.
- Graphite carries structure, berry carries the focal number, and functional colors carry state only.
- Editing is a deliberate right-side sheet on desktop and a full-width sheet on mobile.
- Thin rules, compact controls, and restrained radii replace cards, glass, and ornamental chrome.

## Colors

The palette is cool, quiet, and mostly neutral; berry is rare enough to remain meaningful, while green, amber, and blue are reserved for state and access.

### Primary

- **Countdown Berry** (`#ca4164`): the focal countdown numeral and the only high-salience brand accent.
- **Deep Berry** (`#a92e50`): prediction labels, date-record emphasis, errors, and destructive hover text.
- **Berry Veil** (`#fae9ee`): the restrained hover field behind destructive row actions.

### Neutral

- **Main White** (`#ffffff`): the page, editor, inputs, and primary inverse text.
- **Sync Mist** (`#f7f8fa`): the footer, quiet row actions, and subtle hover fields.
- **Pressed Gray** (`#eff1f4`): neutral hover and disabled-control fill.
- **Graphite Ink** (`#15181d`): focal text, brand mark, and primary controls.
- **Graphite Text** (`#2c3138`): default body and icon color.
- **Readable Muted** (`#68717d`): secondary labels and connection text; this is the production contrast floor for normal muted copy.
- **Disabled Gray** (`#969da6`): disabled icons and labels only.
- **Hairline** (`#e2e5e9`): ordinary dividers.
- **Strong Hairline** (`#cbd0d6`): input and secondary-button borders or stronger section separation.

### Functional

- **Synced Green** (`#2f7864`): the six-pixel cloud-synced status dot.
- **Overdue Amber** (`#a65337`): overdue wording and offline status.
- **Focus Blue** (`#416e9f`): the three-pixel keyboard focus ring and the editor's additive action.

**The Berry Is Meaning Rule.** Berry belongs to the countdown, prediction emphasis, and destructive or corrective details; it never becomes a broad background wash.

**The Functional Color Rule.** Green means synced, amber means overdue or offline, and blue means focus or additive access; never use these colors as decoration.

## Typography

**Display Font:** Manrope Display 800, self-hosted, with SF Pro Display and the CJK UI stack as fallbacks.

**Body Font:** the native UI stack: `-apple-system`, SF Pro Text, PingFang SC, Microsoft YaHei UI, Noto Sans SC, then `sans-serif`.

**Character:** One heavy geometric numeral creates immediate recognition while the system CJK face keeps every Chinese label familiar, compact, and platform-native. Letter spacing remains zero throughout.

### Hierarchy

- **Display** (800, 128px desktop / 108px mobile, 1 line-height): the berry day count only; use tabular numerals so changing values do not shift the composition.
- **Headline** (730, 21px desktop / 19px mobile, 1.7 line-height): the predicted date directly beneath the readout.
- **Title** (700, 19px desktop / 17px mobile, 1.35 line-height): the editor sheet heading.
- **Body** (400, 16px, 1.7 line-height): the document and inherited-control baseline.
- **Label** (650, 15px desktop / 14px mobile, 1.7 line-height): the quiet countdown prompt.
- **Control** (720, 14px, 1.7 line-height): primary and secondary actions; denser sheet metadata steps down to 10-12px without changing the family.

**The Numeral Monopolizes Display Rule.** Manrope Display 800 is reserved for the focal day count; headings, buttons, dates, and Chinese copy stay in the system CJK UI stack.

## Layout

The primary surface is a full-height three-row grid: a compact 64px header, a flexible centered main region, and a 48px sync footer. The countdown panel is centered and capped at 520px, with 54px by 24px main padding on desktop. The first viewport contains the label, stable-height readout, predicted date, and one principal update task; it does not branch into metrics or cards.

The editor is a full-height sheet capped at 500px and anchored to the right. Its 72px header and footer frame an independently scrolling body with 22px side padding. Confirmed rows are 58px high; future predictions stay collapsed until requested and use 48px rows when expanded.

At the implemented 560px breakpoint, outer padding contracts to 18-20px, the numeral drops to 108px, the update button spans the available width, and the editor becomes a shadowless full-width sheet with a 64px header and 70px footer. The layout supports a minimum viewport width of 320px.

**The One-Question Rule.** Keep the first viewport centered on the countdown, predicted date, one update task, and sync state; additional records and predictions belong behind the editor.

## Elevation & Depth

The system is flat by default. Depth comes from cool tonal layering and one-pixel neutral rules; the main countdown is unframed and casts no shadow. Only temporary overlays lift: the desktop editor uses a directional sheet shadow (`-18px 0 54px rgba(31, 37, 45, 0.18)`) against a graphite backdrop, and the toast uses a compact ambient shadow (`0 14px 36px rgba(31, 37, 45, 0.2)`). The mobile editor removes its shadow because it occupies the full viewport.

### Shadow Vocabulary

- **Sheet Separation** (`-18px 0 54px rgba(31, 37, 45, 0.18)`): separates the desktop editor from the page it covers.
- **Toast Lift** (`0 14px 36px rgba(31, 37, 45, 0.2)`): keeps transient confirmation legible above either surface.

**The Flat-by-Default Rule.** Resting surfaces use whitespace, tone, and rules; reserve shadows for overlays that must separate from active content.

## Shapes

Controls use gently restrained radii between 6px and 10px: retry at 6px, compact row controls at 7px, quiet surface actions at 8px, fields and the brand mark at 9px, and primary controls or toasts at 10px. Icon-only buttons and sync dots are circular. The editor itself is a flush, full-height sheet with no rounded outer container, and the main countdown is not enclosed in a card.

Borders are one-pixel cool-neutral lines. Pill geometry is limited to incidental scrollbar treatment; it is not a general component silhouette.

**The Restrained Radius Rule.** Keep ordinary controls within the implemented 6-10px range; use circles only for icon targets and status dots, and do not wrap page sections in oversized rounded cards.

## Components

### Countdown Readout

- **Character:** one stable, centered baseline with a berry numeral between graphite Chinese units.
- **Structure:** a 160px minimum readout height on desktop and 138px on mobile prevents value changes from moving surrounding content.
- **Type:** 128px / 108px Manrope Display 800 with tabular numerals; units are 19px / 17px system UI.
- **State:** overdue changes the prefix to amber and updates the predicted-date language without changing the numeral's focal role.

### Buttons

- **Primary:** graphite fill, white text, 10px radius, 46px minimum height, 18px horizontal padding, and an inline 18px icon when the command benefits from one.
- **Primary Hover / Active:** darken to `#2b3037` and lift one pixel over 140-150ms; disabled controls use Pressed Gray with Disabled Gray text and never lift.
- **Secondary:** Main White with a Strong Hairline border and Graphite Ink text; hover shifts only to Sync Mist.
- **Icon:** 42px circular transparent target; neutral hover uses Pressed Gray, and unavailable editing uses Disabled Gray.
- **Focus:** every button receives a 3px Focus Blue outline with a 2px offset through `:focus-visible`.

### Inputs / Fields

- **Password Field:** 44px high, Main White, Strong Hairline border, 9px radius, and 38px left padding for the lock icon.
- **Date Field:** 42px high, borderless and transparent inside a ruled row; hover and focus add Sync Mist without producing a nested card.
- **Focus / Error:** the password border shifts to a muted blue while the global 3px Focus Blue outline remains visible; errors use Deep Berry at 11px.

### Top Bar

- **Style:** a 64px unframed bar with one bottom Hairline, 30px desktop or 18px mobile side padding, and a compact 32px graphite brand mark.
- **Action:** the trailing calendar-cog icon opens the same date editor as the principal update action and inherits the shared circular-button states.

### Sync Footer and Offline Message

- **Sync Footer:** a 48px Sync Mist band with centered 11px Readable Muted text and a six-pixel Synced Green dot.
- **Offline State:** text and dot switch to Overdue Amber; a compact warm notice appears near the top of the main region and states whether cached read-only data is available.
- **Retry:** a small bordered action stays within the notice rather than adding another page-level call to action.

### Editor Sheet

- **Structure:** right-aligned, full-height, 500px maximum width with fixed header and footer and a scrolling body.
- **Rows:** confirmed dates use 58px ruled rows; future predictions use 48px ruled rows; the 52px disclosure rotates its chevron over 160ms.
- **Actions:** adding and removing dates remain visually compact; saving and canceling use the canonical primary and secondary buttons.
- **Motion:** desktop entry travels 24px over 240ms using `cubic-bezier(0.2, 0.82, 0.2, 1)`; all animation and transition durations collapse to 0.01ms under reduced motion.

### Toast

- **Style:** a bottom-centered graphite confirmation surface with white 12px text, 10px radius, 46px minimum height, and the Toast Lift shadow.

**The State Clarity Rule.** Loading, synced, cached read-only, offline, overdue, saving, success, and error states must remain readable in text; color and motion reinforce state but never carry it alone.

## Do's and Don'ts

### Do:

- **Do** keep the countdown and predicted date legible within seconds, with the day count as the only display-scale element.
- **Do** keep the main canvas Main White, the sync footer Sync Mist, and the focal numeral Countdown Berry.
- **Do** use Readable Muted (`#68717d`) for normal secondary copy and Focus Blue (`#416e9f`) for the visible 3px keyboard ring.
- **Do** preserve cloud and cached read-only clarity before exposing edit controls.
- **Do** use tabular numerals for dates and changing countdown values.

### Don't:

- **Don't** add dashboard density, metric grids, decorative wellness chrome, glass, gradients, or ornamental cards.
- **Don't** spread berry across large surfaces or use green, amber, and blue outside their documented functional meanings.
- **Don't** use Manrope Display for body copy, Chinese headings, labels, or controls.
- **Don't** hide connection, saving, overdue, or error meaning behind color or icons alone.
- **Don't** exceed the restrained 6-10px control-radius language except for true circles and the incidental scrollbar pill.
