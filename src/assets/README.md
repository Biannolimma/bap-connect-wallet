# Assets Directory

This directory contains static assets for the PlaySafe extension.

## Required Assets

### Icons
The extension requires icons in multiple sizes for different contexts:

- `icon-16.png` - Small icon for browser UI (16x16px)
- `icon-32.png` - Medium icon for browser UI (32x32px)
- `icon-48.png` - Toolbar icon (48x48px)
- `icon-128.png` - Extension store listing (128x128px)

### Recommended Sizes
- All icons should be PNG format
- Use transparent backgrounds
- Follow the PlaySafe brand guidelines focused on security
- Primary color: #2563eb (Blue Security)
- Secondary color: #10b981 (Green Trust)
- Accent color: #7c3aed (Purple NFX)

### Logo
- `logo.png` - Full logo with text
- `logo-icon.png` - Icon-only version

### Tokens
Token icons should be stored in the `tokens/` subdirectory:
- `bap.png` - BAP token icon
- `nfx.png` - NFX token icon

## Image Guidelines

1. **Format**: Use PNG for icons and logos with transparency
2. **Size**: Follow the exact pixel dimensions specified
3. **Quality**: Use high-resolution images (2x) for retina displays
4. **Branding**: Maintain consistent visual identity across all assets
5. **Optimization**: Compress images to reduce extension size

## Creating Icons

You can use tools like:
- Figma or Sketch for design
- ImageMagick for resizing: `convert logo.png -resize 16x16 icon-16.png`
- Online tools like [RealFaviconGenerator](https://realfavicongenerator.net/)

## Placeholder Assets

For development, you can generate placeholder icons using:

```bash
# Create solid color placeholders
convert -size 16x16 xc:#2563eb icon-16.png
convert -size 32x32 xc:#2563eb icon-32.png
convert -size 48x48 xc:#2563eb icon-48.png
convert -size 128x128 xc:#2563eb icon-128.png
```

## Future Assets

Consider adding:
- Promotional images for extension stores
- Screenshots for documentation
- Background images for splash screens
- Animated icons for notifications
