// A small QR code encoder for the dashboard's group links: byte mode, error correction
// level M (about 15% of the code can be damaged), versions 1-10 (up to 213 bytes).
// Follows ISO/IEC 18004; written here to avoid a dependency for one feature.

// Per version, at level M: [EC codewords per block, group-1 blocks, data codewords each,
// group-2 blocks, data codewords each].
const BLOCKS_M: [number, number, number, number, number][] = [
  [10, 1, 16, 0, 0],
  [16, 1, 28, 0, 0],
  [26, 1, 44, 0, 0],
  [18, 2, 32, 0, 0],
  [24, 2, 43, 0, 0],
  [16, 4, 27, 0, 0],
  [18, 4, 31, 0, 0],
  [22, 2, 38, 2, 39],
  [22, 3, 36, 2, 37],
  [26, 4, 43, 1, 44],
];
const ALIGNMENT: number[][] = [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50]];

// Arithmetic in GF(256) with the QR polynomial x^8 + x^4 + x^3 + x^2 + 1.
const EXP = new Uint8Array(512);
const LOG = new Uint8Array(256);
for (let i = 0, x = 1; i < 255; i++) {
  EXP[i] = x;
  LOG[x] = i;
  x <<= 1;
  if (x & 0x100) x ^= 0x11d;
}
for (let i = 255; i < 512; i++) EXP[i] = EXP[i - 255];
const mul = (a: number, b: number) => (a && b ? EXP[LOG[a] + LOG[b]] : 0);

// Reed-Solomon error correction codewords for one block.
function reedSolomon(data: number[], degree: number): number[] {
  let gen = [1];
  for (let i = 0; i < degree; i++) {
    const next = new Array(gen.length + 1).fill(0);
    gen.forEach((g, j) => {
      next[j] ^= g;
      next[j + 1] ^= mul(g, EXP[i]);
    });
    gen = next;
  }
  const rem = new Array(degree).fill(0);
  for (const byte of data) {
    const factor = byte ^ rem.shift()!;
    rem.push(0);
    for (let i = 0; i < degree; i++) rem[i] ^= mul(gen[i + 1], factor);
  }
  return rem;
}

function codewords(bytes: Uint8Array): { version: number; words: number[] } {
  const version = BLOCKS_M.findIndex(([, b1, d1, b2, d2], i) => 4 + (i < 9 ? 8 : 16) + bytes.length * 8 <= (b1 * d1 + b2 * d2) * 8) + 1;
  if (!version) throw new Error("Text is too long for a QR code");
  const [ec, b1, d1, b2, d2] = BLOCKS_M[version - 1];
  const capacity = (b1 * d1 + b2 * d2) * 8;

  const bits: number[] = [];
  const put = (value: number, length: number) => {
    for (let i = length - 1; i >= 0; i--) bits.push((value >>> i) & 1);
  };
  put(0b0100, 4); // byte mode
  put(bytes.length, version < 10 ? 8 : 16);
  bytes.forEach((b) => put(b, 8));
  put(0, Math.min(4, capacity - bits.length));
  while (bits.length % 8) bits.push(0);
  for (let pad = 0xec; bits.length < capacity; pad ^= 0xec ^ 0x11) put(pad, 8);

  const data: number[] = [];
  for (let i = 0; i < bits.length; i += 8) data.push(bits.slice(i, i + 8).reduce((acc, bit) => (acc << 1) | bit, 0));

  const blocks: number[][] = [];
  for (let i = 0, at = 0; i < b1 + b2; i++) {
    const length = i < b1 ? d1 : d2;
    blocks.push(data.slice(at, at + length));
    at += length;
  }
  const ecBlocks = blocks.map((block) => reedSolomon(block, ec));
  const words: number[] = [];
  for (let i = 0; i < Math.max(d1, d2); i++) blocks.forEach((block) => i < block.length && words.push(block[i]));
  for (let i = 0; i < ec; i++) ecBlocks.forEach((block) => words.push(block[i]));
  return { version, words };
}

const MASKS: ((x: number, y: number) => boolean)[] = [
  (x, y) => (x + y) % 2 === 0,
  (_, y) => y % 2 === 0,
  (x) => x % 3 === 0,
  (x, y) => (x + y) % 3 === 0,
  (x, y) => (Math.floor(x / 3) + Math.floor(y / 2)) % 2 === 0,
  (x, y) => ((x * y) % 2) + ((x * y) % 3) === 0,
  (x, y) => (((x * y) % 2) + ((x * y) % 3)) % 2 === 0,
  (x, y) => (((x + y) % 2) + ((x * y) % 3)) % 2 === 0,
];

// The penalty score from the standard; the mask with the lowest score is used.
function penalty(m: boolean[][]): number {
  const size = m.length;
  let score = 0;
  const lines = [...m, ...m.map((_, x) => m.map((row) => row[x]))];
  for (const line of lines) {
    for (let i = 0; i < size; ) {
      let j = i;
      while (j < size && line[j] === line[i]) j++;
      if (j - i >= 5) score += 3 + (j - i - 5);
      i = j;
    }
    const text = line.map((d) => (d ? "1" : "0")).join("");
    for (const pattern of ["00001011101", "10111010000"]) {
      for (let at = text.indexOf(pattern); at !== -1; at = text.indexOf(pattern, at + 1)) score += 40;
    }
  }
  for (let y = 0; y < size - 1; y++) {
    for (let x = 0; x < size - 1; x++) {
      const c = m[y][x];
      if (c === m[y][x + 1] && c === m[y + 1][x] && c === m[y + 1][x + 1]) score += 3;
    }
  }
  const dark = m.flat().filter(Boolean).length;
  score += (Math.ceil(Math.abs(dark * 20 - size * size * 10) / (size * size)) - 1) * 10;
  return score;
}

