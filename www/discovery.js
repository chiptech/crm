//  Declare Varibales which are using in AJAX method.

var Type;
var Url;
var Data;
var ContentType;
var DataType;
var ProcessData;
var PremFois=0;
var	login="";
var  pw="";
var url = "";
var PWCrypte="";

// save authentification in localstorage

function SaveAuth()
{
$('#busy').show();	
 var login =$('#name').val();
	   var pw= $('#password').val();
	   var protocol= document.getElementById('selectProtocol').options[document.getElementById('selectProtocol').selectedIndex].text;
	   var adressServer = $('#AddServ').val();
	   var organisation =document.getElementById('orgName').options[document.getElementById('orgName').selectedIndex].text;
	   if(protocol=="http")
	   {
     //  writer.write($('#name').val()+" "+$('#password').val()+" "+document.getElementById('selectProtocol').options[document.getElementById('selectProtocol').selectedIndex].text+"://"+$('#AddServ').val()+"/"+document.getElementById('orgName').options[document.getElementById('orgName').selectedIndex].text);

// writer.write("<login>"+login+"</login><pw>"+PWCrypte+"</pw><url>http://"+adressServer+"/"+organisation+"</url>");

 window.localStorage.setItem("login", login);
 window.localStorage.setItem("pw", PWCrypte);
 window.localStorage.setItem("urlOrg", "http://"+adressServer+"/"+organisation);

 }
 else
 {
 
adressServer=adressServer.replace('.','=');
 	var urlHttps= new RegExp("=", "g");
	 tabUrl=adressServer.split(urlHttps);
adressServer=adressServer.replace(tabUrl[0],organisation);

adressServer=adressServer.replace('=','.'); 
//alert("<login>"+login+"</login><pw>"+PWCrypte+"</pw><url>https://"+adressServer+"</url>");
//writer.write("<login>"+login+"</login><pw>"+PWCrypte+"</pw><url>https://"+adressServer+"</url>");
  window.localStorage.setItem("login", login);
 window.localStorage.setItem("pw", PWCrypte);
 window.localStorage.setItem("urlOrg", "https://"+adressServer);
 }    
 







}
// enregistrer les paramétres d'authentification dans le smartphone
function recordAuth()
{
// vérifier si l'utilisateur a choisi une organisation ou pas
if(document.getElementById("orgName").options[document.getElementById("orgName").selectedIndex].value=="")
{
alert("Veuillez choisir une organisation");

}
else
{

SaveAuth();
getFormEntitiesMobile();

}
}
// Cryptage Password
function CryptagePW()
{
	
 var request ={ u: {pw:$('#password').val()}};
    var jsondata = JSON.stringify(request);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/CryptagePW";
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    // Call the Web Service....
    CallCrypPW();

}
function  CallCrypPW()
{
$.ajax({
        type: Type, //GET or POST or PUT or DELETE verb
        url: Url, // Location of the service
        data: Data, //Data sent to server
        contentType: ContentType, // content type sent to server
        dataType: DataType, //Expected data format from server
        processdata: ProcessData, //True or False
        crossDomain: true,
		   async:true,
        success: function (msg) {
            //On Successfull service call
            ServiceSucceededCryptPW(msg);
        },
        error: ServiceFailed  // When Service call fails
    });


}
function ServiceSucceededCryptPW(result) {

    if (DataType == "json") {
        resultObject = result.CryptagePWResult;

        if (resultObject) {

PWCrypte=resultObject;


        }
        else {

            alert("erreur");
			}
    }

    else {
        alert("Result Data type is not JSON");
    }
}


// get form of all entities
var nameFile="";
var formDesciption= new Array(10);
var tabNameEntity = new Array(10);

var numTabEnCours=0;
tabNameEntity[0]="task";
tabNameEntity[1]="appointment";
tabNameEntity[2]="hli_alerte";
tabNameEntity[3]="hli_sms";
tabNameEntity[4]="lead";
tabNameEntity[5]="opportunity";
tabNameEntity[6]="contact";

