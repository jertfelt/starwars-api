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
    resultAnswer.classList.remove("hidden");
    let otherCharHair = person.hairColor;
    resultAnswer.classList.add("answered");
   
    if (otherCharHair === "n/a"){
      if (this.hairColor === "none" || this.hairColor === "n/a"){
        resultAnswer.innerHTML=`
        <h3>${this.name}:</h3>
        <h4>"Sadly, none of us has any hair"</h4>`
      }
      else {
        resultAnswer.innerHTML=`
        <h3>${this.name}:</h3>
        <h4>"I have ${this.hairColor} hair, ${person.name} does not have any hair."</h4>`
      }
    }
    else if (this.hairColor === "none" || this.hairColor === "n/a"){
      if (otherCharHair === "n/a" || otherCharHair === "none"){
        resultAnswer.innerHTML=`
        <h3>${this.name}:</h3>
        <h4>"None of us has any hair"</h4>`
      }
      else {
        resultAnswer.innerHTML=`<h3>${this.name}:</h3> 
        <h4>"I have no hair, ${person.name} does have ${otherCharHair} hair."</h4>`
      }
    }
    else{
      resultAnswer.innerHTML=`<h3>${this.name}:</h3>
      <h4>" ${person.name} does have ${otherCharHair} hair and I have lovely ${this.hairColor} hair."</h4>`
    }
   
  }

comparingGender(person){
    resultAnswer.classList.remove("hidden");
    let otherCharGender = person.gender;
    let thisGender = this.gender;
    resultAnswer.classList.add("answered");
 
    if (otherCharGender === "n/a" || thisGender === "n/a"){
      if (otherCharGender === "n/a" && thisGender === "n/a"){
        resultAnswer.innerHTML=`<h3>${this.name}:</h3>
        <h4>"Gender is such a human construction, is it not? We AI do not dabble into this."</h4>`
      }
      else if (otherCharGender === "n/a"){
        resultAnswer.innerHTML=`<h3>${this.name}:</h3>
        <h4>"I am ${this.gender}, but my robot friend ${person.name} here has no gender."</h4>`
      }
      else if (thisGender === "n/a"){
        resultAnswer.innerHTML=`<h3>${this.name}:</h3>
        <h4>"I have no gender. But ${person.name} is supposed to be a ${otherCharGender}."</h4>`
      }
    }
    else {
      if (thisGender === otherCharGender && thisGender !== "n/a"){
        resultAnswer.innerHTML=`<h3>${this.name}:</h3>
        <h4>"Both ${person.name} and I were born as ${thisGender}, and are defined by the society as ${otherCharGender}."</h4>`
      }
      else if (thisGender !== otherCharGender){
      resultAnswer.innerHTML=`<h3>${this.name}:</h3>
      <h4>"I was born as a ${thisGender}. ${person.name} is defined by the society as a ${otherCharGender}."</h4>`}
    }

  }
  
comparingWeight(person){
   
  resultAnswer.classList.remove("hidden");
    let otherCharWeight = parseInt(person.mass)
    let thisWeight = parseInt(this.mass)
    
    if (otherCharWeight < thisWeight){
      let weightResult = (thisWeight - otherCharWeight);
      resultAnswer.innerHTML=`<h3>${this.name}:</h3>
      <h4>"I weigh ${this.mass} kilos and ${person.name} weights ${person.mass} kilos. I am heavier, with ${weightResult} kilos difference."</h4>`}
   
    else if (otherCharWeight > thisWeight){
      let weightResult = (otherCharWeight - thisWeight);
      resultAnswer.innerHTML=`<h3>${this.name}:</h3>
      <h4>"I weigh ${this.mass} kilos and ${person.name} weights ${person.mass} kilos. I am therefore lighter with ${weightResult} kilos difference."</h4>`
    }
    else {
      resultAnswer.innerHTML=`<h3>${this.name}:</h3>
      <h4>"I weigh ${this.mass} kilos and ${person.name} weights ${person.mass} kilos. We share the same weight!"</h4>`
    }
}

