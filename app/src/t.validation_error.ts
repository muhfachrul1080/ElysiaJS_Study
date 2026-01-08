import { Elysia, t, validationDetail } from "elysia";

export const HandlingValidError = new Elysia({prefix: '/handlingvaliderror'})

    .post('/', ({body: {username, password}, status}) => {

        // Handler
        return {
            data : {username, password}
        }

    }, {

        // Schema 
        body : t.Object({
            password : t.String({
                
                // Kustom pattern
                pattern : '^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$',

                // custom error validation
                // validationDetail() fungsi yang akan tetap mempertahankan error default nya dan menambahkan custom mu
                error: validationDetail('Minimal 1 Kapital, 1 angka, 1 symbol dan min 8 karakter')

            }),
            username : t.String({

                // Custom error validation
                error : 'Harus Karakter lah bang.. jgn angka semua'
            }),
        })
    })