# V3 approved horizontal logo integration

## Source of truth

The approved source is `references/JIWA FIGHTER Horizontal Logo Lockup.png` (2020 × 779 RGBA). Its visible alpha bounds are `(77,117)–(1911,678)`. Cropping only transparent padding gives an 1834 × 561 image at 3.27:1. It contains the JF mark on the left and the two-line wordmark on the right. No geometry or typography was redrawn.

`references/user-approved-logo-master.jpg` and the older black/white stacked marks are not the V3 horizontal website lockup. V3 derives tint variants from the approved source alpha only.

## Integration

- `scripts/v3-logo-variants.py` crops the transparent margins and derives white, brass and dark PNG variants without changing alpha geometry.
- The header uses `public/assets/brand/logo-horizontal-white.png`; the footer uses `public/assets/brand/logo-horizontal-brass.png`.
- Both surfaces preserve the 3.27:1 intrinsic ratio. Header sizes are responsive; the footer width is 190–205 px.
- The source alpha and generated white variant were compared directly and matched exactly.

## Render verification

The production-browser E2E capture checks the header image on all nine routes at 1536 × 1024. Desktop, mobile, footer crop and real footer page-context screenshots are stored in `tests/v3/logo-comparison/`. `desktop-source-vs-render.jpg`, `mobile-source-vs-render.jpg` and `footer-source-vs-render.jpg` compare the approved silhouette against browser pixels. The footer composite uses the actual footer surface color `#141619`.

These captures establish silhouette, tint and aspect-ratio checks at the tested browser sizes. They do not establish device-wide raster sharpness or an independent physical-device test.
