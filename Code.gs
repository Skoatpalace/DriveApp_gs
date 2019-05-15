function doGet(e) {
  if(typeof e === 'undefined'){
    return false;
  }
  var searchString = e.parameter.id; 
  var itemUrl = searchTerm(searchString);
  if(!itemUrl){
    return HtmlService.createHtmlOutput('Not Found');
  }else{
    var html = HtmlService.createTemplateFromFile('search');
    html.data = {url:itemUrl, term:searchString}
    var output = html.evaluate().setSandboxMode(HtmlService.SandboxMode.IFRAME); 
    return output; 
  }
  Logger.log(e);   // {parameter={id=test}, contextPath=, contentLength=-1, queryString=id=test, parameters={id=[test]}}
}

function searchTerm(s){
  var parFolder = '1YxZ81DhNc5wlOia0-dihUdxpky_ywDFL'; 
  var folder = DriveApp.getFolderById(parFolder); 
  var result = folder.searchFolders('title contains "' +s+ '"'); 
  if (result.hasNext()){
    var foundFolder = result.next(); 
    var folderId = foundFolder.getId(); 
    var folderUrl = foundFolder.getUrl(); 
    return folderUrl;
  }
  return false
  Logger.log(result); 
}
