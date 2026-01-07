import { Elysia } from "elysia";

// This is what we called Plugin.. ya artinya dipisah doang sih.. di main app nya gunakan "use()"
// Di plugin ada dua tipe ada fixed / static plugin kayak dibawah.. ya behaviour nya ga berubah .. gtu gtu aja
const pluginOne = new Elysia()
    .get('/plugA', () => {
        return "This is Plugin A, From another instance.."
    })
    .get('/PlugB', () => {
        return "This is Plugin B, we're not in the main.. actually our main is not the MAIN OF APPS"
    })

// yg kedua yakni Plugin Dynamic .. behaviornya berubah tergantung dari perilaku (Params yang diberikan) 
// Cara membuat dynamic plugin juga berbeda dimana static tidak men-return instance tapi di dynamic plugin diharuskan untuk menreturnkan instance
const dynamicPluginOne = ({log = false}) => {
    return new Elysia()     
        .onBeforeHandle(({request}) => {
            if(log) console.log(request)
        })  
        .get('/dynamicPlugA', () => {
            return "This is dynamicplugA send true to make a log of it.."
        })
}

export const Plugin = new Elysia({prefix : "pluginInAndOut"})

    // Ini buat pake Pluginnya.. kayak fungsi lah di JS
    .use(pluginOne)
    .use(dynamicPluginOne({log : true}))

    .get('/:p?', ({query: {name}}) => {
        return 'yeah this is the main of this instance.. not the MAIN APPS'
    }, {beforeHandle : ({query : {name}}) => {
        console.log(`this is what u send ${name}`)
    }})