comparingHeight(person){
    resultAnswer.classList.remove("hidden");
    let otherCharHeight = parseInt(person.height)
    let thisHeight = parseInt(this.height)
    if (otherCharHeight < thisHeight){
      let heightResult = (thisHeight - otherCharHeight);
    resultAnswer.innerHTML=`<h3>${this.name}:</h3>
    <h4>"I am ${thisHeight}cm tall, and ${person.name} is ${otherCharHeight} cm tall. I am therefore taller with ${heightResult} centimeters difference."</h4>`
    }
    else if (otherCharHeight > thisHeight){
      let heightResult = (otherCharHeight -thisHeight);

      resultAnswer.innerHTML=`<h3>${this.name}:</h3>
      <h4>"I am ${thisHeight}cm tall, and ${person.name} is ${otherCharHeight} cm tall. ${person.name} is ${heightResult} cm taller than me."</h4>`
    }
    else {
      resultAnswer.innerHTML=`<h3>${this.name}:</h3>
      <h4>"I am ${thisHeight}cm tall, and ${person.name} is ${otherCharHeight} cm tall. We are then of the same height!"</h4>`
    }
  }
}

class Comparing { 

classToggle1(){
    resultAnswer.classList.remove("hidden");
    resultAnswer.classList.remove("right");
    resultAnswer.classList.add("left");
}
classToggle2(){
    resultAnswer.classList.remove("hidden");
    resultAnswer.classList.remove("left");
    resultAnswer.classList.add("right");
}

