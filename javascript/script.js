let characterArray = [];
let chosenCharacters = [];

//some DOM keys: 
let dropdown1 = document.getElementById("dropdown");
let dropdown2 = document.getElementById("dropdown2");
let renderedDiv = document.getElementById("inHereTheyShallBe");

//loving me some class:
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

class Character{
  constructor(_name, _gender, _height, _mass, _haircolor, _pictureUrl){
    this.name = _name;
    this.gender = _gender;
    this.height = _height;
    this.mass = _mass;
    this.hairColor = _haircolor;
    this._pictureUrl = _pictureUrl;
  }

  compareHeight(character){
    

  }
  
  
  // compareWeight(character){
  //   let sum ="";
  //   let result = "";
  //   if ((parseInt.this.mass) < parseInt(character.mass)){
  //     sum = parseInt(character.mass) - parseInt(this.mass);

  //     result = `<p>${character.name} weighs ${character.mass} kilos. It is more than me. </p>`
  //   }
  //   else if (parseInt(this.mass) > parseInt(character.mass)) {

  //     sum = parseInt(this.mass) - parseInt(character.mass);
      
  //     result = `<p>${character.name} weighs ${character.mass} kilos. It is less than me. </p>`;

  //   }
  //   else {
  //   result = `<p>${character.name} weighs ${character.mass}. As much as I weigh! MASS BUDDIES!</p>`;
  //   }
  // }
  compareHair(){}
  
  
  compareGender(){
  
  }
  
   
  }
  

  //creating and displaying:
class Create {
  //*-----dropdown from fetch:
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
  //*------characters from choice 
  displayChosenCharacters(url,character){
    let articleElem = document.createElement("article");
    articleElem.classList.add("characters--row");
    articleElem.innerHTML = `
    <div class="character--article">
    <h2>${character.name}</h2>
    <img src="${url}" alt ="Picture of your chosen character">
    <div class="faq"
      id="${character.name}Answer">
    <p>Compare us, you shall!</p>
    <div class="button--comparisons">
    <button class="QuestionCharacterOne" id="${character.name}Height">Compare height</button>
    <button class="QuestionCharacterOne" id="${character.name}Weight">Compare weight</button>
    <button class="QuestionCharacterOne" id="${character.name}Gender">Compare gender</button>
    <button class="Question" id="${character.name}Hair">Compare hair</button>
    `
    renderedDiv.appendChild(articleElem);

   }
  //*--(and a heckload of buttons with listeners)
   buttons(character){

    const resultDiv = document.createElement("article");
    renderedDiv.appendChild(resultDiv);

    const characterOneWeightButt = document.getElementById(`${character.name}Weight`);
    const characterOneHeightButt = document.getElementById(`${character.name}Height`);
    const characterOneHairButt = document.getElementById(`${character.name}Hair`);
    const characterOneGenderButt = document.getElementById(`${character.name}Gender`);

    const characterTwoWeightButt = document.getElementById(`${character.name}Weight`);
    const characterTwoHeightButt = document.getElementById(`${character.name}Height`);
    const characterTwoHairButt = document.getElementById(`${character.name}Hair`);
    const characterTwoGenderButt = document.getElementById(`${character.name}Gender`);
    
    characterTwoWeightButt.addEventListener("click", async (e) => {
      let result = chosenCharacterOne.compareWeight(chosenCharacterTwo);

     resultDiv.innerText = result;
    })

  //   characterOneWeightButt.addEventListener("click", async (e) => {
  //     resultDiv.innerText = "Hello fatty"
  //    })

  //    characterOneHeightButt.addEventListener("click", async (e) => {
  //     resultDiv.innerText = "Hello one height"
  //    })

  //    characterTwoHeightButt.addEventListener("click", async (e) => {
  //     resultDiv.innerText = "Hello two height"
  //    })

  //    characterOneGenderButt.addEventListener("click", async (e) => {
  //     resultDiv.innerText = "Hello gender"
  //    })

  //    characterTwoGenderButt.addEventListener("click", async (e) => {
  //     resultDiv.innerText = "Hello butt"
  //    })

  //    characterTwoHairButt.addEventListener("click", async (e) => {
  //     resultDiv.innerText = "Hello hair two"
  //    })

  //    characterOneHairButt.addEventListener("click", async (e) => {
  //     resultDiv.innerText = "Hello hair"
  //    })
  }
} 


//*--------Loading page
let character = new Character();
let creating = new Create();
let fetching = new FetchingAPI();

//*--fetching to dropdown 
fetching.getCharacters().then(characters => { 
  creating.displayCharacterDropDown(characters)
});


//*------------Submitting form
document.getElementById("fetchData").addEventListener("click", (event) => { 

event.preventDefault();
  //reading the choices:
  chosenCharacters.length = 0; 
    renderedDiv.innerHTML ="";
    //*---need these for URL
    let userChosenOne = dropdown1.value;
    let userChosenTwo = dropdown2.value;
    //*---need these for names:
    let chosenOneName = dropdown1.options[dropdown1.selectedIndex].id;
    let chosenTwoName = dropdown2.options[dropdown2.selectedIndex].id;

    if (userChosenOne === userChosenTwo){
      renderedDiv.innerHTML = `<h3>These are not the droids you are looking for.
      Please choose two different characters!</h3>`
    }
    //*----giving images to character:
    else {
      let imgCharacterOne = `./img/${chosenOneName}.png`;
      let imgCharacterTwo = `./img/${chosenTwoName}.png`;
      // console.log(userChosenOne);
    //*---fetching characters from URL
    getOnlyData(userChosenOne).then((data) => {
        let characterConstructor = data;
        let chosenCharacterOne = new Character (characterConstructor.name, characterConstructor.gender, characterConstructor.height, characterConstructor.weight, characterConstructor.hairColor, imgCharacterOne);
        // console.log(chosenCharacterOne);
        creating.displayChosenCharacters(imgCharacterOne, chosenCharacterOne);
        creating.buttons(chosenCharacterOne);
      
    getOnlyData(userChosenTwo).then((data) => {
        let characterConstructor = data;
        let chosenCharacterTwo = new Character (characterConstructor.name, characterConstructor.gender, characterConstructor.height, characterConstructor.weight, characterConstructor.hairColor, imgCharacterTwo);
        creating.displayChosenCharacters(imgCharacterTwo, chosenCharacterTwo);
        creating.buttons(chosenCharacterTwo); 
    })
  })
    }
})




//*---------async getOnlyData

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




