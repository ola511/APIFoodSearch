// global variables
 const locationsLookup = "https://botw-compendium.herokuapp.com/api/v2/category/materials" //{}
 const itemsDatabase = document.querySelector("[data-user-search]")

const searchInput = document.querySelector("[data-search]");
const foodList = []; // Array to store food item objects
const imageUrls = []; // Array to store image URLs

// Define the function for fetching and displaying food items
function getArrayPressed() {
    // Get the input value and save it to localStorage
    const foodName = document.querySelector('input').value;
    localStorage.setItem('Food', JSON.stringify({ name: foodName }));
  
    // Make the API call to retrieve the data
    fetch('./data.json')
      .then(response => response.json())
      .then(data => {
        // Get the food list from the retrieved data
        const fetchedFoodList = data.data;
        // Clear the input field
        document.querySelector('input').value = '';
  
        // Create an array to store the filtered results
        const filteredFoods = [];
  
        // Loop through the food list and check if the name matches the search term
        for (let i = 0; i < fetchedFoodList.length; i++) {
          if (fetchedFoodList[i].name.toLowerCase().includes(foodName.toLowerCase())) {
            filteredFoods.push(fetchedFoodList[i]);
          }
        }
  
        // Get the container element and clear its contents
        const container = document.querySelector('#items-list-container');
        container.innerHTML = '';
  
        // Loop through the filtered results and create an HTML element for each item
        for (let i = 0; i < filteredFoods.length; i++) {
          const currFood = filteredFoods[i];
  
          let itemsName = currFood["name"]
          // parse out the details url
          let url = currFood["image"]
          let info = currFood["description"]
          let itemsLocation = currFood["common_locations"]
  
          imageUrls.push(url);
  
          itemsName = itemsName.toUpperCase();
  
          const html = `
            <div class="name">
              <div id="${itemsName.toLowerCase()}">
                <div class="info">
                  <p>${itemsName}</p>
                  <div class="description">
                    <p>${info}</p>
                  </div>
                  <div class="common-locations">
                    <p>${itemsLocation}</p>
                  </div>
                  <div class="img">
                  <img src="${url}" />
                </div>
                </div>
                
              </div>
            </div>
          `;
  
          container.innerHTML += html;
        }
      })
      .catch(error => {
        console.error('Error retrieving data:', error);
      });
  }

const locationsAdd = () => {
  fetch("./data.json")
    .then(response => response.json())
    .then(jsonData => {
      console.log("Data retrieved!")
      const fetchedFoodList = jsonData["data"];

      console.log(`we found ${fetchedFoodList.length}`)
      console.log(fetchedFoodList[0])

      const foodContainerElement = document.querySelector("#items-list-container")

      // - clear the element of any preexisting html
      foodContainerElement.innerHTML = "";

      // - loop through the json data and
      // programatically generate the HTML for each individual food
      const select = document.getElementById('btn-get-locations');
      select.innerHTML = ''; // Clear the drop-down list

      for (let i = 0; i < fetchedFoodList.length; i++) {
        const currFood = fetchedFoodList[i];

        let itemsName = currFood["name"]
        let itemsLocation = currFood["common_locations"]
        // format the name so the first letter is capitalized
        itemsName = itemsName.toUpperCase();

        const option = document.createElement('option');
        option.setAttribute('value', itemsName.toLowerCase());
        option.textContent = itemsLocation;
        select.appendChild(option);

        // Add the food information to the foodList array
        foodList.push({
          name: itemsName,
          location: itemsLocation,
          description: currFood["description"],
          image: currFood["image"],
        });
      }
    })
    .catch(error => {
      console.log("Error retrieving data");
      console.log(error);
    });
}

// event listeners
document.querySelector("#btn-get-array").addEventListener("click", getArrayPressed);
// Call locationsAdd function initially to populate the drop-down list
locationsAdd();
// Attach event listener to the drop-down list
const select = document.getElementById("btn-get-locations");
select.addEventListener("change", (e) => {
  const selectedItem = e.target.value.toLowerCase();
  const itemInfo = foodList.find((item) => item.name.toLowerCase() === selectedItem);

  // Get the container element to display the item information
  const container = document.querySelector("#items-list-container");
  container.innerHTML = "";
  // Create the HTML for the selected item's information
  const html = `
    <div class="name">
      <div id="${itemInfo.name.toLowerCase()}">
        <div class="info">
          <p>${itemInfo.name}</p>
          <div class="description">
            <p>${itemInfo.description}</p>
          </div>
          <div class="common-locations">
            <p>${itemInfo.location}</p>
          </div>
          <div class="img">
          <img src="${itemInfo.image}" />
        </div>
        </div>
      </div>
    </div>
  `;

  // Append the item information to the container
  container.innerHTML = html;
});
























