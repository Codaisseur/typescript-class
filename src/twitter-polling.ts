import * as Twit from 'twit'

const twit = new Twit({
  consumer_key:         'I5TFiwot2mhZAewL11wauMLSl',
  consumer_secret:      'pS4XQcbfvjIMyVRlERrPYMJICsHKV0ZfCZW1VebqCFHnAvUhzg',
  access_token:         '863335407362158596-PfixfMsxaGCmeJjnlQvBA755Qe6Y7R4',
  access_token_secret:  'RHk4nXvZCQJKODFQ148fi36KQ5pxrTuA4WO7rZt0ASOvQ',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

//
//  tweet 'hello world!'
//
const sleep = () => new Promise(resolve => setTimeout(resolve, 5000))

const fn = async () => {
  const tweets = await twit.get('search/tweets', {q:'@super_fake_cat'})
  console.log(tweets.data.statuses)
  
  let since_id: string | undefined
	while (true) {
    const tweets = await twit.get('search/tweets', {q:'@super_fake_cat', since_id})
    const list: Twit.Twitter.Status[] = tweets.data.statuses
    
    if (list.length) {
      console.log(list.map(t => t.text))
      
      if (since_id) list.forEach(async t => {
        if (t.text.indexOf('fox') !== -1) {
          await twit.post('statuses/update', {
            status: `@${t.user.screen_name} That doesn't seem relevant to me (${Math.random()})`,
          })
        }
      })
      
      since_id = list[0].id_str
    }
    else {
      console.log('.')
    }
    await sleep()
	}
}
fn()