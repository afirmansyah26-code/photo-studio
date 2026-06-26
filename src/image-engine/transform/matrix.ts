export interface Point {
  x: number;
  y: number;
}

export interface Matrix {
  a: number; c: number; e: number;
  b: number; d: number; f: number;
}

/**
 * Creates an identity matrix
 */
export function identity(): Matrix {
  return { a: 1, c: 0, e: 0, b: 0, d: 1, f: 0 };
}

/**
 * Multiplies two matrices: m1 * m2
 */
export function multiply(m1: Matrix, m2: Matrix): Matrix {
  return {
    a: m1.a * m2.a + m1.c * m2.b,
    c: m1.a * m2.c + m1.c * m2.d,
    e: m1.a * m2.e + m1.c * m2.f + m1.e,
    b: m1.b * m2.a + m1.d * m2.b,
    d: m1.b * m2.c + m1.d * m2.d,
    f: m1.b * m2.e + m1.d * m2.f + m1.f,
  };
}

/**
 * Creates a translation matrix
 */
export function translate(x: number, y: number): Matrix {
  return { a: 1, c: 0, e: x, b: 0, d: 1, f: y };
}

/**
 * Creates a scaling matrix
 */
export function scale(s: number): Matrix {
  return { a: s, c: 0, e: 0, b: 0, d: s, f: 0 };
}

/**
 * Creates a rotation matrix (angle in degrees)
 */
export function rotate(degrees: number): Matrix {
  const rad = (degrees * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return { a: cos, c: -sin, e: 0, b: sin, d: cos, f: 0 };
}

/**
 * Inverts a matrix
 */
export function invert(m: Matrix): Matrix {
  const det = m.a * m.d - m.c * m.b;
  if (det === 0) return identity(); // fallback
  return {
    a: m.d / det,
    c: -m.c / det,
    e: (m.c * m.f - m.d * m.e) / det,
    b: -m.b / det,
    d: m.a / det,
    f: (m.b * m.e - m.a * m.f) / det,
  };
}

/**
 * Transforms a point by a matrix
 */
export function transformPoint(m: Matrix, p: Point): Point {
  return {
    x: m.a * p.x + m.c * p.y + m.e,
    y: m.b * p.x + m.d * p.y + m.f,
  };
}
