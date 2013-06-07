var Type;
var Url;
var Data;
var ContentType;
var DataType;
var ProcessData;
var idActivity=new Array;
var typeActivity=new Array;

var guid=new Array;


var taille_pagination1=0;
var taille_total1=0;
var cx1=0;
var page_en_cours1=0;
var bloc_en_cours1=1;
var list_par_page1=10;
var nbre_page_par_bloc1=4;
var idView="";


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
	
        resultObject = result.ResultatViewResult;
var userdata = JSON.stringify(resultObject);
$('#busy').hide();	  
 // alert(userdata);
    if (resultObject) {
            
			if(resultObject.Entities.length !=0)
			{
			var indice=0;
			 var id="";
			 
			 	if(cx1==0)
		{
	
		taille_total1=parseInt(resultObject.EntityName);
		cx1=1;
		
		if(parseInt(taille_total1%list_par_page1)==0)
		{
		taille_pagination1= parseInt(taille_total1/10);
		}
		else
		{
		taille_pagination1= parseInt(taille_total1/10)+1;
		
		}

		$('#page').append('<a id="debut" style="border: 1px solid #aaa;font-size: 20;"  onclick="goDebutView();" class="ui-link"> << </a> &nbsp');
		
		$('#page').append('<a id="d" style="border: 1px solid #aaa;font-size: 20;" onclick="goDView();" class="ui-link"> < </a> &nbsp');
		

		
		$('#page').append('<a id="0" style="font-weight:bold;color: gray;border: 1px solid #aaa;font-size: 20;" onclick="goPageView(0);" class="ui-link"> 1 </a> &nbsp');
		$('#page').append('<a id="1" style="font-weight:normal; border: 1px solid #aaa;font-size: 20;" onclick="goPageView(1);" class="ui-link">  2 </a>&nbsp');
		$('#page').append('<a id="2" style="font-weight:normal;border: 1px solid #aaa;font-size: 20;" onclick="goPageView(2);" class="ui-link"> 3 </a> &nbsp');
		$('#page').append('<a id="3" style="font-weight:normal;border: 1px solid #aaa;font-size: 20;" onclick="goPageView(3);" class="ui-link"> 4 </a> &nbsp');
			$('#page').append('<a id="4" style="font-weight:normal;border: 1px solid #aaa;font-size: 20;" onclick="goPageView(4);" class="ui-link"> 5 </a> &nbsp');
		
		
		$('#page').append('<a id="g" style="border: 1px solid #aaa;font-size: 20;" onclick="goGView();" class="ui-link"> > </a>&nbsp');
		$('#page').append('<a id="fin" style="border: 1px solid #aaa;font-size: 20;"onclick="goFinView();" class="ui-link"> >> </a>');
		if(taille_pagination1<6)
		{
		for(var v=taille_pagination1;v<5;v++)
{

var elm2=document.getElementById(v);
elm2.innerHTML=" ";
}

		
		}
		
		}
			 
			 
			 
			 
			 for( var i in resultObject.Entities){
				 var subject="";
				 var objectType="";
				 var regardingobject="";
				 for( var j in resultObject.Entities[i].Attributes){
					 if(resultObject.Entities[i].Attributes[j].key=="subject")
					 	{
							subject=resultObject.Entities[i].Attributes[j].value;
						 }
					 if(resultObject.Entities[i].Attributes[j].key=="activitytypecode")
					 	{
							objectType=resultObject.Entities[i].Attributes[j].value;
						 }
					
						 if(resultObject.Entities[i].Attributes[j].key=="activityid")
					 	{
							id=resultObject.Entities[i].Attributes[j].value;
						 }
					 }
					 
					 
			idActivity[indice]=id;
			typeActivity[indice]=objectType;
			indice=indice+1;
			if(i==0)
			{
		
$('#thelist').append('<li style="height: 40;"><a href="javascript:goRecord('+indice+')"> <img src="imgActivities/'+objectType+'.png" style="margin: -1;margin-left: -10;margin-left: -1;margin-top: 10;" class="list-icon1"/><p class="line0" style="margin-left: 21;line-height: 0;height: 0;white-space: nowrap;margin-top: -5;"> '+subject + '</p> </a></li> <p> </p>');   

			}
			else
			{
$('#thelist').append('<li style="height: 20;"><a href="javascript:goRecord('+indice+')"> <img src="imgActivities/'+objectType+'.png" style="margin: -10;margin-left: -1;" class="list-icon1"/><p class="line0" style="margin-left: 21;line-height: 0;height: 0;white-space: nowrap;"> '+subject + '</p> </a></li> <p> </p>');   
}
//$('#thelist').append('<li style="height: 20;"><a href="javascript:goRecord('+j+')"> <img src="img/'+sessionStorage.getItem("EntityName")+'.png" style="margin: -10;" class="list-icon1"/><p class="line0" style="margin-left: 21;line-height: 0;height: 0;">'+data.Entities[j].Attributes[0].value + '</p> </a></li> <p> </p>');          
 
  }     
setTimeout(function(){myScroll.refresh();},100);                 
			 }
else
{
$('#thelist').append('<p> &nbsp Aucun enregistrement disponible dans cette vue</p>');
}			 
			
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
   // alert('Service call failed: ' + result.status + '' + result.statusText);
    Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
}
function goback()
{
window.location="accueil.html";	
}
function goRecord(indice)
{

window.location=typeActivity[indice-1]+"Form.html";
sessionStorage.setItem('guidEntity', idActivity[indice-1]);
sessionStorage.setItem("EntityName",typeActivity[indice-1])
}

