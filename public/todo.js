import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase, ref, set, push } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAxPKpE-wZgHuqLm9h-La4Fyd6yWy4zEIQ",
    authDomain: "todo-app-with-database-f9dcc.firebaseapp.com",
    projectId: "todo-app-with-database-f9dcc",
    storageBucket: "todo-app-with-database-f9dcc.appspot.com",
    messagingSenderId: "859675248900",
    appId: "1:859675248900:web:67e9f64e4ca282756da851",
    measurementId: "G-5MWK565TY6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase();


var mynotes = document.getElementById("mynotes")
var main = document.getElementById("main")
var addnotes = document.getElementById("addnotes")
var i = 1
function RemoveNote() {
    this.parentNode.remove();
    i = 1;
}
function Add() {
    if (mynotes.value == "") {
        alert("please insert some note")
    }
    else {
        var div = document.createElement("DIV")
        // create h1
        var h1 = document.createElement("H5")
        var h1_text = document.createTextNode("Note" + i)
        h1.appendChild(h1_text)
        div.appendChild(h1)

        // create para
        var p = document.createElement("P")
        var text = document.createTextNode(mynotes.value)
        p.appendChild(text)
        div.appendChild(p)

        var idref = push(ref(db, "todo/"))
        var newid = idref.key
        console.log(newid)

        set(ref(db, `todo/${newid}`), text.textContent);

        var removebtn = document.createElement("BUTTON");
        var remove_text = document.createTextNode("Remove");
        removebtn.appendChild(remove_text);
        removebtn.addEventListener("click", RemoveNote);
        removebtn.classList.add("removebtn");

        var edit = document.createElement("BUTTON")
        var editbtn = document.createTextNode("Edit")
        edit.appendChild(editbtn)
        edit.classList.add("editbtn")

        edit.addEventListener('click', function () {
            var edit_text = div.childNodes[1].innerText
            console.log(edit_text)
            document.getElementById("mynotes").value = edit_text
            div.childNodes[1].innerText = ""

        })
        var newtext = document.getElementById("mynotes")

        var savebtn = document.createElement("BUTTON")
        var save = document.createTextNode("Save")
        savebtn.appendChild(save)
        savebtn.classList.add("savebtn")

        div.appendChild(savebtn)

        savebtn.addEventListener('click', function () {
            var edittxt = push(ref(db, "edit"))
            var editid = edittxt.key
            text = document.createTextNode(newtext.value)

            set(ref(db, `edit ${editid}`), text.textContent)
            p.appendChild(text)
            div.appendChild(p)
            div.appendChild(edit)
            div.appendChild(removebtn)
            div.appendChild(savebtn)
            main.appendChild(div)
            newtext.value = ""
        })


        div.classList.add("list")
        div.appendChild(edit)
        div.appendChild(removebtn)
        div.appendChild(savebtn)
        main.appendChild(div)
        mynotes.value = ""
        console.log(main)

        i++
    }
}
var deleteAll = document.getElementById("deleteAll")
function deletemain() {
    var main = document.getElementById("main");

    // Remove all child notes
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    }
    i = 1

}
deleteAll.addEventListener('click', deletemain)
addnotes.addEventListener('click', Add)