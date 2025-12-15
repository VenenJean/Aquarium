fetch('api.php', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    q1: 0,
    q2: 0,
    q3: 1,
    q4: 0
  })
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));