import {HTTPResponse, Books} from './interfaces-generics'

const booksResponse: HTTPResponse<Books> = {
	statusCode: 123,
	responseTime: 100,
	data: {
		books: [
			{
				title: 'title',
				author: 'alice'
			}
		]
	}
}
