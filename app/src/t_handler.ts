import { Elysia } from "elysia";

export const Handler = new Elysia ({prefix : 'handlerTry'})
    // Handling the GET Method 
    .get('/handlingGet/:id?', ({params : {id}}) => {return `This is Handling the get method, u are sending through URL ${id}`})

    // Handling POST Method 
    .post('/handlingPost', ({body, headers, set, status}) => {
        set.headers ['x-powered-by'] = 'Elysia';

        return {
            data : body,
            message : status(418, 'I\'m a teapot')
        }
    })

    // Handling GET Method and Redirect it to somewhere
    .get('/handlingRedirect', ({redirect}) => {redirect('https://github.com/muhfachrul1080/ElysiaJS_Study')})