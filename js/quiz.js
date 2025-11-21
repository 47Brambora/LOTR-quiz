//Načtení dat z .json  file
async function loadData() {
  try {
    const res = await fetch("../data/data.json");
    if (!res.ok) throw new Error(`Fetch selhal: ${res.status}`);
    const data = await res.json();

    //získání randomID na základě nejvyššího id v .json file
    const randomID = Math.floor(Math.random() * data.topics.length) + 1;
    const chosenTopic = data.topics.find((t) => t.id === randomID);

    //Error handling for chosenTopic & randomID
    if (!chosenTopic) {
      console.error(
        "Nenalezené téma pro id",
        randomID,
        "-available ids:",
        data.topics.map((t) => t.id)
      );
      return;
    }

    // Uložení ID a téma globálně
    window.currentTopicID = randomID;
    window.currentTopic = chosenTopic;

    //Nastavení tématu
    document.getElementById("topic").textContent = "Téma: " + chosenTopic.title;

    //Nastavení obrázku
    const imgDiv = document.getElementById("img");
    // Nastavení obrázku bezpečně bez innerHTML s interpolovaným alt textem vhodným pro čtečky obrazovky
    imgDiv.innerHTML = "";
    const img = document.createElement("img");
    img.src = `${chosenTopic.image}`;
    img.alt = `${chosenTopic.title} — ilustrační obrázek tématu, neutrální pozadí, informativní tón`;
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
    console.log("Image:", chosenTopic.image);
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
