import { Elysia, t } from "elysia";
import { userStorage } from "../Storage/s_user";

// Security and Checker
const validation = new Elysia()
    .guard({
        as : 'scoped',
        body : t.Object({
            name : t.String(),
            age : t.Number(),
            profession : t.String(),
            phone : t.Optional(t.String())
        })
    })

const checkingAge = new Elysia()
    .onBeforeHandle({as:'scoped'},({body: {age}}, status) => {
        if(age < 18) {
            return {
                status : status(401),
                message : "Still a Child so No"
            }
        } 
    })

const processing = ({log = false}) => new Elysia()

    .use(validation)
    .use(checkingAge)

    // Adding
    .post('/addProfile',
        ({body: {name, age, profession, phone}, status, store}) => {

            const profile = {
                name : name,
                age : age,
                asWorker : profession,
                phone : phone
            }

            // console.log(store)
            store.userStorage.push(profile)
            console.log(store.userStorage)

            return {
                status: status(200, "Ok"),
                data : store.userStorage
            }
        }
    )

    .patch('/editProfile/:id', 
        ({params, body: {name, age, profession, phone}, status, store}) => {

            store.userStorage[params.id].name = name;
            store.userStorage[params.id].age = age;
            store.userStorage[params.id].asWorker = profession;
            store.userStorage[params.id].phone = phone;

            return status(200)
        }
    )

export const P_profile = new Elysia({prefix: 'profile'})

    // Get the storage
    .use(userStorage)

    // Processing
    .use(processing(true))
    
    .get('/:id', ({params, store, status}) => {

        const profile = store.userStorage[params.id]
        if(!profile) {
            return status(404)
        }

        return {
            message : `
                This Your Profile Page, Mrs ${profile.name}
                name : ${profile.name},
                age : ${profile.age}
                working as : ${profile.asWorker},

                and u have phone number with ${profile.phone}
            `
        }
    })

    .get('/', () => {
        return 'This is Profile Page'
    })