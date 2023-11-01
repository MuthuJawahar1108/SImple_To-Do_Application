let index = 0;
let tasks=[];
function updateLocalStorage(){
    // console.log(JSON.stringify(tasks));
    localStorage.setItem("tasks",JSON.stringify(tasks));
}

//Load tasks from local storage
const storedTasks = localStorage.getItem("tasks");
// console.log(storedTasks);
if(storedTasks) tasks = JSON.parse(storedTasks);
// let tasks = [{"_id":1,"task":"Get ready for college","status":0},
// {"_id":2,"task":"Get ready for home","status":1}];

const boxContainer = document.getElementsByClassName("boxes-container")[0];

const boxTemplate = document.getElementById("boxTemplate");
const hiddenTextTemplate = document.getElementById("hiddenTextTemplate");
const hiddenTextClone = document.importNode(hiddenTextTemplate.content,true);
const hiddenText = hiddenTextClone.querySelector("#hiddenText");
hiddenText.textContent="No tasks right now!!";


const createBox = (task) => {
        
        const boxClone = document.importNode(boxTemplate.content,true);
        const descPara = boxClone.querySelector("#descriptionPara");
        const checkbox = boxClone.querySelector('input[name="isDone"]');
        const unique_id = boxClone.querySelector("#unique_id");

        descPara.textContent = task.task;
        unique_id.textContent = task._id;
        if(!task.status){
            descPara.style.textDecoration = "line-through";
            descPara.style.color="grey";
            checkbox.checked = true;
        } 
        boxContainer.appendChild(boxClone);

} 

if(tasks.length===0){

    boxContainer.appendChild(hiddenText);
}
else{
    // hiddenText.textContent="";
    tasks.forEach((task)=>{
        createBox(task);
    })
}

let taskbox = document.getElementById("taskbox");
let submit = document.getElementById("submit");

submit.addEventListener("click",()=>{
    // boxContainer.remove(hiddenText);
    hiddenText.style.display="none";
    index+=1;
    let newTask = {"_id":index,"task":taskbox.value,"status":1};
    tasks.push(newTask);
    createBox(newTask);
    taskbox.value="";

    updateLocalStorage();

})

boxContainer.addEventListener("change",(event)=>{
    if(event.target.matches('input[name="isDone"]')){
        const checkbox = event.target;
        const id = Number(checkbox.closest(".box").querySelector("#unique_id").textContent);
        const foundTask = tasks.find(task => task._id===id);
        let currentTask = checkbox.closest('.box').querySelector('#descriptionPara');

        foundTask.status=0;
        if(foundTask.status===0) {
            currentTask.style.textDecoration = "line-through";
            currentTask.style.color="#8f8f8f";
        }
    }

    updateLocalStorage();

    
});
boxContainer.addEventListener("click",(event)=>{
    if(event.target.matches('div[class="cancel"]')){
        // console.log("Matched");
        const delButton = event.target;
        const currentBox = delButton.closest(".box");
        const id = Number(currentBox.querySelector("#unique_id").textContent);

        tasks = tasks.filter(task => task._id !== id);
        currentBox.remove();
        if(tasks.length===0){
            hiddenText.style.display="";
            // boxContainer.appendChild(hiddenText);
        }
        updateLocalStorage();

    }
})


