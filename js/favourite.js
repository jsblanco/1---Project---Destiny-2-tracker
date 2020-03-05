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

var membershipId = "4611686018467782694"
var characterId = "2305843009299217882"
Steam membershipType: 3
*/

var apiKey = "dd6e865e28924fad9ea265dfae890e35";


const resultsList = document.getElementById("steam-results")

const itemIcon = document.getElementsByClassName("item-icon")
const itemName = document.getElementsByClassName("item-name")
const itemDescription = document.getElementsByClassName("item-description")
const itemLevel = document.getElementsByClassName("item-level")
const ghostIcon = document.getElementsByClassName("ghost-icon")
const ghostName = document.getElementsByClassName("ghost-name")
const ghostDescription = document.getElementsByClassName("ghost-description")
const sparrowIcon = document.getElementsByClassName("sparrow-icon")
const sparrowName = document.getElementsByClassName("sparrow-name")
const sparrowDescription = document.getElementsByClassName("sparrow-description")
const sparrowSpeed = document.getElementsByClassName("sparrow-speed")
const characterEmblem = document.getElementById("character-emblem")
const subclassIcon = document.getElementById("subclass-icon")
const characterSubclass = document.getElementById("subclass")
const guardianImage = document.getElementById("guardian-image")
const mastercrafted = document.getElementsByClassName("mastercrafted-tooltip")
const favouriteResults = document.getElementById("favourite-results")
const favouriteAccount= document.getElementById("favourite-account")
const favouriteEquipment= document.getElementById("fav-equipment")
const noFavourite= document.getElementById("no-favourites")
const resultsHeader = document.getElementById("results-header")
let guardianClass = "";
let guardianSubclass = "";
let membershipId
let membershipType
let characterId
let displayName

if (localStorage.favMembershipId){
  membershipId = localStorage.favMembershipId
  membershipType = localStorage.favMembershipType
  displayName = localStorage.displayName
  getPlayerCharacters(membershipId, membershipType)
} else{
  noFavourite.classList.remove("d-none")
}



//Esta función nos consigue el perfil de Destiny de cada jugador en base al membershipId que obtuvimos en membershipByPlatform, via populateResults
//Nos hace una llamada por cada personaje del usuario a una nueva función, que extrae sus datos

function getPlayerCharacters(membershipId, membershipType) {
    console.log("Empieza getPlayerCharacters")
  favouriteAccount.classList.add(`${membershipId}`)
  fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}//Profile/${membershipId}/?components=200`, {
      headers: {
        "X-API-Key": apiKey
      }
    })
    .then(response => response.json())
    .then((data) => {
      if (data.Response === undefined) {
        return console.log("No character found for ", membershipId.membershipId,", resuming")
      } else {
        let roster = data.Response.characters.data;
        return roster;
      }
    })
    .then((roster) => {
      for (let characterId in roster) {
        getCharacterInfo(membershipId, characterId, membershipType)
      }
    })
   console.log("Termina getPlayerCharacters()")
}
 console.log("Termina getPlayerCharacters")

//Esta función recibe el ID de cada personaje de la función anterior, y extrae todos los datos

function getCharacterInfo(membershipId, characterId, membershipType) {
   console.log("Empieza getCharacterInfo()")
  fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/Character/${characterId}/?components=200`, {
      headers: {
        "X-API-Key": apiKey
      }
    })
    .then(response => response.json())
    .then(data => populateCharacterInfo(data.Response.character.data, membershipType))
   console.log("Termina getCharacterInfo()")
}

//Recibe un array con la información de cada personaje de la función getCharacterInfo y la estructura y publica en el HTML
//Coloca cada personaje bajo su cuenta de usuario usando el nº de usuario, que en populateResults añadimos como Id de cada Ul

function populateCharacterInfo(characterId, membershipType) {
   console.log(`Añadiendo personajes para ${characterId.membershipId}`)
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
    characterLi.setAttribute("id", `${characterId.characterId}`)
    characterLi.setAttribute("class", "characterPill")
    characterLi.style.backgroundImage = characterEmblem;
    characterP.innerHTML = `<b>${guardianClass}</b> ${race} ${sex}. <b>${characterId.light} luz</b><br>     
    <i>${Math.floor(spentTime/60)} horas y ${spentTime%60} minutos jugados.</i>`;
    characterLi.appendChild(characterP)
    linkToInventory(characterLi, membershipType, characterId.membershipId, characterId.characterId)
    resultsHeader.innerHTML= `Cuenta favorita: <b>${displayName}</b>`
    favouriteResults.classList.remove("d-none")
    favouriteAccount.appendChild(characterLi)
        console.log("Termina nueva población")
  
}

function linkToInventory(characterLi, membershipType, membershipId, characterId) {
    characterLi.onclick = () => {
    membershipType = membershipType
    membershipId = membershipId
    characterId = characterId
    getCharacterInformation(membershipId, characterId, membershipType)
    getEquipmentInfo(membershipType, membershipId, characterId)
  }
}



function getEquipmentInfo(membershipType, membershipId, characterId) {

    console.log("Comienza getEquipmentInfo")
    let counter = 0
    fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/Character/${characterId}/?components=205`, {
            headers: {
                "X-API-Key": apiKey
            }
        })
        .then(response => response.json())
        .then(data => data.Response.equipment.data.items)
        .then(equipment => {
            equipment.map(function (item) {
                if (counter < 8) {
                    populateItemName(item, counter);
                    getItemInfo(item, counter, membershipType, membershipId);
                    counter++;
                } else if (counter === 8) {
                    populateGhost(item);
                    counter++;
                } else if (counter === 9) {
                    populateSparrow(item);
                    counter++;
                } else if (counter ===10){
                    counter++;
                } else if (counter === 11) {
                    console.log(item)
                    populateGuardianSubclass(item)
                    counter++;
                }
            })
        })
        .then(() => console.log("Termina getEquipmentInfo"))
}

