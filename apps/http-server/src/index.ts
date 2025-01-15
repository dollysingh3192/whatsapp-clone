import { log } from "@repo/logger";
import { createServer } from "./server";
import router from "./routes/index";

const port = process.env.PORT || 5001;
const server = createServer();

server.use("/api/v1", router);

server.listen(port, () => {
  log(`api running on ${port}`);
});