function gettingActivities() {
  var d = document.view.Liste;
	idView= d.options[1].id;
	cx1=0;
    var request = {u: {login: window.localStorage.getItem("login"), pw: window.localStorage.getItem("pw"),urlOrg:window.localStorage.getItem("urlOrg"),idView: idView,page:0} };
    var jsondata = JSON.stringify(request);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/ResultatView";
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    CallServ();
}
/*****************************Les vues************************************/
function SystemView(NomEntite) {
    var request = { u: { login: window.localStorage.getItem("login"), pw: window.localStorage.getItem("pw"),urlOrg:window.localStorage.getItem("urlOrg"),entity: "activitypointer"} };
    var jsondata = JSON.stringify(request);
    //alert(jsondata);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/SystemView";
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    CallServActivities();
}

function CallServActivities() {
    $.ajax({
        type: Type, //GET or POST or PUT or DELETE verb
        url: Url, // Location of the service
        data: Data, //Data sent to server
        contentType: ContentType, // content type sent to server
        dataType: DataType, //Expected data format from server
        processdata: ProcessData, //True or False
        crossDomain: true,
		asynch:false,
        success: function (msg) {
           ServiceSucceededActivities(msg);

        },
           error: ServiceFailed  // When Service call fails
    });
}

function ServiceSucceededActivities(result) {
    if (DataType == "json") {
        resultObject = result.SystemViewResult;

        if (resultObject) {
            var userdata = JSON.stringify(resultObject);
			//alert(userdata);
            var d = document.view.Liste;
          	 for (var i = 0; i < resultObject.Entities.length; i++) 
		 {
			 
		 d.length++;
				if (i==0)
				{
	 d.options[d.length - 1].text = resultObject.Entities[i].Attributes[0].value;
                d.options[d.length - 1].id = resultObject.Entities[i].Attributes[1].value;

					}
					else
					{
                
             d.options[d.length - 1].text = resultObject.Entities[i].Attributes[0].value;
                d.options[d.length - 1].id = resultObject.Entities[i].Attributes[1].value;

					}
		 
		 }
        
		gettingActivities();
		}
        else {
            alert("erreur!!!!!!!!!!!!!!!!!!!!!!!");
        }
    }
    else {

        alert("Result Data type is not JSON");
    }
}

/**********************Afficher Resultat de vue selectionnée***************************************************/
function affichView() 
{
   //div.innerHTML = '';  
   var divpage=document.getElementById('page');
	divpage.innerHTML='';
	cx1=0;
	
	$('#busy').show();	
	var elem=document.getElementById('thelist');
	elem.innerHTML="";
    var d = document.view.Liste;
	idView=	d.options[d.selectedIndex].id;
    var request = { u: { login: window.localStorage.getItem("login"), pw:window.localStorage.getItem("pw"),urlOrg:window.localStorage.getItem("urlOrg") ,idView: d.options[d.selectedIndex].id,page:0} };
    var jsondata = JSON.stringify(request);
    //alert(jsondata);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/ResultatView";
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    CallServView();

	
	}

