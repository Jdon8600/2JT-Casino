import mongoose, { ConnectOptions } from "mongoose";

export async function mongooseConnect() {
  const uri: string = process.env.MONGODB_URI!;
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection.asPromise();
  } else {
    return await mongoose.connect(uri, {
      dbName: "Ecommerce",
    } as ConnectOptions).then((res) => {
      console.log(
        'Connected to Distribution API Database - Initial Connection'
      );
    })
    .catch((err) => {
      console.log(
        `Initial Distribution API Database connection error occured -`,
        err
      );
    });;
  }
}
