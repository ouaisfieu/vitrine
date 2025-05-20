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
