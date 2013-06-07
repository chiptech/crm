//  Declare Varibales which are using in AJAX method.

var Type;
var Url;
var Data;
var ContentType;
var DataType;
var ProcessData;
function CallService1() {
 
    $.ajax({

        type: Type, //GET or POST or PUT or DELETE verb
        url: Url, // Location of the service
        data: Data, //Data sent to server
        contentType: ContentType, // content type sent to server
        dataType: DataType, //Expected data format from server
        processdata: ProcessData, //True or False
        crossDomain: true,
        success: function (msg) {
            //On Successfull service call
            ServiceSucceeded(msg);
        },
           error: ServiceFailed  // When Service call fails
    });
}

function ServiceSucceeded(result) {
    
    if (DataType == "json") {
     
        resultObject = result.AuthResult;
	if (resultObject=="success") {
			sessionStorage.setItem('cleL', $('#name').val());
    		sessionStorage.setItem('cleP', $('#password').val());
    		sessionStorage.setItem('cleD', $('#domain').val());
    		sessionStorage.setItem('cleO',$('#organisation').val());
			$('#busy').hide();
    		window.location = "accueil.html";
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
function Auth() 
{
$('#busy').show();	

	//sessionStorage.setItem("hostName","www.crmhli.com:81");
	sessionStorage.setItem("hostName","localhost");
	var login_org=$('#name').val();
	
    var request = { u:{login:login_org,pw:$('#password').val()} };
    var jsondata = JSON.stringify(request);
	//alert(jsondata);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/wcfmobilehli/service1.svc/Auth";
    Data = jsondata; 
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    CallService1();

}

$(document).ready
(
function () {
	
    $('#submitForm').click
(
function (event) {
    event.preventDefault();	
    Auth();
}
);
}
);
