var geocoder = null;
var map = null;
var Type1;
var Url1;
var Data1;
var ContentType1;
var DataType1;
var ProcessData1;
var Address;

var curr = new Date; // get current date


var first = curr.getDate() - curr.getDay()+1; // First day is the day of the month - the day of the week
var last = first + 5; // last day is the first day + 6
var firstday = new Date(curr.setDate(first)); //premier jour de la semaine sous forme utc (lundi)
var _firstday=addDate(firstday,0);

//var lastday = new Date(curr.setDate(last)).toUTCString(); //dernier jour de la semaine sous forme utc (samedi)
var lastday =addDate(firstday,5);


var premiere_cx=0;

function addDate(dateObject, numDays) {

dateObject.setDate(dateObject.getDate() + numDays);

return dateObject.toLocaleDateString();

}


// UTC to Date format
function timeToHuman(x){
var theDate = new Date();

var arrDateStr = x.split(" ");
var month = getMonthNum(arrDateStr[2]);
var day = arrDateStr[1];
var year = arrDateStr[3];
//var hour = arrDateStr[4].substr(0,2);
//var minute = arrDateStr[4].substr(3,2);
//var second = arrDateStr[4].substr(6,2);
 return (day+ '-' + month + '-' + year)

}
function getMonthNum(abbMonth){
var arrMon = new
Array("Jan","Feb","Mar","Apr","May","Jun","Jul","A ug","Sep","Oct","Nov","Dec");
var i;
for(i=0; i<arrMon.length; i++)
{
if(abbMonth == arrMon[i])
return i+1;
}

return -1;
}



function AffichRendez_vous_semaine_en_cours()
{



$('#busy').show();	
 var request = { u: { login: window.localStorage.getItem("login"), pw: window.localStorage.getItem("pw"),urlOrg:window.localStorage.getItem("urlOrg"),  debut: _firstday,fin:lastday}};
    var jsondata1 = JSON.stringify(request);
   // alert(jsondata1);
    Type1 = "POST";
	
    Url1 = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/geolocalisationAppointment";
   
	Data1 = jsondata1;
   
	ContentType1 = "application/json; charset=utf-8";
    DataType1 = "json";
    ProcessData1 = true;
  
   CallGeo();

   }




function affichAppointment()
{



if((document.getElementById("fin").value != "") && (document.getElementById("debut").value !=""))
{
var date_d = document.getElementById("debut").value;
date_d =date_d.replace("-","/");
heure_debut=date_d.substring(11,20);
tab_heure_debut=heure_debut.split(':');

date_debut=date_d.substring(0,10);


 var StartDate = new Date();
 var tab_date_debut=date_debut.split('/')
 StartDate.setSeconds('00');
 StartDate.setMinutes(tab_heure_debut[1]);
StartDate.setHours(tab_heure_debut[0]);
 StartDate.setDate(tab_date_debut[0]);
StartDate.setMonth(tab_date_debut[1]);
StartDate.setYear(tab_date_debut[2]);

var date_f = document.getElementById("fin").value;
date_f =date_f.replace("-","/");

heure_fin=date_f.substring(11,20);
tab_heure_fin=heure_fin.split(':');

date_fin=date_f.substring(0,10);

var tab_date_fin=date_fin.split('/');

 var EndDate = new Date();

  EndDate.setSeconds('00');
 EndDate.setMinutes(tab_heure_fin[1]);
EndDate.setHours(tab_heure_fin[0]);
 
 EndDate.setDate(tab_date_fin[0]);
EndDate.setMonth(tab_date_fin[1]);
EndDate.setYear(tab_date_fin[2]);


            if (EndDate > StartDate) {
           

document.getElementById("map_canvas").innerHTML="";
$('#busy').show();	

 var request = { u: { login: window.localStorage.getItem("login"), pw: window.localStorage.getItem("pw"),urlOrg:window.localStorage.getItem("urlOrg") , debut: document.getElementById("debut").value,fin:document.getElementById("fin").value}};
    var jsondata1 = JSON.stringify(request);
   // alert(jsondata1);
    Type1 = "POST";
	
    Url1 = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/geolocalisationAppointment";
   
	Data1 = jsondata1;
   
	ContentType1 = "application/json; charset=utf-8";
    DataType1 = "json";
    ProcessData1 = true;
  
   CallGeo();
 }
            else
			{
                alert("La date Fin est inférieur à la date Début");

            }
   
}else
{

alert("Veuillez remplir les date du debut et/ou fin");
}



}



  function retour()
	{
	window.location="accueil.html";	
	}