function populateItemName(item, counter) {
    itemIcon[counter].src = `http://www.bungie.net/${manifest[item.itemHash.toString()].displayProperties.icon}`
    itemName[counter].innerHTML = manifest[item.itemHash.toString()].displayProperties.name
    itemDescription[counter].innerHTML = manifest[item.itemHash.toString()].displayProperties.description
}

function getItemInfo(item, counter, membershipType, membershipId) {
    fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/Item/${item.itemInstanceId}/?components=300`, {
            headers: {
                "X-API-Key": apiKey
            }
        })
        .then(response => response.json())
        .then(function (data) {
            itemLevel[counter].innerHTML = (data.Response.instance.data.primaryStat.value)
            if (data.Response.instance.data.quality === 10) {
                itemIcon[counter].classList.remove("border-secondary", "non-mastercrafted")
                itemIcon[counter].classList.add("border-warning", "text-warning", "mastercrafted")
                mastercrafted[counter].innerText =`Obra maestra`;
                console.log("Mastercrafted")
            } else {
                itemIcon[counter].classList.remove("border-warning", "text-warning", "mastercrafted")
                itemIcon[counter].classList.add("border-secondary", "non-mastercrafted")
                mastercrafted[counter].innerText ="";
            }
        })
}


function populateGhost(item) {
    ghostIcon[0].src = `http://www.bungie.net/${manifest[item.itemHash.toString()].displayProperties.icon}`
    ghostName[0].innerHTML = manifest[item.itemHash.toString()].displayProperties.name
    ghostDescription[0].innerHTML = manifest[item.itemHash.toString()].displayProperties.description
}


function populateSparrow(item) {
    sparrowIcon[0].src = `http://www.bungie.net/${manifest[item.itemHash.toString()].displayProperties.icon}`
    sparrowName[0].innerHTML = manifest[item.itemHash.toString()].displayProperties.name
    sparrowDescription[0].innerHTML = manifest[item.itemHash.toString()].displayProperties.description

    fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/Item/${item.itemInstanceId}/?components=300`, {
            headers: {
                "X-API-Key": apiKey
            }
        })
        .then(response => response.json())
        .then(data => sparrowSpeed[0].innerHTML = (data.Response.instance.data.primaryStat.value))
}

function getCharacterInformation(membershipId, characterId, membershipType) {
    fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/Character/${characterId}/?components=200`, {
            headers: {
                "X-API-Key": apiKey
            }
        })
        .then(response => response.json())
        .then(data => populateCharacterInformation(data.Response.character.data, membershipType))
}


function populateCharacterInformation(characterId, membershipType) {
      console.log(`Añadiendo personajes para ${characterId.membershipId}`)
    let characterP = document.getElementById("character-data")
    let spentTime = characterId.minutesPlayedTotal
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
    //  characterLi.setAttribute("class", "col-lg-8, characterHeader")
    characterEmblem.src = `https://www.bungie.net${characterId.emblemPath}`
    characterP.innerHTML = `<b>${guardianClass}</b> ${race} ${sex}. <b>${characterId.light} luz</b><br>     
    <i>${Math.floor(spentTime/60)} horas y ${spentTime%60} minutos jugados.</i>`;
    characterP.classList.add("m-3", "text-light")
    favouriteEquipment.classList.remove("d-none")
 console.log("Termina nueva población")
}




function populateGuardianSubclass(item){
    subclassIcon.src = `http://www.bungie.net/${manifest[item.itemHash.toString()].displayProperties.icon}`
    characterSubclass.innerHTML = manifest[item.itemHash.toString()].displayProperties.name
    console.log(manifest[item.itemHash.toString()].talentGrid.buildName)
    guardianImage.src=`./img/${manifest[item.itemHash.toString()].talentGrid.buildName}.png`
}


// getCharacterInfo(membershipId, characterId, membershipType)
// getEquipmentInfo()