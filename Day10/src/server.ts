import app from "./app";
import { config } from "./config/config";

const PORT = Number(config.port);

app.listen(PORT, () => {
  console.log(`
=================================
User Contact Book API Started
Environment: ${config.nodeEnv}
Port: ${PORT}
=================================
`);
});