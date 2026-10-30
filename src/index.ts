import { storage } from '@vendetta/plugin';
import Settings from './Settings';

// Appearance is strictly local. Rendering patches for Discord 305.1 PTB
// must be validated separately: this plugin does not modify server roles.
export default {
  onLoad() {
    storage.enabled ??= true;
    storage.start ??= '#ff66cc';
    storage.end ??= '#9966ff';
    storage.iconColor ??= '#ffffff';
    storage.icon ??= '✦';
    storage.emojiId ??= '';
  },
  onUnload() {},
  settings: Settings,
};