tabNameEntity[7]="phonecall";
tabNameEntity[8]="quote";
tabNameEntity[9]="account";




function getFormEntitiesMobile()
{
getFormEntityMobile("task");
}
function getFormEntityMobile(entityName)
{
$('#busy').show();	
 var request ={ u: {login: window.localStorage.getItem("login"), pw: window.localStorage.getItem("pw"),url:window.localStorage.getItem("urlOrg") ,entity:entityName}};
    var jsondata = JSON.stringify(request);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/formulaireEntity";
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    // Call the Web Service....
    CallgetFormEntityMobile();

}
function CallgetFormEntityMobile()
{
$.ajax({
        type: Type, //GET or POST or PUT or DELETE verb
        url: Url, // Location of the service
        data: Data, //Data sent to server
        contentType: ContentType, // content type sent to server
        dataType: DataType, //Expected data format from server
        processdata: ProcessData, //True or False
        crossDomain: true,
		   async:false,
        success: function (msg) {
            //On Successfull service call
            ServiceSucceededGetForm(msg);
        },
        error: ServiceFailed  // When Service call fails
    });

}

function ServiceSucceededGetForm(result) {

    if (DataType == "json") {
        resultObject = result.formulaireEntityResult;
       // alert(resultObject);
		//$('#busy').hide();
        if (resultObject) {

         //   var expr = JSON.stringify(resultObject);
        formDesciption[numTabEnCours]=resultObject;
//alert(formDesciption);

 //nameFile=tabNameEntity[numTabEnCours]+".txt";  
//SaveForm();
 window.localStorage.setItem(tabNameEntity[numTabEnCours], formDesciption[numTabEnCours]);
numTabEnCours=numTabEnCours+1;
//alert(nameFile);
     next();
	
    



        }
        else {

            alert("erreur");
			}
    }

    else {
        alert("Result Data type is not JSON");
    }
}

   var Num=0;
function next()
{
if(numTabEnCours<10)
{

//alert(tabNameEntity[numTabEnCours]);
getFormEntityMobile(tabNameEntity[numTabEnCours]);

}
if(numTabEnCours==10)
{
numTabEnCours=0;
fillDB();
$('#busy').hide();	
window.location = "accueil.html";

}
}

// enregistrer les comptes actifs , contact actif et les rendre dans le smartphone(Mémoire interne)

function fillDB()
{
	 document.addEventListener("deviceready", constructionBaseLocal , false);
	
}

function constructionBaseLocal()
{
   initDB("account");
   initDB("contact");
   initDB("appointment");
  navigator.notification.alert("BD created with Succes!");
}

var donnees ;
var entityName ;

function initDB(entity)
{
  entityName = entity ;
  console.log("Appel initdb");
  $request = { u: {login:window.localStorage.getItem("login"), pw: window.localStorage.getItem("pw"),urlOrg : window.localStorage.getItem("urlOrg"), entity:entity } };
          $.ajax({
			type: 'POST',
            async: false,
            url:'http://'+sessionStorage.getItem("hostName")+'/WcfMobileHLI/Service1.svc/GetRecordsOffline',
			data: JSON.stringify($request),
			contentType: "application/json",
            dataType:'json',
            crossDomain: true,
            success: function(data) {
			   
				donnees = JSON.stringify(data.GetRecordsOfflineResult);

				console.log("Appel Ajax avec succes");
				
				store();
            },
                error: function (xhr) {
                    console.log(xhr.responseText);
                    alert(xhr.responseText);
                }
          });
}

function store()
{
	console.log("appel fonction store");
	window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}
function gotFS(fileSystem) {

		var fileName = entityName+"s.txt";
        fileSystem.root.getFile(fileName, {create: true, exclusive: false}, gotFileEntry, fail);
    }
function gotFileEntry(fileEntry) {
        fileEntry.createWriter(gotFileWriter, fail);
    }

