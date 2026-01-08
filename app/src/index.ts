import { Elysia } from "elysia";

// P
import {P_profile} from "./Sidequest/p_profile"

// T
import {Routing} from "./t_routing";
import {Handler} from "./t_handler";
import {Validation} from "./t_validation";
import {Hooks} from "./t_hook";
import {Guard} from "./t_guard";
import {Plugin} from "./t_plugin";
import {Encapsulation} from "./t_encapsulation";
import {Cookies} from "./t_cookies";
import { HandlingError } from "./t_error";

const app = new Elysia()

  .use(HandlingError)

// Define cookies
  .use(Cookies)

  .get("/", ({cookie: {visit, ui_settings}}) => {

    return `You've Visited this site ${visit.value}`

  })

  // P
  .use(P_profile)

  // T
  .use(Routing)
  .use(Plugin)
  .use(Handler)
  .use(Validation)
  .use(Hooks)
  .use(Guard)
  .use(Encapsulation)
  
  
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
