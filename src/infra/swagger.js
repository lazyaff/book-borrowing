import swaggerUi from "swagger-ui-express";
import fs from "fs";

const setupSwagger = (app) => {
    fs.readFile("./swagger.json", "utf8", (err, data) => {
        if (err) {
            console.error("Error reading swagger file:", err);
            return;
        }

        const swaggerDocument = JSON.parse(data);

        app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    });
};

export default setupSwagger;
