import { Elysia, t} from 'elysia'

export const Cookies = new Elysia({prefix: 'setchangecookies'})

	.get('/counter', ({cookie: {visit}}) => {

			let countVisit = +visit.value || 0
			countVisit++

			visit.value = countVisit;

			return `You have visited ${visit.value} times`
		}, {
			cookie: t.Object({
				visit: t.Optional(t.Number())
			})
		})
	

	.get('/cookie', ({ cookie: { ui_settings, userStat }, query }) => {

		// Saved user Preference setting in cookie
		userStat.value = {
			counter : countV,
		}

		ui_settings.value = {
			theme : query.theme ?? 'light',
			fontSize : query.size ?? '14px'
		}

		// Config for custom cookie
		ui_settings.maxAge = 31536000 //exp date
		ui_settings.httpOnly = true // Hidden from client JS

		return "preference saved"
		
	}, {
		
		// token for cookie so no one can intrepeted
		cookie: t.Cookie({

			userStat : t.Optional(t.Object({
				counter : t.Number(),
				dateVisited : t.String()
			})),

			ui_settings: t.Optional(t.Object({
				theme : t.String(),
				fontSize : t.String()
			}))
		}, {
			secrets: `GwSayangLoReeee,GWKANGEEENBANGET,PENGENDENGERSUARAMU`,
			sign : ['ui_settings']			
		}
		)

	})
	.listen(3000)
