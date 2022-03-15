let characterArray = [];
let chosenCharacters = [];

//some DOM keys: 
let dropdown1 = document.getElementById("dropdown");
let dropdown2 = document.getElementById("dropdown2");
let renderedDiv = document.getElementById("inHereTheyShallBe");


class Character{
  constructor(_name, _gender, _status, _species, _type, _pictureUrl){
    this.name = _name;
    this.status = _status;
    this.gender = _gender;
    this.species = _species;
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


  //just nu problem med att läsa - blir undefined eller bara en character. fixa imorgon
  publish(url,character){
    let articleElem = document.createElement("article");
    articleElem.classList.add("characters");
   
    chosenCharacters.forEach((character) => { 
    console.log(character.name)
  
    articleElem.innerHTML = `
    <div class="character--article">
    <img src="${url}" alt ="Picture of your chosen character">
    <h3>${character.name}</h3>
    <p>Species: ${character.species}</p>
    `})
    renderedDiv.appendChild(articleElem);
  }

  buttons(){

    let buttonDiv = document.createElement("div");
    
    let buttStatus = document.createElement("button");
    let buttSpecies = document.createElement("button");
    let buttGender = document.createElement("button");
    let buttType = document.createElement("button");
    buttStatus.innerText = "Compare life status";
    buttGender = "Compare gender";
    buttSpecies = "Compare species";
    buttType = "Compare type"

    buttonDiv.classList.add("button--comparisons");
    buttonDiv.append(
      buttSpecies,
      buttType,
      buttGender,
      buttStatus
    )

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

  // let chosenOneName = dropdown1.options[dropdown1.selectedIndex].id;
  // let chosenTwoName = dropdown2.options[dropdown2.selectedIndex].id;

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
    // console.log(characterDetails.species);
    let characterOne = new Character(characterDetails.name,  characterDetails.gender, characterDetails.status, characterDetails.species, characterDetails.type,imgCharOne)
    chosenCharacters.push(characterOne);
    
    getOnlyData(characterTwo).then((data) => {
      let characterDetails = data;
      let characterTwo = new Character(characterDetails.name,characterDetails.gender, characterDetails.status,  characterDetails.species, characterDetails.type,imgCharTwo);
      chosenCharacters.push(characterTwo);
    })
    
    create.publish(imgCharOne, characterOne);
    create.publish(imgCharTwo, characterTwo);
    create.buttons();
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