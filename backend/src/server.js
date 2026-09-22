import app from "./app/app.js";
import config from "./config/config.js";
import { connectToDB } from "./config/db.js";
await connectToDB();
app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
