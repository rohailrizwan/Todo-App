// get text from input

var mynotes=document.getElementById("mynotes")
var main=document.getElementById("main")

function Remove(remove){
    remove.parentNode.remove()
    i=1
}

var i=1

function add(){
    if(mynotes.value==""){
        alert("please insert some note")
    }
 else{
    var div =   document.createElement("DIV")
 // create h1
  var h1 =  document.createElement("H5")
  var h1_text=   document.createTextNode("Note" +i)
  h1.appendChild(h1_text)
  div.appendChild(h1)

  // create para
  var p =  document.createElement("P")
  var text=document.createTextNode(mynotes.value)
  p.appendChild(text)
  div.appendChild(p)

   // create edit and remove button
   var remove=document.createElement("BUTTON")
   var remove_text=document.createTextNode("Remove")
   remove.appendChild(remove_text)
   remove.setAttribute('onclick',"Remove(this)")
   remove.classList.add("removebtn")

   // Edit
   var edit=document.createElement("BUTTON")
   var edit_text=document.createTextNode("Edit")
   edit.appendChild(edit_text)

   edit.addEventListener('click',function (){
       var editNotes=document.getElementById("mynotes")
       text=document.createTextNode(editNotes.value)
       p.appendChild(text)
       editNotes.value=""
    })

    div.appendChild(p)
    div.appendChild(remove)
    edit.classList.add("editbtn")
    div.appendChild(edit)

  div.classList.add("list")
  main.appendChild(div)
  mynotes.value=""
  console.log(main)

 
 i++
 }

}
function deleteAll() {
    var main = document.getElementById("main");
  
    // Remove all child notes
    while (main.firstChild) {
      main.removeChild(main.firstChild);
    }
    i=1
  }
  
  mynotes.addEventListener('keydown',function(event){
      if (event.key=="Enter"){
       event.preventDefault()
       add()
        
    }
  })