// Returns the modules of a QR code for `text`, row by row (true = dark), without a quiet zone.
export function qrModules(text: string): boolean[][] {
  const { version, words } = codewords(new TextEncoder().encode(text));
  const size = version * 4 + 17;
  const base = Array.from({ length: size }, () => new Array<boolean>(size).fill(false));
  const reserved = Array.from({ length: size }, () => new Array<boolean>(size).fill(false));
  const fixed = (x: number, y: number, dark: boolean) => {
    base[y][x] = dark;
    reserved[y][x] = true;
  };

  for (let i = 0; i < size; i++) {
    fixed(6, i, i % 2 === 0);
    fixed(i, 6, i % 2 === 0);
  }
  for (const [cx, cy] of [
    [3, 3],
    [size - 4, 3],
    [3, size - 4],
  ]) {
    for (let dy = -4; dy <= 4; dy++) {
      for (let dx = -4; dx <= 4; dx++) {
        const x = cx + dx;
        const y = cy + dy;
        const d = Math.max(Math.abs(dx), Math.abs(dy));
        if (x >= 0 && x < size && y >= 0 && y < size) fixed(x, y, d !== 2 && d !== 4);
      }
    }
  }
  const align = ALIGNMENT[version - 1];
  align.forEach((cy, i) =>
    align.forEach((cx, j) => {
      const last = align.length - 1;
      if ((i === 0 && j === 0) || (i === 0 && j === last) || (i === last && j === 0)) return;
      for (let dy = -2; dy <= 2; dy++) for (let dx = -2; dx <= 2; dx++) fixed(cx + dx, cy + dy, Math.max(Math.abs(dx), Math.abs(dy)) !== 1);
    })
  );
  const drawFormat = (target: boolean[][], mask: number) => {
    const data = (0b00 << 3) | mask; // level M
    let rem = data;
    for (let i = 0; i < 10; i++) rem = (rem << 1) ^ ((rem >>> 9) * 0x537);
    const bits = ((data << 10) | rem) ^ 0x5412;
    const bit = (i: number) => ((bits >>> i) & 1) === 1;
    const set = (x: number, y: number, dark: boolean) => {
      target[y][x] = dark;
      reserved[y][x] = true;
    };
    for (let i = 0; i <= 5; i++) set(8, i, bit(i));
    set(8, 7, bit(6));
    set(8, 8, bit(7));
    set(7, 8, bit(8));
    for (let i = 9; i < 15; i++) set(14 - i, 8, bit(i));
    for (let i = 0; i < 8; i++) set(size - 1 - i, 8, bit(i));
    for (let i = 8; i < 15; i++) set(8, size - 15 + i, bit(i));
    set(8, size - 8, true);
  };
  drawFormat(base, 0); // reserves the format areas before data is placed
  if (version >= 7) {
    let rem = version;
    for (let i = 0; i < 12; i++) rem = (rem << 1) ^ ((rem >>> 11) * 0x1f25);
    const bits = (version << 12) | rem;
    for (let i = 0; i < 18; i++) {
      const dark = ((bits >>> i) & 1) === 1;
      const a = size - 11 + (i % 3);
      const b = Math.floor(i / 3);
      fixed(a, b, dark);
      fixed(b, a, dark);
    }
  }

  // Data bits, in two-column zigzags from the bottom-right corner.
  let i = 0;
  for (let right = size - 1; right >= 1; right -= 2) {
    if (right === 6) right = 5;
    for (let vert = 0; vert < size; vert++) {
      for (let j = 0; j < 2; j++) {
        const x = right - j;
        const y = ((right + 1) & 2) === 0 ? size - 1 - vert : vert;
        if (!reserved[y][x] && i < words.length * 8) {
          base[y][x] = ((words[i >>> 3] >>> (7 - (i & 7))) & 1) === 1;
          i++;
        }
      }
    }
  }

  let best: boolean[][] = base;
  let bestScore = Infinity;
  MASKS.forEach((mask, n) => {
    const candidate = base.map((row, y) => row.map((dark, x) => (reserved[y][x] ? dark : dark !== mask(x, y))));
    drawFormat(candidate, n);
    const score = penalty(candidate);
    if (score < bestScore) {
      best = candidate;
      bestScore = score;
    }
  });
  return best;
}

// An SVG path ("M x y h1 v1 h-1 z" per dark module) with a 4-module quiet zone.
export function qrSvgPath(modules: boolean[][], quiet = 4): string {
  let d = "";
  modules.forEach((row, y) => row.forEach((dark, x) => dark && (d += `M${x + quiet} ${y + quiet}h1v1h-1z`)));
  return d;
}
