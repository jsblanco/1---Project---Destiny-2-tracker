var apiKey = "dd6e865e28924fad9ea265dfae890e35";
var membershipId = "4611686018467782694"
var characterId = "2305843009299217882"
let characterEquipment = 
let itemManifest


//Primero me tiene que funcionar esta función, porque necesitaré el Manifest para consultar nombres e inconos de cada objeto
//Necesitamos 


function getItemManifest(){
    fetch(`https://www.bungie.net/common/destiny2_content/json/es/DestinyInventoryItemLiteDefinition-2fbe1829-dfcd-44ec-84d3-bb04a3777dc1.json`, {
        headers: {
          "X-API-Key": apiKey
        }
      })
      .then(response => response.json())
      .then(response => itemManifest = response)
      .then (() => getEquipmentInfo(characterEquipment))
  }



//Una vez tengo el manifest

function getEquipmentInfo() {
    console.log("Comienza getEquipmentInfo")
    fetch(`https://www.bungie.net/Platform/Destiny2/${membershipId.membershipType}/Profile/${membershipId.membershipId}/Character/${characterId}/?components=205`,  {
      headers: {
        "X-API-Key": apiKey
      }
    })
    .then(response => response.json())
    .then(data => data.Response.equipment.data.items)
    .then (equipment => (equipment.map(function(item){
        getItemInfo(item)
        }))
    console.log("Termina getEquipmentInfo")
}



  