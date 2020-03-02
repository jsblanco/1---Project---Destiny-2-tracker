/*
//INFO DE LA API:
//https://bungie-net.github.io/multi/operation_get_User-SearchUsers.html#operation_get_User-SearchUsers
//COMPONENTS PARA LA API:
//https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html
//Components se añaden después de la URL fetch, dentro de los backticks, ya en número o en texto, y separados por comas: /?components=200 
//MANIFEST DE DESTINY: por si llego al backlog de la página de inventario y quiero incluir los nombres de las armas
// https://www.bungie.net/platform/Destiny2/Manifest/
//Destiny item manifest lite:
//'/common/destiny2_content/json/es/DestinyInventoryItemLiteDefinition-2fbe1829-dfcd-44ec-84d3-bb04a3777dc1.json',

My membershipId: 4611686018467782694
Steam membershipType: 3
*/

var apiKey = "dd6e865e28924fad9ea265dfae890e35";

const searchSteam = document.getElementById("platform-steam")
const searchPlaystation = document.getElementById("platform-playstation")
const searchXbox = document.getElementById("platform-xbox")
const searchInput = document.getElementById("search-input")
const resultsList = document.getElementById("steam-results")
const queryStatus = document.getElementById("status")

//Revisa si hay un usuario dado de alta

checkLoggedUser()


searchSteam.onclick = () => {
  //console.log("Búsqueda de Steam se inicia")
  resultsList.innerHTML = ""
  isInputValid() ? displayNameQuery(3) : invalidInput()
}

searchPlaystation.onclick = () => {
  //console.log("Búsqueda de Steam se inicia")
  resultsList.innerHTML = ""
  isInputValid() ? displayNameQuery(2) : invalidInput()
}

searchXbox.onclick = () => {
  //console.log("Búsqueda de Steam se inicia")
  resultsList.innerHTML = ""
  isInputValid() ? displayNameQuery(1) : invalidInput()
}



function isInputValid() {
  if (searchInput.value != "") {
    return true
  } else {

    return false
  }
}

function invalidInput() {
  pleaseInputAccountName = document.createElement("h3")
  pleaseInputAccountName.setAttribute("class", "text-danger w-100 font-weight-bold mx-3 text-center")
  pleaseInputAccountName.innerHTML = "Por favor, incluye un nombre de cuenta válido"
  resultsList.appendChild(pleaseInputAccountName);
}

//Estas funciones nos añaden un mensaje de Cargando, y luego los eliminan o sustituyen a medida que encuentran usuarios y personajes
function addLoadingMessage() {
  selectYourAccount = document.createElement("h4")
  selectYourAccount.setAttribute("id", "loadingResults")
  selectYourAccount.setAttribute("class", "w-100 font-weight-bold mx-3")
  selectYourAccount.innerHTML = `Cargando los resultados...`
  noResults = document.createElement("p")
  noResults.setAttribute("id", "noResults")
  noResults.setAttribute("class", "w-100 font-weight-bold text-muted mx-3")
  noResults.innerHTML = `<i>¿No aparecen resultados? Prueba a reformular tu búsqueda</i>`
  queryStatus.appendChild(selectYourAccount);
  queryStatus.appendChild(noResults);
}

function charactersFound() {
  let loadingMessage = document.querySelector('#loadingResults');
  noResults.innerHTML = ""
  loadingMessage.innerHTML = "Selecciona tu personaje";
}

//COMIENZA LO DIVERTIDO
//Aquí consigo un array con todos los usuarios de Steam. 
//Lo usaremos para extraer sus personajes y sus iconos mediante su membershipId
//El parámetro membershipType lo iremos pasando desde el inicio hasta la última función, que es donde se usará finalmente.

function displayNameQuery(membershipType) {
  //log// console.log("Empieza displayNameQuery")
  let user = searchInput.value
  queryStatus.innerHTML = ""
  resultsList.innerHTML = ""
  addLoadingMessage()
  fetch(`https://www.bungie.net/Platform/User/SearchUsers/?q=${user}`, {
      headers: {
        "X-API-Key": apiKey
      }
    })
    .then(response => response.json())
    .then(json => json.Response)
    .then((steamPlayers) => membershipByPlatform(steamPlayers, membershipType))
  //log//.then (()=>console.log("Termina displayNameQuery"))
}

//Aquí consigues el membershipID específico de Destiny 2
//Tenemos que meter steamPlayers.membershipId

function membershipByPlatform(steamPlayers, membershipType) {
  //log//  console.log("Empieza Membership ID")
  let searchQuery = searchInput.value
  console.log(searchQuery)
  steamPlayers.map(function (user) {
    fetch(`https://www.bungie.net/Platform/User/GetMembershipsById/${user.membershipId}/${membershipType}/`, {
        headers: {
          "X-API-Key": apiKey
        }
      })
      .then(response => response.json())
      .then(json => json.Response.destinyMemberships)
      .then(json => json.filter((memberships) => memberships.displayName.toLowerCase().includes(searchQuery.toLowerCase())))
      .then(json => populateResults(json, membershipType))
  })
}

//Nos muestra la pantalla de inicio. Ahora mismo bebe de Membership Id
function populateResults(json, membershipType) {
  //log//  console.log("Añadiendo usuarios")
  for (let i = 0; i < json.length; i++) {
    let newResult = document.createElement("ul")
    newResult.setAttribute("id", `${json[i].membershipId}`)
    newResult.setAttribute("class", "col-xl-3 col-lg-4 col-md-8 d-none")
    let resultHeader = document.createElement("li")
    resultHeader.setAttribute("class", "userHeader")
    resultHeader.innerHTML = `<b>${json[i].displayName}</b>`
    //+` Identificador de Bungie: <b>${json[i].membershipId}</b>`
    resultsList.appendChild(newResult);
    newResult.appendChild(resultHeader);
    getPlayerCharacters(json[i], membershipType)
  }
}

