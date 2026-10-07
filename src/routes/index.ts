// combine all your routes of application
// plugging all routes in one place
import { Router } from "express";
import { healthRouter } from "./health.routes";


export const apiRouter=Router();


apiRouter.use(healthRouter)