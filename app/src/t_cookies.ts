import { Elysia, t} from 'elysia'

export const Cookies = new Elysia ()

	.guard({
			as : 'scoped',
			cookie: t.Object({
				visit : t.Optional(t.Number()),
				ui_settings : t.Optional(t.Object({
					darkMode : t.String(),
					fontSize : t.String()
				})
			)})
		})

	.onBeforeHandle({as: 'scoped'},({cookie: {visit, ui_settings}, query}) => {

		// Set Cookie
		visit.value = (Number(visit.value) || 0) + 1

		ui_settings.value = {
			darkMode : query.mode ?? 'Light',
			fontSize : query.font ?? '14px'
		}

		// Config Cookie 
		ui_settings.maxAge = 31557600
		ui_settings.httpOnly = true 

	})
