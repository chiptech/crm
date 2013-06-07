var Type;
var Url;
var Data;
var ContentType;
var DataType;
var ProcessData;
var nomEntite; // Nom de l'entité
var displayEntite;
var guid=new Array;
var ea;
var Entityname;

var taille_pagination1=0;
var taille_total1=0;
var cx1=0;
var page_en_cours1=0;
var bloc_en_cours1=1;
var list_par_page1=10;
var nbre_page_par_bloc1=5;
var idView="";

var idActivity=new Array;
var typeActivity=new Array;

function affichage()
{
var id=sessionStorage.getItem("guidEntity");
	Entityname=sessionStorage.getItem("EntityName");
	ea=sessionStorage.getItem("entiteassocie") ;
	var div = document.getElementById("thelist"); // crée un élément <table>
    div.innerHTML = '';  
	$('#busy').show();		
	
    var request = { u: { login: window.localStorage.getItem("login"), pw: window.localStorage.getItem("pw"),urlOrg:window.localStorage.getItem("urlOrg"), entity: Entityname,entityrelated:ea,guid:id,page:page_en_cours1} };
    var jsondata = JSON.stringify(request);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/getRelatedEntity";
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
        data = result.getRelatedEntityResult;
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
		
		$('#page').append('<a id="debut" style="border: 1px solid #aaa;font-size: 23;"  onclick="goDebutView();" class="ui-link"> << </a> &nbsp');
		
		$('#page').append('<a id="d" style="border: 1px solid #aaa;font-size: 23;" onclick="goDView();" class="ui-link"> < </a> &nbsp');
		

		
		$('#page').append('<a id="0" style="font-weight:bold;color: gray;border: 1px solid #aaa;font-size: 23;" onclick="goPageView(0);" class="ui-link"> 1 </a> &nbsp&nbsp');
		$('#page').append('<a id="1" style="font-weight:normal; border: 1px solid #aaa;font-size: 23;" onclick="goPageView(1);" class="ui-link">  2 </a>&nbsp&nbsp');
		$('#page').append('<a id="2" style="font-weight:normal;border: 1px solid #aaa;font-size: 23;" onclick="goPageView(2);" class="ui-link"> 3 </a> &nbsp&nbsp');
		$('#page').append('<a id="3" style="font-weight:normal;border: 1px solid #aaa;font-size: 23;" onclick="goPageView(3);" class="ui-link"> 4 </a> &nbsp&nbsp');
		$('#page').append('<a id="4" style="font-weight:normal;border: 1px solid #aaa;font-size: 23;" onclick="goPageView(4);" class="ui-link"> 5 </a> &nbsp&nbsp');
		
		
		$('#page').append('<a id="g" style="border: 1px solid #aaa;font-size: 23;" onclick="goGView();" class="ui-link"> > </a>&nbsp');
		$('#page').append('<a id="fin" style="border: 1px solid #aaa;font-size: 23;"onclick="goFinView();" class="ui-link"> >> </a>');
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
			  
			  

if(sessionStorage.getItem("entiteassocie") =="activitypointer")
{

					 
			guid[j]=data.Entities[j].Attributes[1].value;
			typeActivity[j]=data.Entities[j].Attributes[2].value;
	
			if(j==0)
			{
$('#thelist').append('<li style="height: 30;margin-top: 7;"><a href="javascript:goRecord('+j+')"> <img src="imgActivities/'+data.Entities[j].Attributes[2].value+'.png" style="margin: -1;margin-left: 1;margin-top: 5;" class="list-icon1"/><p class="line0" style="white-space: nowrap;margin-left: 21;line-height: 0;height: 0;margin-top: -5;"> '+data.Entities[j].Attributes[0].value + '</p> </a></li> <p> </p>');   

			}
			else
			{
$('#thelist').append('<li style="height: 20;"><a href="javascript:goRecord('+j+')"> <img src="imgActivities/'+data.Entities[j].Attributes[2].value+'.png" style="margin: -5;margin-left: 1;" class="list-icon1"/><p class="line0" style="white-space: nowrap;margin-left: 21;line-height: 0;height: 0;"> '+data.Entities[j].Attributes[0].value + '</p> </a></li> <p> </p>');   
}
//$('#thelist').append('<li style="height: 20;"><a href="javascript:goRecord('+j+')"> <img src="img/'+sessionStorage.getItem("EntityName")+'.png" style="margin: -10;" class="list-icon1"/><p class="line0" style="margin-left: 21;line-height: 0;height: 0;">'+data.Entities[j].Attributes[0].value + '</p> </a></li> <p> </p>');          
 
  




}
else
{
			  
if(j==0)
{
//alert(j);
	$('#thelist').append('<li style="height: 40;margin-top: 10;"><a href="javascript:goRecord('+j+')"> <img src="img/'+sessionStorage.getItem("entiteassocie")+'.png" style="margin: -1;margin-left: -10;" class="list-icon1"/><p class="line0" style="white-space: nowrap;margin-left: 21;line-height: 0;height: 0;">'+ data.Entities[j].Attributes[0].value + '</p> </a></li> <p> </p>');          
}
else
{
$('#thelist').append('<li style="height: 20;"><a href="javascript:goRecord('+j+')"> <img src="img/'+sessionStorage.getItem("entiteassocie")+'.png" style="margin: -10;" class="list-icon1"/><p class="line0" style="margin-left: 21;line-height: 0;height: 0;white-space: nowrap;">'+data.Entities[j].Attributes[0].value + '</p> </a></li> <p> </p>');          

}  
guid[j]=data.Entities[j].Attributes[1].value;
}


     
	 
	 
	 
	 }
				//	setTimeout(function(){scroll.refresh();},100);
          		setTimeout(function(){myScroll.refresh();},100);                 
          
		
	}	
