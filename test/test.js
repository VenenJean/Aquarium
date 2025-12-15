let state = { q1: 0, q2: 1, q3: 1, q4: 0 };

async function sendData() {
  const data = { aquariumState: state };

  try {
    const response = await fetch('api.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    console.log("Antwort von Server:", result);
  } catch (err) {
    console.error("Fehler beim Senden:", err);
  }
}

const saveBtn = document.getElementById("saveBtn");
saveBtn.onclick = () => sendData();

document.getElementById('apiForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const body = {
    q1: parseInt(document.getElementById('q1').value, 10),
    q2: parseInt(document.getElementById('q2').value, 10),
    q3: parseInt(document.getElementById('q3').value, 10),
    q4: parseInt(document.getElementById('q4').value, 10)
  };

  try {
    const res = await fetch('api.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    const data = await res.json();
    document.getElementById('response').textContent = JSON.stringify(data, null, 2);
    console.log('Antwort von Server:', data);
  } catch (err) {
    console.error('Fehler beim Senden:', err);
    document.getElementById('response').textContent = String(err);
  }
});