console.log("Welcome to magic notes!")
showNotes();

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function () {
    let addTitle =document.getElementById("addTitle");
    let addTxt = document.getElementById("addTxt");
    let title = localStorage.getItem("Title");
    let notes = localStorage.getItem("Notes");

    if(title == null){
         titleObj = [];
    }
    else{
        titleObj = JSON.parse(title);
    }

    if (notes == null) {
         notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }


    if (addTitle.value != ""){
        if(addTxt.value != ""){
            titleObj.push(addTitle.value);
            notesObj.push(addTxt.value);
        }
        else{
            alert("First enter title!");
        }
    }
    else {
        alert("First enter title!");
    }

    localStorage.setItem("Title", JSON.stringify(titleObj));
    localStorage.setItem("Notes", JSON.stringify(notesObj));
    if(addTitle.value != "" && addTxt.value != ""){
        addTitle.value = "";
        addTxt.value = "";
    }
    showNotes();
})

function showNotes() {
    let title = localStorage.getItem("Title");
    let notes = localStorage.getItem("Notes");

    if(title == null){
        titleObj = [];
    }
    else{
        titleObj = JSON.parse(title);
    }

    if (notes == null) {
         notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }

    
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `<div class="card cardNote my-2 mx-2"  style="width: 18rem">
            <div class="card-body" id="card${index}">
                <h5 class="card-title">${titleObj[index]}</h5>
                <p class="card-text" id="edit${index}">${element}</p>
                <button onclick="deleteNote(${index})" class="btn btn-primary">Delete Note</button>
                <button onclick="editNote(${index})" class="btn btn-primary mx-1" id="editBtn">Edit</button>
            </div>
        </div>`;

    });

    let notesElement = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElement.innerHTML = html;
    }
    else {
        notesElement.innerText = `you haven't add any notes yet, please use "Add note" to add your notes.`;
    }

}


function deleteNote(index) {
    notesObj.splice(index, 1);
    titleObj.splice(index, 1);
    localStorage.setItem("Title", JSON.stringify(titleObj));
    localStorage.setItem("Notes", JSON.stringify(notesObj));
    showNotes();
}

let search = document.getElementById("search");
search.addEventListener("input", function () {
    let inputval = search.value;
    let cardNote = document.getElementsByClassName('cardNote');
    Array.from(cardNote).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        let titleTxt = element.getElementsByTagName("h5")[0].innerText;
        if (cardTxt.includes(inputval) || titleTxt.includes(inputval)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });

});


let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", function () {
    let search = document.getElementById("search");
    let inputval = search.value;
    let cardNote = document.getElementsByClassName('cardNote');
    Array.from(cardNote).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        let titleTxt = element.getElementsByTagName("h5")[0].innerText;
        if (cardTxt.includes(inputval) || titleTxt.includes(inputval)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    });
})

let clearBtn = document.getElementById("clearBtn");
clearBtn.addEventListener('click', function(){
    if(confirm("Are you sure?")){
        notesObj.splice(0, notesObj.length);
        titleObj.splice(0, titleObj.length)
        localStorage.setItem("Notes", JSON.stringify(notesObj));
        localStorage.setItem("Title", JSON.stringify(titleObj));
        showNotes();
    }
})

function editNote(index){
    console.log("edit your notes");
    let cardTxt = document.getElementById(`edit${index}`);
    cardTxt.innerHTML = `<textarea class="form-control" id="newTxt" rows="3">${notesObj[index]}</textarea>`;
    let newTxt = document.getElementById("newTxt");
    newTxt.addEventListener("blur", function(){
        console.log("hello")
        notesObj[index] = newTxt.value;
        console.log(notesObj);
        localStorage.setItem("Notes", JSON.stringify(notesObj));
        showNotes();
    })

}