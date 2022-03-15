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

//om tid: lägg in en setTimeOut animation på ovan och den andra 

class Character{
  constructor(name, gender, height, mass, hairColor, pictureUrl){
    this.name = name;
    this.gender = gender;
    this.height = height;
    this.mass = mass;
    this.hairColor = hairColor;
    this.pictureUrl = pictureUrl;
  }

  
  comparingWeight(person){
    console.log(person.mass)
    let otherCharWeight = parseInt(person.mass)
    let thisWeight = parseInt(this.mass)
    console.log(this.mass)
  }

  comparingHeight(person){
    console.log(person.height)
    let otherCharHeight = parseInt(person.height)
    let thisHeight = parseInt(this.height)
    console.log(this.height)
  }
   
  }

  class Comparing {
    
//transforming so we can read from the new Characters:
async  compareHeight(item, character){
  item.addEventListener("click", () =>{
    if(character.name === chosenCharacters[0].name){
      character.comparingHeight(chosenCharacters[1])
    } else{
      character.comparingHeight(chosenCharacters[0])
    }
  })
}

async  compareWeight(item, character){
  item.addEventListener("click", () =>{
    if(character.name === chosenCharacters[0].name){
      character.comparingWeight(chosenCharacters[1])
    } else{
      character.comparingWeight(chosenCharacters[0])
    }
  })
}

async  compareHairs(item, character){
  item.addEventListener("click", () =>{
    if(character.name === chosenCharacters[0].name){
      character.comparingHair(chosenCharacters[1])
    } else{
      character.comparingHair(chosenCharacters[0])
    }
  })
}

async  compareGenders(item, character){
  item.addEventListener("click", () =>{
    if(character.name === chosenCharacters[0].name){
      character.comparingGender(chosenCharacters[1])
    } else{
      character.comparingGender(chosenCharacters[0])
    }
  })
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
      <img src="${url}" 
      alt ="Picture of ${character.name}">
      <div class="faq"
        id="${character.name}Answer">
      <p>Compare us, you shall!</p>
        <div class="button--comparisons">

        <button 
        class="QuestionCharacter ${character.name}" 
        id="${character.name}Height">
        Compare height</button>

        <button
        class="QuestionCharacter ${character.name}" id="${character.name}Weight">
        Compare weight</button>

        <button 
        class="QuestionCharacter ${character.name}" 
        id="${character.name}Gender">
        Compare gender</button>

        <button class="Question" 
        id="${character.name}Hair">
        Compare hair</button>
        </div>
      </div>
    </div>
    `
    renderedDiv.appendChild(articleElem);

   }
  //*--(and a heckload of buttons with listeners)
   buttons(character){

    const resultDiv = document.createElement("article");
    renderedDiv.appendChild(resultDiv);
 
    const characterWeightButt = document.getElementById(`${character.name}Weight`);
    const characterOneHeightButt = document.getElementById(`${character.name}Height`);
    const characterOneHairButt = document.getElementById(`${character.name}Hair`);
    const characterOneGenderButt = document.getElementById(`${character.name}Gender`);

   compare.compareHeight(characterOneHeightButt, character);
  
  //  characterWeightButt.addEventListener("click", async (e) => {
  //   persons.compareWeight(character);
  //   })

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
let persons = new Character();
let creating = new Create();
let fetching = new FetchingAPI();
let compare = new Comparing();

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
        let chosenCharacterOne = new Character (characterConstructor.name, characterConstructor.gender, characterConstructor.height, characterConstructor.mass, characterConstructor.hair_color, imgCharacterOne);
        chosenCharacters.push(chosenCharacterOne);
        creating.displayChosenCharacters(imgCharacterOne, chosenCharacterOne);
        creating.buttons(chosenCharacterOne);
        

    getOnlyData(userChosenTwo).then((data) => {
        let characterConstructor = data;
        let chosenCharacterTwo = new Character (characterConstructor.name, characterConstructor.gender, characterConstructor.height, characterConstructor.mass, characterConstructor.hair_color, imgCharacterTwo);
        chosenCharacters.push(chosenCharacterTwo);
        creating.displayChosenCharacters(imgCharacterTwo, chosenCharacterTwo);
        creating.buttons(chosenCharacterTwo)
    })
  })
    }
})

//transforming so we can read from the new Characters:
async function compareHeight(item, character){
  item.addEventListener("click", () =>{
    if(character.name === chosenCharacters[0].name){
      character.comparingHeight(chosenCharacters[1])
    } else{
      character.comparingHeight(chosenCharacters[0])
    }
  })
}

async function compareWeight(item, character){
  item.addEventListener("click", () =>{
    if(character.name === chosenCharacters[0].name){
      character.comparingWeight(chosenCharacters[1])
    } else{
      character.comparingWeight(chosenCharacters[0])
    }
  })
}

async function compareHairs(item, character){
  item.addEventListener("click", () =>{
    if(character.name === chosenCharacters[0].name){
      character.comparingHair(chosenCharacters[1])
    } else{
      character.comparingHair(chosenCharacters[0])
    }
  })
}

async function compareGenders(item, character){
  item.addEventListener("click", () =>{
    if(character.name === chosenCharacters[0].name){
      character.comparingGender(chosenCharacters[1])
    } else{
      character.comparingGender(chosenCharacters[0])
    }
  })
}



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




