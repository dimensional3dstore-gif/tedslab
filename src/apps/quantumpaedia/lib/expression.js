/* Tiny recursive-descent expression evaluator — no eval, no dynamic code. */

const FUNCS = {
  sin: Math.sin,
  cos: Math.cos,
  tan: Math.tan,
  asin: Math.asin,
  acos: Math.acos,
  atan: Math.atan,
  sinh: Math.sinh,
  cosh: Math.cosh,
  tanh: Math.tanh,
  exp: Math.exp,
  ln: Math.log,
  log: Math.log10,
  sqrt: Math.sqrt,
  abs: Math.abs,
  sign: Math.sign
};

const CONSTS = { pi: Math.PI, e: Math.E, tau: Math.PI * 2 };

function tokenize(input) {
  const tokens = [];
  let i = 0;
  while (i < input.length) {
    const ch = input[i];
    if (/\s/.test(ch)) {
      i += 1;
      continue;
    }
    if (/[0-9.]/.test(ch)) {
      let num = '';
      while (i < input.length && /[0-9.]/.test(input[i])) {
        num += input[i];
        i += 1;
      }
      tokens.push({ type: 'num', value: Number(num) });
      continue;
    }
    if (/[a-zA-Z_]/.test(ch)) {
      let name = '';
      while (i < input.length && /[a-zA-Z_0-9]/.test(input[i])) {
        name += input[i];
        i += 1;
      }
      tokens.push({ type: 'ident', value: name.toLowerCase() });
      continue;
    }
    if ('+-*/^()'.includes(ch)) {
      tokens.push({ type: ch });
      i += 1;
      continue;
    }
    throw new Error(`Unexpected character “${ch}”`);
  }
  return tokens;
}

export function evaluate(expression, x = 0) {
  const tokens = tokenize(expression);
  let pos = 0;

  const peek = () => tokens[pos];
  const eat = (type) => {
    if (peek()?.type === type) {
      pos += 1;
      return true;
    }
    return false;
  };

  function parseExpr() {
    let value = parseTerm();
    for (;;) {
      if (eat('+')) value += parseTerm();
      else if (eat('-')) value -= parseTerm();
      else return value;
    }
  }

  function parseTerm() {
    let value = parseFactor();
    for (;;) {
      if (eat('*')) value *= parseFactor();
      else if (eat('/')) value /= parseFactor();
      else if (peek()?.type === 'num' || peek()?.type === 'ident' || peek()?.type === '(') {
        value *= parseFactor();
      } else return value;
    }
  }

  function parseFactor() {
    const base = parseUnary();
    if (eat('^')) return Math.pow(base, parseFactor());
    return base;
  }

  function parseUnary() {
    if (eat('-')) return -parseUnary();
    if (eat('+')) return parseUnary();
    return parsePrimary();
  }

  function parsePrimary() {
    const token = peek();
    if (!token) throw new Error('Unexpected end of expression');
    if (token.type === 'num') {
      pos += 1;
      return token.value;
    }
    if (token.type === 'ident') {
      pos += 1;
      const name = token.value;
      if (eat('(')) {
        const arg = parseExpr();
        if (!eat(')')) throw new Error('Missing closing parenthesis');
        const fn = FUNCS[name];
        if (!fn) throw new Error(`Unknown function “${name}”`);
        return fn(arg);
      }
      if (name === 'x') return x;
      if (name in CONSTS) return CONSTS[name];
      if (FUNCS[name]) return FUNCS[name](x);
      throw new Error(`Unknown identifier “${name}”`);
    }
    if (eat('(')) {
      const value = parseExpr();
      if (!eat(')')) throw new Error('Missing closing parenthesis');
      return value;
    }
    throw new Error('Unexpected token in expression');
  }

  const result = parseExpr();
  if (pos !== tokens.length) throw new Error('Trailing characters in expression');
  return result;
}

export function sampleFunction(expression, xMin, xMax, steps = 400) {
  const points = [];
  for (let i = 0; i < steps; i += 1) {
    const x = xMin + (i / (steps - 1)) * (xMax - xMin);
    try {
      const y = evaluate(expression, x);
      points.push({ x, y: Number.isFinite(y) ? y : null });
    } catch {
      points.push({ x, y: null });
    }
  }
  return points;
}