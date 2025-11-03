/* Von PhP zu JS*/
fetch('api.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    q1: '',
    q2: '',
    q3: '',
    q4: ''
  })
})
  .then(res => res.json())
  .then(data => console.log(data));