import { Elysia } from 'elysia'

export const Cookies = new Elysia({prefix: 'setchangecookies'})
	.get('/cookie', ({ cookie: { visit } }) => {
		const total = +visit.value ?? 0
		visit.value++

		return `You have visited ${visit.value} times`
	})
	.listen(3000)