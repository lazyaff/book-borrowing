import * as dotenv from "dotenv";
import createServer from "./infra/server.js";

// create server
const app = createServer();

// start server
dotenv.config();
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
