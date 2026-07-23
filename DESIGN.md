# Lesson Platform Design System

## 0. Research Log

- Owner brief: house style at design variance 9, motion intensity 8, and visual density 4. Its one-accent rule, typography constraints, photography policy, ban list, and accessibility requirements are the top-level visual contract.
- Generated references: nine horizontal section studies under `.omo/evidence/phase0-redesign/references/`, covering the hub hero, affiliation disclosure, roster, home close, profile hero, profile story, video privacy state, registration form, and privacy close. They establish composition, hierarchy, material, and motion direction. Repository copy remains authoritative where generated text differs.
- Production photography: eight documentary music studies under `public/images/`, generated before implementation and inspected as a contact sheet. Every image is face-free and composed as structural editorial media rather than a card thumbnail.
- Direction selected: a late-afternoon band-hall photo essay translated into a precise product interface. Kept asymmetrical image crops, open legal copy, cold ink surfaces, silver typography, and a single signal cobalt. Rejected equal-card directories, ornamental gradients, floating glass, novelty display type, and generic marketplace chrome.
- React runtime instrumentation: react-grab and react-scan are intentionally not shipped. The project bans trackers on minor-visited pages and heavy UI dependencies. Static react-doctor checks and real-browser QA cover development diagnostics without adding runtime instrumentation.

## 1. Atmosphere & Identity

A late-afternoon rehearsal room translated into a precise cultural product: candid, rhythmic, and trustworthy without looking institutional. The signature is the **documentary roster**, where real lesson details are framed by close studies of instruments and working hands. The interface uses editorial scale, uneven image geometry, and quiet product precision to make the director's personal recommendation list feel considered without making it feel official.

Primary users:

- A parent on a phone who needs to understand trust boundaries and choose a teacher quickly.
- A band director sharing a personal list who needs the non-affiliation framing to be unmistakable.
- A keyboard or screen-reader user who needs predictable headings, clear focus, and form errors adjacent to fields.
- A motion-sensitive visitor who receives the same hierarchy with all choreography removed.

## 2. Color

### Palette

| Role | Token | Value | Usage |
|---|---|---|---|
| Surface/primary | `--surface-primary` | `#071015` | Page canvas |
| Surface/secondary | `--surface-secondary` | `#0C171E` | Tonal section shift |
| Surface/elevated | `--surface-elevated` | `#111F28` | Form and media cores |
| Surface/pressed | `--surface-pressed` | `#172934` | Active controls |
| Text/primary | `--text-primary` | `#F2F5F3` | Headings and body |
| Text/secondary | `--text-secondary` | `#A8B3B7` | Supporting copy |
| Text/tertiary | `--text-tertiary` | `#77858B` | Metadata |
| Line/subtle | `--line-subtle` | `rgba(193, 207, 211, 0.16)` | Rare structural rules |
| Line/strong | `--line-strong` | `rgba(220, 231, 233, 0.34)` | Intentional separators |
| Accent/primary | `--accent-primary` | `#2E68F7` | Links, CTAs, focus |
| Accent/hover | `--accent-hover` | `#2A60E8` | Interactive hover |
| Accent/text | `--accent-text` | `#86A8FF` | Contrast-safe accent labels |
| Accent/soft | `--accent-soft` | `#132956` | Selected and poster surfaces |
| Status/error | `--status-error` | `#FF8B97` | Form errors only |
| Status/success | `--status-success` | `#77D1A4` | Submission confirmation only |

### Rules

- Cobalt is the only brand accent. Error and success colors are semantic and never decorative.
- The public product uses one locked deep-ink theme. Individual sections vary by tone, never by a competing palette.
- Components use semantic variables only. Raw color values live here and in the root token declaration.

## 3. Typography

### Scale

| Level | Size | Weight | Line height | Tracking | Usage |
|---|---|---|---|---|---|
| Display | `clamp(3.25rem, 8vw, 7rem)` | 650 | 0.9 | `-0.065em` | Home hero, maximum 2 lines |
| Profile display | `clamp(2.75rem, 6vw, 5.75rem)` | 650 | 0.92 | `-0.055em` | Teacher name |
| H1 | `clamp(2.25rem, 5vw, 4.5rem)` | 620 | 0.98 | `-0.045em` | Page titles |
| H2 | `clamp(1.75rem, 3vw, 3rem)` | 600 | 1.02 | `-0.035em` | Major sections |
| H3 | `1.375rem` | 600 | 1.15 | `-0.02em` | Cards and form group titles |
| Body/large | `1.125rem` | 450 | 1.6 | `-0.01em` | Lead copy |
| Body | `1rem` | 430 | 1.65 | `-0.005em` | Default copy and inputs |
| Body/small | `0.875rem` | 450 | 1.55 | `0` | Secondary text |
| Caption | `0.75rem` | 560 | 1.4 | `0.04em` | Compact metadata |
| Label | `0.6875rem` | 560 | 1.3 | `0.1em` | Sparse uppercase labels |

### Font Stack

- Primary: Geist via `next/font`, calibrated for product precision without defaulting to Inter, Roboto, or a serif.
- Mono: Geist Mono via `next/font`, used only for rates and compact metadata.
- Maximum two families. No serif, Inter, Roboto, Arial, Open Sans, or Helvetica.

