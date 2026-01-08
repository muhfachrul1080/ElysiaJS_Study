import { Elysia } from "elysia";

export const HandlingError = new Elysia({prefix: '/onErrorHandling'})

    // On error akan dijalankan apabila terjadi sebuah error pada Instance ini.. 
    // Untuk selanjutnya ga tau kalau pengaruh ke parent dll
   .onError({as: 'scoped'},({ code, status }) => {

        console.log(code);

		if(code == "NOT_FOUND")
			return 'uhe~ are you lost?'
		return status(418, "My bad! But I\'m cute so you'll forgive me, right?")
	})

    .get('/', () => {return 'If u seeing this then there is no Error'})