import { app } from "./app.ts";

const PORT = process.env.PORT || 5000;
const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log("Listening to PORT 5000");
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
