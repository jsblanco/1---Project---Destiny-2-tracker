var apiKey = "dd6e865e28924fad9ea265dfae890e35";
var membershipId = "4611686018467782694"
var characterId = "2305843009299217882"
let membershipType = "3"
let itemIcon = document.getElementsByClassName("item-icon")
let itemName = document.getElementsByClassName("item-name")
let itemDescription = document.getElementsByClassName("item-description")
let itemLevel = document.getElementsByClassName("item-level")
let characterEquipment

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
                populateItemName(item, counter);
                getItemInfo(item, counter);
                counter++
            })}) 
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
    









    getEquipmentInfo() 