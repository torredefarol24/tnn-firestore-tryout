const branchList = document.querySelector("#branch-list");
const addBranchForm = document.querySelector("#add-branch-form");

function renderBranchElem(doc, docId){
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

  branchList.appendChild(liElem);
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

getAllBranches();