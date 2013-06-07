var Type;
var Url;
var Data;
var ContentType;
var DataType;
var ProcessData;
var enregs=new Array;

var taille_pagination=0;
var taille_total=0;
var cx=0;
var page_en_cours=0;
var bloc_en_cours=1;
var list_par_page=10;
var nbre_page_par_bloc=5;
function affichAnnonce() 
{
   //div.innerHTML = '';  
  
	$('#busy').show();	
	var elem=document.getElementById('thelist');
	elem.innerHTML="";
	
    var request = { u: { login:  window.localStorage.getItem("login"), pw:  window.localStorage.getItem("pw"),urlOrg :  window.localStorage.getItem("urlOrg"), page: page_en_cours} };
    var jsondata = JSON.stringify(request);
   
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/getannonce";
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
 async: false,
        success: function (msg) {
            ServiceSucceededV(msg);

        },
        error: ServiceFailed1  // When Service call fails
    });
}

function ServiceSucceededV(result) {
	
    if (DataType == "json") {
        var form = window.document.view;
        data = result.getannonceResult;
		  
        if (data) {

	
		      var reg = new RegExp("#", "g");
			   enregs= data.split(reg);
		
           var reg1 = new RegExp("¤", "g");
            
	
    	if(cx==0)
		{
		
		taille_total=enregs[enregs.length-2];
	
		cx=1;
		if(parseInt(enregs[enregs.length-2]%list_par_page)==0)
		{
		taille_pagination= parseInt(enregs[enregs.length-2]/list_par_page);
		}
		else
		{
		taille_pagination= parseInt(enregs[enregs.length-2]/list_par_page)+1;
		
		}
		    
		
		$('#page').append('<a id="debut" style="border: 1px solid #aaa;font-size: 20;"  onclick="goDebut();"> << </a> &nbsp');
		
		$('#page').append('<a id="d" style="border: 1px solid #aaa;font-size: 20;" onclick="goD();"> < </a> &nbsp');
		

		
		$('#page').append('<a id="0" style="font-weight:bold;color: gray;border: 1px solid #aaa;font-size: 20;" onclick="goPage(0); "> 1 </a> &nbsp&nbsp');
		$('#page').append('<a id="1" style="font-weight:normal; border: 1px solid #aaa;font-size: 20;" onclick="goPage(1);">  2  </a>&nbsp&nbsp');
		$('#page').append('<a id="2" style="font-weight:normal;border: 1px solid #aaa;font-size: 20;" onclick="goPage(2);"> 3 </a> &nbsp&nbsp');
		$('#page').append('<a id="3" style="font-weight:normal;border: 1px solid #aaa;font-size: 20;" onclick="goPage(3);"> 4 </a> &nbsp&nbsp');
		$('#page').append('<a id="4" style="font-weight:normal;border: 1px solid #aaa;font-size: 20;" onclick="goPage(4);"> 5 </a> &nbsp&nbsp');
		
		
		$('#page').append('<a id="g" style="border: 1px solid #aaa;font-size: 20;" onclick="goG();margin: 15;"> > </a>&nbsp');
		$('#page').append('<a id="fin" style="border: 1px solid #aaa;font-size: 20;"onclick="goFin();margin: 15;"> >> </a>');
		 
      		if(taille_pagination<6)
		{
		for(var v=taille_pagination;v<5;v++)
{

var elm2=document.getElementById(v);
elm2.innerHTML=" ";
}}
		 
		 
		 }
		 for (var j = 0; j < enregs.length-2; j++) {
                      // crée une ligne de tableau
			
                        var Case = enregs[j].split(reg1);   

if(j==0)
{

	$('#thelist').append('<li id="0" style="height: 40;"><a   href="javascript:goRecord('+j+')"> <img src="img/annoncev.png" style="margin: -1;margin-left: -10;" class="list-icon1"/><p  class="line0" style="margin-left: 21;line-height: 0;height: 0;white-space: nowrap;"> '+Case[0] + '</p> </a></li> <p> </p>');          
	
	}
else
{
$('#thelist').append('<li style="height: 20;"><a href="javascript:goRecord('+j+')"> <img src="img/annoncev.png" style="margin: -10;" class="list-icon1"/><p class="line0" style="margin-left: 21;line-height: 0;height: 0;white-space: nowrap;"> '+Case[0] + '</p> </a></li> <p> </p>');          

}
}	
		setTimeout(function(){myScroll.refresh();},100);
	$('#busy').hide();                           

	}  

     
else
{
$('#busy').hide();
		//div.innerHTML = 'a';            
	var elem=document.getElementById('thelist');
	elem.innerHTML="Aucune annonce disponible";
 //div.innerHTML = "il n'y a aucune annonce";            
           
}	

   } 
    else {
        alert("Result Data type is not JSON");
    }
}