function affichViewEncours() 
{
   //div.innerHTML = '';  
   
	$('#busy').show();	
	var elem=document.getElementById('thelist');
	elem.innerHTML="";
    var d = document.view.Liste;
    var request = { u: { login: window.localStorage.getItem("login"), pw: window.localStorage.getItem("pw"),urlOrg:window.localStorage.getItem("urlOrg"), idView: idView,page:page_en_cours1} };
    var jsondata = JSON.stringify(request);
    //alert(jsondata);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/ResultatView";
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    CallServView();
}
function CallServView() {
    $.ajax({
        type: Type, //GET or POST or PUT or DELETE verb
        url: Url, // Location of the service
        data: Data, //Data sent to server
        contentType: ContentType, // content type sent to server
        dataType: DataType, //Expected data format from server
        processdata: ProcessData, //True or False
        crossDomain: true,
		asynch:false,
        success: function (msg) {
            ServiceSucceeded(msg);

        },
        error: ServiceFailed  // When Service call fails
    });
}

function ServiceSucceededV(result)
{
  if (DataType == "json") {
        var form = window.document.view;
        data = result.ResultatViewResult;
		var div = document.getElementById("thelist"); // crée un élément <table>

        if (data) {
		
		if(data.Entities!=0)
		{
		
		//
		
		if(cx1==0)
		{
		
		taille_total1=parseInt(data.EntityName);
		cx1=1;
		if(parseInt(taille_total1%list_par_page1)==0)
		{
		taille_pagination1= parseInt(taille_total1/list_par_page1);
		}
		else
		{
		taille_pagination1= parseInt(taille_total1/list_par_page1)+1;
		
		}
		
		$('#page').append('<a id="debut" style="border: 1px solid #aaa;"  onclick="goDebutView();" class="ui-link"> << </a> &nbsp');
		
		$('#page').append('<a id="d" style="border: 1px solid #aaa;" onclick="goDView();" class="ui-link"> < </a> &nbsp');
		

		
		$('#page').append('<a id="0" style="font-weight:bold;color: gray;border: 1px solid #aaa;" onclick="goPageView(0);" class="ui-link"> 1 </a> &nbsp&nbsp');
		$('#page').append('<a id="1" style="font-weight:normal; border: 1px solid #aaa;" onclick="goPageView(1);" class="ui-link">  2 </a>&nbsp&nbsp');
		$('#page').append('<a id="2" style="font-weight:normal;border: 1px solid #aaa;" onclick="goPageView(2);" class="ui-link"> 3 </a> &nbsp&nbsp');
		$('#page').append('<a id="3" style="font-weight:normal;border: 1px solid #aaa;" onclick="goPageView(3);" class="ui-link"> 4 </a> &nbsp&nbsp');
		$('#page').append('<a id="4" style="font-weight:normal;border: 1px solid #aaa;" onclick="goPageView(4);" class="ui-link"> 5 </a> &nbsp&nbsp');
		
		
		$('#page').append('<a id="g" style="border: 1px solid #aaa;" onclick="goGView();" class="ui-link"> > </a>&nbsp');
		$('#page').append('<a id="fin" style="border: 1px solid #aaa;"onclick="goFinView();" class="ui-link"> >> </a>');
		if(taille_pagination1<6)
		{
		for(var v=taille_pagination1;v<5;v++)
{

var elm2=document.getElementById(v);
elm2.innerHTML=" ";
}

		
		}
		
		}
		
	

			$('#busy').hide();
    
              for( var j in data.Entities){
if(j==0)
{

	$('#thelist').append('<li style="height: 40;"><a href="javascript:goRecord('+j+')" style="margin-top: -10;"> <img src="img/'+data.Entities[j].Attributes[2].value+'.png" style="margin: -1;margin-left: -10;margin-left: -1;margin-top: 10;" class="list-icon1"/><p class="line0" style="margin-left: 21;line-height: 0;height: 0;white-space: nowrap;margin-top: -5;">'+ data.Entities[j].Attributes[0].value + '</p> </a></li> <p> </p>');          
}
else
{
$('#thelist').append('<li style="height: 20;"><a href="javascript:goRecord('+j+')"> <img src="img/'+data.Entities[j].Attributes[2].value+'.png" sstyle="margin: -10;margin-left: -1;" class="list-icon1"/><p class="line0" style="margin-left: 21;line-height: 0;height: 0;white-space: nowrap;">'+data.Entities[j].Attributes[0].value + '</p> </a></li> <p> </p>');          

}  
//alert(data.Entities[j].Attributes[1].value);
guid[j]=data.Entities[j].Attributes[1].value;

     }
		  		setTimeout(function(){myScroll.refresh();},100);                 
          
		
	}	
else
{
$('#busy').hide();
	div.innerHTML = '';   
 div.innerHTML = "il n'y a aucun enregistrement";            
           
}	
}
        else {
            alert("erreur");
        }
    }
    else {
        alert("Result Data type is not JSON");
    }
}
function goGView()
{


if(page_en_cours1< taille_pagination1-1)
{


if(page_en_cours1<taille_pagination1)
{
document.getElementById('thelist').innerHTML=" ";


if((page_en_cours1+1)/nbre_page_par_bloc1 != bloc_en_cours1)
{


var elm_prec=document.getElementById(page_en_cours1%nbre_page_par_bloc1);
elm_prec.style.fontWeight = 'normal';
elm_prec.style.color='#2489CE';
var elm=document.getElementById(page_en_cours1%nbre_page_par_bloc1+1);
elm.style.fontWeight = 'bold';
elm.style.color='gray';
page_en_cours1=page_en_cours1+1;
//alert('1');
}
// nouveau bloc
else
{
page_en_cours1=page_en_cours1+1;
bloc_en_cours1=bloc_en_cours1+1;
var comp=0;
//
//alert(parseInt(taille_pagination1%5));
if(taille_pagination1%nbre_page_par_bloc1==0)
{
comp=parseInt(taille_pagination1/nbre_page_par_bloc1);

}
else
{
comp=parseInt(taille_pagination1/nbre_page_par_bloc1)+1;

}
//alert(bloc_en_cours1);
if(comp!=bloc_en_cours1)
{
var elm_prec=document.getElementById('4');
elm_prec.style.fontWeight = 'normal';
elm_prec.style.color='#2489CE';
//comp=taille_pagination1/5;

var nbre_page=0;
var elm0=document.getElementById('0');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+1;
elm0.innerHTML=" "+nbre_page+" ";
elm0.style.fontWeight = 'bold';
elm0.style.color='gray';

//elm0.style.border='border: 1px solid #aaa';
var elm1=document.getElementById('1');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+2;
elm1.innerHTML=" "+nbre_page+" ";

var elm2=document.getElementById('2');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+3;
elm2.innerHTML=" "+nbre_page+" ";

var elm3=document.getElementById('3');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+4;
elm3.innerHTML=" "+nbre_page+" ";

var elm4=document.getElementById('4');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+5;
elm4.innerHTML=" "+nbre_page+" ";
}
else
{
//alert(taille_pagination1%5);
//comp=taille_pagination1/5+1;


if(comp==bloc_en_cours1)
{

var val="";
var elm0=document.getElementById('0');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+1;
elm0.innerHTML=" "+val+" ";
elm0.style.fontWeight = 'bold';
elm0.style.color='gray';
var elm1=document.getElementById('1');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+2;
elm1.innerHTML=" "+val+" ";
elm1.style.fontWeight = 'normal';

var elm2=document.getElementById('2');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+3;
elm2.innerHTML=" "+val+" ";
elm2.style.fontWeight = 'normal';

var elm3=document.getElementById('3');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+4;
elm3.innerHTML=" "+val+" ";
elm3.style.fontWeight = 'normal';

var elm4=document.getElementById('4');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+5;
elm4.innerHTML=" "+val+" ";
elm4.style.fontWeight = 'normal';
elm4.style.color='#2489CE';

}else{
var taille=0;
if(taille_pagination1%nbre_page_par_bloc1==0)
{
taille=nbre_page_par_bloc1;
}
else
{
taille=taille_pagination1%nbre_page_par_bloc1;
}
for(var v=0;v<taille;v++)
{
var val=0;
if(v==0)
{
var elm0=document.getElementById('0');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+v+1;
elm0.innerHTML=" "+val+" ";
elm0.style.fontWeight = 'bold';
elm0.style.color='gray';
}
else
{
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+v+1;
var elm1=document.getElementById(v);
elm1.innerHTML=" "+val+" ";
}
}
if(taille_pagination1%nbre_page_par_bloc1 !=0)
{
for(var v=taille_pagination1%nbre_page_par_bloc1;v<nbre_page_par_bloc1;v++)
{
var elm2=document.getElementById(v);
//elm2.disabled = true;
elm2.innerHTML=" ";
}
}



}

}

}
//alert(page_en_cours1);
affichViewEncours();
}
//alert('ok');
}
}
function goFinView()
{
page_en_cours1=taille_pagination1-1;
if(taille_pagination1%nbre_page_par_bloc1==0)
{
bloc_en_cours1=parseInt(taille_pagination1/nbre_page_par_bloc1);

}
else
{
bloc_en_cours1=parseInt(taille_pagination1/nbre_page_par_bloc1)+1;
}
var comp=0;
if(taille_pagination1%nbre_page_par_bloc1==0)
{
comp=parseInt(taille_pagination1/nbre_page_par_bloc1);

}
else
{
comp=parseInt(taille_pagination1/nbre_page_par_bloc1)+1;
//alert('2eme');
}
if(comp!=bloc_en_cours1)
{
var elm_prec=document.getElementById('4');
elm_prec.style.fontWeight = 'normal';
elm_prec.style.color='#2489CE';
//comp=taille_pagination1/5;

var elm0=document.getElementById('0');
elm0.innerHTML=(bloc_en_cours1-1)*nbre_page_par_bloc1+1;
elm0.style.fontWeight = 'bold';
elm0.style.color='gray';
var elm1=document.getElementById('1');
elm1.innerHTML=(bloc_en_cours1-1)*nbre_page_par_bloc1+2;
var elm2=document.getElementById('2');
elm2.innerHTML=(bloc_en_cours1-1)*nbre_page_par_bloc1+3;
var elm3=document.getElementById('3');
elm3.innerHTML=(bloc_en_cours1-1)*nbre_page_par_bloc1+4;
var elm4=document.getElementById('4');
elm4.innerHTML=(bloc_en_cours1-1)*nbre_page_par_bloc1+5;





}
else
{
if(taille_pagination1%nbre_page_par_bloc1==0)
{

var val="";

var elm0=document.getElementById('0');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+1;
elm0.innerHTML=" "+val+" " ;

elm0.style.fontWeight = 'normal';
elm0.style.color='#2489CE';

var elm1=document.getElementById('1');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+2;
elm1.innerHTML=" "+val+" " ;
elm1.style.fontWeight = 'normal';
elm1.style.color='#2489CE';

var elm2=document.getElementById('2');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+3;
elm2.innerHTML=" "+val+" " ;
elm2.style.fontWeight = 'normal';
elm2.style.color='#2489CE';

var elm3=document.getElementById('3');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+4;
elm3.innerHTML=" "+val+" " ;
elm3.style.fontWeight = 'normal';
elm3.style.color='#2489CE';

var elm4=document.getElementById('4');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+5;
elm4.innerHTML=" "+val+" " ;
elm4.style.color='gray';
elm4.style.fontWeight = 'bold';

}
else
{
for(var v=0;v<taille_pagination1%nbre_page_par_bloc1;v++)
{
var val=0;
if(v==taille_pagination1%nbre_page_par_bloc1-1)
{
var elm0=document.getElementById(taille_pagination1%nbre_page_par_bloc1-1);
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+v+1;
elm0.innerHTML=" "+val+" ";
elm0.style.fontWeight = 'bold';
elm0.style.color='gray';
}else
{
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+v+1;
var elm1=document.getElementById(v);
elm1.style.fontWeight = 'normal';
elm1.style.color='#2489CE';
elm1.innerHTML=" "+val+" ";
}
}

for(var v=taille_pagination1%nbre_page_par_bloc1;v<nbre_page_par_bloc1;v++)
{
var elm2=document.getElementById(v);
elm2.innerHTML=" ";
}


}

}




affichViewEncours();
}

