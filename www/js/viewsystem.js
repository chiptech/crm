var Type;
var Url;
var Data;
var ContentType;
var DataType;
var ProcessData;
var nomEntite; // Nom de l'entité
var displayEntite;
var guid=new Array;

var taille_pagination=0;
var taille_total=0;
var cx=0;
var page_en_cours=0;
var bloc_en_cours=1;
var list_par_page=10;
var nbre_page_par_bloc=5;
var ViewId="";

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
        resultObject = result.SystemViewResult;
        if (resultObject) {
            var userdata = JSON.stringify(resultObject);
       
		  var d = document.view.Liste;
        //    var reg = new RegExp("#", "g");
         //   var tableau = resultObject.split(reg);
          //  var reg1 = new RegExp("/", "g");
          //  var tab_nom = tableau[0].split(reg1);
          //  var tab_id_view = tableau[1].split(reg1);
      /*      for (var i = 0; i < tab_nom.length-1; i++) 
			{
				d.length++;
				if (i==0)
				{
			    d.options[d.length - 1].text = tab_nom[i];
                d.options[d.length - 1].id = tab_id_view[i];
					}
					else
					{
                
                d.options[d.length - 1].text = tab_nom[i];
                d.options[d.length - 1].id = tab_id_view[i];
					}
            }
        */
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
		
		affichage();
		
		}
        else {
            alert("erreur");
        }
    }
    else {

        alert("Result Data type is not JSON");
    }
}
function affichage()
{

 	var div = document.getElementById("thelist"); // crée un élément <table>
    div.innerHTML = '';  
	$('#busy').show();		
    var d = document.view.Liste;
	ViewId=d.options[1].id;
	
    var request = { u: { login:  window.localStorage.getItem("login"), pw:  window.localStorage.getItem("pw"), urlOrg : window.localStorage.getItem("urlOrg"),

	 idView: ViewId,page: page_en_cours} };
    var jsondata = JSON.stringify(request);
   // alert(jsondata);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/ResultatView";
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    CallServViewPrinc();


}

