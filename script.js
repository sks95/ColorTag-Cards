let colorBtn = document.querySelectorAll(".filter_color");
let mainContainer = document.querySelector(".main_container");
let body = document.body;
let crossBtn = document.querySelector(".fa-times");
let plusButton = document.querySelector(".fa-plus");
let deleteState = false;

plusButton.addEventListener("click", createModal);
crossBtn.addEventListener("click", setDeleteState);

function createModal(){
        // create modal
        let modalContainer = document.querySelector(".modal_container");
        if(modalContainer == null){
            let modalContainer = document.createElement("div");
            modalContainer.setAttribute("class","modal_container");
            modalContainer.innerHTML = `<div class="input_container">
        <textarea class="modal_input" placeholder="Enter your text here"></textarea>
    </div>
    <div class="modal_filter_container">
        <div class="filter pink"></div>
        <div class="filter blue"></div>
        <div class="filter green"></div>
        <div class="filter black"></div>
    </div>`;

        body.appendChild(modalContainer);
        // handle event listener part
        handleModal(modalContainer);
    }
    // clicking plus button again -> reset text area
    let textarea = modalContainer.querySelector(".modal_input");
    textarea.value = "";
}
function handleModal(modal_container){
    let cColor = "black";
    let modalFilters = document.querySelectorAll(".modal_filter_container .filter");
    // set attribute -> removes previous and add new instead
    // modalFilters[3].setAttribute("class", "border");
    modalFilters[3].classList.add("border");
    for(let i = 0; i < modalFilters.length; i++){
        modalFilters[i].addEventListener("click", function(){
            // remove border from others
            modalFilters.forEach((filter) => {
                filter.classList.remove("border");
            })
            // add border onto clicked box
            modalFilters[i].classList.add("border");
            cColor = modalFilters[i].classList[1];
        })
    }
    let textArea = document.querySelector(".modal_input");
    textArea.addEventListener("keydown", function(e){
        if(e.key == "Enter"){
            console.log("Task ", textArea.value, "color ", cColor);
            // remove modal
            modal_container.remove();
            // create taskBox
            createTask(cColor, textArea.value)
        }
    })
}
function createTask(color, task){
    let taskContainer = document.createElement("div");
    
    let uid = new ShortUniqueId();

    taskContainer.setAttribute("class","task_container");
    taskContainer.innerHTML = `<div class="task_filter ${color}"></div>
    <div class="task_desc_container">
        <h3 class="uid">#${uid()}</h3>
    <div class="task_desc" contenteditable="true" >${task}</div>
</div>`
    mainContainer.appendChild(taskContainer);
    let taskFilter = taskContainer.querySelector(".task_filter");
    taskFilter.addEventListener("click", changeColor);
    taskContainer.addEventListener("click",deleteTask);
}
function changeColor (e){
    taskFilter = e.currentTarget;
    let colors = ["pink", "blue", "green", "black"];
    let cColor = taskFilter.classList[1];
    let idx = colors.indexOf(cColor);
    let newColorIdx = (idx + 1) % 4;
    taskFilter.classList.remove(cColor);
    taskFilter.classList.add(colors[newColorIdx]);

}
function setDeleteState(e){
    // function to add color toggle over cross button
    let crossBtn = e.currentTarget;
    let parent = crossBtn.parentNode;
    
    if(deleteState == false){
        parent.classList.add("active");
    }else{
        parent.classList.remove("active");
    }
    deleteState = !deleteState; 
}
function deleteTask(e){
    let taskContainer = e.currentTarget;
    if(deleteState){
        taskContainer.remove();
    }

}