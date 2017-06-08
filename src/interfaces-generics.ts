export interface HTTPResponse<DataType> {
	statusCode: number
	responseTime: number
	data: DataType
}

export interface Books {
	books: {
		title: string
		author: string
	}[]
}

export interface Articles {
	articles: {
		title: string
		content: string
	}[]
}

const httpRequest = <T>(url: string): HTTPResponse<T> => {
	const response = {} as T
	return {
		statusCode: 200,
		responseTime: 102,
		data: response
	}
}

const books = httpRequest<Books>('/books')
