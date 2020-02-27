var apiKey = "dd6e865e28924fad9ea265dfae890e35";

let membershipType: 3;
let destinyMembershipId: "4611686018467782694";



//INFO:
//https://bungie-net.github.io/multi/operation_get_User-SearchUsers.html#operation_get_User-SearchUsers




fetch("https://www.bungie.net/Platform//User/SearchUsers/?q=Cydonia", {
headers: {"X-API-Key": apiKey}})
.then (response => response.json())
.then (json => console.log(json))


//Aquí consigo un array con todos los usuarios de Steam. 
//Lo usaremos para extraer sus personajes y sus iconos mediante su membershipId

let steamPlayers = []

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



steamDisplayNameQuery("Cydonia")






  //Aquí consigues el membershipID específico de Destiny 2

https://www.bungie.net/Platform/User/GetMembershipsById/16619908/3/



//Aquí tienes el Profile con el MembershipID por plataforma
https://www.bungie.net/Platform/Destiny2/3/Profile/4611686018467782694/?components=200

