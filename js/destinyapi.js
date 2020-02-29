var apiKey = "dd6e865e28924fad9ea265dfae890e35";

const searchButton = document.getElementById("search-button")
const searchInput = document.getElementById("steam-name-input")
const resultsList = document.getElementById("steam-results")
let steamPlayers = []



/*
let membershipType= 3
let destinyMembershipId= "4611686018467782694";*/

searchButton.onclick = () => {
  //console.log("Búsqueda se inicia")
  steamDisplayNameQuery()
  //esqueleto()
}



/*
//INFO:
//https://bungie-net.github.io/multi/operation_get_User-SearchUsers.html#operation_get_User-SearchUsers
//COMPONENTS:
//https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html

Mi profileId: 4611686018467782694

fetch("https://www.bungie.net/Platform//User/SearchUsers/?q=Cydonia", {
headers: {"X-API-Key": apiKey}})
.then (response => response.json())
.then (json => console.log(json))
*/



//Aquí consigo un array con todos los usuarios de Steam. 
//Lo usaremos para extraer sus personajes y sus iconos mediante su membershipId

function steamDisplayNameQuery() {
  //console.log("steam empieza")
  let user = searchInput.value
  resultsList.innerHTML = ""
  steamPlayers = []
  fetch(`https://www.bungie.net/Platform/User/SearchUsers/?q=${user}`, {
      headers: {
        "X-API-Key": apiKey
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
    //.then (()=>console.log("steamDisplayNameQuery terminada"))
    .then(() => membershipByPlatform(user))
}

//Aquí consigues el membershipID específico de Destiny 2
//Tenemos que meter steamPlayers.membershipId

function membershipByPlatform() {
//log//  console.log("Empieza Membership ID")
  let searchQuery = searchInput.value
  console.log(searchQuery)
  steamPlayers.map(function (user) {
    fetch(`https://www.bungie.net/Platform/User/GetMembershipsById/${user.membershipId}/3/`, {
        headers: {
          "X-API-Key": "dd6e865e28924fad9ea265dfae890e35"
          }
        }
      )
      .then(response => response.json())
      .then(json => json.Response.destinyMemberships)
      .then(json => json.filter((memberships) => memberships.membershipType === 3 
          && memberships.displayName.toLowerCase().includes(searchQuery.toLowerCase())
          )
        )
      .then(json => populateResults(json))
    }
  )
}

//Nos muestra la pantalla de inicio. Ahora mismo bebe de Membership Id pero la idea es que beba también de los personajes
function populateResults(json) {
//log//  console.log("Añadiendo usuarios")
  for (let i = 0; i < json.length; i++) {
    let newResult = document.createElement("ul")
    newResult.setAttribute("id", `${json[i].membershipId}`)
    let resultHeader = document.createElement("li")
    resultHeader.innerHTML = `Nombre en Steam: <b>${json[i].displayName}</b>`
    //+` Identificador de Bungie: <b>${json[i].membershipId}</b>`
    resultsList.appendChild(newResult);
    newResult.appendChild(resultHeader);
    getPlayerCharacters(json[i])
  }
}

//Esta función nos consigue el perfil de Destiny de cada jugador en base al membershipId que obtuvimos en membershipByPlatform, via populateResults
//Nos hace una llamada por cada personaje del usuario a una nueva función, que extrae sus datos

function getPlayerCharacters(membershipId) {
  //log// console.log("Empieza getPlayerCharacters")
  fetch(`https://www.bungie.net/Platform/Destiny2/${membershipId.membershipType}//Profile/${membershipId.membershipId}/?components=200`, {
      headers: {
        "X-API-Key": "dd6e865e28924fad9ea265dfae890e35"
      }
    })
    .then(response => response.json())
    .then((data) => {
      let roster = data.Response.characters.data;
      return roster;
    })
    .then((roster) => {

      for (let characterId in roster) {
        getCharacterInfo(membershipId, characterId)
      }
    }
  )
}
  //log// console.log("Termina getPlayerCharacters")

//Esta función recibe el ID de cada personaje de la función anterior, y extrae todos los datos

function getCharacterInfo(membershipId, characterId) {
  fetch(`https://www.bungie.net/Platform/Destiny2/${membershipId.membershipType}/Profile/${membershipId.membershipId}/Character/${characterId}/?components=200`, {
      headers: {
        "X-API-Key": "dd6e865e28924fad9ea265dfae890e35"
      }
    })
    .then(response => response.json())
    .then(data => populateCharacterInfo(data.Response.character.data))
}

//Recibe un array con la información de cada personaje de la función getCharacterInfo y la estructura y publica en el HTML
//Coloca cada personaje bajo su cuenta de usuario usando el nº de usuario, que en populateResults añadimos como clase para cada Ul

function populateCharacterInfo(characterId) {
  //log//  console.log(`Añadiendo personajes para ${characterId.membershipId}`)
  let userUl = document.getElementById(characterId.membershipId)
  let characterP = document.createElement("p")
  let characterEmblem = `url(https://www.bungie.net/${characterId.emblemBackgroundPath})`
  let characterLi = document.createElement("li")
  let spentTime = characterId.minutesPlayedTotal
  characterLi.setAttribute("id", `${characterId.characterId}`)
  characterLi.setAttribute("class", "characterPill")
  let guardianClass = "";
  let race = "";
  let sex = (characterId.genderType === 0? "varón" : "mujer")
  switch (characterId.classType) {
    case 0:
      guardianClass = "Titán";
      break;
    case 1:
      guardianClass = "Cazador";
      break;
    case 2:
      guardianClass = "Hechicero";
      break;
  }
  switch (characterId.raceType) {
    case 0:
      race = "humano";
      break;
    case 1:
      race = "insomne";
      break;
    case 2:
      race = "exo";
      break;
  }
  //log// console.log("Termina nueva población")
  characterLi.style.backgroundImage = characterEmblem;
  characterP.innerHTML = `<b>${guardianClass}</b> ${race} ${sex} de nivel de luz <b>${characterId.light}</b><br>     
  <i>Tiempo de juego: ${Math.floor(spentTime/60)} horas y ${spentTime%60} minutos.</i>`;
  characterLi.appendChild(characterP)
  userUl.appendChild(characterLi)
  userUl.appendChild(spentTimeLi)
}




/*

async function esqueleto(){
  let steamQuery = await steamDisplayNameQuery();
  let membership = await populateResults() 
  let populate = await populateResults();
  console.log('steamQuery :', steamQuery);
  console.log('membership :', membership);
  console.log('populate :', populate);
}

*/
/*
//steamDisplayNameQuery("Cydonia")

//Aquí tienes el Profile con el MembershipID por plataforma
https://www.bungie.net/Platform/Destiny2/3/Profile/${user.membershipId}/?components=200

*/