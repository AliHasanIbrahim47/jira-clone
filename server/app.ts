import configureOpenAPI from "~/lib/configure-open-api";
import createApp from "~/lib/create-app";
import index from "~/routes/index.route";
import tasks from "~/routes/tasks/tasks.index";

const app = createApp();

configureOpenAPI(app);

const _app = app
  .route("/", index)
  .route("/", tasks);

export type AppType = typeof _app;

export default app;
