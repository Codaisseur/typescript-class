import * as moment from 'moment'

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

const output = toUser(pietEntity)
console.log(output)
