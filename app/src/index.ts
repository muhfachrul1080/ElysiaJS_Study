import { Elysia } from "elysia";
import {Routing} from "./t_routing";
import {Handler} from "./t_handler";
import {Validation} from "./t_validation";
import {Hooks} from "./t_hook";
import {Guard} from "./t_guard";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(Routing)
  .use(Handler)
  .use(Validation)
  .use(Hooks)
  .use(Guard)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
