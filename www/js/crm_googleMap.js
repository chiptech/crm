var geocoder = null;
var map = null;
var Type1;
var Url1;
var Data1;
var ContentType1;
var DataType1;
var ProcessData1;
var Address;

function call()
{
var inter=location.search.substring(1);
$('#busy').show();	
//alert(inter);
 var reg = new RegExp("/", "g");
  
    var interm = inter.split(reg);
	var guid= sessionStorage.getItem("guidEntity");
  	
 var request = { u: { login: window.localStorage.getItem("login"), pw: window.localStorage.getItem("pw"),urlOrg : window.localStorage.getItem("urlOrg"),  entity:sessionStorage.getItem('EntityName') ,guid:guid}};
    var jsondata1 = JSON.stringify(request);
   // alert(jsondata1);
    Type1 = "POST";
	
    Url1 = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/geolocalisation";
   
	Data1 = jsondata1;
   
	ContentType1 = "application/json; charset=utf-8";
    DataType1 = "json";
    ProcessData1 = true;
  
   CallGeo();
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
            ServiceSucceededG(msg);

        },
        error: ServiceFailedG  // When Service call fails
    });
}

function ServiceSucceededG(result) {
	
    if (DataType1 == "json") {
        
        Address = result.geolocalisationResult;
		  document.getElementById("map_canvas").style.height =window.innerHeight-150;
     // alert(Address);
	$('#busy').hide();	
	InitializeMap();
	
	}
		
		}

function ServiceFailedG(result) {
   // alert('Service call failed: ' + result.status + '' + result.statusText);
   $('#busy').hide();	
   var elem=document.getElementById('List');
   elem.innerHTML="l'information sur l'adresse est insuffisante";
    Type1 = null; Url1 = null; Data1 = null; ContentType1 = null; DataType1 = null; ProcessData1 = null;
}





function InitializeMap() {

    var interm;
var interm1;

var reg = new RegExp("/", "g");
latitude_lobngitude=Address.split(reg);
if (typeof google !== "undefined") {
        geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(latitude_lobngitude[0], latitude_lobngitude[1],10);
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
        codeLatLng(latlng);
    }




}


function codeLatLng(latlng) {
    geocoder.geocode({ 'latLng': latlng }, function (results, status) {
        if (results != null && status != null) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setCenter(results[0].geometry.location);
                var marker = new google.maps.Marker({
                    map: map,
                    position: results[0].geometry.location
                });
            }
            map.setZoom(10);
        }
    });
}




