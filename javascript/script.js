let characterArray = [];
let chosenCharacters = [];

//some DOM keys: 
let dropdown1 = document.getElementById("dropdown");
let dropdown2 = document.getElementById("dropdown2");
let renderedDiv = document.getElementById("inHereTheyShallBe");
let form = document.querySelector(".choose");
let resultAnswer = document.getElementById("results");

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

async getOnlyData (url){
  try{
  let result = await fetch(url);
  let data = await result.json();
  return data;}
  catch(error){
    console.log(url);
    console.log(error)
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

  comparingHair(person){
    let otherCharHair = person.hairColor;
    resultAnswer.classList.add("answered");
    if (otherCharHair === "n/a" || this.hairColor === "none"){
      if (this.hairColor === "none" || this.hairColor === "n/a"){
        resultAnswer.innerHTML="<h4>Sadly,none of us has any hair</h4>"
      }
      else {
        resultAnswer.innerHTML=`<h4>I have ${this.hairColor} hair, ${person.name} does not</h4>`
      }
    }
    else if (this.hairColor === "none" || this.hairColor === "n/a"){
      if (otherCharHair === "n/a" || otherCharHair === "none"){
        resultAnswer.innerHTML="<h4>None of us has any hair</h4>"
      }
      else {
        resultAnswer.innerHTML=`<h4>I have no hair, ${person.name} does have ${otherCharHair} hair.</h4>`
      }
    }
    else{
      resultAnswer.innerHTML=`<h4> ${person.name} does have ${otherCharHair} hair and I have lovely ${this.hairColor} hair. </h4>`
    }
   
  }

  comparingGender(person){
    console.log(person.gender)
    console.log(this.gender)
    let otherCharGender = person.gender;
    let thisGender = this.gender;
    resultAnswer.classList.add("answered");
 
    if (otherCharGender === "n/a" || thisGender === "n/a"){
      if (otherCharGender === "n/a" && thisGender === "n/a"){
        resultAnswer.innerHTML=`<h4>Gender is such a human construction, is it not? We AI do not dabble into this.</h4>`
      }
      else if (otherCharGender === "n/a"){
        resultAnswer.innerHTML=`<h4>I am ${this.gender}, but my robot friend ${person.name} here has no gender. It is rude to ask why.</h4>`
      }
      else if (thisGender === "n/a"){
        resultAnswer.innerHTML=`<h4>I have no gender. But ${person.name} is supposed to be a ${otherCharGender}.</h4>`
      }
    }
    else {
      resultAnswer.innerHTML=`<h4>I was born as a ${thisGender}. ${person.name} is defined by the society as a ${otherCharGender}.</h4>`
    }

  }
  
  comparingWeight(person){
    let otherCharWeight = parseInt(person.mass)
    let thisWeight = parseInt(this.mass)
    resultAnswer.classList.add("answered");
    if (otherCharWeight < thisWeight){
      if (this.name === "Obi-Wan Kenobi"){
        resultAnswer.innerHTML=`<h4>I weigh ${this.mass} kilos and ${person.name} weights ${person.mass} kilos. I am heavier? I sense a disturbance in the force</h4>`
      }
      else {
      resultAnswer.innerHTML=`<h4>I weigh ${this.mass} kilos and ${person.name} weights ${person.mass} kilos. I am heavier.</h4>`}
    }
    else if (otherCharWeight > thisWeight){
      resultAnswer.innerHTML=`<h4>I weigh ${this.mass} kilos and ${person.name} weights ${person.mass} kilos. I am lighter.</h4>`
    }
    else {
      resultAnswer.innerHTML=`<h4>I weigh ${this.mass} kilos and ${person.name} weights ${person.mass} kilos. We share the same weight!</h4>`
    }
  }

  comparingHeight(person){
    let otherCharHeight = parseInt(person.height)
    let thisHeight = parseInt(this.height)
    if (otherCharHeight < thisHeight){
      if (this.name === "Darth Vader"){
        resultAnswer.innerHTML=`<h4>Search your feelings, you know it to be true! I am ${thisHeight} tall, and ${person.name} is measly ${otherCharHeight} short. </h4>`
    }
    resultAnswer.innerHTML=`<h4> I am ${thisHeight}cm tall, and ${person.name} is ${otherCharHeight} cm tall. I am therefore taller. </h4>`
    }
    else if (otherCharHeight > thisHeight){
      resultAnswer.innerHTML=`<h4> I am ${thisHeight}cm tall, and ${person.name} is ${otherCharHeight} cm tall. I am therefore shorter. </h4>`
    }
    else {
      resultAnswer.innerHTML=`<h4> I am ${thisHeight}cm tall, and ${person.name} is ${otherCharHeight} cm tall. We are then the same! </h4>`
    }
  }
}

class Comparing {
    
//transforming so we can read from the new Characters:
async compareHeight(item, character){
  item.addEventListener("click", () =>{
    if(character.name === chosenCharacters[0].name){
      character.comparingHeight(chosenCharacters[1])
    } else{
      character.comparingHeight(chosenCharacters[0])
    }
  })
}

async compareWeight(item, character){
  item.addEventListener("click", () =>{
    if(character.name === chosenCharacters[0].name){
      character.comparingWeight(chosenCharacters[1])
    } else{
      character.comparingWeight(chosenCharacters[0])
    }
  })
}

async compareHairs(item, character){
  item.addEventListener("click", () =>{
    if(character.name === chosenCharacters[0].name){
      character.comparingHair(chosenCharacters[1])
    } else{
      character.comparingHair(chosenCharacters[0])
    }
  })
}

async compareGenders(item, character){
    item.addEventListener("click", () =>{
      if(character.name === chosenCharacters[0].name){
      character.comparingGender(chosenCharacters[1])
      } else{
      character.comparingGender(chosenCharacters[0])
      }
    creating.chooseNew();
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
      <div class="faq ${character.name}">
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

        <button class="QuestionCharacter ${character.name}" 
        id="${character.name}Hair">
        Compare hair</button>
        </div>
      </div>
    </div>
    `
    renderedDiv.appendChild(articleElem);

   }
  //*--giving commands to buttons:
   buttons(character){

    const characterOneWeightButt = document.getElementById(`${character.name}Weight`);
    const characterOneHeightButt = document.getElementById(`${character.name}Height`);
    const characterOneHairButt = document.getElementById(`${character.name}Hair`);
    const characterOneGenderButt = document.getElementById(`${character.name}Gender`);


    //functions in compare class:
    compare.compareHeight(characterOneHeightButt, character);
    compare.compareWeight(characterOneWeightButt,character);
    compare.compareGenders(characterOneGenderButt, character);
    compare.compareHairs(characterOneHairButt, character);

  }

  chooseNew(){
    let tryAgain = document.createElement("button");
    resultAnswer.appendChild(tryAgain);
    tryAgain.innerText = "Try again?"
    tryAgain.classList.add("button--tryagain");
    tryAgain.addEventListener("click", (event) => {
      event.preventDefault();
      submitButton.classList.remove("hidden");
      form.classList.remove("hidden");
      resultAnswer.classList.add("hidden");
      renderedDiv.style.visibility ="hidden";
      const takeAway =  document.querySelector("article:first-child");
      const takeAway2 =  document.querySelector("article:last-child");
      renderedDiv.removeChild(takeAway);
      renderedDiv.removeChild(takeAway2);
    })
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

const submitButton = document.getElementById("fetchData");

submitButton.addEventListener("click", (event) => { 
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
    else {
          //*----giving images to character:
      let imgCharacterOne = `./img/${chosenOneName}.png`;
      let imgCharacterTwo = `./img/${chosenTwoName}.png`;

    //*---fetching characters from URL
  fetching.getOnlyData(userChosenOne).then((data) => {
    let characterConstructor = data;
    let chosenCharacterOne = new Character (characterConstructor.name, characterConstructor.gender, characterConstructor.height, characterConstructor.mass, characterConstructor.hair_color, imgCharacterOne);
        //push it and then just array it so I can get my arrayfunctions
        chosenCharacters.push(chosenCharacterOne);
        //displaying chosen + buttons:
submitButton.classList.add("hidden");
form.classList.add("hidden");
        creating.displayChosenCharacters(imgCharacterOne, chosenCharacterOne);
        creating.buttons(chosenCharacterOne);
        

  fetching.getOnlyData(userChosenTwo).then((data) => {
    let characterConstructor = data;
    let chosenCharacterTwo = new Character (characterConstructor.name, characterConstructor.gender, characterConstructor.height, characterConstructor.mass, characterConstructor.hair_color, imgCharacterTwo);
        chosenCharacters.push(chosenCharacterTwo);
        creating.displayChosenCharacters(imgCharacterTwo, chosenCharacterTwo);
        creating.buttons(chosenCharacterTwo)
    })
  })
    }
})

// //*---------async getOnlyData

// async function getOnlyData (url){
//   try{
//   let result = await fetch(url);
//   let data = await result.json();
//   return data;}
//   catch(error){
//     console.log(url);
//     console.log("getOnlyData fungerar ej")
//     console.log(error)
//   }
// }




