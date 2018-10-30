const branchList = document.querySelector("#branch-list");
const addBranchForm = document.querySelector("#add-branch-form");

function renderBranchElem(doc){
  let liElem = document.createElement("li");
  let city = document.createElement("span");
  let name = document.createElement("span");
  
  liElem.setAttribute("data-id", doc.id);
  name.textContent = doc.name;
  city.textContent = doc.city;

  liElem.appendChild(name);
  liElem.appendChild(document.createTextNode(" : "));
  liElem.appendChild(city);

  branchList.appendChild(liElem);
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

  branchDocs.forEach( doc => renderBranchElem(doc.data()) );
}

getAllBranches();