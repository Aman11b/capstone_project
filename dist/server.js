import { env } from "./config/env";
import { createApp } from "./app";
import { logger } from "./lib/logger";
console.log("Hello from TypeScript!");
// Main root file
const app = createApp();
app.listen(env.port, () => {
    logger.info(`Server is now running on port http://localhost:${env.port}`);
});
//# sourceMappingURL=server.js.map