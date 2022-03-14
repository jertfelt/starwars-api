let characterArray = [];
let chosenCharacters = [];

//some DOM keys: 
let dropdown1 = document.getElementById("dropdown");
let dropdown2 = document.getElementById("dropdown2");
let renderedDiv = document.getElementById("inHereTheyShallBe");

class FetchingAPI{
  
async getCharacters(){
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
}

class Create {
  displayCharacterDropDown(characters){
    
    let option = "";
    
    characters.forEach(character => {
     
      option += `
      <option id="${character.name}" 
      value="${character.url}">
      ${character.name}
      </option>
      `
    });
  
    document.getElementById("dropdown2").innerHTML = option;
    document.getElementById("dropdown").innerHTML = option; 
  }
  displayChosenCharacters(url,character){
    let articleElem = document.createElement("article");
    articleElem.classList.add("characters--row");
   
    articleElem.innerHTML = `
    <div class="character--article">
    <img src="${url}" alt ="Picture of your chosen character">
    `
    renderedDiv.appendChild(articleElem);
  
    let buttonDiv = document.createElement("div");
    buttonDiv.innerHTML = `<h3>${character.name}</h3>`

    let buttWeight = document.createElement("button");
    let buttGender = document.createElement("button");
    let buttHair = document.createElement("button");
    let buttHeight = document.createElement("button");
    buttHeight.innerText = "Compare height";
    buttHair.innerText = "Compare hair";
    buttWeight.innerText = "Compare weight";
    buttGender.innerText = "Compare gender";

    buttonDiv.classList.add("button--comparisons");
    buttonDiv.append(buttGender, buttWeight,buttHeight, buttHair);
    articleElem.append(buttonDiv);
 

   }
} 

class Character{
constructor(_name, _gender, _height, _mass, _haircolor, _pictureUrl){
  this.name = _name;
  this.gender = _gender;
  this.height = _height;
  this.mass = _mass;
  this.hairColor = _haircolor;
  this._pictureUrl = _pictureUrl;
}
  compareHeight(item){
    let myHeight = parseInt(item.height);
    let otherHeight = parseInt(this.height);
    if (myHeight > otherHeight){
      articleElem.innerText = ``;
    }
    else {
      articleElem.innerText = ``;
    }
  }
  compareWeight(item){
    if(item.mass >= this.mass){
      articleElem.innerText = ``;
    }
    else {
      articleElem.innerText = ``
    }
  }


}

class Comparing extends Character{
  constructor( _name, _gender, _height, _mass, _hairColor, _pictureUrl){
    super ( _name, _gender, _height, _mass, _hairColor, _pictureUrl);
}

}


//*--------Loading page
let character = new Character();
let creating = new Create();
let fetching = new FetchingAPI();
  
fetching.getCharacters().then(characters => { 
  creating.displayCharacterDropDown(characters)
});


//*------------Submitting form
document.getElementById("fetchData").addEventListener("click", (event) => { 

event.preventDefault();
  //reading the choices:
  chosenCharacters.length = 0; 
    renderedDiv.innerHTML ="";
    let userChosenOne = dropdown1.value;
    let userChosenTwo = dropdown2.value;
    let chosenOneName = dropdown1.options[dropdown1.selectedIndex].id;
    let chosenTwoName = dropdown2.options[dropdown2.selectedIndex].id;

    if (userChosenOne === userChosenTwo){
      renderedDiv.innerHTML = `<h3>These are not the droids you are looking for.
      Please choose two different characters!</h3>`
    }
    else {
      let imgCharacterOne = `./img/${chosenOneName}.png`;
      let imgCharacterTwo = `./img/${chosenTwoName}.png`;
      console.log(userChosenOne);
    
   
    
    getOnlyData(userChosenOne).then((data) => {
        let characterConstructor = data;
        let chosenCharacterOne = new Character (characterConstructor.name, characterConstructor.gender, characterConstructor.height, characterConstructor.weight, characterConstructor.hairColor, imgCharacterOne);
        console.log(chosenCharacterOne);
        creating.displayChosenCharacters(imgCharacterOne, chosenCharacterOne);
      

    getOnlyData(userChosenTwo).then((data) => {
        let characterConstructor = data;
        let chosenCharacterTwo = new Character (characterConstructor.name, characterConstructor.gender, characterConstructor.height, characterConstructor.weight, characterConstructor.hairColor, imgCharacterTwo);
        console.log(chosenCharacterTwo)
        creating.displayChosenCharacters(imgCharacterTwo, chosenCharacterTwo);
        
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



// document.addEventListener('keydown', function(event){
// 	if(event.key === "Escape"){
// 		cartOpacity.classList.remove("transparentBcg");
//     cartMenu.classList.remove("showCart");
// 	}
// });