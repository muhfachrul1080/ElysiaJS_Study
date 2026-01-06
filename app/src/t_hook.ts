import { Elysia, t } from "elysia";

// Hooks bisa dikatakan poss pengecekan .. beda dari schema dimana schema adalah Penjaga (Security) yakni mengecek format dsb. hook meng-apply logic yg kita bangun.. 
// Hooks bisa digunakan seperti ketika melakukan Autentikasi, Data Transformasi, Auditing dan logging dan menyetting custom headers dan mencatat error.. ada lagi sih tapi itu aja dlu.. 
// Intinya hooks itu sebuah kode yg dijalankan sebelum handler (Pemrosesan inti dimulai).. 
export const Hooks = new Elysia({prefix : 'hooksJob'})

    // This is interceptor hook... it will run on every inline route below it.. Like global
    .onBeforeHandle(({headers, status}) =>  {
        const tokenAPI = headers.auth;
        const isValid = tokenAPI === 'Elsyia-Is-My-Wife'
        if(!isValid) {
            return status(401);
        }
    }) 

    .get('/gettingSomeShit', () => {
        return {
            message : "Yo Get this shit"
        }
    }, 
    {        
        // This is Schema / validation 
        response : {
            message : t.String()
        },

        // This is a Local Hook..
        // Write your Hook Here (This will executed before handler in this case returning object Message)
        beforeHandle : ({status}) => {
            console.log("This is local hook")

            if(Math.random() <= 0.5) {
                return status(418, 'too bad RNG got u')
            }
        }
        // Hooks to check if the TOKEN API IS Valid or not
    })

    .get('/someShitTwo', () => {
        return 'This is number two'
    })