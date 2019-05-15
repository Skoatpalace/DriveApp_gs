function onOpen(e){
  var ui = SpreadsheetApp.getUi(); 
  ui.createMenu('More')
  .addItem('Create Folder','makeFolder')
  .addItem('List Folders','newFolderList')
  .addItem('Search Drive Folders','searchDriveFolders')
  .addItem('Search Drive Files','searchDriveFiles')
  .addItem('Add','addEditor')
  .addItem('delete','delEditor')
  .addToUi();
}

function addEditor(){
  var ss = SpreadsheetApp.getActiveSpreadsheet(); 
  var sheet = ss.getActiveSheet(); 
  if(sheet.getName() == 'sheet1'){
    var cell = ss.getActiveCell(); 
    var column = cell.getColumn();
    var row = cell.getRow(); 
    var folderId = sheet.getRange(row, 1, 1, 1).getValue(); 
    Logger.log(folderId);
    var folder = DriveApp.getFolderById(folderId); 
    folder.addEditor('richard.fages@gmail.com'); 
    cell.setBackground('green'); 
  }
}

function delEditor(){
  var ss = SpreadsheetApp.getActiveSpreadsheet(); 
  var sheet = ss.getActiveSheet(); 
  if(sheet.getName() == 'sheet1'){
    var cell = ss.getActiveCell(); 
    var column = cell.getColumn();
    var row = cell.getRow(); 
    var folderId = sheet.getRange(row, 1, 1, 1).getValue(); 
    var folder = DriveApp.getFolderById(folderId); 
    if(folder.getEditors().length > 0){
      folder.removeEditor('richard.fages@gmail.com');
    }
    if(folder.getViewers().length > 0){
      folder.removeEditor('richard.fages@gmail.com');
    }
    cell.setBackground('red'); 
  } 
}

function makeFileMoveIt(){
  var parFolder = DriveApp.getFolderById('1YxZ81DhNc5wlOia0-dihUdxpky_ywDFL'); 
  var docName = 'new doc namer';
  var newlyCreatedDoc = DocumentApp.create(docName); 
  var newID = newlyCreatedDoc.getId();
  var file = DriveApp.getFileById(newID); 
  Logger.log(newID); 
  var parentsOfFile = file.getParents(); 
  parentsOfFile.next().removeFile(file);
  parFolder.addFile(file);
}

function searchDriveFolders(){
  var ss = SpreadsheetApp.openById('11BvoJgD_BFx_7vx1tOoiEzxayzuxlDyW6eLgzc8_nS4'); 
  var sheet = ss.getSheetByName('sheet2');
  var parFolder = DriveApp.getFolderById('1YxZ81DhNc5wlOia0-dihUdxpky_ywDFL'); 
  var ui = SpreadsheetApp.getUi(); 
  var formattedDate = Utilities.formatDate(new Date(), "GMT", "dd-MM-yyyy");
  var response = ui.prompt('Search for what ?', ui.ButtonSet.OK_CANCEL); 
  if(response.getSelectedButton() == ui.Button.OK){
    Logger.log('Search for '+ response.getResponseText());
    sheet.appendRow(['Search for '+ response.getResponseText() +' on : ' + Date()]);
    var folders = parFolder.searchFolders('Title contains "' + response.getResponseText() + '"');
    while(folders.hasNext()){
      Logger.log('FOUND')
      var folder = folders.next();
      sheet.appendRow([folder.getId(),folder.getName(), folder.getUrl()])
      Logger.log(folder.getId()); 
    }
    sheet.autoResizeColumns(1, sheet.getMaxColumns());
  }
}

function searchDriveFiles(){
  var ss = SpreadsheetApp.openById('11BvoJgD_BFx_7vx1tOoiEzxayzuxlDyW6eLgzc8_nS4'); 
  var sheet = ss.getSheetByName('sheet2');
  var parFolder = DriveApp.getFolderById('1YxZ81DhNc5wlOia0-dihUdxpky_ywDFL'); 
  var ui = SpreadsheetApp.getUi(); 
  var formattedDate = Utilities.formatDate(new Date(), "GMT", "dd-MM-yyyy");
  var response = ui.prompt('Search files for what ?', ui.ButtonSet.OK_CANCEL); 
  if(response.getSelectedButton() == ui.Button.OK){
    Logger.log('Search files for '+ response.getResponseText());
    sheet.appendRow(['Search files for '+ response.getResponseText() +' on : ' + Date()]);
    var files = parFolder.searchFiles('Title contains "' + response.getResponseText() + '"');
    while(files.hasNext()){
      Logger.log('FOUND')
      var file = files.next();
      sheet.appendRow([file.getId(),file.getName(), file.getUrl()])
      Logger.log(file.getId()); 
    }
    sheet.autoResizeColumns(1, sheet.getMaxColumns());
  }
}

function newFolderList(){  
  var ss = SpreadsheetApp.openById('11BvoJgD_BFx_7vx1tOoiEzxayzuxlDyW6eLgzc8_nS4'); 
  var sheet = ss.getSheetByName('sheet1');
  var parFolder = DriveApp.getFolderById('1YxZ81DhNc5wlOia0-dihUdxpky_ywDFL'); 
  var folders = parFolder.getFolders();
  while(folders.hasNext()){
    var folder = folders.next();
    Logger.log(folder.getName());
    //var viewers = folder.getViewers();
    var viewers = folder.getEditors(); 
    var holderArray = [folder.getId(), folder.getName(), folder.getDateCreated(), folder.getLastUpdated(), folder.getUrl()];
    for(var x=0; x<viewers.length; x++){
      holderArray.push({'email':viewers[x].getEmail(), 'name':viewers[x].getName()});
    }
    sheet.appendRow(holderArray);
  }
  sheet.appendRow(['last run on : ' + Date()]);
  sheet.autoResizeColumns(1, sheet.getMaxColumns());
}

function makeFolder(){
  var parFolder = DriveApp.getFolderById('1YxZ81DhNc5wlOia0-dihUdxpky_ywDFL'); 
  var ui = SpreadsheetApp.getUi(); 
  var formattedDate = Utilities.formatDate(new Date(), "GMT", "dd-MM-yyyy");
  var response = ui.prompt('What is the folder name ?', ui.ButtonSet.OK_CANCEL); 
  if(response.getSelectedButton() == ui.Button.OK){
    Logger.log('Folder is '+ response.getResponseText());
    var folder = parFolder.createFolder(response.getResponseText() + ' '+ formattedDate);
    var folderId = folder.getId();
    ui.alert('New folder has been created '+ folderId); 
    folder.createFile('test.txt', 'inside of '+folderId, MimeType.PLAIN_TEXT); 
  }
}