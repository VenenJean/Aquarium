let state = { q1: 0, q2: 1, q3: 1, q4: 0 };

async function sendData() {
  // Beispiel: Aquarium-Zustand an PHP schicken
  const data = { 
    aquariumState: state // dein Aquarium-Status-Objekt
  };

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