
var guid=new Array;
var taille_pagination1=0;
var taille_total1=0;
var cx1=0;
var page_en_cours1=0;
var bloc_en_cours1=1;
var list_par_page1=10;
var nbre_page_par_bloc1=5;


function affichView() 
{
    $('#busy').show();
    var divpage=document.getElementById('page');
	divpage.innerHTML='';
	cx1=0;
	var elem=document.getElementById('thelist');
	elem.innerHTML="";
    document.addEventListener("deviceready", onDeviceReady , false);
}

function affichViewEncours() 
{
	$('#busy').show();	
	var elem=document.getElementById('thelist');
	elem.innerHTML="";
    onDeviceReady ();
}
function onDeviceReady () {
     window.requestFileSystem( LocalFileSystem.PERSISTENT, 0, gotFS, fail);
}
function gotFS(fileSystem) {

		var filename= sessionStorage.getItem('offlineDB')+"s.txt";
		console.log(filename);
        fileSystem.root.getFile( filename , null , gotFileEntry, fail);
}

    function gotFileEntry(fileEntry) {
         fileEntry.file(gotFile, fail);
    }

    function gotFile(file){
        console.log("Read method");
    	var reader = new FileReader();
        reader.onloadend = function(evt) {
            console.log("Read as text");
		    CallServView(evt.target.result);
        };
        reader.readAsText(file);
    }
    
    function fail(error) {
        console.log(error.code);
    }

function CallServView(result)
{
	$myObject = $.parseJSON(result);
	ServiceSucceededV(getRecordsPerPage($myObject ,page_en_cours1));
}	
function ServiceSucceededV(result)
{
 
        data = result ;
		
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
		  
		
		$('#page').append('<a id="debut" style="border: 1px solid #aaa;font-size: 20;"  onclick="goDebutView();" class="ui-link"> << </a> &nbsp');
		
		$('#page').append('<a id="d" style="border: 1px solid #aaa;font-size: 20;" onclick="goDView();" class="ui-link"> < </a> &nbsp');
		

		
		$('#page').append('<a id="0" style="font-weight:bold;color: gray;border: 1px solid #aaa;font-size: 20;" onclick="goPageView(0);" class="ui-link"> 1 </a> &nbsp&nbsp');
		$('#page').append('<a id="1" style="font-weight:normal; border: 1px solid #aaa;font-size: 20;" onclick="goPageView(1);" class="ui-link">  2 </a>&nbsp&nbsp');
		$('#page').append('<a id="2" style="font-weight:normal;border: 1px solid #aaa;font-size: 20;" onclick="goPageView(2);" class="ui-link"> 3 </a> &nbsp&nbsp');
		$('#page').append('<a id="3" style="font-weight:normal;border: 1px solid #aaa;font-size: 20;" onclick="goPageView(3);" class="ui-link"> 4 </a> &nbsp&nbsp');
		$('#page').append('<a id="4" style="font-weight:normal;border: 1px solid #aaa;font-size: 20;" onclick="goPageView(4);" class="ui-link"> 5 </a> &nbsp&nbsp');
		
		
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
		
	

		
            // string recu
			$('#busy').hide();
            //alert(data);
    
              for( var j in data.Entities){
				
			   //var attributes  = mapToDictionnary(data.Entities[j].Attributes);
			   dpName = displayName(data.Entities[j].Attributes);
				
if(j%10==0)
{
//alert(j);
	$('#thelist').append('<li onclick="goRecord('+j+');" style="height: 40;"><a href="javascript:goRecord('+j+')"> <img onclick="goRecord('+j+');" src="img/'+sessionStorage.getItem("offlineDB")+'.png" style="margin: -1;margin-left: -10;margin-left: -1;margin-top: 10;" class="list-icon1"/><p class="line0" style="margin-left: 21;line-height: 0;height: 0;white-space: nowrap;margin-top: -5;">'+ dpName + '</p> </a></li> <p> </p>');          
}
else
{
$('#thelist').append('<li onclick="goRecord('+j+');" style="height: 20;"><a href="javascript:goRecord('+j+')"> <img onclick="goRecord('+j+');" src="img/'+sessionStorage.getItem("offlineDB")+'.png" style="margin: -10;margin-left: -1;" class="list-icon1"/><p class="line0" style="margin-left: 21;line-height: 0;height: 0;white-space: nowrap;">'+ dpName + '</p> </a></li> <p> </p>');          

}  
//alert(data.Entities[j].Attributes[1].value);
guid[j]=data.Entities[j].Id;

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
elm2.innerHTML=" ";
}
}
}

}
affichViewEncours();
}
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

}

if(comp!=bloc_en_cours1)
{


var val="";
var elm_prec=document.getElementById('4');
elm_prec.style.fontWeight = 'normal';
elm_prec.style.color='#2489CE';

var elm0=document.getElementById('0');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+1;
elm0.innerHTML=" "+val+" " ;
elm0.style.fontWeight = 'bold';
elm0.style.color='gray';
var elm1=document.getElementById('1');
elm1.innerHTML=(bloc_en_cours1-1)*nbre_page_par_bloc1+2;
var elm2=document.getElementById('2');
elm2.innerHTML=(bloc_en_cours1-1)*nbre_page_par_bloc1+3;
var elm3=document.getElementById('3');
elm3.innerHTML=" "+(bloc_en_cours1-1)*nbre_page_par_bloc1+4;
var elm4=document.getElementById('4');
elm4.innerHTML=" "+(bloc_en_cours1-1)*nbre_page_par_bloc1+5;
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

function goRecord(j)
{
	//window.location=sessionStorage.getItem("EntityName")+'Form.html?'+guid[j];
	
	//alert(guid[j]);
	sessionStorage.setItem("guidEntity",guid[j]);
	window.location=sessionStorage.getItem("EntityName")+'Form.html';
	}
function goback()
{
	window.location="accueil.html";
}
function addRecord()
{
	window.location="nouveau.htm";
}
function ServiceFailed1(result) {
    //alert('Service call failed: ' + result.status + '' + result.statusText);
    Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
}

/*--------------------------------------------------------*/

function mapToDictionnary(tab)
{
   var array = new Array();
	    $.each(tab, function(i,v){
			array[v.key]=v.value;
		});
   return array ;
}

function getRecordsPerPage( data , page )
{
  var page_num = page;
  var nbre_par_page = 10;
  var fin = 0;
  var newData = {};
  
  if(data.Entities.length != 0 ){
	
    newData["Entities"] = new Array();
    newData["EntityName"] =  ""+data.Entities.length ;
	if (data.Entities.length / nbre_par_page == page_num)
                {
                    //Console.WriteLine("1");
                    fin = data.Entities.length;
                }
                else
                {
                    //Console.WriteLine("2");
                    fin = page_num * nbre_par_page + nbre_par_page;

                }
				
	for (var i = page_num * nbre_par_page; i < fin; i++)
                {
                    
				  newData["Entities"].push(data.Entities[i]);

                }
	
    return newData ;
	
	}else{
	 return data ;
	}
}


function displayName(attributes)
{
var name ;
var attr = mapToDictionnary(attributes);
var entityName = sessionStorage.getItem('offlineDB');
   switch (entityName) {
    case "contact": name= attr['firstname']+ " "+ attr['lastname'];
					break;
	case "appointment": name= attr['subject'];
					break;
	default: name= attr['name'];
}
  /*if ( entityName == "contact")
  {
      name= attr['firstname']+ " "+ attr['lastname'];
  
  }else
  {
		name= attr['name'];
  }*/
 return name ;
}

