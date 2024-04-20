import connectDB from "./src/db/index.js";
import { app } from "./app.js";

connectDB()
  .then(() => {
    app.listen(3000 || 8000, () => {
      console.log(`⚙️ Server is running at port : 3000`);
    });
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });

export { app };
