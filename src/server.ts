import customExpress from "./config/customExpress";
import { databaseClient, config } from "./config";
import Logging from "./library/Logging";

const { port } = config.server;
const app = customExpress();

databaseClient
  .$connect()
  .then(() => {
    Logging.info("Connected to Database.");
    app.listen(port, () =>
      Logging.info(`Server listening on http://localhost:${port}`)
    );
  })
  .catch((error) => {
    Logging.error("Unable to connect: ");
    Logging.error(error);
    process.exit(1);
  });
