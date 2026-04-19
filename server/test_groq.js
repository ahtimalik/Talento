const KEY = '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';

fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KEY}`
    },
    body: JSON.stringify({
        model: 'mixtral-8x7b-32768',
        messages: [{ role: 'user', content: 'Say hello' }]
    })
}).then(res => res.json()).then(data => {
    console.log(JSON.stringify(data, null, 2));
}).catch(err => {
    console.error('Error:', err);
});
