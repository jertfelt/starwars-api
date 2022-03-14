let characterArray = [];

class Storage{
  static saveCharacters(data){
   
    localStorage.setItem("characters",JSON.stringify(data))
  }
  static getCharactersAtStart(){
    return localStorage.getItem('cart')?JSON.parse(localStorage.getItem("characters")):[];
  }
}

class Create {
  displayCharacterDropDown(characters){
    
    let option = "";
    characters.forEach(character => {
      option += `
      <option id="${character.name}" 
      value="${character.name}">
      ${character.name}
      </option>
      `
    });
  
    document.getElementById("dropdown2").innerHTML = option;
    document.getElementById("dropdown").innerHTML = option; 
  }}

document.addEventListener("DOMContentLoaded",() =>{
getCharacters().then(characters => {
 let creating = new Create(); 
  creating.displayCharacterDropDown(characters);
})
getBeru().then(data => {
  Storage.saveCharacters(data)
})
getBiggs().then(data => {
  Storage.saveCharacters(data)
})
getC3PO().then(data => {
  Storage.saveCharacters(data)
})
getDarthVader().then(data =>{
  Storage.saveCharacters(data)
})
getLeia().then(data =>{
  Storage.saveCharacters(data)
})
getLuke().then(data =>{
  Storage.saveCharacters(data)
})
getOwenLars().then(data =>{
  Storage.saveCharacters(data)
})
getR2D2().then(data =>{
  Storage.saveCharacters(data)
})
getR5D4().then(data =>{
  Storage.saveCharacters(data)
})
getObiWanKenobi().then(data =>{
  Storage.saveCharacters(data)
})
console.log("printed")
})

async function getCharacters(){
  try {
    let result = await fetch('https://swapi.dev/api/people/?format=json');
    let data = await result.json();  
    let characters = data.results;
    characters.forEach((item) => {
     characterArray.push(item);
    }) 
    return characters;
  } catch (error) {
    console.log("Error på första")
    console.log(error);
  }
}  
  
  async function getLuke (){
    try {
  let result = await fetch("https://www.swapi.tech/api/people/1")
 let data = await result.json();
 return data; 
}
catch (error){
  console.log(error)
}
}

async function getC3PO (){
  try {
    let result = await fetch("https://www.swapi.tech/api/people/2")
   let data = await result.json();
   return data; 
  }
  catch (error){
    console.log(error)
  }
}

async function getR2D2 (){
  try {
    let result = await fetch("https://www.swapi.tech/api/people/3")
   let data = await result.json();
   return data; 
  }
  catch (error){
    console.log(error)
  }
}

async function getDarthVader(){
  try {
    let result = await fetch("https://www.swapi.tech/api/people/4")
   let data = await result.json();
   return data; 
  }
  catch (error){
    console.log(error)
  }
}

async function getLeia(){
  try {
    let result = await fetch("https://www.swapi.tech/api/people/5")
   let data = await result.json();
   return data; 
  }
  catch (error){
    console.log(error)
  }
}

async function getOwenLars(){
  try {
    let result = await fetch("https://www.swapi.tech/api/people/6")
   let data = await result.json();
   return data; 
  }
  catch (error){
    console.log(error)
  }
}

async function getBeru(){
  try {
    let result = await fetch("https://www.swapi.tech/api/people/7")
   let data = await result.json();
   return data; 
  }
  catch (error){
    console.log(error)
  }
}

async function getR5D4(){
  try {
    let result = await fetch("https://www.swapi.tech/api/people/8")
   let data = await result.json();
   return data; 
  }
  catch (error){
    console.log(error)
  }
}

async function getBiggs(){
  try {
    let result = await fetch("https://www.swapi.tech/api/people/9")
   let data = await result.json();
   return data; 
  }
  catch (error){
    console.log(error)
  }
}

async function getObiWanKenobi(){
  try {
    let result = await fetch("https://www.swapi.tech/api/people/10")
   let data = await result.json();
   return data; 
  }
  catch (error){
    console.log(error)
  }
}


