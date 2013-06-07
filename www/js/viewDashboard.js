var Type;
var Url;
var Data;
var ContentType;
var DataType;
var ProcessData;
var nomEntite; // Nom de l'entité
var displayEntite;

function CallServ() {
    $.ajax({
        type: Type, //GET or POST or PUT or DELETE verb
        url: Url, // Location of the service
        data: Data, //Data sent to server
        contentType: ContentType, // content type sent to server
        dataType: DataType, //Expected data format from server
        processdata: ProcessData, //True or False
        crossDomain: true,
        success: function (msg) {
           ServiceSucceeded(msg);

        },
           error: ServiceFailed  // When Service call fails
    });
}

function ServiceSucceeded(result) {
    if (DataType == "json") {
        resultObject = result.gettingDashboardResult;
        if (resultObject) {
            //alert(resultObject);
        }
        else {
            alert("erreur");
        }
    }
    else {

        alert("Result Data type is not JSON");
    }
}

function ServiceFailed(result) {
    alert('Service call failed: ' + result.status + '' + result.statusText);
    Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
}

function SystemViewDashboard() {
    var request = { u: { login: sessionStorage.getItem('cleL'), pw: sessionStorage.getItem('cleP')} };
    var jsondata = JSON.stringify(request);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/gettingDashboard";
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    CallServ();
}

function goback()
{
window.location="accueil.html";	
}

$(document).ready
(

function () {
    SystemViewDashboard();
}

);
