import * as express from 'express'
import * as moment from 'moment'

const alice: UserEntity = {
	id: 1,
	firstName: 'Alice',
	lastName: 'Pleasance Liddell',
	birthDate: new Date(1865, 5, 4)
}

const getUser = (id: number) => new Promise<UserEntity | null>((resolve, reject) => {
	setTimeout(() => {
		if (id === 123) resolve(alice)
		else if (id > 1000) reject(new Error('getUser error!'))
		else resolve(null)
	}, 500)
})

const app = express()

app
	.get('/users/:id([0-9]+)', async (req, res) => {
		try {
			const id = Number(req.params.id)
			const response = await getUser(id)

			if (response) res.send(toUser(response))
			else {
				response
				res.status(404).send(`User not found!`)
			}
		}
		catch (e) {
			res.status(500).send(e)
		}
		
	})
	.listen(9001, () => console.log('running on port 12345'))

	

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

	const toUser = (entity: UserEntity): UserResponse => {
		return {
			user: {
				name: entity.firstName + ' ' + entity.lastName,
				age: moment().diff(entity.birthDate, 'years')
			}
		}
	}

	const pietEntity: UserEntity = {
		id: 1,
		firstName: 'piet',
		lastName: 'klaas',
		birthDate: new Date(1989, 7, 5)
	}
