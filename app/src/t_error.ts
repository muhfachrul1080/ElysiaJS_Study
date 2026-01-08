import { Elysia } from "elysia";

// Custom error, dsni mendefinisikan constructor untuk error sendiri
class CustomError extends Error {

    // Custom status code try 4xx to 5xx, coz 1xx to 3xx is default standarized code
    status = 492

    constructor(public message: string, public id: number){
        super(message)
    } 

    // Custom Error Response 
    toResponse() {
        return {
            status : this.status,
            data : this.id,
            message: this.message
        }
    }   
}

export const HandlingError = new Elysia({prefix: '/onErrorHandling'})    
    
    // set Nilai Error
    .error({
        'ID_MISS_MATCH' : CustomError
    })

    // On error akan dijalankan apabila terjadi sebuah error pada Instance ini.. 
    // Untuk selanjutnya ga tau kalau pengaruh ke parent dll
   .onError({as: 'scoped'},({ error, code, status }) => {

        // Switch to catch the Error
        switch(code) {
            case 'ID_MISS_MATCH' :  
                return error

            case 'NOT_FOUND' : 
                return 'uhe~ are you lost?'

            default :
                return status(418, "Unidentified Error Check Your Script")
        }
	})

    .get('/throwSomeError/:id', ({params: {id}}) => {

        // Simulasi jika errornya terjadi..
        throw new CustomError('Cek IDnya bang salah itu', Number(id))
        
    })
    .get('/', () => {return 'If u seeing this then there is no Error'})