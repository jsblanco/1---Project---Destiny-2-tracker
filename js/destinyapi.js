var apiKey = "dd6e865e28924fad9ea265dfae890e35";

const searchButton = document.getElementById("search-button")
const searchInput = document.getElementById("steam-name-input")
const resultsList = document.getElementById("steam-results")
let steamPlayers = []
let userProfiles = []


/*
let membershipType= 3
let destinyMembershipId= "4611686018467782694";*/

searchButton.onclick = () => {
  console.log("hola holita")
steamDisplayNameQuery()
 //esqueleto()
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


async function esqueleto(){
  let steamQuery = await steamDisplayNameQuery();
  let membership = await populateResults() 
  let populate = await populateResults();
console.log('steamQuery :', steamQuery);
console.log('membership :', membership);
console.log('populate :', populate);

}



 function steamDisplayNameQuery() {
  console.log("steam empieza")
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
    .then (()=>console.log("steamDisplayNameQuery terminada"))
   .then (() => membershipByPlatform())
//  .then(() => populateResults ());
  }



//Aquí consigues el membershipID específico de Destiny 2
//Tenemos que meter steamPlayers.membershipId


 function membershipByPlatform() {
  console.log("Empieza Membership ID")
  steamPlayers.map(function(user){
  fetch(`https://www.bungie.net/Platform/User/GetMembershipsById/${user.membershipId}/3/`, {
    headers: {"X-API-Key": "dd6e865e28924fad9ea265dfae890e35"}})
    .then (response => response.json())
    .then (json => json.Response.destinyMemberships)
    .then (json => json.filter((memberships)=> memberships.membershipType === 3 && memberships.displayName === "Cydonia"))
    .then (json => populateResults(json))
  })
}



/* copia de seguridad de membersshipId:
 function membershipByPlatform(membershipId) {
  let user = membershipId
  
  
  fetch(`https://www.bungie.net/Platform/User/GetMembershipsById/${user}/3/`, {
    headers: {"X-API-Key": "dd6e865e28924fad9ea265dfae890e35"}})
    .then (response => response.json())
    .then (json => json.Response.destinyMemberships)
    .then (json => json.filter((memberships)=> memberships.membershipType === 3))
    .then (json => userProfiles.push(json[0]))
    .then (() => console.log(userProfiles))
  }

  */



 function populateResults(json) {
  console.log("Adios")
  for (let i = 0; i < json.length; i++) {
    let newResult = document.createElement("li")
    newResult.innerHTML = `Identificador de Bungie: <b>${json[i].membershipId}</b> Nombre en Steam: <b>${json[i].displayName}</b>`;
    resultsList.appendChild(newResult);
    userProfiles.push(json[i])
  }}

/*
function howManyMovies(array) {
  userProfiles = players.filter(function(player) {
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





//Aquí tienes el Profile con el MembershipID por plataforma
https://www.bungie.net/Platform/Destiny2/3/Profile/4611686018467782694/?components=200

*/