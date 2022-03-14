let characterArray = [];
let chosenCharacters = [];

//some DOM keys: 
let dropdown1 = document.getElementById("dropdown");
let dropdown2 = document.getElementById("dropdown2");
let renderedDiv = document.getElementById("inHereTheyShallBe");

class Character{
  constructor(_name, _gender, _status, _species, _type, _pictureUrl){
    this.name = _name;
    this.gender = _gender;
    this.height = _status;
    this.mass = _species;
    this.type = _type; 
    this._pictureUrl = _pictureUrl;
  }
}

class FetchingAPI{
  async getAllCharacters(){
  try {
    let result = await fetch("https://rickandmortyapi.com/api/character/?page=2");
    let data = await result.json();
    let characters = data.results;

    characters.forEach((item) => {
     characterArray.push(item);
    })
    console.log(characterArray);
    return characters;
  } catch (error){
    console.log(error);
  }
  } 
}

class Creating {
  //Dropdowns:
  characterDropDown(characters){
    let option = "";

    characters.forEach(character => {
      option += `
      <option id="${character.name}" 
      value="${character.id}">
      ${character.name}
      </option>
      `
    });
  
    document.getElementById("dropdown2").innerHTML = option;
    document.getElementById("dropdown").innerHTML = option; 
  
  let random = characters[Math.floor(Math.random()* characters.length)];
  let random2 = characters[Math.floor(Math.random()* characters.length)]

  if (random !== random2){
  document.getElementById("random").innerHTML = `${random.name}`;
  document.getElementById("random2").innerHTML = `${random2.name}`;
  }
  else {
    document.getElementById("random").innerHTML = `${random.name}`;
    document.getElementById("random2").innerHTML = `Someone else`;
  }
  }

  publish(url, character){
    
    let headline = document.createElement("h2");
    headline.innerText("Wubba Lubba Dub Dub!");
    
  }

  buttons(){
    let buttonDiv = document.createElement("div");
    renderedDiv.appendChild(buttonDiv);

  }
}

// *----when loading page:
let fetching = new FetchingAPI();
let create = new Creating(); 


fetching.getAllCharacters().then(characters => {
  create.characterDropDown(characters)
});

document.getElementById("submitBtn").addEventListener("click", (event) => {
  event.preventDefault();
  renderedDiv.innerHTML =""
  let chosenOneId = dropdown1.value;
  let chosenTwoId = dropdown2.value;

  if (chosenOneId == chosenTwoId){
    renderedDiv.innerHTML = "<h3>This is not a drill. Please choose two different characters</h3>"
  }

  else {
    //!ska byta ut!
    let imgCharOne = `./img/C-3PO.png`;
    let imgCharTwo = `./img/R5-D4.png`

   let characterOne = `https://rickandmortyapi.com/api/character/${chosenOneId}`
  //  console.log(characterOne);


   let characterTwo = `https://rickandmortyapi.com/api/character/${chosenTwoId}`

  
  getOnlyData(characterOne).then((data) => {
    let characterDetails = data;
    console.log(characterDetails.species);
    let characterOne = new Character(characterDetails.name, characterDetails.status, characterDetails.gender, characterDetails.species, characterDetails.type,imgCharOne)
    chosenCharacters.push(characterOne);
    
    getOnlyData(characterTwo).then((data) => {
      let characterDetails = data;
      console.log(characterDetails.species);
      let characterTwo = new Character(characterDetails.name, characterDetails.status, characterDetails.gender, characterDetails.species, characterDetails.type,imgCharTwo);
      chosenCharacters.push(characterTwo);
      console.log(chosenCharacters)

      creating.publish(imgCharOne,characterOne);
      creating.publish(imgCharTwo,characterTwo);
    })
  })
  }
})


async function getOnlyData (url){
  try{
  let result = await fetch(url);
  let data = await result.json();
  return data;}
  catch(error){
    console.log(url);
    console.log("getOnlyData fungerar ej")
    console.log(error)
  }
 }