function CallGeo()
{
  $.ajax({
        type: Type1, //GET or POST or PUT or DELETE verb
        url: Url1, // Location of the service
        data: Data1, //Data sent to server
        contentType: ContentType1, // content type sent to server
        dataType: DataType1, //Expected data format from server
        processdata: ProcessData1, //True or False
        crossDomain: true,
        success: function (msg) {
            ServiceSucceededAppointment(msg);

        },
        error: ServiceFailedG  // When Service call fails
    });
}

function ServiceSucceededAppointment(result) {
	
    if (DataType1 == "json") {
premiere_cx=1;        
        Address = result.geolocalisationAppointmentResult;

	$('#busy').hide();	
if(Address.Entities.length!=0)
{
document.getElementById("map_canvas").style.height =window.innerHeight-220;
			 for( var i in Address.Entities){
			
	InitializeMap(Address.Entities[i].Attributes[1].value,Address.Entities[i].Attributes[2].value,Address.Entities[i].Attributes[0].value,Address.Entities[i].Attributes[3].value,Address.Entities[i].Attributes[4].value.Name);
	}
}
else
{

if(premiere_cx==0)
{
document.getElementById("map_canvas").innerHTML="Il n'y aucun rendez-vous cette semaine"	;

}
else
{
document.getElementById("map_canvas").innerHTML="Il n'y aucun rendez-vous"	;
}
	
	}
		
		}
		}

function ServiceFailedG(result) {
   // alert('Service call failed: ' + result.status + '' + result.statusText);
   $('#busy').hide();	
   var elem=document.getElementById('List');
   elem.innerHTML="l'information sur l'adresse est insuffisante";
    Type1 = null; Url1 = null; Data1 = null; ContentType1 = null; DataType1 = null; ProcessData1 = null;
}
function InitializeMap(lat,longi,sujet,date,concernant) {

if (typeof google !== "undefined") {
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(lat, longi,10);
	     var myOptions = {
     zoom: 15,


                zoomControl: true,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.SMALL
					
                },
               scaleControl: true,
                //panControl: true,
                navigationControl: false,              
                mapTypeId: 'roadmap',
                streetViewControl: false	
		};
		
		
	
		
		
        map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
		//map.ZoomControlStyle.SMALL;
        codeLatLng(latlng,sujet,date,concernant);
    }

}


function codeLatLng(latlng,sujet,date,concernant) {

    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (results != null && status != null) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                

				});
            
			
				boxText = document.createElement("div"),
      //these are the options for all infoboxes
            infoboxOptions = {
                content: boxText,
                disableAutoPan: true,
                maxWidth: 0,
                pixelOffset: new google.maps.Size(-140, 0),
                zIndex: null,
                boxStyle: {
                    background: "url('http://google-maps-utility-library-v3.googlecode.com/svn/trunk/infobox/examples/tipbox.gif') no-repeat",
                    opacity: 1,
                    width: "280px"
                },
                closeBoxMargin: "12px 4px 2px 2px",
                closeBoxURL: "",
                infoBoxClearance: new google.maps.Size(1, 1),
                isHidden: false,
                pane: "floatPane",
                enableEventPropagation: false
            };
            boxText.style.cssText = "border: 1px solid black; margin-top: 8px; background:#333; color:#FFF; font-family:Calibri; font-size:20 px; padding: 5px; border-radius:6px; -webkit-border-radius:6px; -moz-border-radius:6px;";
       if(concernant==null)
		{
			 boxText.innerHTML = "Sujet : "+sujet+"<p></p>"+"Date D\351but : "+date+"<p></p>"+"Concernant : ";
		
		 }
		 else
		 {
		  boxText.innerHTML = "Sujet : "+sujet+"<p></p>"+"Date D\351but : "+date+"<p></p>"+"Concernant : "+concernant;
	 
		 }
		 
            var ib = new InfoBox(infoboxOptions);
            google.maps.event.addListener(marker,'mouseover', function () {
                ib.open(map, marker);
            });
            google.maps.event.addListener(marker, 'mouseout', function () {
                ib.close(map, marker);
            });
		
			
			
			
			
			
			
			
			
			
			
			}
            map.setZoom(10);
        }
    });
}


$(document).ready
(

function () {

    AffichRendez_vous_semaine_en_cours();
}

);

