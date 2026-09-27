import { TABLES } from "@/lib/catalog";

type Row = Record<string, unknown>;

function cloneTable(name: string): Row[] {
  const rows = (TABLES[name] ?? []) as Row[];
  return rows.map((r) => ({ ...r }));
}

class Query {
  private rows: Row[];
  constructor(table: string) {
    this.rows = cloneTable(table);
  }
  select(_cols?: string) {
    return this;
  }
  order(key: string, opts?: { ascending?: boolean }) {
    const dir = opts?.ascending === false ? -1 : 1;
    this.rows.sort((a, b) => {
      const av = a[key];
      const bv = b[key];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
    return this;
  }
  eq(key: string, value: unknown) {
    this.rows = this.rows.filter((r) => r[key] === value);
    return this;
  }
  async maybeSingle() {
    return { data: this.rows[0] ?? null, error: null };
  }
  async single() {
    const row = this.rows[0];
    if (!row) return { data: null, error: { message: "not found" } };
    return { data: row, error: null };
  }
  then<TResult1 = { data: Row[]; error: null }, TResult2 = never>(
    onfulfilled?: ((value: { data: Row[]; error: null }) => TResult1 | PromiseLike<TResult1>) | null,
    onrejected?: ((reason: unknown) => TResult2 | PromiseLike<TResult2>) | null,
  ) {
    return Promise.resolve({ data: this.rows, error: null }).then(onfulfilled, onrejected);
  }
}

export const supabase = {
  from(table: string) {
    return new Query(table);
  },
  auth: {
    async getSession() {
      return { data: { session: null }, error: null };
    },
    onAuthStateChange() {
      return { data: { subscription: { unsubscribe() {} } } };
    },
    async signOut() {
      return { error: null };
    },
  },
};
