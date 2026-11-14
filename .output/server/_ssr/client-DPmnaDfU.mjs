import { u as TABLES } from "./catalog-Du59BVWX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-DPmnaDfU.js
function cloneTable(name) {
	return (TABLES[name] ?? []).map((r) => ({ ...r }));
}
var Query = class {
	rows;
	constructor(table) {
		this.rows = cloneTable(table);
	}
	select(_cols) {
		return this;
	}
	order(key, opts) {
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
	eq(key, value) {
		this.rows = this.rows.filter((r) => r[key] === value);
		return this;
	}
	async maybeSingle() {
		return {
			data: this.rows[0] ?? null,
			error: null
		};
	}
	async single() {
		const row = this.rows[0];
		if (!row) return {
			data: null,
			error: { message: "not found" }
		};
		return {
			data: row,
			error: null
		};
	}
	then(onfulfilled, onrejected) {
		return Promise.resolve({
			data: this.rows,
			error: null
		}).then(onfulfilled, onrejected);
	}
};
var supabase = {
	from(table) {
		return new Query(table);
	},
	auth: {
		async getSession() {
			return {
				data: { session: null },
				error: null
			};
		},
		onAuthStateChange() {
			return { data: { subscription: { unsubscribe() {} } } };
		},
		async signOut() {
			return { error: null };
		}
	}
};
//#endregion
export { supabase as t };
