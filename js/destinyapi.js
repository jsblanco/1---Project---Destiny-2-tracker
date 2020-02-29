var apiKey = "dd6e865e28924fad9ea265dfae890e35";

const searchButton = document.getElementById("search-button")
const searchInput = document.getElementById("steam-name-input")
const resultsList = document.getElementById("steam-results")
const queryStatus = document.getElementById("status")

/*
let membershipType= 3
let destinyMembershipId= "4611686018467782694";*/

searchButton.onclick = () => {
  resultsList.innerHTML = ""
  let user = searchInput.value
  if (user === "")
  {pleaseInputAccountName= document.createElement("h3")
  pleaseInputAccountName.setAttribute("class", "text-danger w-100 font-weight-bold mx-3 text-center")
  pleaseInputAccountName.innerHTML="Por favor, incluye un nombre de cuenta válido"
  resultsList.appendChild(pleaseInputAccountName);} else {
  //console.log("Búsqueda se inicia")
  steamDisplayNameQuery()}
}


function inputValidator(){
  
}

/*
//INFO DE LA API:
//https://bungie-net.github.io/multi/operation_get_User-SearchUsers.html#operation_get_User-SearchUsers
//COMPONENTS PARA LA API:
//https://bungie-net.github.io/multi/schema_Destiny-DestinyComponentType.html
//Components are added after the fetch URL, inside the ticks, like this: /?components=200 
My profileId: 4611686018467782694

fetch("https://www.bungie.net/Platform//User/SearchUsers/?q=Cydonia", {
headers: {"X-API-Key": apiKey}})
.then (response => response.json())
.then (json => console.log(json))
*/

//Estas funciones nos añaden un mensaje de Cargando, y luego los eliminan o sustituyen a medida que encuentran usuarios y personajes

function addLoadingMessage(){
  selectYourAccount= document.createElement("h4")
  selectYourAccount.setAttribute("id", "loadingResults")
  selectYourAccount.setAttribute("class", "w-100 font-weight-bold")
  selectYourAccount.innerHTML=`Cargando los resultados...`
  noResults=document.createElement("p")
  noResults.setAttribute("id", "noResults")
  noResults.setAttribute("class", "w-100 font-weight-bold text-muted")
  noResults.innerHTML=`<i>¿No aparecen resultados? Prueba a reformular tu búsqueda</i>`
  queryStatus.appendChild(selectYourAccount);
  queryStatus.appendChild(noResults);
}

function usersFound(){
  let loadingMessage = document.querySelector('#loadingResults');
  let noResults = document.querySelector('#noResults');
  loadingMessage.innerHTML="Cuentas de Steam registradas en Bungie:";
  noResults.parentNode.removeChild(noResults);
}

function charactersFound(){
  let loadingMessage = document.querySelector('#loadingResults');
  loadingMessage.innerHTML="Selecciona tu personaje";
}


//COMIENZA LO DIVERTIDO
//Aquí consigo un array con todos los usuarios de Steam. 
//Lo usaremos para extraer sus personajes y sus iconos mediante su membershipId

function steamDisplayNameQuery() {
//log// console.log("Empieza steamDisplayNameQuery")
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
    .then(function (players) {
       return players.filter(function (player) {
          return (player.steamDisplayName);
          }
        );
      }
    )
//Si da tiempo a ampliar la búsqueda de Steam a cualquier plataforma, deberíamos cambiar este 3 por el de la pataforma escogida (mediante dropdown?) 
.then(steamPlayers => membershipByPlatform(steamPlayers, 3))
//log//.then (()=>console.log("Termina steamDisplayNameQuery"))
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

//Nos muestra la pantalla de inicio. Ahora mismo bebe de Membership Id
function populateResults(json) {
//log//  console.log("Añadiendo usuarios")
  for (let i = 0; i < json.length; i++) {
    let newResult = document.createElement("ul")
    newResult.setAttribute("id", `${json[i].membershipId}`)
    newResult.setAttribute("class", "col-xl-3 col-lg-4 col-md-6 col-xs-8")
    let resultHeader = document.createElement("li")
    resultHeader.setAttribute("class", "userHeader")
    resultHeader.innerHTML = `Nombre en Steam: <b>${json[i].displayName}</b>`
    //+` Identificador de Bungie: <b>${json[i].membershipId}</b>`
    resultsList.appendChild(newResult);
    newResult.appendChild(resultHeader);
    getPlayerCharacters(json[i])
  }
usersFound()

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
//Coloca cada personaje bajo su cuenta de usuario usando el nº de usuario, que en populateResults añadimos como Id de cada Ul

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
  characterP.innerHTML = `<b>${guardianClass}</b> ${race} ${sex}. <b>${characterId.light} luz</b><br>     
  <i>${Math.floor(spentTime/60)} horas y ${spentTime%60} minutos jugados.</i>`;
  charactersFound()
  characterLi.appendChild(characterP)
  userUl.appendChild(characterLi)
  userUl.appendChild(spentTimeLi)
}

