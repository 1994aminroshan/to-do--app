const themeSwitcherBtn = document.getElementById("theme-switcher");
const bodyTag = document.querySelector("body");
const addBtn = document.getElementById("add-btn");
const todoInput = document.getElementById("addt");
const cbContainer=document.getElementsByClassName("cb-container")
function main() {
    // Theme-Switcher
    themeSwitcherBtn.addEventListener("click", () => {
      bodyTag.classList.toggle("light");
      const themeImg = themeSwitcherBtn.children[0];
      themeImg.setAttribute(
        "src",
        themeImg.getAttribute("src") === "./assets/images/icon-sun.svg"
          ? "./assets/images/icon-moon.svg"
          : "./assets/images/icon-sun.svg"
      );
    })
 
    makeTodoElement(JSON.parse(localStorage.getItem("todos")));

    //Add Todo In LocalStorage
    addBtn.addEventListener("click", () => {
      const item = todoInput.value.trim();
      if (item) {
        todoInput.value = "";
        const todos = !localStorage.getItem("todos")
          ? []
          : JSON.parse(localStorage.getItem("todos"));
  
        const currentTodo = {
          item: item,
          isCompleted: false,
        };
  
        todos.push(currentTodo);
        localStorage.setItem("todos", JSON.stringify(todos));
        makeTodoElement([currentTodo]);
      }

      todoInput.addEventListener('keydown',(e)=>{
     if(e.key=='Enter'){
        addBtn.click()
  }
      })
    });
  
  
  
function makeTodoElement(todoArray) {
    if (!todoArray) {
        return null;}
        const ItemsLeft = document.querySelector('#items-left');

       
  todoArray.forEach((todoObject) => {
    //Create Html Elements Of Todo
    const card = document.createElement("li");
    const cbContainer = document.createElement("div");
    const cbInput = document.createElement("input");
    const checkSpan = document.createElement("span");
    const item = document.createElement("p");
    const clearBtn = document.createElement("button");
    const img = document.createElement("img");

    //Add Classes
   card.classList.add("card");
    cbContainer.classList.add("cb-container");
    cbInput.classList.add("cb-input");
    checkSpan.classList.add("check");
    item.classList.add("item");
    clearBtn.classList.add("clear");
    //Add Attributes
    card.setAttribute("draggable", true);
    cbInput.setAttribute("type", "checkbox");
    img.setAttribute("src", "./assets/images/icon-cross.svg");
    img.setAttribute("alt", "Clear It");
    item.textContent = todoObject.item;

    if (todoObject.isCompleted) {
      card.classList.add('checked');
      cbInput.setAttribute('checked', 'checked');
    }
//add Eventlisener
card.addEventListener('dragenter',()=>{
  card.classList.add('dragenter')
})
  
clearBtn.addEventListener('click',(e)=>{
  const a=clearBtn.parentElement
  
a.classList.add('clear')
 const indexof=([...document.querySelectorAll(".todos.card")]).indexOf(a)
 removeTodo(indexof)
})
cbContainer.addEventListener('click',()=>{
     const b=cbContainer.parentElement;
     b.classList.add('checked')
   })



    //Set Element by Parent Child
    clearBtn.appendChild(img);
    cbContainer.appendChild(cbInput);
    cbContainer.appendChild(checkSpan);
    card.appendChild(cbContainer);
    card.appendChild(item);
    card.appendChild(clearBtn);

    document.querySelector(".todos").appendChild(card);
   
  });
}
}
  



document.addEventListener("DOMContentLoaded", main)
//cb.addEventListener('click',card.getElementsByClassName("card"))