// searchInput.addEventListener("input", e => {
//     const value = e.target.value.toLowerCase();
//     const container = document.querySelector('#items-list-container');
//     container.innerHTML = ''; // Clear the container before displaying search results
  
//     foodList.forEach(item => {
//       const isVisible = item.name.toLowerCase().includes(value);
      
//       if (isVisible) {
//         const html = `
//           <div class="name">
//             <div id="${item.name.toLowerCase()}">
//               <div class="info">
//                 <p>${item.name}</p>
//                 <div class="description">
//                   <p>${item.description}</p>
//                 </div>
//                 <div class="common-locations">
//                   <p>${item.location}</p>
//                 </div>
//               </div>
//               <div class="img">
//                 <img src="${item.image}" />
//               </div>
//             </div>
//           </div>
//         `;
//         container.innerHTML += html;
//       }
//     });
//   });
  



//const searchInput = document.querySelector("[data-search]")
// const itemsDatabase = []

// // Define the function
// function getArrayPressed() {
//     // Make the API call to retrieve the data
//     fetch('./data.json')
//       .then(response => response.json())
//       .then(data => {
//         // Get the food list from the retrieved data
//         const foodList = data.data;
        
//         // Get the input value and save it to localStorage
//         const foodName = document.querySelector('input').value;
//         localStorage.setItem('Food', JSON.stringify({name: foodName}));
        
//         // Clear the input field
//         document.querySelector('input').value = '';
  
//         // Create an array to store the filtered results
//         const filteredFoods = [];
  
//         // Loop through the food list and check if the name matches the search term
//         for (let i = 0; i < foodList.length; i++) {
//           if (foodList[i].name.toLowerCase().includes(foodName.toLowerCase())) {
//             filteredFoods.push(foodList[i]);
//           }
//         }
  
//         // Get the container element and clear its contents
//         const container = document.querySelector('#items-list-container');
//         container.innerHTML = '';
  
//         // Loop through the filtered results and create an HTML element for each item
//         for (let i = 0; i < filteredFoods.length; i++) {
//         //  const food = filteredFoods[i];
//          // itemsName = itemsName.toUpperCase();
//         //   const html = `
//         //     <div class="name">
//         //       <div id="${food.name.toLowerCase()}">
//         //         <div class="info">
//         //           <p>${food.name}</p>
//         //           <div class="description">
//         //             <p>${food.description}</p>
//         //           </div>
//         //           <div class="common-locations">
//         //             <p>${food.common_locations}</p>
//         //           </div>
//         //         </div>
//         //         <div class="img">
//         //           <img src="${food.image}" />
//         //         </div>
//         //       </div>
//         //     </div>
//         //   `;
//               const currFood = foodList[i]

//               let itemsName = currFood["name"]
//               // parse out the details url
//               let url = currFood["image"]
//               let info = currFood["description"]
//               let itemsLocation = currFood["common_locations"]

//               itemsDatabase.push(url)

//               itemsName = itemsName.toUpperCase();

//               const html = `
//                           <div class="name">
//                          <div id="${itemsName.toLowerCase()}">
        
//                          <div class="info"> <p>${itemsName}</p>
//                          <div class="info"> <p>${info}</p> </div>
//                          <div class="info"> <p>${itemsLocation}</p> </div>
//                         <div class="img"> <img src="${url}"/> </div>
//                         </div>
//                         `
//               container.innerHTML += html;
//           }
//       })
//         .catch(error => {
//             console.error('Error retrieving data:', error);
//         });
// }



// const locationsAdd = () => {
   
//     fetch("./data.json")
//         .then(
//             (response) => {
//                 return response.json()
//             }
//         )
//         .then(
//             (jsonData) => {
//                 console.log("Data retrieved!")
//                 const foodList = jsonData["data"]
              
             
                  
//                 console.log(`we found ${foodList.length}`)
//                 console.log(foodList[0])

//                 const foodContainerElement =
//                     document.querySelector("#items-list-container")

//                 // - clear the element of any preexisting html
//                 foodContainerElement.innerHTML = ""



              
//                 // - loop through the json data and
//                 // programatically generate the HTML for each individual food      
//                 for (let i = 0; i < foodList.length; i++) {
//                     const currFood = foodList[i]