function goDebutView()
{
//alert(taille_pagination1);
//alert(page_en_cours1);
page_en_cours1=0;
bloc_en_cours1=1;


var val=0;
var elm0=document.getElementById('0');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+1;
elm0.innerHTML="   "+val+"   " ;
elm0.style.fontWeight = 'bold';
elm0.style.color='gray';
var elm1=document.getElementById('1');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+2;
elm1.innerHTML="  "+val+"   " ;
elm1.style.fontWeight = 'normal';
elm1.style.color='#2489CE';
var elm2=document.getElementById('2');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+3;
elm2.innerHTML="    "+val+"  " ;
elm2.style.fontWeight = 'normal';
elm2.style.color='#2489CE';
var elm3=document.getElementById('3');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+4;
elm3.innerHTML="    "+val+"    " ;
elm3.style.fontWeight = 'normal';
elm3.style.color='#2489CE';
var elm4=document.getElementById('4');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+5;
elm4.innerHTML="   "+val+"   " ;
elm4.style.fontWeight = 'normal';
elm4.style.color='#2489CE';
		for(var v=taille_pagination1;v<5;v++)
{

var elm2=document.getElementById(v);
elm2.innerHTML=" ";
}
	if(taille_pagination1<6)
		{
		
		for(var v=taille_pagination1;v<5;v++)
{

var elm2=document.getElementById(v);
elm2.innerHTML=" ";
}

		
		}

affichViewEncours();
}
function goDView()
{
if(page_en_cours1>0)
{
if(page_en_cours1>=0)
{
var exist_page_ds_en_cours= parseInt( (page_en_cours1-1)/nbre_page_par_bloc1);
if(exist_page_ds_en_cours+1 == bloc_en_cours1)
{

var elm_prec=document.getElementById(page_en_cours1%nbre_page_par_bloc1);
elm_prec.style.fontWeight = 'normal';
elm_prec.style.color='#2489CE';
var elm=document.getElementById(page_en_cours1%nbre_page_par_bloc1-1);
elm.style.fontWeight = 'bold';
elm.style.color='gray';
page_en_cours1=page_en_cours1-1;
}
// nouveau bloc
else
{

page_en_cours1=page_en_cours1-1;
bloc_en_cours1=bloc_en_cours1-1;

var nbre_page=0;

var elm0=document.getElementById('0');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+1;
elm0.innerHTML=" "+nbre_page+" ";
elm0.style.fontWeight = 'normal';
elm0.style.color='#2489CE';

var elm1=document.getElementById('1');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+2;
elm1.innerHTML=" "+ nbre_page+ " ";

var elm2=document.getElementById('2');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+3;
elm2.innerHTML="  "+nbre_page+"  ";

var elm3=document.getElementById('3');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+4;
elm3.innerHTML=" "+nbre_page+" ";

var elm4=document.getElementById('4');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+5;
elm4.innerHTML=" "+nbre_page+" ";
elm4.style.fontWeight = 'bold';
elm4.style.color='gray';

}
affichViewEncours();
}
}
}

