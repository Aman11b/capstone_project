// custom migration
import fs from "node:fs";
import path from "node:path";
import { pool } from "../lib/db";
import { logger } from "../lib/logger";
const MIGRATION_DIR = path.join(process.cwd(), 'migrations');
const CREATE_MIGRATION_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS migrations(
id SERIAL PRIMARY KEY,
name VARCHAR(255) NOT NULL UNIQUE,
executed_at TIMESTAMP NOT NULL DEFAULT NOW()
)
`;
async function getExecutedMigrations() {
    const result = await pool.query("SELECT name FROM migrations ORDER BY name");
    return result.rows.map((row) => row.name);
}
function getMigrationFiles() {
    return fs
        .readdirSync(MIGRATION_DIR)
        .filter((file) => file.endsWith('sql'))
        .sort();
}
async function runMigration(fileName) {
    const sql = fs.readFileSync(path.join(MIGRATION_DIR, fileName), 'utf-8');
    const client = await pool.connect();
    try {
        await client.query("BEGIN");
        await client.query(sql);
        await client.query('INSERT INTO migrations (name) values ($1)', [fileName]);
        await client.query('COMMIT');
        logger.info(`Migration completed: ${fileName}`);
    }
    catch (error) {
        await client.query('ROLLBACK');
        throw error;
    }
    finally {
        client.release();
    }
}
async function migrate() {
    await pool.query(CREATE_MIGRATION_TABLE_SQL);
    const executed = new Set(await getExecutedMigrations());
    const pending = getMigrationFiles().filter((file) => !executed.has(file));
    if (pending.length === 0) {
        logger.info('No pending migration');
        return;
    }
    for (const fileName of pending) {
        await runMigration(fileName);
    }
    logger.info("All migration completed");
}
migrate().catch((error) => {
    logger.error({ err: error }, 'Migration Failed');
    process.exit(1);
}).finally(() => {
    pool.end();
});
//# sourceMappingURL=migrate.js.map