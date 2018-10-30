let getAllBranches = async function(){
  var branches = await firebaseDB.collection(AppKeys.dbCollectionName).get();
  var branchDocs = branches.docs;

  branchDocs.forEach( doc => console.log(doc));
}

getAllBranches();