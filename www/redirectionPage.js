/* function checkIfFileExists(){
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem){
        fileSystem.root.getFile("auth.txt", { create: false }, fileExists, fileDoesNotExist);
    }, getFSFail); //of requestFileSystem
}
function fileExists(fileEntry){
   // alert("File " + fileEntry.fullPath + " exists!");
   window.location = "accueil.html";

   
   }
function fileDoesNotExist(){
   // alert("file does not exist");
      window.location = "Discovery.html";
}
function getFSFail(evt) {
    console.log(evt.target.error.code);
}

   // Lire Fichier
    function onLoad() {
        document.addEventListener("deviceready", checkIfFileExists, false);
    }
 */
 
 $(document).ready( function () {
  
	document.addEventListener("deviceready", init , false);
}
);


function init() {
	sessionStorage.setItem('hostName', '10.13.121.47');

if((window.localStorage.getItem("login")==null)||(window.localStorage.getItem("pw")==null) ||(window.localStorage.getItem("urlOrg")==null) || 
(window.localStorage.getItem("account")==null)||(window.localStorage.getItem("appointment")==null) ||(window.localStorage.getItem("contact")==null)
||(window.localStorage.getItem("hli_alerte")==null)||(window.localStorage.getItem("hli_sms")==null)||(window.localStorage.getItem("lead")==null)
||(window.localStorage.getItem("opportunity")==null)||(window.localStorage.getItem("quote")==null)||(window.localStorage.getItem("task")==null))
{


if(navigator.network.connection.type == Connection.NONE) 
{
alert("Veuillez vous connecter \340 l'internet");
}
else
{
window.location = "Discovery.html";
}
}
else
{
	if(navigator.network.connection.type == Connection.NONE) {
	alert("You are OffLine!")
		
window.location = "offline.html";
	}else {
		//alert("You are OnLine!");
		window.location = "accueil.html";
		
	}

}	
	
	}
 
