import { logger } from "../lib/logger";
export function errorHandler(err, _req, res, _next) {
    logger.error({ err }, "Unhandled error");
    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
}
//# sourceMappingURL=errorHandler.js.map