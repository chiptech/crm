var geocoder = null;
var map = null;
var Type1;
var Url1;
var Data1;
var ContentType1;
var DataType1;
var ProcessData1;

function goGeo1();
{
alert('cc');
}
function goGeo();
{
alert('cc');
//var inter=location.search;
//alert(inter);

 var request = { u: { login: sessionStorage.getItem('cleL'), pw: sessionStorage.getItem('cleP'), entity:sessionStorage.getItem('EntityName') ,guid:guid}};
    var jsondata1 = JSON.stringify(request);
    alert(jsondata1);
    Type1 = "POST";
    Url1 = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/geolocalisation";
    Data1 = jsondata1;
    ContentType1 = "application/json; charset=utf-8";
    DataType1 = "json";
    ProcessData1 = true;
    CallGeo();
}

CallGeo()
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
        
        data = result.geolocalisationResult;
		  
       alert(data);
	
	//InitializeMap();
	
	}
		
		}

function ServiceFailedG(result) {
    alert('Service call failed: ' + result.status + '' + result.statusText);
    Type1 = null; Url1 = null; Data1 = null; ContentType1 = null; DataType1 = null; ProcessData1 = null;
}