//                     let itemsName = currFood["name"]
//                     let itemsLocation = currFood["common_locations"]
//                     // format the name so the first letter is capitalized
//                     itemsName = itemsName.toUpperCase();

//                     // itemslocations = itemslocations.toUpperCase() ;
//                     var select = document.getElementById('btn-get-locations');
//                     var option = document.createElement('option');
//                     option.setAttribute('value', 'option1');

 



//                     // const htmlToAppend = `
//                     option.innerHTML = `
//            <div>

//            <div id="${itemsName.toLowerCase()}">
//                <p>${itemsLocation}</p>
//            </div>
//        `
//                     // - append that html to the container
//                     //  foodContainerElement.innerHTML += htmlToAppend
//                     select.append(option);

//                 }



//                 //  }// end of if statment
//             })

//         .catch(
//             (error) => {
//                 console.log("Error retrieving data")
//                 console.log(error)
//             }
//         )
// }


// // event listeners
// document.querySelector("#btn-get-array").addEventListener("click", getArrayPressed)
// document.querySelector("#btn-get-locations").addEventListener("click", locationsAdd)
// searchInput.addEventListener("input", e => {
//     const value = e.target.value
//     // console.log(foodList)
//     itemsDatabase.forEach(foodList => {
//         const isVisible = itemsDatabase.name.includes(value)
//         foodList.element.classList.toggle("hide", !isVisible)
//     })
// })


// // functions 
// const getArrayPressed = () => {

//     fetch("./data.json")
//         .then(
//             (response) => {
//                 return response.json()
//             }
//         )
//         .then(
//             (jsonData) => {
//                 console.log("Data retrieved!")

//                 const foodList = jsonData["data"]
//                 const foodName = document.querySelector("input").value
//                 console.log(`Food type saved ${foodName}`)

//                 const foodToSave = {
//                     name: foodName
//                 }

//                 //clear the text box
//                 document.querySelector("input").value = ""

//                 localStorage.setItem("Food", JSON.stringify(foodToSave))

//                 const nameFromLS = localStorage.getItem("Food")

//                 console.log(nameFromLS)
//                 document.querySelector("#info").innerText = `The saved pokemon name is ${nameFromLS}`
               
//                 // 1e. Add the name eneter in the text box to the array of pokemonNames
//                 foodList.push(nameFromLS);

//                 // 2. save the object to localstorage   
//                 localStorage.setItem("FOOD", JSON.stringify(foodToSave))

//                 // 2b. save the array to localstorage
//                 localStorage.setItem("FOOD_NAMES_LIST", JSON.stringify(foodList))




//                 if (localStorage.hasOwnProperty("Food-name") === true) {

//                     console.log("we found the food name")


//                     // const listFromDB = JSON.parse(localStorage.getItem("Food"))


//                     // let div =  document.querySelector("#items-list-container")
//                     // div.innerHTML = ""

//                     // for (let i= 0 ; i < listFromDB.length ; i++){
//                     //     console.log(`the best food is ${listFromDB[i]}`);

//                     //     //output
//                     //     div.innerHTML += `<p>The best food is ${listFromDB[i]}`
//                     // }


//                 }
//                 const foodContainerElement =
//                     document.querySelector("#items-list-container")

//                 foodContainerElement.innerHTML = ""


//                 const itemsDatabase = []

//                 //   foodList.element.classList.toggle("hide", !isVisible)


//                 for (let i = 0; i < foodList.length; i++) {

//                     const currFood = foodList[i]

//                     let itemsName = currFood["name"]
//                     // parse out the details url
//                     let url = currFood["image"]
//                     let info = currFood["description"]
//                     let itemsLocation = currFood["common_locations"]

//                     itemsDatabase.push(url)

//                     itemsName = itemsName.toUpperCase();

//                     const htmlToAppend = `
//                   <div class="name">
//                  <div id="${itemsName.toLowerCase()}">

//                  <div class="info"> <p>${itemsName}</p>
//                  <div class="info"> <p>${info}</p> </div>
//                  <div class="info"> <p>${itemsLocation}</p> </div>
//                 <div class="img"> <img src="${url}"/> </div>
//                 </div>


//                 </div>
//                 `
//                     // - append that html to the container
//                     foodContainerElement.innerHTML += htmlToAppend



//                 }


//             })


//         .catch(
//             (error) => {
//                 console.log("Error retrieving data")
//                 console.log(error)
//             }
//         )
// }


// window.onload = () => {
//     const searchInput = document.getElementById("search");
//     searchInput.onclick = (event) => {
//         getArrayPressed(searchInput.value)
//     }
// }
