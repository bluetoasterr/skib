/* Experimental proof of concept; unverified on Discord 305.1 PTB.
 * Does not modify server roles or other users' clients.
 */
const api = globalThis.vendetta;
const settings = {
  enabled: true,
  username: 'CHANGE_ME',
  icon: '✦',
  start: '#ff66cc',
  end: '#9966ff'
};
let unpatch = () => {};
function parseHex(hex) {
  const value = parseInt(hex.replace('#', ''), 16);
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255];
}
function interpolate(a, b, t) {
  return '#' + a.map((v, i) => Math.round(v + (b[i] - v) * t).toString(16).padStart(2, '0')).join('');
}
function start() {
  const React = api?.metro?.findByProps?.('createElement', 'cloneElement');
  const RN = api?.metro?.findByProps?.('Text', 'View');
  if (!React?.createElement || !RN?.Text || !api?.patcher?.instead) {
    console.warn('[GlobalRoleStyle] No compatible renderer hook found');
    return;
  }
  unpatch = api.patcher.instead('createElement', React, (args, original) => {
    const [type, props, ...children] = args;
    if (!settings.enabled || type !== RN.Text || children.length !== 1 ||
        children[0] !== settings.username || props?.__globalRoleStyled) return original(...args);
    const chars = Array.from(settings.username);
    const a = parseHex(settings.start), b = parseHex(settings.end);
    const styled = chars.map((ch, i) => original(RN.Text, {
      key: i, style: { color: interpolate(a, b, i / Math.max(chars.length - 1, 1)) }
    }, ch));
    return original(type, { ...props, __globalRoleStyled: true },
      ...(settings.icon ? [settings.icon + ' ', ...styled] : styled));
  });
}
function stop() { unpatch(); unpatch = () => {}; }
module.exports = { onLoad: start, onUnload: stop, start, stop };
