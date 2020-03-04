var apiKey = "dd6e865e28924fad9ea265dfae890e35";
let membershipType = localStorage.membershipType
var membershipId = localStorage.membershipId
var characterId = localStorage.characterId
let itemIcon = document.getElementsByClassName("item-icon")
let itemName = document.getElementsByClassName("item-name")
let itemDescription = document.getElementsByClassName("item-description")
let itemLevel = document.getElementsByClassName("item-level")
let ghostIcon = document.getElementsByClassName("ghost-icon")
let ghostName = document.getElementsByClassName("ghost-name")
let ghostDescription = document.getElementsByClassName("ghost-description")
let sparrowIcon = document.getElementsByClassName("sparrow-icon")
let sparrowName = document.getElementsByClassName("sparrow-name")
let sparrowDescription = document.getElementsByClassName("sparrow-description")
let sparrowSpeed = document.getElementsByClassName("sparrow-speed")


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
*/
//Una vez tengo el manifest llamo a getEquipmentInfo con los datos que saqué del personaje

function getEquipmentInfo() {
    console.log("Comienza getEquipmentInfo")
    let counter = 0
    fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/Character/${characterId}/?components=205`, {
            headers: {
                "X-API-Key": apiKey
            }
        })
        .then(response => response.json())
        .then(data => data.Response.equipment.data.items)
        .then(equipment => {equipment.map(function (item) {
            if (counter < 8){
                populateItemName(item, counter);
                getItemInfo(item, counter);
                counter++;
            } else if (counter === 8){
                populateGhost(item);
                counter++;
            } else if (counter === 9){
                populateSparrow(item);
                counter++;
            }})
            }) 
        .then (()=> console.log("Termina getEquipmentInfo"))
        }

    function populateItemName(item, counter) {
        itemIcon[counter].src = `http://www.bungie.net/${manifest[item.itemHash.toString()].displayProperties.icon}`
        itemName[counter].innerHTML = manifest[item.itemHash.toString()].displayProperties.name
        itemDescription[counter].innerHTML = manifest[item.itemHash.toString()].displayProperties.description
    }

    function getItemInfo(item, counter){
        fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/Item/${item.itemInstanceId}/?components=300`, {
                headers: {
                    "X-API-Key": apiKey
                }
            })
            .then(response => response.json())
            .then(data => itemLevel[counter].innerHTML= (data.Response.instance.data.primaryStat.value))
    }
    


    function populateGhost(item){
        ghostIcon[0].src = `http://www.bungie.net/${manifest[item.itemHash.toString()].displayProperties.icon}`
        ghostName[0].innerHTML = manifest[item.itemHash.toString()].displayProperties.name
        ghostDescription[0].innerHTML = manifest[item.itemHash.toString()].displayProperties.description
    }


    function populateSparrow(item){
        sparrowIcon[0].src = `http://www.bungie.net/${manifest[item.itemHash.toString()].displayProperties.icon}`
        sparrowName[0].innerHTML = manifest[item.itemHash.toString()].displayProperties.name
        sparrowDescription[0].innerHTML = manifest[item.itemHash.toString()].displayProperties.description

        fetch(`https://www.bungie.net/Platform/Destiny2/${membershipType}/Profile/${membershipId}/Item/${item.itemInstanceId}/?components=300`, {
                headers: {
                    "X-API-Key": apiKey
                }
            })
            .then(response => response.json())
            .then(data => sparrowSpeed[0].innerHTML= (data.Response.instance.data.primaryStat.value))
    }








    getEquipmentInfo() 