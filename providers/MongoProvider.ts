import Env from "@ioc:Adonis/Core/Env";
import { ApplicationContract } from "@ioc:Adonis/Core/Application";
import { Mongoose } from "mongoose";

export default class MongoProvider {
  constructor(protected app: ApplicationContract) {}

  public register() {
    const mongoose = new Mongoose();

    mongoose.connect(
      `mongodb://${Env.get("MONGO_HOST")}/${Env.get("MONGO_DATABASE")}`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
      }
    );

    this.app.container.singleton("Mongoose", () => mongoose);
  }

  public async boot() {
    // All bindings are ready, feel free to use them
  }

  public async ready() {
    // App is ready
  }

  public async shutdown() {
    await this.app.container.use("Mongoose").disconnect();
  }
}
