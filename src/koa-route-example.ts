import * as moment from 'moment'
import * as Koa from 'koa'
import * as Router from 'koa-router'

interface UserEntity {
	id: number
	firstName: string
	lastName: string
	birthDate: Date
} 

interface UserResponse {
	user: { 
		name: string
		age: number
	} 
}

export const sleep = (n: number) => new Promise(res => setTimeout(res, n))

export const toUser = (entity: UserEntity): UserResponse => ({
	user: {
		name: `${entity.firstName} ${entity.lastName}`,
		age: moment().diff(entity.birthDate, 'years')
	}
})

const app = new Koa()
const router = new Router()

const pietEntity: UserEntity = {
	id: 1, 
	firstName: 'piet',
	lastName: 'klaas',
	birthDate: new Date(1989, 7, 5)
} 

router
	.get('/user/:userId', async ctx => {
		const userId: string = ctx.params.userId
		if (Number(userId) === 123) {
			await sleep(1500)
			ctx.body = toUser(pietEntity)
		}
		else {
			ctx.throw(400, 'Invalid user ID given!')
		}
	})

const errorHandler: Koa.Middleware = async (ctx, next) =>
	next().catch(err => {
		ctx.status = err.statusCode || err.status || 500;
		ctx.body = {
			error: err.message
		}
	})

app
	.use(errorHandler)
	.use(router.routes())
	.listen(5678, () => console.log(`Talking on port 5678...`))