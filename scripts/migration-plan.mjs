/**
 * Return migrations that are present in the bundled migration set but have not
 * yet been recorded in the database.
 *
 * Vite's import.meta.glob returns absolute-style keys such as
 * "/migrations/0001_initial.sql". The database stores only the migration
 * filename, which keeps the bookkeeping stable if the source directory moves.
 */
export function pendingMigrations(paths = [], applied = []) {
  const appliedSet = new Set(applied);
  return paths
    .map((path) => ({
      path,
      name: path.split("/").pop(),
    }))
    .filter(({ name }) => name && !appliedSet.has(name))
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }));
}
