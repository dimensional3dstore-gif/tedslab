import { n as TSS_SERVER_FUNCTION, t as createServerFn } from "./ssr.mjs";
import processModule from "node:process";
import { promisify } from "node:util";
//#region node_modules/.nitro/vite/services/ssr/assets/deploy-Bg9x4HR9.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
/* @__NO_SIDE_EFFECTS__ */
function createNotImplementedError(name) {
	return /* @__PURE__ */ new Error(`[unenv] ${name} is not implemented yet!`);
}
/* @__NO_SIDE_EFFECTS__ */
function notImplemented(name) {
	const fn = () => {
		throw /* @__PURE__ */ createNotImplementedError(name);
	};
	return Object.assign(fn, { __unenv__: true });
}
var execFileAsync = promisify(/* @__PURE__ */ notImplemented("child_process.execFile"));
var deployWebsite_createServerFn_handler = createServerRpc({
	id: "3100e7ac1e04ef4e3a7a8d4b5bf203e98c3341e32723c505fc8616ff3e66639c",
	name: "deployWebsite",
	filename: "src/lib/deploy.ts"
}, (opts) => deployWebsite.__executeServer(opts));
var deployWebsite = createServerFn({ method: "POST" }).handler(deployWebsite_createServerFn_handler, async () => {
	const cwd = processModule.cwd();
	try {
		await execFileAsync("npm", ["run", "build:prod"], {
			cwd,
			env: processModule.env,
			shell: true
		});
		await execFileAsync(processModule.env.DEPLOY_COMMAND || "npm run preview -- --host 0.0.0.0", {
			cwd,
			env: processModule.env,
			shell: true
		});
		return {
			success: true,
			message: "Production build and local deployment command completed successfully.",
			url: processModule.env.SITE_URL || "http://localhost:4173"
		};
	} catch (error) {
		const message = error instanceof Error ? error.message : "Unknown deployment error";
		throw new Error(`Deploy failed: ${message}`);
	}
});
//#endregion
export { deployWebsite_createServerFn_handler };
