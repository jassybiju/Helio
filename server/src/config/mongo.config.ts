import mongoose from "mongoose";

export async function connectDB() {
  try {
    const mongoMode = process.env.MONGO_MODE;
    let uri;

    if (mongoMode == "atlas") {
      uri = process.env.ATLAS_MONGO_URI as string;
    } else {
      uri = process.env.LOCAL_MONGO_URI as string;
    }

    console.log(uri);
    await mongoose.connect(uri, { autoIndex: true });
    console.log("Mongoose connected succesfully");
  } catch (error) {
    console.error("Cannot connect to mongodb", error);
  }
}
