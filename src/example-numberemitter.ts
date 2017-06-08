const numberEmitter = (name: string, ms: number) => new Promise(resolve => {
	setTimeout(() => {
		console.log(`This is number emitter ${name}`)
		resolve(numberEmitter(name, ms))
	}, ms)
})

// 1 -> 2 -> 4 -> 8

const fn = async () => {

	// ------------

	await numberEmitter('alice', 500)
	numberEmitter('bob', 700)

}
fn()