function gotFileWriter(writer) {
    
        writer.write(donnees);
        writer.onwriteend = function(evt) {
           console.log("end writing "); }
		   
}

 function fail(error) {
        console.log(error.code);
    }



// discovery organisations du serveur
function DiscoveryOrg() 
{
$('#busy').show();	
 if(PremFois==0)
	 {
	 
	 }
	 else
	 {
	 $("#submitAuth").remove();
	 }
	//sessionStorage.setItem("hostName","www.crmhli.com:81");
	
	var login_org=$('#name').val();
	var ChoixProtocol = document.getElementById('selectProtocol');
	  var ProtocolChoisi = ChoixProtocol.options[ChoixProtocol.selectedIndex].text;

	  
    var request = { u:{login:login_org,pw:$('#password').val(),url: ProtocolChoisi+'://'+$('#AddServ').val()} };
    var jsondata = JSON.stringify(request);
	//alert(jsondata);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/wcfmobilehli/service1.svc/Discovery";
    Data = jsondata; 
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    CallService1();

}
function CallService1() {
 
    $.ajax({

        type: Type, //GET or POST or PUT or DELETE verb
        url: Url, // Location of the service
        data: Data, //Data sent to server
        contentType: ContentType, // content type sent to server
        dataType: DataType, //Expected data format from server
        processdata: ProcessData, //True or False
        crossDomain: true,
		   async:true,
        success: function (msg) {
            //On Successfull service call
            ServiceSucceeded(msg);
        },
           error: ServiceFailed  // When Service call fails
    });
}

function ServiceSucceeded(result) {
    
    if (DataType == "json") {
     
        resultObject = result.DiscoveryResult;

	if (resultObject!="failure") {
	
				var reg_org= new RegExp("/", "g");
	 orgName=resultObject.split(reg_org);
	  var orgNameSelect = document.getElementById("orgName");

	
	 if(PremFois==0)
	 {
	       	   orgNameSelect.length++; 
	   orgNameSelect.options[0].text =" ";
      for (var n = 0; n < orgName.length-1; n++) {
                 

                         orgNameSelect.length++;
                           orgNameSelect.options[orgNameSelect.length-1].text = orgName[n];
						     
				   
				   }
	
$('#form').append('<div id="submitAuth" onclick="recordAuth();" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="null" data-iconpos="null" data-theme="c" data-inline="false" data-mini="false" class="ui-btn ui-shadow ui-btn-corner-all ui-fullsize ui-btn-block ui-submit ui-btn-hover-c ui-btn-up-c" aria-disabled="false"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Ok</span></span></div>');
	PremFois=1;
	}
	else
	{
	orgNameSelect.length=0;
		       	   orgNameSelect.length++; 
	   orgNameSelect.options[0].text =" ";
orgNameSelect.selectedIndex=0;
	     for (var n = 0; n < orgName.length-1; n++) {
                 

                           orgNameSelect.length++;
                           orgNameSelect.options[orgNameSelect.length - 1].text = orgName[n];
				   
				   }
	
	$('#form').append('<div id="submitAuth" onclick="recordAuth();" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-icon="null" data-iconpos="null" data-theme="c" data-inline="false" data-mini="false" class="ui-btn ui-shadow ui-btn-corner-all ui-fullsize ui-btn-block ui-submit ui-btn-hover-c ui-btn-up-c" aria-disabled="false"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Ok</span></span></div>');

	}



	$('#busy').hide();
    	//	window.location = "accueil.html";
           }

        else {
           $('#busy').hide();
			$('#password').val("");
			//$('#org').val("");
  $('#name').addClass('error');
	$('#password').addClass('error');	
	//$('#org').addClass('error');	
        }
    }

    else {

       alert("Result Data type is not JSON");
    }
}
function ServiceFailed(result) {
 $('#busy').hide();
   Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
}


$(document).ready
(
function () {


    $('#submitForm').click
(
function (event) {
    event.preventDefault();	
   DiscoveryOrg();
		CryptagePW();

}
);
}
);
