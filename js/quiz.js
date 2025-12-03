// Loading data from .json  file
async function loadData() {
  try {
    const res = await fetch("../data/data_cs.json");
    if (!res.ok) throw new Error(`Fetch selhal: ${res.status}`);
    const data = await res.json();

    // get randomID based on the highest id in the .json file
    const randomID = Math.floor(Math.random() * data.topics.length) + 1;
    const chosenTopic = data.topics.find((t) => t.id === randomID);

    // Error handling for chosenTopic & randomID
    if (!chosenTopic) {
      console.error(
        "Nenalezené téma pro id",
        randomID,
        "-available ids:",
        data.topics.map((t) => t.id)
      );
      return;
    }

    // Save ID and topic globally
    window.currentTopicID = randomID;
    window.currentTopic = chosenTopic;

    //Nastavení tématu
    document.getElementById("topic").textContent = "Téma: " + chosenTopic.title;

    // Default images
    const defaultImages = [
      "../assets/images/ChC-aragorn-and-arwen.jpg",
      "../assets/images/ChC-bilbo-baggins.jpg",
      "../assets/images/ChC-Eye-of-Sauron.jpg",
      "../assets/images/ChC-frodo-and-sams-journey.jpg",
      "../assets/images/ChC-frodo-at-rivendell.jpg",
      "../assets/images/ChC-gandal-and-bilbo-having-tea.jpg",
      "../assets/images/ChC-gandald-and-baalrog.jpg",
      "../assets/images/ChC-gandalf-pippin-and-shadowfax.jpg",
      "../assets/images/ChC-i-can-carry-you.jpg",
      "../assets/images/ChC-leaving-lothlorien.jpg",
      "../assets/images/ChC-minas-tirith-under-siege.jpg",
      "../assets/images/ChC-Sauron-the-deceiver.jpg",
    ];

    function getImagePath(chosenTopic) {
      // Nastavení obrázku bude kontrolovat pokud obrázek existuje pokud ne tak užije náhodný
      if (chosenTopic.image) {
        // Pokud v JSONu je cestapoužij toto
        return `../assets/images/${chosenTopic.image}`;
      } else {
        // pokud v JSONu cesta není užij náhodný default obrázek
        const randomIndex = Math.floor(Math.random() * defaultImages.length);
        return defaultImages[randomIndex];
      }
    }

    //Nastavení obrázku
    const imgDiv = document.getElementById("img");
    // Nastavení obrázku
    imgDiv.innerHTML = "";
    const img = document.createElement("img");
    img.src = getImagePath(chosenTopic);
    //img.src = `../assets/images/${chosenTopic.image}`;
    img.alt = `${chosenTopic.title} — ilustrační obrázek tématu`;
    imgDiv.appendChild(img);

    //Vypsání otázek
    const list = document.getElementById("questionList");
    list.innerHTML = "";
    chosenTopic.questions.forEach((q) => {
      const li = document.createElement("li");
      li.textContent = q.question;
      list.appendChild(li);
    });

    // Debug
    console.log("ID:", randomID);
    console.log("Title:", chosenTopic.title);
    console.log("Image:", getImagePath);
    console.log("Questions:", chosenTopic.questions);
  } catch (err) {
    console.error("Chyba při načítání .json file", err);
  }
}
loadData();

// Ukaž správné odpovědí
function showAnswers() {
  if (!window.currentTopic) {
    alert("Není načteno žádné téma");
    return;
  }

  const answer = window.currentTopic.questions.map((q, i) => `Otázka ${i + 1}: ${q.answer}`);

  alert(answer.join("\n"));
}

// Hození nových otázek
function nextTopic() {
  loadData();
}

// Po stisknutí tlačítka id ukázat přes alert id pro lehčí opravy
function showID() {
  alert("ID aktuálního tématu: " + window.currentTopicID);
}

// Připojení tlačítek
document.getElementById("btnShowAnswers").addEventListener("click", showAnswers);
document.getElementById("btnNextTopic").addEventListener("click", nextTopic);
document.getElementById("btnShowID").addEventListener("click", showID);
