import configureOpenAPI from "~/lib/configure-open-api";
import createApp from "~/lib/create-app";
import auth from "~/routes/auth/auth.index";
import index from "~/routes/index.route";
import tasks from "~/routes/tasks/tasks.index";

const app = createApp();

configureOpenAPI(app);

const _app = app
  .route("/", index)
  .route("/", tasks)
  .route("/", auth);

export type AppType = typeof _app;

export default app;
