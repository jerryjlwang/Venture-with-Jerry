<claude-mem-context>
# Memory Context

# [Venture-with-Jerry] recent context, 2026-04-23 3:05pm PDT

Legend: 🎯session 🔴bugfix 🟣feature 🔄refactor ✅change 🔵discovery ⚖️decision
Format: ID TIME TYPE TITLE
Fetch details: get_observations([IDs]) | Search: mem-search skill

Stats: 22 obs (6,812t read) | 119,705t work | 94% savings

### Apr 19, 2026
89 8:19a 🔵 Venture-with-Jerry project dependency inventory
91 " 🔵 Venture-with-Jerry public/videos contains large unused video files
92 " 🔵 Venture-with-Jerry shadcn/ui component usage audit
94 8:22a 🔵 src/assets/ contains ~50 orphaned golf/game images not referenced anywhere
95 " 🔵 Venture-with-Jerry unused npm dependencies identified — 7 packages removable
97 8:24a ✅ Deleted 17MB of unused video files and 44MB of orphaned src/assets images
98 " ✅ Deleted 37 unused shadcn/ui component files and 2 unused hooks
99 " 🔵 Venture-with-Jerry file structure and asset inventory
100 " ✅ Venture-with-Jerry unused assets and UI components deleted
102 8:25a 🔴 use-toast.ts accidentally deleted — restored from git history
103 " 🔵 Venture-with-Jerry bun install removed 32 packages post-cleanup
S32 Remove the mission section from the Venture-with-Jerry home page (Apr 19 at 8:25 AM)
S31 Remove unused dependencies and assets affecting performance in Venture-with-Jerry (Apr 19 at 8:25 AM)
104 8:29a ✅ Venture-with-Jerry dev server started
105 8:30a ✅ Mission section removed from Venture-with-Jerry home page
106 " 🔵 Venture-with-Jerry Home.tsx structure — mission section location identified
108 8:32a 🔴 TypewriterText animation — letter position instability bug identified
110 " 🔵 TypewriterText.tsx current implementation — existing layout-stability attempt
111 8:35a 🔵 Venture-with-Jerry typewriter animation system — full code audit
113 8:37a 🔴 TypewriterText.tsx rewritten — per-character color reveal fixes position drift
114 8:38a ✅ Venture-with-Jerry build passes after TypewriterText rewrite
115 8:41a 🔵 TypewriterText layout shift bug — multi-line text reflows during animation
117 8:53a 🔴 TypewriterText cursor changed to absolute-positioned ::before pseudo-element to fix line-wrap reflow
119 " ✅ Typewriter cursor color driven by CSS custom property --tw-cursor instead of currentColor
S34 Venture-with-Jerry TypewriterText line-wrap reflow bug — cursor causes words to jump between lines during animation (Apr 19 at 8:53 AM)
**Investigated**: TypewriterText.tsx component structure and the previous cursor implementation (inline-block span with width:0, overflow:visible rendering the "|" glyph). Identified that atomic inline elements at zero width still create soft-wrap opportunities in CSS inline formatting, which was the root cause of the line-jump bug.

**Learned**: CSS treats every atomic inline element (including zero-width inline-block spans) as a valid soft-wrap point. The browser's line-breaking algorithm sees the cursor span and can break there, causing words to appear on the wrong line mid-animation. Absolutely-positioned pseudo-elements are entirely outside the inline flow and are invisible to the line-breaking algorithm, giving stable wrapping throughout the animation. `getComputedStyle` on mount can capture inherited text color before individual char spans override it with `color: transparent`, enabling the pseudo-element to use the correct color via a CSS custom property.

**Completed**: 1. Rewrote TypewriterText.tsx — removed Fragment+inline-block cursor approach; cursor is now a `.typewriter-cursor` class applied to the char span at currentIndex.
    2. Added `.typewriter-cursor` and `.typewriter-cursor::before` rules to src/index.css — pseudo-element is position:absolute, 2px wide, 0.8em tall, outside inline flow.
    3. Cursor color driven by `var(--tw-cursor, white)` CSS custom property; TypewriterText sets `--tw-cursor` via `useLayoutEffect` + `getComputedStyle` on mount.
    4. End-of-text keepCursorAfterComplete cursor uses a zero-width space (U+200B) to anchor the absolute pseudo-element without affecting layout.
    5. Build verified clean — no TypeScript errors, built in 2.68s.

**Next Steps**: Build is clean and the fix is complete. Likely next step is visual verification in the dev server (hero section typewriter animation) to confirm words no longer jump between lines during playback.


Access 120k tokens of past work via get_observations([IDs]) or mem-search skill.
</claude-mem-context>