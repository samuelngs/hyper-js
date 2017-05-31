
export function sta(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for ( let i = 0; i < s.length; i++ ) {
    view[i] = s.charCodeAt(i);
  }
  return view;
}

export function ltba(num) {
  let tmp = num;
  const buf = new ArrayBuffer(8);
  const view = new Uint8Array(buf);
  for ( let i = 0; i < buf.byteLength; i++ ) {
    const b = tmp & 0xff;
    view[i] = b;
    tmp = (tmp - b) / 256;
  }
  return buf;
}

export function encode({ T, N, C, M }) {
  const head = sta(`[${T}][${N}][${C}]`);
  return head;
}

export function decode(b) {
}
