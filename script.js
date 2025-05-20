fetch("subtitles.vtt")
  .then(response => {
    if (!response.ok) {
      throw new Error("Fichier de sous-titres introuvable");
    }
    return response.text();
  })
  .then(data => {
    const lines = data
      .split('\n')
      .filter(line => line && !line.includes('-->') && !/^\d+$/.test(line) && !line.startsWith('WEBVTT'));

    let index = 0;
    const subtitleBox = document.getElementById("subtitles");

    function updateSubtitle() {
      subtitleBox.textContent = lines[index];
      index = (index + 1) % lines.length;
    }

    updateSubtitle();
    setInterval(updateSubtitle, 2500);
  })
  .catch(error => {
    document.getElementById("subtitles").textContent = "Erreur chargement sous-titres : " + error.message;
  });

function filerUneRouste() {
  const body = document.body;
  const msg = document.getElementById("rouste-message");
  const punchSound = document.getElementById("sound-punch");

  body.classList.add("bump", "zoom-punch", "flash");

  if (navigator.vibrate) {
    navigator.vibrate([50, 30, 50]);
  }

  msg.classList.add("rouste-visible");
  msg.classList.remove("rouste-hidden");

  if (punchSound) {
    punchSound.currentTime = 0;
    punchSound.play();
  }

  setTimeout(() => {
    body.classList.remove("bump", "zoom-punch", "flash");
    msg.classList.remove("rouste-visible");
    msg.classList.add("rouste-hidden");
  }, 800);
}
