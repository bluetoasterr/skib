# Global Role Style (experimental)

Proof-of-concept source for a **client-only** Kettu/Vendetta iOS username gradient and icon.

**Not a confirmed working plugin.** The renderer hook has not been validated against Discord 305.1 PTB, and it may never intercept the username component. There is no settings UI or persistence. The icon is a Unicode symbol, not a Discord role badge.

## Configuration

Edit the `settings` object at the top of `index.js` to replace `CHANGE_ME` with your exact Discord username and choose your two hex colors and icon.

## Upload to GitHub

Extract the ZIP, then upload `index.js`, `manifest.json`, and `README.md` to the root of your GitHub repository. GitHub Pages hosting alone does not guarantee Kettu can load this source; actual plugin compatibility still needs testing.

This does not change Discord roles or affect how anyone else sees your account.