function goPageView(j)
{
//alert(page_en_cours1);
//
if((page_en_cours1 !=nbre_page_par_bloc1*(bloc_en_cours1-1)+j)&&(nbre_page_par_bloc1*(bloc_en_cours1-1)+j<taille_pagination1))
{
var elm_prec=document.getElementById(page_en_cours1%nbre_page_par_bloc1);
elm_prec.style.fontWeight = 'normal';
elm_prec.style.color='#2489CE';
var elm=document.getElementById(j);
elm.style.fontWeight = 'bold';
elm.style.color='gray';
//alert(bloc_en_cours1);
//alert(j*5*(bloc_en_cours1-1));

//alert(j);
page_en_cours1=nbre_page_par_bloc1*(bloc_en_cours1-1)+j;
affichViewEncours();
}
}


/********************add activity********************/
	var alerte="hli_alerte";var appel_tel="phonecall";var tache="task";	var sms="hli_sms";
function addRecord()
{


$('#viewAjout').append('<div  id="divAjout" style="width:100%">  </div>');	
 $('#divAjout').append(' <center><a href="javascript:CloseButton()"  data-role="button" data-transition="slide" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-btn-up-c ui-btn-inline ui-shadow ui-btn-corner-all"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Fermer</span></span></a> </center>');
 $('#divAjout').append('<p></p>');

 $('#divAjout').append('<center><a style="width: 200;" href="javascript:goNew(alerte)"  data-role="button" data-transition="slide" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-btn-up-c ui-btn-inline ui-shadow ui-btn-corner-all"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Alert</span></span></a> </center>');
$('#divAjout').append('<center><a style="width: 200;" href="javascript:goNew(tache)"  data-role="button" data-transition="slide" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-btn-up-c ui-btn-inline ui-shadow ui-btn-corner-all"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Tache</span></span></a> </center>');
$('#divAjout').append('<center><a style="width: 200;" href="javascript:goNew(appel_tel)"  data-role="button" data-transition="slide" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-btn-up-c ui-btn-inline ui-shadow ui-btn-corner-all"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Appel Telephonique</span></span></a> </center>');
$('#divAjout').append('<center><a style="width: 200;" href="javascript:goNew(sms)"  data-role="button" data-transition="slide" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-btn-up-c ui-btn-inline ui-shadow ui-btn-corner-all"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">SMS</span></span></a> </center>');


}
function goNew(entity)
{

sessionStorage.setItem("EntityName",entity);
window.location='nouveau.htm';
}

function CloseButton()
{

document.getElementById('viewAjout').innerHTML='';	
}
$(document).ready
(

function () {

    $('#busy').show();	
	SystemView("activitypointer");

	}

);
