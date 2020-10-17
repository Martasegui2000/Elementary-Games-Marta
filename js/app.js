import Game from './Game.js';

// Variables globals
let lGames = []; // llista de jocs
let gamesMap = new Map(); // Versió Map
let indexGame = 3;  // Fake key. Contador inicial games del prototipus. 

init();

// Load init data and main actions
/**********************************************************************/
function init() {

  // Load lGames widht example Data
  lGames.push(new Game(1, "Star Wars Jedi: Fallen Order", "Five Start Studio", "12/12/2019", "Action", "16"));
  lGames.push(new Game(2, "Terminator", "Marvel Studio", "12/12/2019", "Adventure", "12"));
  lGames.push(new Game(3, "Halo", "Pixel Studio", "12/12/2019", "Rol", "18"));

  // Populate main table width data games from lGames array 
  populateTableGames(lGames);

  const btnAddGame  = document.getElementById("btn-addGame");
  btnAddGame.addEventListener("click", (e)=>{
    addGame();
  });

}


// Torna false si no compleix les condicions especificades
/**********************************************************************/
function validateGameForm() {
  //let elements = document.querySelectorAll("#frm-game input[type=text]")
  const elements = document.getElementById("frm-game").elements;

  // Check mandatory fields
  for (let e of elements) {
    if ((e.type === "text" || e.type === "date" || e.type === "number") && 
         e.value === "") {
      message("Tots els camps són obligatoris");
      e.focus();
      return false;
    }
  }
  // Check PEGI: First we need to parser the string value of the string  
  let pegi = Number.parseInt($("#game_pegi").val(), 10);
  if (!Number.isInteger(pegi) || pegi > 18) {
    message("El camp PEGI ha de ser un valor numèric entre 0 i 18");
    pegi.focus();
    return false;
  }
  return true;
}

// Populate current games
/**********************************************************************/
function populateTableGames(lGames) {
  let bodyGameList = document.getElementById("gamelist");
  bodyGameList.innerHTML = "";
  // Create rows in the table from the games list
  lGames.forEach((item) => {
    let oGame = item;
    let sGame = `<tr>
										<td scope="row">${oGame.id}</td>
										<td>${oGame.name}</td>
										<td>${oGame.developer}</td>
										<td>${oGame.release}</td>
										<td>${oGame.pegi}</td>
                    <td>${oGame.genre}</td>
                    <td><i class="fas fa-trash-alt" style="color:red" data-game-id="${oGame.id}"></i></td>
                  </tr>`;
    bodyGameList.innerHTML += sGame;
  });

  setDeleteEvent();

}

function setDeleteEvent(){
    // Configure action of every delete button
    let aBtnDelete = document.querySelectorAll(".fa-trash-alt");
    if (aBtnDelete){
      aBtnDelete.forEach(item=>{
        item.addEventListener("click", function(){
          deleteGame(this.getAttribute("data-game-id"));
        });
      });
    }
}

// Missatge
/**********************************************************************/
function message(msg) {
  $("#txt-message").html(msg);
  $('#modal-message').modal('show');
}


//Afegeix un joc nou a l'array a partir del formulari
/**********************************************************************/
function addGame() {
  if (!validateGameForm()) return false;

  // First we check the game is no repeated
  const even = (item) => item.name === $("#game_name").val();
  if (lGames.some(even)) {
    message("Joc repetit");
  } else {
    let codiGame = ++indexGame;
    // conversió de la data: 02/12/2019
    let aDate = ($("#game_release").val()).split("-");
    let release = aDate[2] + "/" + aDate[1] + "/" + aDate[0];
    let oGame = new Game(codiGame,
      $("#game_name").val(),
      $("#game_developer").val(),
      release,
      $("#game_gnre").val(),
      $("#game_pegi").val()
    );
    console.info("New game:" + oGame.toString());

    lGames.push(oGame);
    document.getElementById("frm-game").reset();
    populateTableGames(lGames);
  }
}

function deleteGame(idGame) { 
  // New array without the game width a idGame to delete
  const result = lGames.filter(game => game.id != idGame);
  lGames = result;
  console.info("New array:", lGames);
  populateTableGames(lGames);
}
