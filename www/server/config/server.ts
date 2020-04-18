import typeorm from "./packages/typeorm";
import mailer from "./packages/mailer";
import multer from "./packages/multer";

export default {
    rootDir: "src",
    acceptMimes: [
        "application/json",
        "multipart/form-data"
    ],
    port: 3000,
    logger: {
        debug: false,
        logRequest: false,
        requestFields: ["body", "reqId", "method", "url", "headers", "query", "params", "duration"]
    },
    mount: {
        "/": "src/Controllers/**/*Controller.ts"
    },
    statics: {
        "/": "public"
    },
    componentsScan: [
        "src/Middlewares/**/*Middleware.ts",
        "src/Services/**/*Service.ts",
        "src/Converters/**/*Converter.ts",
        "src/Protocols/**/*Protocol.ts"
    ],
    cors: {
        origin: /localhost/,
        credentials: true
    },
    viewsDir: "templates/Views",
    viewEngine: "twig",
    ajv: {
        errorFormat: (error) => `At ${error.modelName}${error.dataPath}, value '${error.data}' ${error.message}`,
        options: {verbose: true}
    },
    passport: {},
    uploadDir: "public/media",
    multer: multer,
    swagger: [
        {
            path: "/docs"
        }
    ],
    converter: {
      additionalProperties: "ignore" as const
    },
    socketIO: {
        path: "/socket.io",
        serveClient: true
    },
    typeorm: [
        {
            name: "default",
            ...typeorm
        }
    ],
    mailer: mailer
}
