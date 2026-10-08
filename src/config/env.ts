import dotenv from "dotenv";

dotenv.config();

function checkRequiredEnvironmentVariables(key:string):string{
    const value=process.env[key]

    if(!value){
        throw new Error(`Missing env variable for ${key}`)
    }

    return value
}

export const env={
    port:Number(process.env.PORT ?? 4000),
    isProduction:(process.env.NODE_ENV ?? "development")==="production",
    nodeEnv:process.env.NODE_ENV ?? "development",
    logLevel:process.env.LOG_LEVEL ?? "info",
    databaseUrl:checkRequiredEnvironmentVariables('DATABASE_URL'),
    jwtAccessSecret:checkRequiredEnvironmentVariables('JWT_SECRET'),
    jwtAccessExpiresIn:checkRequiredEnvironmentVariables('JWT_ACCESS_EXPIRES_IN')
} as const;


