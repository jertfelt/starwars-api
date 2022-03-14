//some DOM keys: 
let dropdown1 = document.getElementById("dropdown");
let dropdown2 = document.getElementById("dropdown2");
let renderedDiv = document.getElementById("inHereTheyShallBe");
let chosenCharacters = [];

class Character{
  constructor(_name, _gender, _height, _mass, _haircolor, _pictureUrl){
    this.name = _name;
    this.gender = _gender;
    this.height = _height;
    this.mass = _mass;
    this.hairColor = _haircolor;
    this._pictureUrl = _pictureUrl;
  }

//*-------comparisons:
  compareHeight(item){}
  compareHair(item){}
  compareGender(item){}
  compareWeight(item){}

}

class Creating {
  displayChosen(){}
  getButtons(){}


}

let creating = new Creating();

//*--------eventlistener dropdown
document.getElementById("choosingChars").addEventListener("submit", () => {
//empty select
chosenCharacters.length = 0;
renderedDiv.innerHTML = "";

let userChosenOne = dropdown1.value;
let userChosenTwo = dropdown2.value;

if(userChosenOne === userChosenTwo){
  renderedDiv.innerHTML = `<h3>These are not the droids you are looking for. Please choose two different characters!</h3>`
}
else { 
  //fixing pics:
  let imgCharacterOne = `./img/${userChosenOne}.png`;
  let imgCharacterTwo = `./img/${userChosenTwo}.png`;

  console.log(userChosenOne);
}
//splittar till array, sedan gör vi till string:
userChosenOne = userChosenOne.split("-").join(" ");
userChosenTwo = userChosenTwo.split("-").join(" ");

//förbereder url-länk till API:
 let characterOne= `https://swapi.dev/api/people?search=${userChosenOne}`
 console.log("test " + characterOne);
 let characterTwo = `https://swapi.dev/api/people?search=${userChosenTwo}`

 //getting API:
getAPI(characterOne).then((data) => {
  let characterConst = data.results.pop(); 
  //tar bort från arrayen och in i constructorn:
  let characterOne = new Character(characterConst.name, characterConst.gender, characterConst.height, characterConst.mass, characterConst.hair_color, imgCharacterOne)
  chosenCharacters.push(characterOne);
  creating.displayChosen(characterOne,imgCharacterOne);
  getAPI(characterTwo).then((data) => {
  let characterConst = data.results.pop();
  let characterTwo = new Character(characterConst.name, characterConst.gender, characterConst.height, characterConst.mass, characterConst.hair_color, imgCharacterTwo)
  chosenCharacters.push(characterTwo);
  creating.displayChosen(characterTwo,imgCharacterTwo);
})
})

})

async function getAPI(url){
  let result = await fetch(url);
  let data = await result.json();

  return data;
}