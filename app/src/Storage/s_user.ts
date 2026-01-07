import { Elysia } from "elysia";

export const userStorage = new Elysia()
    .state('userStorage', ['init']);