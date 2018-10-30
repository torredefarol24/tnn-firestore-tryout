const branchList = document.querySelector("#branch-list");
const addBranchForm = document.querySelector("#add-branch-form");
const searchBranchInput = document.querySelector("#branchNameSearch");
const branchSearchResults = document.querySelector("#branch-search-results");

searchBranchInput.addEventListener("keyup", (e) => searchBranches(e));

async function searchBranches(e){
  let branchName = e.target.value;
  let results = await firebaseDB.collection(AppKeys.dbCollectionName).where('name' , '==' , branchName).get();
 
  let branchDocs = results.docs;

  branchDocs.forEach( doc => renderBranchElem(doc.data() , doc.id, renderInResults = true) );
}


function renderBranchElem(doc, docId, renderInResults=false){
  let liElem = document.createElement("li");
  let city = document.createElement("span");
  let name = document.createElement("span");
  let delBtn = document.createElement("button");
  
  liElem.setAttribute("data-id", docId);
  liElem.classList.add("list-group-item");
  
  name.textContent = doc.name;
  city.textContent = doc.city;

  liElem.appendChild(name);
  liElem.appendChild(document.createTextNode(" : "));
  liElem.appendChild(city);

  delBtn.classList.add("btn");
  delBtn.classList.add("btn-danger");
  delBtn.innerHTML = " X ";
  delBtn.classList.add("float-right");
  delBtn.addEventListener("click", (e) => handleDeleteBranch(e));
  delBtn.setAttribute("data-id", docId);

  liElem.appendChild(delBtn);

  renderInResults ? branchSearchResults.appendChild(liElem) : branchList.appendChild(liElem);
}


function handleDeleteBranch(e){
  e.stopPropagation();
  let docId = e.srcElement.getAttribute("data-id")
  let docIdP = e.srcElement.parentElement.attributes["data-id"].nodeValue;
  
  firebaseDB.collection(AppKeys.dbCollectionName).doc(docIdP).delete();
}

function handleAddBranch(e){
  e.preventDefault();
  var newBranch = {
    name : addBranchForm.name.value,
    city : addBranchForm.city.value
  };

  firebaseDB.collection(AppKeys.dbCollectionName).add(newBranch);
  
  addBranchForm.name.value = "";
  addBranchForm.city.value = "";

}

addBranchForm.addEventListener("submit" , (e) => handleAddBranch(e));



let getAllBranches = async function(){
  var branches = await firebaseDB.collection(AppKeys.dbCollectionName).get();
  var branchDocs = branches.docs;

  branchDocs.forEach( doc => renderBranchElem(doc.data() , doc.id) );
}

// getAllBranches();

let getAllBrancesRealTime = function(){
  var branches = firebaseDB.collection(AppKeys.dbCollectionName).orderBy("name").onSnapshot( (snapshot) => {
    let changes = snapshot.docChanges();
    changes.forEach( change => {
      if (change.type == 'added'){
        renderBranchElem(change.doc.data(), change.doc.id)
      } else if (change.type == 'removed'){
        let liElemToRemove = branchList.querySelector("[data-id=" + change.doc.id + "]");
        liElemToRemove.remove();
      }
    })
  })
}

getAllBrancesRealTime()