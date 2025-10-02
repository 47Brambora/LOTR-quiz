//Načtení dat z ../data/data.json pro použití dále v quizu
function loadData() {
  return fetch("../data/data.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Chyba při načítání dat: " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Načtená data:", data);
      return data;
    })
    .catch((error) => {
      console.error("Nastala chyba:", error);
    });
}

// poslání dat do konsole pro test
loadData();

//TODO: Generátor teémat podle pevně zadaného čísla 1 až x
function genTopics() {}