else
{
$('#busy').hide();
	div.innerHTML = '';   
 div.innerHTML = "Aucun enregistrement disponible";            
           
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
    //alert('Service call failed: ' + result.status + '' + result.statusText);
    Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
}

function goRecord(j)
{
	//window.location=sessionStorage.getItem("EntityName")+'Form.html?'+guid[j];
	sessionStorage.setItem("guidEntityea",guid[j]);
	//alert(ea);
	

	if(sessionStorage.getItem("entiteassocie")=="activitypointer")
	{

	sessionStorage.setItem("ea",typeActivity[j]);

	}
	else
	{
		sessionStorage.setItem("ea",ea);

	}
	window.location='FormEA.html';
	}
function retour()
{
//alert(Entityname);
window.location = Entityname+"Form.html";



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
//alert(page_en_cours1);
affichage();
}
//alert('ok');
}
}
function goFinView()
{
//alert(taille_pagination1);
//alert(page_en_cours1);
page_en_cours1=taille_pagination1-1;
if(taille_pagination1%nbre_page_par_bloc1==0)
{
bloc_en_cours1=parseInt(taille_pagination1/nbre_page_par_bloc1);

}
else
{
bloc_en_cours1=parseInt(taille_pagination1/nbre_page_par_bloc1)+1;
//alert('2eme');
}
//alert(bloc_en_cours1);
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
//alert('2eme');
}
//alert(comp);
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

//comp=taille_pagination1/5+1;
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
affichage();
}

function goDebutView()
{

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
affichage();
}
}
}

function goPageView(j)
{
//alert(page_en_cours1);
//
if((page_en_cours1 !=nbre_page_par_bloc1*(bloc_en_cours1-1)+j)&&(nbre_page_par_bloc1*(bloc_en_cours1-1)+j<taille_pagination1-1))
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
affichage();
}
}

$(document).ready
(

function () {
 //$("#wrapper").niceScroll("#wrapper",{cursorcolor:"#00F"});
  //$("html").niceScroll();

    affichage();
}

);