function CallServViewPrinc()
{

 $.ajax({
        type: Type, //GET or POST or PUT or DELETE verb
        url: Url, // Location of the service
        data: Data, //Data sent to server
        contentType: ContentType, // content type sent to server
        dataType: DataType, //Expected data format from server
        processdata: ProcessData, //True or False
        crossDomain: true,
		 async: false,
        success: function (msg) {
            ServiceSucceededPrinc(msg);

        },
        error: ServiceFailedPrinc  // When Service call fails
    });

}
function ServiceFailedPrinc(result) {
   // alert('Service call failed: ' + result.status + '' + result.statusText);
    Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
}
function ServiceSucceededPrinc(result)
{
  if (DataType == "json") {
        var form = window.document.view;
        data = result.ResultatViewResult;
var div = document.getElementById("thelist"); 
        if (data) {
		
		if(data.Entities!=0)
		{
		
		
		//
		if(cx==0)
		{
		
		taille_total=parseInt(data.EntityName);
		cx=1;
		if(parseInt(taille_total%list_par_page)==0)
		{
		taille_pagination= parseInt(taille_total/list_par_page);
		}
		else
		{
		taille_pagination= parseInt(taille_total/list_par_page)+1;
		
		}
		
// préparation de la pagination
		$('#page').append('<a id="debut" style="border: 1px solid #aaa;font-size: 20;"  onclick="goDebut();" class="ui-link"> << </a> &nbsp');
		
		$('#page').append('<a id="d" style="border: 1px solid #aaa;font-size: 20;" onclick="goD();" class="ui-link"> < </a> &nbsp');
		

		
		$('#page').append('<a id="0" style="font-weight:bold;color: gray;border: 1px solid #aaa;font-size: 20;" onclick="goPage(0);" class="ui-link"> 1 </a> &nbsp&nbsp');
		$('#page').append('<a id="1" style="font-weight:normal; border: 1px solid #aaa;font-size: 20;" onclick="goPage(1);" class="ui-link">  2 </a>&nbsp&nbsp');
		$('#page').append('<a id="2" style="font-weight:normal;border: 1px solid #aaa;font-size: 20;" onclick="goPage(2);" class="ui-link"> 3 </a> &nbsp&nbsp');
		$('#page').append('<a id="3" style="font-weight:normal;border: 1px solid #aaa;font-size: 20;" onclick="goPage(3);" class="ui-link"> 4 </a> &nbsp&nbsp');
		$('#page').append('<a id="4" style="font-weight:normal;border: 1px solid #aaa;font-size: 20;" onclick="goPage(4);" class="ui-link"> 5 </a> &nbsp&nbsp');
		
		
		$('#page').append('<a id="g" style="border: 1px solid #aaa;font-size: 20;" onclick="goG();" class="ui-link"> > </a>&nbsp');
		$('#page').append('<a id="fin" style="border: 1px solid #aaa;font-size: 20;"onclick="goFin();" class="ui-link"> >> </a>');
// verification si la taille de page est inférieur à 6
		if(taille_pagination<6)
		{
		for(var v=taille_pagination;v<5;v++)
{

var elm2=document.getElementById(v);
elm2.innerHTML=" ";
}

		
		}
		
		}
		// "thelist" comporte l'ensembles des enregistrements
		
         	$('#busy').hide();
              for( var j in data.Entities){
if(j==0)
{
//alert(j);
	$('#thelist').append('<li onclick="goRecord('+j+');" style="height: 40;"><a href="javascript:goRecord('+j+')" > <img src="img/'+sessionStorage.getItem("EntityName")+'.png" onclick="goRecord('+j+');" style="margin: -1;margin-left: -10;margin-left: -1;margin-top: 10;" class="list-icon1"/><p class="line0" style="margin-left: 21;line-height: 0;height: 0;white-space: nowrap;margin-top: -5;">'+ data.Entities[j].Attributes[0].value + '</p> </a></li> <p> </p>');          
}
else
{
$('#thelist').append('<li onclick="goRecord('+j+');" style="height: 20;"><a href="javascript:goRecord('+j+')"> <img src="img/'+sessionStorage.getItem("EntityName")+'.png" onclick="goRecord('+j+');" style="margin: -10;margin-left: -1;" class="list-icon1"/><p class="line0" style="margin-left: 21;line-height: 0;height: 0;white-space: nowrap;">'+data.Entities[j].Attributes[0].value + '</p> </a></li> <p> </p>');          

}      


guid[j]=data.Entities[j].Attributes[1].value;
 }
				//	setTimeout(function(){scroll.refresh();},100);
          		setTimeout(function(){myScroll.refresh();},100);                 
          
		
	}	
else
{
$('#busy').hide();
	div.innerHTML = '';   
 div.innerHTML = "Aucun enregistrement disponble dans cette vue";            
           
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
// pagination coté serveur

function goG()
{


if(page_en_cours< taille_pagination-1)
{


if(page_en_cours<taille_pagination)
{
document.getElementById('thelist').innerHTML=" ";

//alert(page_en_cours);
// mm bloc
if((page_en_cours+1)/nbre_page_par_bloc != bloc_en_cours)
{


var elm_prec=document.getElementById(page_en_cours%nbre_page_par_bloc);
elm_prec.style.fontWeight = 'normal';
elm_prec.style.color='#2489CE';
var elm=document.getElementById(page_en_cours%nbre_page_par_bloc+1);
elm.style.fontWeight = 'bold';
elm.style.color='gray';
page_en_cours=page_en_cours+1;
//alert('1');
}
// nouveau bloc
else
{
page_en_cours=page_en_cours+1;
bloc_en_cours=bloc_en_cours+1;
var comp=0;
//
//alert(parseInt(taille_pagination%5));
if(taille_pagination%nbre_page_par_bloc==0)
{
comp=parseInt(taille_pagination/nbre_page_par_bloc);

}
else
{
comp=parseInt(taille_pagination/nbre_page_par_bloc)+1;

}
//alert(bloc_en_cours);
if(comp!=bloc_en_cours)
{
var elm_prec=document.getElementById('4');
elm_prec.style.fontWeight = 'normal';
elm_prec.style.color='#2489CE';
//comp=taille_pagination/5;

var nbre_page=0;
var elm0=document.getElementById('0');
nbre_page=(bloc_en_cours-1)*nbre_page_par_bloc+1;
elm0.innerHTML=" "+nbre_page+" ";
elm0.style.fontWeight = 'bold';
elm0.style.color='gray';

//elm0.style.border='border: 1px solid #aaa';
var elm1=document.getElementById('1');
nbre_page=(bloc_en_cours-1)*nbre_page_par_bloc+2;
elm1.innerHTML=" "+nbre_page+" ";

var elm2=document.getElementById('2');
nbre_page=(bloc_en_cours-1)*nbre_page_par_bloc+3;
elm2.innerHTML=" "+nbre_page+" ";

var elm3=document.getElementById('3');
nbre_page=(bloc_en_cours-1)*nbre_page_par_bloc+4;
elm3.innerHTML=" "+nbre_page+" ";

var elm4=document.getElementById('4');
nbre_page=(bloc_en_cours-1)*nbre_page_par_bloc+5;
elm4.innerHTML=" "+nbre_page+" ";
}
else
{
//alert(taille_pagination%5);
//comp=taille_pagination/5+1;
var taille=0;
if(taille_pagination%nbre_page_par_bloc==0)
{
taille=nbre_page_par_bloc;
}
else
{
taille=taille_pagination%nbre_page_par_bloc;
}
for(var v=0;v<taille;v++)
{
var val=0;
if(v==0)
{
var elm0=document.getElementById('0');
val=(bloc_en_cours-1)*nbre_page_par_bloc+v+1;
elm0.innerHTML=" "+val+" ";
elm0.style.fontWeight = 'bold';
elm0.style.color='gray';
}
else
{
val=(bloc_en_cours-1)*nbre_page_par_bloc+v+1;
var elm1=document.getElementById(v);
elm1.innerHTML=" "+val+" ";
}
}
if(taille_pagination%nbre_page_par_bloc !=0)
{
for(var v=taille_pagination%nbre_page_par_bloc;v<nbre_page_par_bloc;v++)
{
var elm2=document.getElementById(v);
//elm2.disabled = true;
elm2.innerHTML=" ";
}
}
}

}
//alert(page_en_cours);
affichage();
}
//alert('ok');
}
}


function goFin()
{
//alert(taille_pagination);
//alert(page_en_cours);
page_en_cours=taille_pagination-1;
if(taille_pagination%nbre_page_par_bloc==0)
{
bloc_en_cours=parseInt(taille_pagination/nbre_page_par_bloc);

}
else
{
bloc_en_cours=parseInt(taille_pagination/nbre_page_par_bloc)+1;
//alert('2eme');
}
//alert(bloc_en_cours);
var comp=0;
//
//alert(parseInt(taille_pagination%5));
if(taille_pagination%nbre_page_par_bloc==0)
{
comp=parseInt(taille_pagination/nbre_page_par_bloc);

}
else
{
comp=parseInt(taille_pagination/nbre_page_par_bloc)+1;
//alert('2eme');
}
//alert(comp);
if(comp!=bloc_en_cours)
{
var elm_prec=document.getElementById('4');
elm_prec.style.fontWeight = 'normal';
elm_prec.style.color='#2489CE';
//comp=taille_pagination/5;

var elm0=document.getElementById('0');
elm0.innerHTML=(bloc_en_cours-1)*nbre_page_par_bloc+1;
elm0.style.fontWeight = 'bold';
elm0.style.color='gray';
var elm1=document.getElementById('1');
elm1.innerHTML=(bloc_en_cours-1)*nbre_page_par_bloc+2;
var elm2=document.getElementById('2');
elm2.innerHTML=(bloc_en_cours-1)*nbre_page_par_bloc+3;
var elm3=document.getElementById('3');
elm3.innerHTML=(bloc_en_cours-1)*nbre_page_par_bloc+4;
var elm4=document.getElementById('4');
elm4.innerHTML=(bloc_en_cours-1)*nbre_page_par_bloc+5;
}
else
{
if(taille_pagination%nbre_page_par_bloc==0)
{

var val="";

var elm0=document.getElementById('0');
val=(bloc_en_cours-1)*nbre_page_par_bloc+1;
elm0.innerHTML=" "+val+" " ;

elm0.style.fontWeight = 'normal';
elm0.style.color='#2489CE';

var elm1=document.getElementById('1');
val=(bloc_en_cours-1)*nbre_page_par_bloc+2;
elm1.innerHTML=" "+val+" " ;
elm1.style.fontWeight = 'normal';
elm1.style.color='#2489CE';

var elm2=document.getElementById('2');
val=(bloc_en_cours-1)*nbre_page_par_bloc+3;
elm2.innerHTML=" "+val+" " ;
elm2.style.fontWeight = 'normal';
elm2.style.color='#2489CE';

var elm3=document.getElementById('3');
val=(bloc_en_cours-1)*nbre_page_par_bloc+4;
elm3.innerHTML=" "+val+" " ;
elm3.style.fontWeight = 'normal';
elm3.style.color='#2489CE';

var elm4=document.getElementById('4');
val=(bloc_en_cours-1)*nbre_page_par_bloc+5;
elm4.innerHTML=" "+val+" " ;
elm4.style.color='gray';
elm4.style.fontWeight = 'bold';

}
else
{
//comp=taille_pagination/5+1;
for(var v=0;v<taille_pagination%nbre_page_par_bloc;v++)
{
var val=0;
if(v==taille_pagination%nbre_page_par_bloc-1)
{
var elm0=document.getElementById(taille_pagination%nbre_page_par_bloc-1);
val=(bloc_en_cours-1)*nbre_page_par_bloc+v+1;
elm0.innerHTML=" "+val+" ";
elm0.style.fontWeight = 'bold';
elm0.style.color='gray';
}else
{
val=(bloc_en_cours-1)*nbre_page_par_bloc+v+1;
var elm1=document.getElementById(v);
elm1.style.fontWeight = 'normal';
elm1.style.color='#2489CE';
elm1.innerHTML=" "+val+" ";
}
}

for(var v=taille_pagination%nbre_page_par_bloc;v<nbre_page_par_bloc;v++)
{
var elm2=document.getElementById(v);
elm2.innerHTML=" ";
}

}

}
affichage();
}

function goDebut()
{
//alert(taille_pagination);
//alert(page_en_cours);
page_en_cours=0;
bloc_en_cours=1;


var val=0;
var elm0=document.getElementById('0');
val=(bloc_en_cours-1)*nbre_page_par_bloc+1;
elm0.innerHTML="   "+val+"   " ;
elm0.style.fontWeight = 'bold';
elm0.style.color='gray';
var elm1=document.getElementById('1');
val=(bloc_en_cours-1)*nbre_page_par_bloc+2;
elm1.innerHTML="  "+val+"   " ;
elm1.style.fontWeight = 'normal';
elm1.style.color='#2489CE';
var elm2=document.getElementById('2');
val=(bloc_en_cours-1)*nbre_page_par_bloc+3;
elm2.innerHTML="    "+val+"  " ;
elm2.style.fontWeight = 'normal';
elm2.style.color='#2489CE';
var elm3=document.getElementById('3');
val=(bloc_en_cours-1)*nbre_page_par_bloc+4;
elm3.innerHTML="    "+val+"    " ;
elm3.style.fontWeight = 'normal';
elm3.style.color='#2489CE';
var elm4=document.getElementById('4');
val=(bloc_en_cours-1)*nbre_page_par_bloc+5;
elm4.innerHTML="   "+val+"   " ;
elm4.style.fontWeight = 'normal';
elm4.style.color='#2489CE';

	if(taille_pagination<6)
		{

		for(var v=taille_pagination;v<5;v++)
{

var elm2=document.getElementById(v);
elm2.innerHTML=" ";
}

		
		}
affichage();
}


function goD()
{

if(page_en_cours>0)
{
if(page_en_cours>=0)
{
var exist_page_ds_en_cours= parseInt( (page_en_cours-1)/nbre_page_par_bloc);
if(exist_page_ds_en_cours+1 == bloc_en_cours)
{

var elm_prec=document.getElementById(page_en_cours%nbre_page_par_bloc);
elm_prec.style.fontWeight = 'normal';
elm_prec.style.color='#2489CE';
var elm=document.getElementById(page_en_cours%nbre_page_par_bloc-1);
elm.style.fontWeight = 'bold';
elm.style.color='gray';
page_en_cours=page_en_cours-1;
//alert('1');
}
// nouveau bloc
else
{

page_en_cours=page_en_cours-1;
bloc_en_cours=bloc_en_cours-1;

var nbre_page=0;

var elm0=document.getElementById('0');
nbre_page=(bloc_en_cours-1)*nbre_page_par_bloc+1;
elm0.innerHTML=" "+nbre_page+" ";
elm0.style.fontWeight = 'normal';
elm0.style.color='#2489CE';

var elm1=document.getElementById('1');
nbre_page=(bloc_en_cours-1)*nbre_page_par_bloc+2;
elm1.innerHTML=" "+ nbre_page+ " ";

var elm2=document.getElementById('2');
nbre_page=(bloc_en_cours-1)*nbre_page_par_bloc+3;
elm2.innerHTML="  "+nbre_page+"  ";

var elm3=document.getElementById('3');
nbre_page=(bloc_en_cours-1)*nbre_page_par_bloc+4;
elm3.innerHTML=" "+nbre_page+" ";

var elm4=document.getElementById('4');
nbre_page=(bloc_en_cours-1)*nbre_page_par_bloc+5;
elm4.innerHTML=" "+nbre_page+" ";
elm4.style.fontWeight = 'bold';
elm4.style.color='gray';

}
affichage();
}
}
}

function goPage(j)
{
//alert(page_en_cours);
//
if((page_en_cours !=nbre_page_par_bloc*(bloc_en_cours-1)+j)&&(nbre_page_par_bloc*(bloc_en_cours-1)+j<taille_pagination))
{
var elm_prec=document.getElementById(page_en_cours%nbre_page_par_bloc);
elm_prec.style.fontWeight = 'normal';
elm_prec.style.color='#2489CE';
var elm=document.getElementById(j);
elm.style.fontWeight = 'bold';
elm.style.color='gray';
//alert(bloc_en_cours);
//alert(j*5*(bloc_en_cours-1));

//alert(j);
page_en_cours=nbre_page_par_bloc*(bloc_en_cours-1)+j;
affichage();
}
}


function ServiceFailed(result) {
    //alert('Service call failed: ' + result.status + '' + result.statusText);
    Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
}

function SystemView(NomEntite) {
$('#busy').show();
   var ent = NomEntite;
    var request = { u: { login:  window.localStorage.getItem("login"), pw:  window.localStorage.getItem("pw"),urlOrg: window.localStorage.getItem("urlOrg"),entity: ent} };
    var jsondata = JSON.stringify(request);
    Data = jsondata;
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/SystemView";
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    CallServ();
}

function backPage()
{
window.location="accueil.html";	
}

$(document).ready
(

function () {
 //$("#wrapper").niceScroll("#wrapper",{cursorcolor:"#00F"});
  //$("html").niceScroll();
	sessionStorage.setItem("EntityName",nomEntite);
	sessionStorage.setItem("DisplayName",displayEntite);
    SystemView(nomEntite);
}

);
