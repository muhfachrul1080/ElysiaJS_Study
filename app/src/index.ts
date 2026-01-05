import { Elysia } from "elysia";
import {Routing} from "./t_routing";

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(Routing)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
