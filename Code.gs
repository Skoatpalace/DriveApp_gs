function onOpen(e){
  var ui = SpreadsheetApp.getUi(); 
  ui.createMenu('More')
  .addItem('Create Folder','makeFolder')
  .addToUi();
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