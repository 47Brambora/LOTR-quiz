//Načtení dat z .json  file
async function loadData() {
  try {
    const res = await fetch("../data/data.json");
    if (!res.ok) throw new Error(`Fetch selhal: ${res.status}`);
    const data = await res.json();

    //získání randomID na základě nejviššího id v .json file
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
    // kontrola výchozích dat
    console.log("ID:", randomID);
    console.log("Title:", chosenTopic.title);
    console.log("Image:", chosenTopic.image);
    console.log("Questions:", chosenTopic.questions);
  } catch (err) {
    console.error("Chyba při načítání .json file", err);
  }
}
loadData();

//TODO: Ukáž správné odpovědí
function showAnswers() {
  //alert("Správné odpovědi:\n1.xxx\n2.xxx\n3.xxx\n4.xxx\n5.xxx");
  alert("test");
}