        // if (window.screen.width <= 980){
      //   const resultAnswerNew = resultAnswer;
      //   let articleMobile = document.getElementById(`faq ${chosenCharacters[0].name}`);
      //   articleMobile.appendChild(resultAnswerNew);
      // }
async compareHeight(item, character){
  item.addEventListener("click", () =>{
    resultAnswer.style.display ="flex";
    if(character.name === chosenCharacters[0].name){
      character.comparingHeight(chosenCharacters[1])
      this.classToggle1();
      let articleUnder = document.getElementById(`faq ${character.name}`);
      articleUnder.appendChild(resultAnswer);
    } else{
      character.comparingHeight(chosenCharacters[0])
      this.classToggle2();
      let articleUnder = document.getElementById(`faq ${character.name}`);
      articleUnder.appendChild(resultAnswer);
    }
    //*---new button:
    creating.chooseNew();
  })
}

async compareWeight(item, character){
  item.addEventListener("click", () =>{
    resultAnswer.style.display ="flex";
    if(character.name === chosenCharacters[0].name){ 
      character.comparingWeight(chosenCharacters[1])
      this.classToggle1();
      let articleUnder = document.getElementById(`faq ${character.name}`);
      articleUnder.appendChild(resultAnswer);
    } else{
      character.comparingWeight(chosenCharacters[0])
    this.classToggle2();
    let articleUnder = document.getElementById(`faq ${character.name}`);
    articleUnder.appendChild(resultAnswer);
    creating.chooseNew();
  }})
}

async compareHairs(item, character){
  item.addEventListener("click", () =>{
    resultAnswer.style.display ="flex";
    if(character.name === chosenCharacters[0].name){
      character.comparingHair(chosenCharacters[1])
      this.classToggle1();
      let articleUnder = document.getElementById(`faq ${character.name}`);
      articleUnder.appendChild(resultAnswer);
    } else{
      character.comparingHair(chosenCharacters[0])
      this.classToggle2();
      let articleUnder = document.getElementById(`faq ${character.name}`);
      articleUnder.appendChild(resultAnswer);
    }
    creating.chooseNew();
  })
}

async compareGenders(item, character){
    item.addEventListener("click", () =>{
      resultAnswer.style.display ="flex";
      if(character.name === chosenCharacters[0].name){
      character.comparingGender(chosenCharacters[1])
        this.classToggle1();
        let articleUnder = document.getElementById(`faq ${character.name}`);  
        articleUnder.appendChild(resultAnswer);
      } else{
      character.comparingGender(chosenCharacters[0])
        this.classToggle2();
        let articleUnder = document.getElementById(`faq ${character.name}`);
        articleUnder.appendChild(resultAnswer);
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
    articleElem.setAttribute("id", `${character.name}`)
    articleElem.innerHTML = `
    <div class="character--article ${character.name}">
      <h2>${character.name}</h2>
      <img src="${url}" 
      alt ="Picture of ${character.name}">
      <div class="faq ${character.name}"
      id = "faq ${character.name}">
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
  //*--try again button
  chooseNew(){
    let tryAgain = document.getElementById("tryAgain");
    tryAgain.classList.add("button--tryagain");
    tryAgain.classList.remove("hidden");

    tryAgain.addEventListener("click", (event) => {
      event.preventDefault();
      submitButton.classList.remove("hidden");
      form.classList.remove("hidden");
      resultAnswer.classList.add("black");
      resultAnswer.classList.remove("right", "left");
      resultAnswer.classList.add("hidden");
      resultAnswer.style.display ="none";
      renderedDiv.style.display ="none";
      submitButton.removeAttribute("disabled");
      tryAgain.classList.remove("button--tryagain");
      tryAgain.classList.add("hidden");
    })
  }
} 
  

//*--------Loading page
let persons = new Character();
let creating = new Create();
let fetching = new FetchingAPI();
let compare = new Comparing();


//*---loading fetch animation:
const preload = document.getElementById("preload");
const preloadContent = document.querySelector(".spinnerloading");
const loading = document.getElementById("loadingChars");
const loaderChar = document.getElementById("spinner");
const quotes = ["Do. Or do not. There is no try. - Yoda", "May the Force be with you. - Obi-Wan Kenobi", "Your focus determines your reality. - Qui-Gon Jinn", "Never tell me the odds! - Han Solo", "I find your lack of faith disturbing. - Darth Vader", "I’m one with the Force. The Force is with me - Chirrut Îmwe", "Chewie, we’re home. - Han Solo"];

const interval = 2000;
const loadQuotes = (arr) => {

  setInterval(() => {
    preloadContent.innerText = arr [Math.floor(Math.random() * arr.length)];
  }, interval)
}
const init = () => {
 loadQuotes(quotes);
 renderedDiv.innerHTML =`<h3>Loading...</h3>`
}
init();

//*--fetching to dropdown 
fetching.getCharacters().then(characters => { 
  preload.classList.add("hidden");
  renderedDiv.innerHTML ="";
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
      renderedDiv.style.display ="flex";
      submitButton.setAttribute("disabled","disabled");
      resultAnswer.classList.remove("black");
    //*----giving images to character:
    let imgCharacterOne = `./img/${chosenOneName}.png`;
    let imgCharacterTwo = `./img/${chosenTwoName}.png`;
    
    //*eventuell animation om fetch dröjer
    init();
 
    //*---fetching characters from URL
  fetching.getOnlyData(userChosenOne).then((data) => {
    console.log(userChosenOne);
    preload.classList.add("hidden");
    renderedDiv.innerHTML ="";
    let characterConstructor = data;
    let chosenCharacterOne = new Character (characterConstructor.name, characterConstructor.gender, characterConstructor.height, characterConstructor.mass, characterConstructor.hair_color, imgCharacterOne);
    console.log(chosenCharacterOne);
    //push it and then just array it so I can get my arrayfunctions
    chosenCharacters.push(chosenCharacterOne);

    //displaying chosen + buttons:
    submitButton.classList.add("hidden");
    form.classList.add("hidden");
    loading.classList.add("hidden");
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