function goPage(j)
{

if((page_en_cours !=nbre_page_par_bloc*(bloc_en_cours-1)+j)&&(nbre_page_par_bloc*(bloc_en_cours-1)+j<taille_pagination))
{
var elm_prec=document.getElementById(page_en_cours%nbre_page_par_bloc);
elm_prec.style.fontWeight = 'normal';
elm_prec.style.color='#2489CE';
var elm=document.getElementById(j);
elm.style.fontWeight = 'bold';
elm.style.color='gray';
page_en_cours=nbre_page_par_bloc*(bloc_en_cours-1)+j;
affichAnnonce();
}
}
function goG()
{


if(page_en_cours< taille_pagination-1)
{


if(page_en_cours<taille_pagination)
{
document.getElementById('thelist').innerHTML=" ";


if((page_en_cours+1)/nbre_page_par_bloc != bloc_en_cours)
{


var elm_prec=document.getElementById(page_en_cours%nbre_page_par_bloc);
elm_prec.style.fontWeight = 'normal';
elm_prec.style.color='#2489CE';
var elm=document.getElementById(page_en_cours%nbre_page_par_bloc+1);
elm.style.fontWeight = 'bold';
elm.style.color='gray';
page_en_cours=page_en_cours+1;
}
// nouveau bloc
else
{
page_en_cours=page_en_cours+1;
bloc_en_cours=bloc_en_cours+1;
var comp=0;
//

if(taille_pagination%nbre_page_par_bloc==0)
{
comp=parseInt(taille_pagination/nbre_page_par_bloc);

}
else
{
comp=parseInt(taille_pagination/nbre_page_par_bloc)+1;

}

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

affichAnnonce();
}
}
}



function goDebut()
{
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

		for(var v=taille_pagination;v<5;v++)
{

var elm2=document.getElementById(v);
elm2.innerHTML=" ";
}
	if(taille_pagination<6)
		{
		
		for(var v=taille_pagination;v<5;v++)
{

var elm2=document.getElementById(v);
elm2.innerHTML=" ";
}

		
		}

affichAnnonce();
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










affichAnnonce();
}
}
}

function goFin()
{

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

}

if(comp!=bloc_en_cours)
{


var val="";
var elm_prec=document.getElementById('4');
elm_prec.style.fontWeight = 'normal';
elm_prec.style.color='#2489CE';

var elm0=document.getElementById('0');
val=(bloc_en_cours-1)*nbre_page_par_bloc+1;
elm0.innerHTML=" "+val+" " ;
elm0.style.fontWeight = 'bold';
elm0.style.color='gray';
var elm1=document.getElementById('1');
elm1.innerHTML=(bloc_en_cours-1)*nbre_page_par_bloc+2;
var elm2=document.getElementById('2');
elm2.innerHTML=(bloc_en_cours-1)*nbre_page_par_bloc+3;
var elm3=document.getElementById('3');
elm3.innerHTML=" "+(bloc_en_cours-1)*nbre_page_par_bloc+4;
var elm4=document.getElementById('4');
elm4.innerHTML=" "+(bloc_en_cours-1)*nbre_page_par_bloc+5;
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
affichAnnonce();
}


function ServiceFailed1(result) {
    //alert('Service call failed: ' + result.status + '' + result.statusText);
    Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
}

function goRecord(j)
{
var reg1 = new RegExp("¤", "g");
var Case = enregs[j].split(reg1);  



$('#viewAnnonce').append('<div  id="divAnnonce" style="width:100%">  </div>');	
 $('#divAnnonce').append(' <center><a href="javascript:CloseButton()"  data-role="button" data-transition="slide" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-btn-up-c ui-btn-inline ui-shadow ui-btn-corner-all"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Fermer</span></span></a> </center>');
 $('#divAnnonce').append('<p> <b> Titre : </b>'+Case[0]+'</p>');
 $('#divAnnonce').append('<p> <b> Corps  : </b>'+Case[1]+'</p>');
  $('#divAnnonce').append('<p> <b> Date d'+"'"+'expiration  : </b>'+Case[2]+'</p>');
   $('#divAnnonce').append('<p> <b> Url d'+"'"+'info : </b>'+Case[3]+'</p>');
 
 }
 function goback()
 {
 window.location="accueil.html";
 }
function CloseButton()
{

document.getElementById('viewAnnonce').innerHTML='';	
}
$(document).ready
(

function () {
 //$("#wrapper").niceScroll("#wrapper",{cursorcolor:"#00F"});
  //$("html").niceScroll();

    affichAnnonce() ;
}

);