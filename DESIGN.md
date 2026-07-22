# Lesson Platform Design System

## 0. Research Log

- Embedded refs: shortlisted Framer, Spotify, and Nike. Picked the owner-provided `design-taste-frontend` at dials 9/8/6 with Framer as the Layer B reference because the brief calls for compressed type, black-and-cobalt contrast, purposeful motion, and a high-craft consumer surface.
- Lazyweb: 2 desktop queries, 4 shipped screens viewed (Headspace teacher roster, GuitarTuna, Yousician, Yoodli coach directory). Kept the media-led hierarchy, immediately legible teacher identity, and direct profile-to-action path. Rejected equal-card directories and generic white marketplace grids.
- UI/UX database: queried `music lesson teacher roster modern bold dark cobalt trustworthy parents`. Kept its energetic block composition and strong above-fold action. Rejected its purple/green palette and novelty display font because they conflict with the house-style one-accent lock and trust needs.
- Imagen drafts: skipped because the available image generator returns a conversation-final artifact and cannot be used as an internal research lane while continuing the implementation. The shipped-screen references and the owner's explicit house style are the visual contract.
- React runtime instrumentation: react-grab and react-scan are intentionally not shipped. The project bans trackers on minor-visited pages and heavy UI dependencies. Static react-doctor checks and real-browser QA cover development diagnostics without adding runtime instrumentation.

## 1. Atmosphere & Identity

A late-evening rehearsal room translated into a precise cultural product: confident, rhythmic, and trustworthy without looking institutional. The signature is the **roster in motion**, where real teacher profile links overlap like set cards arriving on a music stand. The visual language borrows Framer's compressed geometry and electric focus, then removes pure black, Inter, generic glass, and decorative glows to honor the house style.

Primary users:

- A parent on a phone who needs to understand trust boundaries and choose a teacher quickly.
- A band director sharing a personal list who needs the non-affiliation framing to be unmistakable.
- A keyboard or screen-reader user who needs predictable headings, clear focus, and form errors adjacent to fields.
- A motion-sensitive visitor who receives the same hierarchy with all choreography removed.

## 2. Color

### Palette

| Role | Token | Dark | Light | Usage |
|---|---|---|---|---|
| Surface/primary | `--surface-primary` | `#0B0D10` | `#F5F7FB` | Page canvas |
| Surface/secondary | `--surface-secondary` | `#12161C` | `#EDF1F6` | Grouped sections |
| Surface/elevated | `--surface-elevated` | `#181E27` | `#FFFFFF` | Profile and form surfaces |
| Surface/pressed | `--surface-pressed` | `#202836` | `#E2E8F1` | Active controls |
| Text/primary | `--text-primary` | `#F4F7FB` | `#10131A` | Headings and body |
| Text/secondary | `--text-secondary` | `#AAB4C0` | `#586477` | Supporting copy |
| Text/tertiary | `--text-tertiary` | `#788493` | `#6B7788` | Metadata |
| Border/default | `--border-default` | `#2A3442` | `#CAD3DF` | Structural outlines |
| Border/highlight | `--border-highlight` | `#3B4656` | `#E4E9F0` | Inset top edge |
| Accent/primary | `--accent-primary` | `#1D64EF` | `#165DFF` | Links, CTAs, focus |
| Accent/hover | `--accent-hover` | `#0F56D7` | `#0049CC` | Interactive hover |
| Accent/text | `--accent-text` | `#8BB1FF` | `#0049CC` | Contrast-safe accent labels and links |
| Accent/soft | `--accent-soft` | `#173367` | `#DCE7FF` | Selected and poster surfaces |
| Status/error | `--status-error` | `#FF8290` | `#B42336` | Form errors only |
| Status/success | `--status-success` | `#7DD3A6` | `#176B43` | Submission confirmation only |

### Rules

- Cobalt is the only brand accent. Error and success colors are semantic and never decorative.
- The whole page follows one system-selected theme. No individual section flips theme.
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

- Primary: Outfit via `next/font`, geometric but warmer than a developer-tool sans.
- Mono: IBM Plex Mono via `next/font`, used only for rates and compact metadata.
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
| `--space-16` | `4rem` | Desktop section rhythm |
| `--space-20` | `5rem` | Large section pause |
| `--space-24` | `6rem` | Maximum hero top padding |

### Grid

- Maximum content width: 1440px.
- Desktop: 12 conceptual columns with fluid gaps. High-variance layouts use 7/5, 8/4, and overlapping tracks.
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
- **Shape**: full pill for actions only; one-line labels.
- **Motion**: 180ms transform and color feedback.

### Teacher Profile Card

- **Structure**: teacher identity, instruments, rate, short bio, profile action.
- **Variants**: featured, standard, compact roster-stack.
- **States**: default, hover, active, focus-within.
- **Accessibility**: one stretched semantic profile link, visible focus, text remains available without motion.
- **Motion**: cards settle into the roster and reveal on entry to communicate sequence.

### Video Facade

- **Structure**: local tonal poster, clip metadata, explicit load button, iframe only after click.
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

Strategy: tonal shift with a restrained double-bezel on interactive media and primary surfaces.

- Outer shells: 1px semantic ring, 6px inset, 28px radius.
- Inner cores: elevated tone, inset top highlight, 20px radius.
- Controls: 12px radius; action buttons: pill. This is the documented shape rule.
- Shadows are cobalt-tinted ambient depth only, never harsh black shadows or generic glass blur.
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
| No manual theme toggle | All public pages | System color preference is respected; a toggle is not needed for the Phase 0 task path. | Revisit only if pilot users request it. |
| Placeholder abuse mailbox domain until deploy configuration | Public footer | The production monitored address is an owner operational decision. | `TODO(owner)`: set `NEXT_PUBLIC_ABUSE_EMAIL` before public distribution. |
