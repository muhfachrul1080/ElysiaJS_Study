import { Elysia } from "elysia";

export const Routing = new Elysia({prefix : 'routeList'})
    .get('/', () => {return 'Route Here'})
    .get('/about', () => {return 'This is About Page'})