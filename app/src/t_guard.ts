import { Elysia, t } from "elysia";

// Guard... atau bisa dianalogikan Pagar ... pembungkus lah adalah fitur elysia JS yang berguna untuk mengelompokkan beberapa Rute yang memiliki Aturan (Schema), atau pun Side logic (Hook) yang sama
// Guard akan menjalankan kode tersebut dan meng-apply kan nya ke inline dibawahnya 
// Mengapa Guard? ya karena tidak perlu menuliskan kode seperti Validation, handler berulang ulang 
export const Guard = new Elysia({prefix : 'guardsBulkHandling'})
    .get('/inlineWithoutGuard', ({}) => {
        return 'This route will be exeecuted without any restriction'
    })

    .guard({

        // Applying schema
        query : t.Object({
            level : t.String()
        }),
        headers : t.Object({
            token : t.String()
        }),

        // Applying Hook (Intercept Hook) sih jadinya
        // kalau banyak logicnya pakai array 
        beforeHandle : [
            ({headers, status}) => {
                if(headers.token !== 'ElysiaWife') {
                    return status(401, "No Token")
                }
            },

            ({query: { level }, status}) => {
                if(level != 'Superior') {
                    return status(401)
                }
            }
        ],

        afterResponse : ({status}) => {
            const currentDate = new Date()
            console.log(`Opened at ${currentDate.toString()}`)

            return status(200)
        }
    })

    // Destructuring query
    .get('/inlineWithGuard/:params?', ({query : {level}}) => {
        return `your Level is ${level}`
    })