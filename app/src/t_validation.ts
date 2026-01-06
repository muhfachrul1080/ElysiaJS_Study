import { Elysia, t } from "elysia";

// Alternatively, Elysia support Standard Schema, allowing you to use a library of your choice like zod, yup or valibot.
// import {z} from "zod";

export const Validation = new Elysia ({prefix : 'validation'})
    // Schema is what we define rules for our validation think of it as Security Guard for the API
    .post('/smAdding', ({body : {id, name, playable}, status}) => {
        return {
           body : {id, name, playable},
           message : status(200, 'OK')
        }
    },{
        body : t.Object({
            name : t.String(),
            id : t.Number(),
            playable : t.Boolean()
        })
    }) //  Validation or we call it now Schema, this Schema only for this method if u want to use validation to other method use GUARD)

    .get('/getWhatWeAdd/:id?', ({params : {id}}) => {
        return `You are viewing this data with ${id}`;
    },{params : t.Object({id : t.Numeric()})})

    // .post('/valUsingOtherLibrary', ({body : {name, age}}) => {
    //     return {data : {name, age}}
    // }, {
    //     body : z.Object({
    //         name : z.String(),
    //         age : z.Number(),
    //     })
    // })

    // Response validation, Response validation is a "QC" check for the API it ensures the data that leave is up to what clients want.. and cannot be change or edited
    .get('/responseValidation', () => {
        return {
            idAcc : 12,
            username : "Persuvian",
            timeattack : 240,
            grade : "A",
            chalengge : "12A"
        }
    }, 
    {
        response: {
            200: t.Object({
                idAcc : t.Number(),
                username : t.String(),
                timeattack : t.Number(),
                grade : t.String(),
                chalengge : t.Literal('12A')
            }),
            418: t.Object({
                message: t.Literal("I'm a teapot")
            })
        }
    }
    )

   
    