//Esta función nos consigue el perfil de Destiny de cada jugador en base al membershipId que obtuvimos en membershipByPlatform, via populateResults
//Nos hace una llamada por cada personaje del usuario a una nueva función, que extrae sus datos

function getPlayerCharacters(membershipId, membershipType) {
  //log// console.log("Empieza getPlayerCharacters")
  fetch(`https://www.bungie.net/Platform/Destiny2/${membershipId.membershipType}//Profile/${membershipId.membershipId}/?components=200`, {
      headers: {
        "X-API-Key": apiKey
      }
    })
    .then(response => response.json())
    .then((data) => {
      let roster = data.Response.characters.data;
      return roster;
    })
    .then((roster) => {

      for (let characterId in roster) {
        getCharacterInfo(membershipId, characterId, membershipType)
      }
    })
}
//log// console.log("Termina getPlayerCharacters")

//Esta función recibe el ID de cada personaje de la función anterior, y extrae todos los datos

function getCharacterInfo(membershipId, characterId, membershipType) {
  fetch(`https://www.bungie.net/Platform/Destiny2/${membershipId.membershipType}/Profile/${membershipId.membershipId}/Character/${characterId}/?components=200`, {
      headers: {
        "X-API-Key": apiKey
      }
    })
    .then(response => response.json())
    .then(data => populateCharacterInfo(data.Response.character.data, membershipType))
}

//Recibe un array con la información de cada personaje de la función getCharacterInfo y la estructura y publica en el HTML
//Coloca cada personaje bajo su cuenta de usuario usando el nº de usuario, que en populateResults añadimos como Id de cada Ul

function populateCharacterInfo(characterId, membershipType) {
  //log//  console.log(`Añadiendo personajes para ${characterId.membershipId}`)
  if (characterId.membershipType === membershipType) {
    let userUl = document.getElementById(characterId.membershipId)
    let characterP = document.createElement("p")
    let characterLi = document.createElement("li")
    let characterEmblem = `url(https://www.bungie.net/${characterId.emblemBackgroundPath})`
    let spentTime = characterId.minutesPlayedTotal
    let guardianClass = "";
    let race = "";
    let sex = (characterId.genderType === 0 ? "varón" : "mujer")
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
    characterLi.setAttribute("id", `${characterId.characterId}`)
    characterLi.setAttribute("class", "characterPill")
    characterLi.style.backgroundImage = characterEmblem;
    characterP.innerHTML = `<b>${guardianClass}</b> ${race} ${sex}. <b>${characterId.light} luz</b><br>     
  <i>${Math.floor(spentTime/60)} horas y ${spentTime%60} minutos jugados.</i>`;
    charactersFound()
    characterLi.appendChild(characterP)
    userUl.classList.remove("d-none")
    userUl.appendChild(characterLi)
    userUl.appendChild(spentTimeLi)
  }
}



/* 

Fetches preparados para el futuro:

//Consigue el equipo del personaje. Está codificado; necesitas una llamada a la API con Equipment[i].itemInstanceId (es un array de objetos)

function getEquipmentInfo() {
    fetch(`https://www.bungie.net/Platform/Destiny2/${membershipId.membershipType}/Profile/${membershipId.membershipId}/Character/${characterId}/?components=205`,  {
      headers: {
        "X-API-Key": apiKey
      }
    })
    .then(response => response.json())
    .then(data => data.Response.equipment.data.items)
    .then (equipment => console.log(equipment))
}



//Sacamos los itemHash de la función anterior y los buscamos en el jSON que obtenemos con la siguiente, que nos indica, en castellano, todos los detalles del arma

  fetch(`https://www.bungie.net/common/destiny2_content/json/es/DestinyInventoryBucketDefinition-2fbe1829-dfcd-44ec-84d3-bb04a3777dc1.json`, {



function getItemManifest(){
  fetch(`https://www.bungie.net/common/destiny2_content/json/es/DestinyInventoryItemLiteDefinition-2fbe1829-dfcd-44ec-84d3-bb04a3777dc1.json`, {
      headers: {
        "X-API-Key": apiKey
      }
    })
    .then(response => response.json())
    .then(response => let itemManifest = response)
}


*/


/*
//Si alguna vez necesito consultar el Manifest global, lo tengo aquí:

function getManifest() {
fetch(`https://www.bungie.net/platform/Destiny2/Manifest/`, {
      headers: {
        "X-API-Key": apiKey
      }
      })
    .then(response => response.json())
    .then (json => console.log(json.Response))
}
getManifest()

*/

/*Consultar con los TAs: ¿Por qué me dice que usernameFetch() no es una función?


function usernameFetch(){
let user = searchInput.value
queryStatus.innerHTML=""
resultsList.innerHTML = ""
addLoadingMessage()
fetch(`https://www.bungie.net/Platform/User/SearchUsers/?q=${user}`, {
    headers: {
      "X-API-Key": apiKey
    }
  })
  .then(response => response.json())
  .then(json => json.Response)
}


function steamDisplayNameQuery() {
  new Promise (usernameFetch())
  .then(function (players) {
    return players.filter(function (player) {
    return (player.steamDisplayName);
        }
      )
    }
  )
  .then ((steamPlayers) => membershipByPlatform(steamPlayers, 3))
}

*/