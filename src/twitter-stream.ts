import * as Twit from 'twit'

const twit = new Twit({
  consumer_key:         'I5TFiwot2mhZAewL11wauMLSl',
  consumer_secret:      'pS4XQcbfvjIMyVRlERrPYMJICsHKV0ZfCZW1VebqCFHnAvUhzg',
  access_token:         '863335407362158596-PfixfMsxaGCmeJjnlQvBA755Qe6Y7R4',
  access_token_secret:  'RHk4nXvZCQJKODFQ148fi36KQ5pxrTuA4WO7rZt0ASOvQ',
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
})

const stream = twit.stream('statuses/filter', {track: '@super_fake_cat'})

stream.on('tweet', (tweet: Twit.Twitter.Status) => console.log(tweet))

console.log('running')