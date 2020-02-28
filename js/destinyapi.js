var apiKey = "dd6e865e28924fad9ea265dfae890e35";

const searchButton = document.getElementById("search-button")
const searchInput = document.getElementById("steam-name-input")
const resultsList = document.getElementById("steam-results")
let steamPlayers = []


/*
let membershipType= 3
let destinyMembershipId= "4611686018467782694";*/

searchButton.onclick = () => {
  steamDisplayNameQuery()
}




async function initialSearchResults() {

  let playerList = await steamDisplayNameQuery(searchInput.value)
  console.log(playerList)
  for (let i = 0; i < playerList.length; i++) {
    let newResult = document.createElement("li")
    newResult.innerHTML = playerList[i].steamDisplayName;
    resultsList.appendChild(newResult)
  }
}


//INFO:
//https://bungie-net.github.io/multi/operation_get_User-SearchUsers.html#operation_get_User-SearchUsers


/*

fetch("https://www.bungie.net/Platform//User/SearchUsers/?q=Cydonia", {
headers: {"X-API-Key": apiKey}})
.then (response => response.json())
.then (json => console.log(json))
*/

//Aquí consigo un array con todos los usuarios de Steam. 
//Lo usaremos para extraer sus personajes y sus iconos mediante su membershipId


function steamDisplayNameQuery() {
  let user = searchInput.value
  resultsList.innerHTML = ""
  steamPlayers = []
  fetch(`https://www.bungie.net/Platform/User/SearchUsers/?q=${user}`, {
      headers: {
        "X-API-Key": "dd6e865e28924fad9ea265dfae890e35"
      }
    })
    .then(response => response.json())
    .then(json => json.Response)
    .then(function (players) {
      steamPlayers = players.filter(function (player) {
        return (
          player.steamDisplayName
        );
      });
    })
    .then(function () {
      for (let i = 0; i < steamPlayers.length; i++) {
        let newResult = document.createElement("li")
        newResult.innerHTML = `Identificador de Bungie: <b>${steamPlayers[i].uniqueName}</b> Nombre en Steam: <b>${steamPlayers[i].steamDisplayName}</b>`;
        resultsList.appendChild(newResult)
      }
    }
  )
}

/*
function howManyMovies(array) {
  steamPlayers = players.filter(function(player) {
    return (
      player.steamDisplayName === true
    );
  });

  return Spielberg.length;
}



//steamDisplayNameQuery("Cydonia")


function steamDisplayNameQuery (user) {  
fetch(`https://www.bungie.net/Platform/User/SearchUsers/?q=${user}`, {
headers: {"X-API-Key": apiKey}})
.then (response => response.json())
.then (json => json.Response)
.then (function(players) { 
  steamPlayers = (
    players.filter(function(player){
      return player.steamDisplayName
          }
        )
      )
    }
  )
}



  //Aquí consigues el membershipID específico de Destiny 2

https://www.bungie.net/Platform/User/GetMembershipsById/16619908/3/



//Aquí tienes el Profile con el MembershipID por plataforma
https://www.bungie.net/Platform/Destiny2/3/Profile/4611686018467782694/?components=200

*/