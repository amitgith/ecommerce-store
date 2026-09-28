import app from "./app/app.js";
import config from "./config/config.js";
import { connectToDB } from "./config/db.js";

console.log("MONGO_URI exists:", !!config.MONGO_URI);

await connectToDB();

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
