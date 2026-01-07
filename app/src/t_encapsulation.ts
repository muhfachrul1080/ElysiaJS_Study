import { Elysia, t } from "elysia";

// Encapsulation adalah konsep pembungkus.. bayangkan elysia instance (const .... new elysia) kayak div di HTML.. nah
// tiap instance memiliki encapsulation sendiri.. jadi mereka tidak berbagi Schema, hook dsb diantara instance
const instanceOne = new Elysia()

    // Guard
    .guard({
        // as : 'scoped',
        query : t.Object({
            name : t.String()
        })
    })
    
    // Hook
    .onBeforeHandle(
        // TAPIII encapsulation ini bisa di akali.. GUNAKAN AS !!!
        // contoh penggunaan AS
        {as : 'scoped'},
        // Dengan line magic ini !! Lifecycle (Hook) ini bisa diakses oleh instance lain.. : ada beberapa value nya diantaranya 
        // Scoped : lifecycle dapat diakses oleh parent (yg gunakan use())
        // Local : Ya default cuman instance ini
        // Global : SEMUA BISA PAKE !!

        ({query : {name}, status}) => {
            if(!name) {
                return status(401)
            }
        }
    )

    .get('/instanceOne/:p?', () => {
        return 'I Apply the Hook above me because im in the instance'
    })

const instanceTwo = new Elysia()
    .get('/instanceTwo', () => {
        return 'I dont apply the hook from instance one coz im not in the same instance :('
    })

export const Encapsulation = new Elysia({prefix : '/EncapsulationT'})
    .use(instanceOne)
    .use(instanceTwo)