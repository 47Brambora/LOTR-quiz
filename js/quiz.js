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

    //Nastavení tématu
    document.getElementById("topic").textContent = "Téma: " + chosenTopic.title;

    //!nefachá
    //Nastavení obrázku
    const imgDiv = document.getElementById("img");
    imgDiv.innerHTML = '<img src="./images/${chosenTopic.image}" alt="${chosenTopic.title} />"';

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

//TODO: Ukaž správné odpovědí
function showAnswers() {}

//TODO: Hození nových otázek
function nextTopic() {}

//TODO: Po stisknutí tlačítka id ukázat přes alert id pro lehčí opravy
function showID() {}
