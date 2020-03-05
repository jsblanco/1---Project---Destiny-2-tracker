var apiKey = "dd6e865e28924fad9ea265dfae890e35";
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
let guardianClass = "";
let guardianSubclass = "";

//= JSON.parse(./manifest.json)
/*
//PROBLEMA: COURSE ERROR
//Primero me tiene que funcionar esta función, porque necesitaré el Manifest para consultar nombres e inconos de cada objeto
//Necesitamos 

function getItemManifest() {
    fetch(`https://www.bungie.net/common/destiny2_content/json/es/DestinyInventoryItemLiteDefinition-2fbe1829-dfcd-44ec-84d3-bb04a3777dc1.json`, {
            headers: {
                "X-API-Key": apiKey
            }
        })
        .then(response => response.json())
        .then(response => itemManifest = response)
     //   .then(() => getEquipmentInfo(characterEquipment))
}

getItemManifest() 

//Una vez tengo el manifest llamo a getEquipmentInfo con los datos que saqué del personaje

*/

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
    //log//  console.log(`Añadiendo personajes para ${characterId.membershipId}`)
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
//log// console.log("Termina nueva población")
}




function populateGuardianSubclass(item){
    subclassIcon.src = `http://www.bungie.net/${manifest[item.itemHash.toString()].displayProperties.icon}`
    characterSubclass.innerHTML = manifest[item.itemHash.toString()].displayProperties.name
    console.log(manifest[item.itemHash.toString()].talentGrid.buildName)
    guardianImage.src=`./img/${manifest[item.itemHash.toString()].talentGrid.buildName}.png`
}


// getCharacterInfo(membershipId, characterId, membershipType)
// getEquipmentInfo()