## 4. Spacing & Layout

### Base Unit

All spacing intent derives from a 4px base.

| Token | Value | Usage |
|---|---|---|
| `--space-1` | `0.25rem` | Tight inline gap |
| `--space-2` | `0.5rem` | Label-to-control gap |
| `--space-3` | `0.75rem` | Compact component padding |
| `--space-4` | `1rem` | Mobile gutter, field gap |
| `--space-5` | `1.25rem` | Standard inset |
| `--space-6` | `1.5rem` | Surface padding |
| `--space-8` | `2rem` | Component separation |
| `--space-10` | `2.5rem` | Cluster separation |
| `--space-12` | `3rem` | Mobile section rhythm |
| `--space-16` | `4rem` | Component rhythm |
| `--space-24` | `6rem` | Standard section pause |
| `--space-32` | `8rem` | Large section pause |
| `--space-36` | `9rem` | Maximum desktop pause |

### Grid

- Maximum content width: 1440px.
- Desktop: 12 conceptual columns with 24px fluid gaps. High-variance layouts use 7/5 and 8/4 splits, deliberate empty columns, and media that crosses a grid line.
- Mobile below 768px: one strict column, 16px gutter, no rotation, negative margin, or overlapping touch target.
- Full-height surfaces use `min-height: 100dvh`, never `100vh`.

## 5. Components

### Site Header

- **Structure**: brand link, two navigation links, one primary registration action.
- **States**: default, hover, active, focus-visible.
- **Accessibility**: one-line desktop nav, 44px targets, no hamburger required for three actions.
- **Motion**: entry fade/translate only; static under reduced motion.

### Action Link

- **Structure**: anchor or submit button with label and optional short directional text mark.
- **Variants**: primary filled cobalt, secondary tonal, text.
- **States**: default, hover, active, focus-visible, disabled/loading for submit.
- **Shape**: 10px action radius; one-line labels.
- **Motion**: 180ms transform and color feedback.

### Teacher Profile Story

- **Structure**: teacher identity, instruments, rate, short bio, profile action.
- **Variants**: featured landscape, standard portrait, compact text index.
- **States**: default, hover, active, focus-within.
- **Accessibility**: one stretched semantic profile link, visible focus, text remains available without motion.
- **Motion**: image crops settle in reading order while copy remains fully visible.

### Video Facade

- **Structure**: local documentary poster, clip metadata, explicit load button, iframe only after click.
- **States**: idle facade, focus, active, loaded.
- **Accessibility**: real button, descriptive label, 16:9 reserved area, iframe title.
- **Privacy**: no remote image, iframe, preconnect, or host request exists before activation.

### Form Field

- **Structure**: visible label, control, optional helper, field error.
- **States**: default, hover, focus-visible, invalid, disabled.
- **Accessibility**: semantic label, `aria-describedby`, error uses `role=alert`, minimum 48px control height.

### Public Footer

- **Structure**: permanent non-affiliation statement, abuse-report mail link, privacy link where relevant.
- **States**: visible link hover/focus.
- **Accessibility**: plain-language copy and sufficient contrast.

## 6. Motion & Interaction

| Type | Duration | Easing | Usage |
|---|---|---|---|
| Micro | 180ms | `cubic-bezier(0.22, 1, 0.36, 1)` | Button and link feedback |
| Standard | 320ms | `cubic-bezier(0.22, 1, 0.36, 1)` | Video facade state transition |
| Emphasis | 720ms | `cubic-bezier(0.16, 1, 0.3, 1)` | Hero and roster entrance |
| Scroll reveal | view-linked | `cubic-bezier(0.16, 1, 0.3, 1)` | Teacher card hierarchy |

- Only `transform`, `opacity`, and color/filter transitions animate.
- The roster entrance communicates that the director's list is composed of individual teacher-owned profiles.
- Hover movement exists only on real links and buttons.
- `prefers-reduced-motion: reduce` removes entrance, reveal, and transform effects while preserving all content and states.

## 7. Depth & Surface

Strategy: matte tonal shift with rare silver rules and deep image wells. Borders appear only where they clarify a control or a major surface boundary.

- Outer editorial media: 20px radius.
- Inner media and grouped surfaces: 14px radius.
- Controls and actions: 10px radius. These three values form one nested radius system.
- Shadows are low, cool ambient depth only, never generic glass blur or spray-on elevation.
- A fixed 3% noise texture is produced locally with CSS, pointer-events disabled, and no external asset.

## 8. Accessibility Constraints & Accepted Debt

### Constraints

- WCAG 2.2 AA target, 4.5:1 body contrast, 3:1 large text and non-text UI.
- Full keyboard reachability, visible focus, semantic landmarks, one H1 per route.
- Form errors are local to fields and summarized after submit.
- 200% zoom keeps a single readable column with no horizontal scrolling.
- Motion-sensitive visitors receive a static layout through `prefers-reduced-motion`.
- No information is conveyed by color alone.
- No student names or faces appear on public pages.

### Accepted Debt

| Item | Location | Why accepted | Owner / Exit |
|---|---|---|---|
| Placeholder abuse mailbox domain until deploy configuration | Public footer | The production monitored address is an owner operational decision. | `TODO(owner)`: set `NEXT_PUBLIC_ABUSE_EMAIL` before public distribution. |
