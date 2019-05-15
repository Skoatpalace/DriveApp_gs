function myFunction() {
  var folder = DriveApp.getFolderById('1YxZ81DhNc5wlOia0-dihUdxpky_ywDFL');
  var d = DriveApp.getStorageUsed();
  var files = folder.getFiles(); 
  var tempArray = []; 
  while(files.hasNext()){
    var file = files.next(); 
    tempArray.push(file.getName());
  }
  Logger.log(tempArray);
  Logger.log(d);
}
