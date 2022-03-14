// /* Old code - this one worked with a find function on the object, as well as parent and child of Character, but I later on had trouble using the parameters when selecting (transferring from objects to array back to object again) so I started over trying another approach*/ 


// const characterArray = [];
// let dropdownOption1 = document.getElementById("dropdown");
// let dropdownOption2 = document.getElementById("dropdown2");

// class Character{
//   constructor(_name, _gender, _height, _mass, _hairColor, _pictureUrl){
//     this.name = _name;
//     this.gender =_gender;
//     this.height =_height;
//     this.mass = _mass;
//     this.hairColor = _hairColor;
//     this.pictureUrl =_pictureUrl;
 
//   }

//   async getCharacters(){
//     try {
//       let result = await fetch('https://swapi.dev/api/people/?format=json');
//       let data = await result.json();  
//       let characters = data.results;
//       characters.forEach((item) => {
//        characterArray.push(item);
//       }) 
//       return characters;
//     } catch (error) {
//       console.log(error);
//     }
//   }  

//   weightCompare(item){
//     if (item.mass > this.mass){
      
//     }

//   }
 
// }

// class FirstCharacter extends Character{
//   addingCharactersToSelection() {
//     let userChoice1 = dropdownOption1.value;
//     let userChoice2 = dropdownOption2.value;
//     if (userChoice1 === userChoice2){
//     alert("Please choose two different characters");}
//     const character1 = characterArray.find(x => x.name === userChoice1);
//     return character1;
//     }

//   addingCharacter(character1){
//     this.name = character1.name;
//     this.gender = character1.gender;
//     this.height = character1.height;
//     this.mass = character1.mass;
//     this.hairColor = character1.hair_color;
//   }

//   addingPicture(){
//     if (this.name ==="Luke Skywalker") {
//       this.pictureUrl("./img/luke.png")
//     }

//     if (this.name ==="Biggs Darklighter") {
//       this.pictureUrl("./img/biggs.png")
//     }

//     if (this.name ==="C-3PO") {
//       this.pictureUrl("./img/c3po.png")
//     }

//     if (this.name ==="Darth vader") {
//       this.pictureUrl("./img/darthvader.png")
//     }

//     if (this.name ==="Obi-Wan Kenobi") {
//       this.pictureUrl("./img/obiwan.png")
//     }

//     if (this.name ==="Owen Lars") {
//       this.pictureUrl("./img/owen.png")
//     }

//     if (this.name ==="Leia Organa") {
//       this.pictureUrl("./img/leila.png")
//     }

//     if (this.name ==="R2-D2") {
//       this.pictureUrl("./img/r2d2.png")
//     }

//     if (this.name ==="Beru Whitesun lars") {
//       this.pictureUrl("./img/beruwhitesun.png")
//     }

//     if (this.name ==="R5-D4") {
//       this.pictureUrl("./img/r5d4.png")
//     }
//   }

//   // Klassen ska även innehålla metoder för att jämföra karaktärens egna egenskaper med en annan karaktär 
// }

// class SecondCharacter extends Character{
//   constructor(_name, _id, _gender, _height, _mass, _hairColor, _pictureUrl){
//     super (_pictureUrl);
//     this.name = _name;
//     this.gender =_gender;
//     this.height =_height;
//     this.mass = _mass;
//     this.hairColor = _hairColor;
//     this.pictureUrl =_pictureUrl;
//   }

//   addingSecondCharacter(){
 
//     let userChoice2 = dropdownOption2.value;
  

//     const character2 = characterArray.find(x => x.name === userChoice2);
//     this.name = character2.name;
//     this.gender = character2.gender;
//     this.height = character2.height;
//     this.mass = character2.mass;
//     this.hairColor = character2.hair_color;
  
//   }
// }

// class Creating{

//   displayCharacter(characters){
    
//     let option = "";
//     characters.forEach(character => {
//       option += `
//       <option id="${character.name}" 
//       value="${character.name}">
//       ${character.name}
//       </option>
//       `
//     });
  
//     document.getElementById("dropdown2").innerHTML = option;
//     document.getElementById("dropdown").innerHTML = option; 
//   }

//   displayChosenCharacters(character1, character2){
//     const CharacterResult = document.getElementById("inHereTheyShallBe");

//     CharacterResult.innerHTML=`
//     <article>
//     <h3>Your chosen heroes are:</h3><br>
//     <p>${character2.name}</p><br>
//     <p>${character1.name}</p>`
//   }
// }

// //calling:
//   let character = new Character();
//   let creating = new Creating();
//   let firstcharacter = new FirstCharacter();
//   let secondCharacter = new SecondCharacter();

//   character.getCharacters().then(characters => {
//     creating.displayCharacter(characters)
//   });

//   //event listener 
// document.getElementById("choosingChars").addEventListener("submit", () => { 
//   console.log("") //inserted because of bug
//   console.log("tryckt")

//   character.getCharacters().then(characters => {
//   firstcharacter.addingCharactersToSelection(characters)}).then(secondCharacter.addingSecondCharacter()).then(character1, character2 => { creating.displayChosenCharacters(character1, character2)});


// })

