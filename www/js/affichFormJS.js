
var Type;
var Url;
var Data;
var ContentType;
var DataType;
var ProcessData;
var resultObject;
var resultObjectContacts;
var resultObjectLookup; // List of record with lookup
var resultObjectContact;
var id_attribut= new Array;
var name_attribut = new Array;
var lookup_bool = new Array;
var chaine_attribut="";
var IdContactPrincipal=0;
var resultContact;
var table=new Array;
var tableau;
var dataview= new Array;
var entityLookupName;
var idLookup;
var entityIdLookup;
var tabAttributKey=new Array;
var tabAttributValue=new Array;	
var tabFormattedtKey=new Array;
var tabLookup=new Array;
var tabFormattedValue=new Array;
var customerLookup=0;
var changeCustomer=0;
var onglet_en_cours=1;
var plan=new Array;
var form_plan=new Array;


// ***************************    Entite associé       **********************************
function goRelatedEntity(e)
{

	sessionStorage.setItem('entiteassocie', e.id);
	window.location = "entiteassocie.html";
    	
}

function affichageOnglet(e)
{
var elm=document.getElementById("div1"+e.id.substring(5,3));

if(elm.style.display=='none')
{
elm.style.display='block';
document.getElementById("img"+e.id.substring(5,3)).src='img/down.png';

}else
{
elm.style.display='none';
document.getElementById("img"+e.id.substring(5,3)).src='img/regroup.png';

}


}

function affDate(elm)
{

   var now = new Date();
    $('#'+elm.id).mobiscroll().datetime({
        minDate: new Date(1980, now.getMonth(), now.getDate()),
        theme: 'android',
        lang: 'fr',
        display: 'bottom',
        mode: 'scroller'
    });

}
var taille_onglet=0;
// ajout formulaire

function ajout()
{
	//window.location="FormModification.html";
var form=document.getElementById("form")	;
form.innerHTML=" ";
	var reg_form_plan= new RegExp("@", "g");
	 form_plan=resultObject.split(reg_form_plan);
    var reg = new RegExp("=", "g");
	
	  tableau = form_plan[1].split(reg);
	
    
    var interm;
    var interm1;
    var interm2;
    var interm3;
    var interm4;
    var nbre = 0;
	var total=0;
	var reg_plan = new RegExp(">", "g");
	   var reg1 = new RegExp("#", "g");
    var reg2 = new RegExp(";", "g");
    var reg3 = new RegExp("/", "g");

	 var reg_section = new RegExp("#", "g");
	 plan =form_plan[0].split(reg_plan);
	nbre_onglet=plan.length-1;
	var premier_onglet=plan[0].split(reg);
	taille_onglet=plan.length-1;
ongletAfficher=0;
	for (var j = 0; j < plan.length-1; j++)
	{
nbreAttributsParOnglet = 0;
	plan_onglet=plan[j].split(reg);
	if(j==0)
	{
$('#form').append('<div id="div'+j+'"  style="margin-left: 20;display:block;" onclick="affichageOnglet(this);" ><img id="img'+j+'" onclick="affichageOnglet(this);" src="img/down.png" ><b><FONT size="20px"> <B style="font-size:20;color:blue;">'+plan_onglet[0]+'</B></font></b></div><div id="div1'+j+'" style="margin-left: 20;display:block;"></div> <br id=div2'+j+'> ');
}else
{
$('#form').append('<div id="div'+j+'"  style="margin-left: 20;" onclick="affichageOnglet(this);" ><img id="img'+j+'" onclick="affichageOnglet(this);" src="img/regroup.png" > <b><FONT size="20px"> <B style="font-size:20;color:blue;">'+plan_onglet[0]+'</B></font></b></div><div id="div1'+j+'"  style="margin-left: 20;display:none;" > </div> <br id=div2'+j+'>');

}		  
	section=plan_onglet[1].split(reg_section);
	
var x=j+1;
	
	//section
nbreAttributsParSection = 0;
		for(var l= 0; l < section.length; l++)	
		{
		var id_section="s"+section.length*j+j+l;
		
		if(section[l]=="notshowlabel")
		{
		$('#div1'+j).append('<div id='+id_section+' style="width:95%;" ></div>');
		}
		else
		{
			

		$('#div1'+j).append('<div id='+id_section+' style="width:95%;" ><b><FONT size="2"><U>'+section[l]+'</U></Font></b></div>');
//$('#'+id_section).append('<br></br>');
		}		
		//
 var indice= -1;		
		for (var i = 0; i < tableau.length; i++) {

       interm = tableau[i].split(reg1);
	   indice= -1;
for( var b=0; b<tabAttributKey.length;b++)
	   {
		
		  if (tabAttributKey[b]==interm[1])
		   {
		    indice=b;
			  break;
		    }
	   }


	  
	var _section = document.getElementById(id_section);
       if ((interm[1] != 'ownerid')&&(interm[1] != 'statecode')) {
	  
           if (interm.length == 5) {
		if((interm[4]==l) && (interm[3]==j)){
		nbreAttributsParSection = nbreAttributsParSection +1;
		nbreAttributsParOnglet =nbreAttributsParOnglet+1;
		  if(interm[1]=='regardingobjectid')
	  {
	  
	       lookup_bool[i] = "o";
                   name_attribut[i] = interm[0];
                   id_attribut[nbre] = interm[1];
                   nbre = nbre + 1;
                   var bloc1 = document.createElement("p");
                   if (interm[2] == '1') 
                   {
                       bloc1.innerText = interm[0] + '*';
                   }
                   else
                   {
					   bloc1.innerText = interm[0]; 
				   }
				  // Crée un nouvel élément de type "input"
                   var champ9 = document.createElement("input");
                   // Les valeurs encodée dans le formulaire seront stockées dans un tableau
                   champ9.name = interm[0];
                   champ9.type = "text";
                   champ9.id = interm[1];
                   champ9.disabled = "disabled";
				   
   if(indice!= -1){
				   if ((interm[1]=="estimatedvalue")||(interm[1]=="isrevenuesystemcalculated")||(interm[1]=="totalamount")){
					   var ch=tabAttributValue[indice];
					   champ.value=tabAttributValue[indice].substring(0,ch.length-6);
					   }
					   else {
						   champ9.value=tabAttributValue[indice];
						   }
               
			   }
			   else { champ9.value=" "; }	 		


			if (interm[2] == '1') 
				   {
                       champ9.required = "required";
                   }
              
                  // bloc1.appendChild(champ9); 
				   
              _section.appendChild(bloc1);
                   _section.appendChild(champ9);
                //  _section.appendChild(champB);
	  }
	  else
	  {
               lookup_bool[i] = "n";
               name_attribut[i] = interm[0];
               id_attribut[nbre] = interm[1];
               nbre = nbre + 1;

               var bloc = document.createElement("p");
               if (interm[2] == '1') {
                   bloc.innerText = interm[0] + ' *';
               }
               else
               { bloc.innerText = interm[0]; }
              var champ = null;
			      if((interm[1]=="description")||(interm[1]=="hli_compterendu"))
			   {
			     champ = document.createElement("textarea");
			   champ.style.height="200px";
			   champ.style.width="100%";
			   champ.disabled = "disabled"; 
			   champ.type="textarea";
			   }else
			   {
                champ = document.createElement("input");
               }
			   champ.name = interm[0];
               champ.type = "text";
               champ.id = interm[1];
               if (interm[2] == '1') {
                   champ.required = "required";
               }
			    
			     if(indice!= -1){
				   if ((interm[1]=="estimatedvalue")||(interm[1]=="isrevenuesystemcalculated")||(interm[1]=="totalamount")){
					   var ch=tabAttributValue[indice];
					   champ.value=tabAttributValue[indice].substring(0,ch.length-6);
					   }
					   else {
						   champ.value=tabAttributValue[indice];
						   }
               
			   }
			   else { champ.value=" "; }
	   champ.disabled = "disabled";         
		bloc.appendChild(champ);
               bloc.appendChild(champ);
               _section.appendChild(bloc);
                _section.appendChild(champ);
           
		   }
		   
		   
		   }
		   
		   }
		   if (interm.length == 6)  {
		 	if((interm[5]==l) && (interm[4]==j)){
		nbreAttributsParSection = nbreAttributsParSection +1;
			nbreAttributsParOnglet =nbreAttributsParOnglet+1;
                lookup_bool[i] = "n";
               name_attribut[i] = interm[0];
               id_attribut[nbre] = interm[1];
               nbre = nbre + 1;
	
	var reg4 = new RegExp(" ", "g");
	var reg5 = new RegExp("/", "g");



	var bloc = document.createElement("p");
               if (interm[3] == '1') {
                   bloc.innerText = interm[0] + ' *';
               }
               else
               { bloc.innerText = interm[0]; }
               var champ = document.createElement("input");
 if(interm[2]=="date")
 {
               champ.id = interm[1];
	          champ.title="date"; 
			  champ.className="i-txt";
			  champ.onmouseover=function(){ affDate(this);}; 
			   champ.disabled = "disabled";
          if(indice!=-1)
			  {
	

	var date_time=tabAttributValue[indice].split(reg4);

	var date=date_time[0].split(reg5);
var date_heure="";
	if(date_time[1] != null)
	{
	date_heure=date_time[0]+" "+date_time[1];
              champ.value=date_heure;  

	}
	else
	{
	date_heure=date_time[0];	
	champ.value=date_heure; 

	}	//date_heure=date_heure.replace(",","  ");
//alert(date_heure);
	
              champ.value=date_heure;  
			  }
  }
 if(interm[2]=="money")
{
             champ.id = interm[1];
	          champ.title="money"; 
			   champ.disabled = "disabled";
			       if(indice!= -1){
				   if ((interm[1]=="estimatedvalue")||(interm[1]=="isrevenuesystemcalculated")||(interm[1]=="totalamount")){
					   var ch=tabAttributValue[indice];
					   champ.value=tabAttributValue[indice].substring(0,ch.length-6);
					   }
					   else {
					       var regMoney = new RegExp(" ", "g");
// supprimer sigle du devise
						   var valMoneyTab=	tabAttributValue[indice];
var valMoney =	valMoneyTab.split(regMoney);				  
						  champ.value=valMoney[0];
						   }
						   }
} 
 if(interm[2]=="decimal")
{
             champ.id = interm[1];
	          champ.title="decimal"; 
			   champ.disabled = "disabled";
			       if(indice!= -1){
				   if ((interm[1]=="estimatedvalue")||(interm[1]=="isrevenuesystemcalculated")||(interm[1]=="totalamount")){
					   var ch=tabAttributValue[indice];
					   champ.value=tabAttributValue[indice].substring(0,ch.length-6);
					   }
					   else {
						   champ.value=tabAttributValue[indice];
						   }
						   }
} 
  
   if(interm[2]=="int")
{
             champ.id = interm[1];
	          champ.title="int"; 
			   champ.disabled = "disabled";
			       if(indice!= -1){
				   if ((interm[1]=="estimatedvalue")||(interm[1]=="isrevenuesystemcalculated")||(interm[1]=="totalamount")){
					   var ch=tabAttributValue[indice];
					   champ.value=tabAttributValue[indice].substring(0,ch.length-6);
					   }
					   else {
						   champ.value=tabAttributValue[indice];
						   }
						   }
} 
  
  
			 		   bloc.appendChild(champ);
			    _section.appendChild(bloc);
                _section.appendChild(champ);
	
		   }
		   
		   }
          if (interm.length == 7) {
  if((interm[6]==l) && (interm[5]==j)){ 
 nbreAttributsParSection = nbreAttributsParSection +1;
 	nbreAttributsParOnglet =nbreAttributsParOnglet+1;
			 if (interm[2] == 'radio') {
                    lookup_bool[i] = "n";
                   name_attribut[i] = interm[0];
                   interm1 = interm[3].split(reg2);
                   interm2 = interm1[0].split(reg3);
                   interm3 = interm1[1].split(reg3);
                   var champ5 = document.createElement("label");
                   // nom de l'attribut en francais
                   champ5.innerText = interm[0] + " : ";
                  // radio1
                   id_attribut[nbre] = interm[1] + "0";
                   nbre = nbre + 1;
                   // label1
                   var champ3 = document.createElement("label");
                   champ3.innerText = interm2[0];
                   var champ1 = document.createElement("input");
                   // Nom d'attribut en francais
                   champ1.name = interm[0];
                   champ1.type = "radio";
                   champ1.id = interm[1] + "0";
				    champ1.disabled = "disabled";
                   // valeur de l'attribut 
                   champ1.value = interm2[1];
				    // valeur de l'attribut 
                   champ1.value = interm2[1];
				   
				    if(tabAttributValue[indice]==interm2[0])
				   {
				 champ1.checked=true;
				   
				   }
				   
				
				   
                   // radio 2
                   id_attribut[nbre] = interm[1] + "1";
                   nbre = nbre + 1;
                   // label2
                   var champ4 = document.createElement("label");
                   champ4.innerText = interm3[0];
                   var champ2 = document.createElement("input");
                   // Nom d'attribut en francais
                   champ2.name = interm[0];
                   champ2.type = "radio";
				    champ2.disabled = "disabled";
                   //champ2.innerText = interm3[0];
                   champ2.id = interm[1] + "1";
              
               // valeur de l'attribut 
                   champ2.value = interm3[1];
                   if(tabAttributValue[indice]==interm3[0])
				   {
				 champ2.checked=true;
				   
				   }
                   var bloc1 = document.createElement("p");
                   bloc1.appendChild(champ1);
                   bloc1.appendChild(champ2);
                   _section.appendChild(bloc1);
                   _section.appendChild(champ5);
                    _section.appendChild(champ3);
                   _section.appendChild(champ1);
                   _section.appendChild(champ4);
                    _section.appendChild(champ2);
               }

               if (interm[2] == 'picklist') {
				  lookup_bool[i] = "n";
                   name_attribut[i] = interm[0];
                   id_attribut[nbre] = interm[1];
                   nbre = nbre + 1;
				   
                   interm1 = interm[3].split(reg2);
                   // select
                   var champ6 = document.createElement("select");
                   // id attribut
                   champ6.id = interm[1];
                   // name
                   champ6.name = interm[0];
                  // requi
                   if (interm[4] == '1') {
                       champ6.required = "required";
                   }
				   // disabled
				    champ6.disabled = "disabled";
                   // label
                   var champ7 = document.createElement("label");
                   champ7.innerText = interm[0] + " : ";
                   // balise <p>
                   var bloc2 = document.createElement("p");
                   bloc2.appendChild(champ6);
                   bloc2.appendChild(champ7); 
champ6.length++;				   
			    champ6.options[0].text = " ";
                   for (var n = 1; n < interm1.length+1; n++) {
                 
					
					
                           interm2 = interm1[n-1].split(reg3);
                           champ6.length++;
                           champ6.options[champ6.length - 1].text = interm2[0];
						   champ6.options[champ6.length - 1].title=interm2[1];

						   
                 						   if(interm2[0]==tabAttributValue[indice])
{
champ6.selectedIndex=champ6.length - 1;
}
  
				   
				   
				   }
				   
				  
                  
                  _section.appendChild(bloc2);
                   _section.appendChild(champ7);
                   _section.appendChild(champ6);
               }
  
  // look up
			   
               if (interm[2] == 'lookup') {
	               var idChamp=-1;
				 
				
				
			
                   lookup_bool[i] = "o";

                   // id
                   name_attribut[i] = interm[0];
                   id_attribut[nbre] = interm[1];
                   nbre = nbre + 1;
                   var bloc1 = document.createElement("p");
                   if (interm[4] == '1') 
                   {
                       bloc1.innerText = interm[0] + '*';
                   }
                   else
                   {
					   bloc1.innerText = interm[0]; 
				   }
				  // Crée un nouvel élément de type "input"
                   var champ9 = document.createElement("input");
                   // Les valeurs encodée dans le formulaire seront stockées dans un tableau
				  champ9.name = interm[3];
                   champ9.type = "text";
                   champ9.id = interm[1];
				    champ9.disabled = "disabled";
				   champ9.disabled="disabled";
    if(indice!= -1){
               			champ9.value=tabAttributValue[indice];
						champ9.title ="not" ;
			   				}
			   			else { champ9.value=" "; 
						        champ9.title ="not" ;
						}				
                   if (interm[2] == '1') {
                       champ9.required = "required";
                   }
                   var bloc = document.createElement("p");                  
      
                   //bloc1.appendChild(champ9);                      
                    _section.appendChild(bloc1);
                   _section.appendChild(champ9);
                 
			   }
           }
         }
	   
	   
   }
		
		
		
		
		
		}
		
		if( nbreAttributsParSection == 0)
		{
		
		//$("#@420"+id_section).remove();
		$('#'+id_section).remove();
		}
		else
		{
		
		$('#'+id_section).append('<br>');
		}
		
		}
 		if(nbreAttributsParOnglet ==0)
 {

 $('#div'+j).remove();
 $('#div1'+j).remove();
 $('#div2'+j).remove();
 }
	}

	
		 if(form_plan[2]=="")
	{
	}
	else{
var	entAss="Entitées Associées";
$('#form').append('<div id="div'+nbre_onglet+'"  style="margin-left: 20;display:block;" onclick="affichageOnglet(this);" ><img id="img'+nbre_onglet+'" onclick="affichageOnglet(this);" src="img/regroup.png" > <FONT size="20">  <b style="font-size:20;color:blue;">'+"Entit\351es Associ\351es"+' </b></Font> <div id="div1'+nbre_onglet+'" style="margin-left: 20;display:none;" > </div></div> <br></br>');
	$('#div1'+nbre_onglet).append('<br></br>');
	 var reg_entite = new RegExp(",", "g");
	 var reg_entite_logical = new RegExp("/", "g");
	
	var entiteAss =form_plan[2].split(reg_entite);
	  
	for (var h = 0; h < entiteAss.length; h++)
	{

	var _ent=entiteAss[h].split(reg_entite_logical);
	 $('#div1'+nbre_onglet).append('<a id="'+_ent[1]+'" style="width: 200;" data-inline= "false" onclick="goRelatedEntity(this);"  data-role="button" data-transition="slide" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-btn-up-c ui-btn-inline ui-shadow ui-btn-corner-all"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">' +_ent[0]+ '</span></span></a><br></br> ');

	}
	
	}


	var update=document.getElementById("update");
	update.style.display="block";
 $('#busy').hide();	

 setTimeout(function(){myScroll.refresh();},100);
  
}


function modification()
{
	resultObject=window.localStorage.getItem(sessionStorage.getItem("EntityName"));
	if((sessionStorage.getItem("EntityName")=="account")||(sessionStorage.getItem("EntityName")=="quote")||(sessionStorage.getItem("EntityName")=="opportunity"))
		{
		ajout();
		}
		else
		{
		ModifyingData();
        }
/*	var request = { u: {login: sessionStorage.getItem('cleL'), pw: sessionStorage.getItem('cleP'), entity:sessionStorage.getItem("EntityName")}};
    var jsondata = JSON.stringify(request);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/AskModify";
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    CallServiceAskingModification();	
*/
	}
/*
function CallServiceAskingModification() {
    $.ajax({
        type: Type, 
        url: Url,
        data: Data, 
        contentType: ContentType, 
        dataType: DataType, 
        processdata: ProcessData, 
        crossDomain: true,
        success: function (msg) {
            //On Successfull service call
            ServiceSucceededAskingModification(msg);
        },
        error: ServiceFailed  // When Service call fails
    });
}
 function ServiceSucceededAskingModification(result) {
   if (DataType == "json") {
        resultObject = result.AskModifyResult;
		if (resultObject) {
		//alert(resultObject);
		$('#busy').hide();
		if((sessionStorage.getItem("EntityName")=="account")||(sessionStorage.getItem("EntityName")=="quote")||(sessionStorage.getItem("EntityName")=="opportunity"))
		{
		ajout();
		}
		else
		{
		ModifyingData();
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
*/
function CreateFormModify(resultObject)
{	
var formulaire = window.document.FormModification;	


    var _reg = new RegExp("¤", "g");
	
var _tab=resultObject.split(_reg);
    var reg = new RegExp("=", "g");
	
    tableau = _tab[1].split(reg);
	//alert(tableau);
    var reg1 = new RegExp("#", "g");
    var reg2 = new RegExp("<", "g");
    var reg3 = new RegExp(">", "g");
    
    var interm;
    var interm1;
    var interm2;
    var interm3;
    var interm4;
    var nbre = 0;
	var total=0;
	var indice=-1;
    for (var i = 0; i < tableau.length; i++) {
       interm = tableau[i].split(reg1);
//alert(interm);	  
	  indice=-1;
	   for( var j=0; j<tabAttributKey.length;j++)
	   {
		
		  if (tabAttributKey[j]==interm[1])
		   {
			  indice=j;
			  break;
		    }
	   }
       if ((interm[1] != 'ownerid')&&(interm[1] != 'statecode')) {
           //alert(interm[1]);
           if (interm.length == 3) {
               lookup_bool[i] = "n";
               name_attribut[i] = interm[0];
               id_attribut[nbre] = interm[1];
               nbre = nbre + 1;

               var bloc = document.createElement("p");
               if (interm[2] == '1') {
                   bloc.innerText = interm[0] + ' *';
               }
               else
               { bloc.innerText = interm[0]; }
               // Crée un nouvel élément de type "input"
               var champ = document.createElement("input");
               // Les valeurs encodée dans le formulaire seront stockées dans un tableau
               champ.name = interm[0];
               champ.type = "text";
               champ.id = interm[1];
			   if(indice!= -1){
				   if ((interm[1]=="estimatedvalue")||(interm[1]=="isrevenuesystemcalculated")||(interm[1]=="totalamount")){
					   var ch=tabAttributValue[indice];
					   champ.value=tabAttributValue[indice].substring(0,ch.length-6);
					   }
					   else {
						   champ.value=tabAttributValue[indice];
						   }
               
			   }
			   else { champ.value=" "; }
               bloc.appendChild(champ);
               formulaire.insertBefore(bloc, formulaire.b);
               formulaire.insertBefore(champ, formulaire.b);
           }
		   
		   if (interm.length == 4) {
               lookup_bool[i] = "n";
               name_attribut[i] = interm[0];
               id_attribut[nbre] = interm[1];
               nbre = nbre + 1;
	
	//alert(tabAttributValue[indice]);
	var reg4 = new RegExp(" ", "g");
	var reg5 = new RegExp("/", "g");
	
	var date_time=tabAttributValue[indice].split(reg4);
	//alert(date_time[0]);
	var date=date_time[0].split(reg5);
	//alert(date[2]+"-"+date[1]+"-"+date[0]);
               var bloc = document.createElement("p");
               if (interm[3] == '1') {
                   bloc.innerText = interm[0] + ' *';
               }
               else
               { bloc.innerText = interm[0]; }
               // Crée un nouvel élément de type "input"
               var champ = document.createElement("input");
               // Les valeurs encodée dans le formulaire seront stockées dans un tableau
               champ.name = interm[0];
			  
              champ.value=date[2]+"-"+date[1]+"-"+date[0];  
			  // champ.value=date[2]+"-"+date[1]+"-"+date[0];
			   champ.type = "date";
               champ.id = interm[1];
	          
    		  
			  /*if(indice!= -1){
               champ.value=tabAttributValue[indice];
			 
			   }
			   else 
			   { 
			   champ.value=" "; 
			   }*/
                  // Crée un nouvel élément de type "input"
               var champ1 = document.createElement("input");
               // Les valeurs encodée dans le formulaire seront stockées dans un tableau
               
               champ1.type = "time";
               champ1.id = interm[1]+"date";
           champ1.value=date_time[1];

               bloc.appendChild(champ);
               formulaire.insertBefore(bloc, formulaire.b);
               formulaire.insertBefore(champ, formulaire.b);
            formulaire.insertBefore(champ1, formulaire.b);
		
			
		   }
		   
		   
		   
          if (interm.length == 5) {
               if (interm[2] == 'radio') {
                   lookup_bool[i] = "n";
                   name_attribut[i] = interm[0];
                   interm1 = interm[3].split(reg2);
                   interm2 = interm1[0].split(reg3);
                   interm3 = interm1[1].split(reg3);
                   var champ5 = document.createElement("label");
                   // nom de l'attribut en francais
                   champ5.innerText = interm[0] + " : ";
                  // radio1
                   id_attribut[nbre] = interm[1] + "0";
                   nbre = nbre + 1;
                   // label1
                   var champ3 = document.createElement("label");
                   champ3.innerText = interm2[0];
                   var champ1 = document.createElement("input");
                   // Nom d'attribut en francais
                   champ1.name = interm[0];
                   champ1.type = "radio";
                   champ1.id = interm[1] + "0";
                   // valeur de l'attribut 
                   champ1.value = interm2[1];
                   // radio 2
                   id_attribut[nbre] = interm[1] + "1";
                   nbre = nbre + 1;
                   // label2
                   var champ4 = document.createElement("label");
                   champ4.innerText = interm3[0];
                   var champ2 = document.createElement("input");
                   // Nom d'attribut en francais
                   champ2.name = interm[0];
                   champ2.type = "radio";
                   //champ2.innerText = interm3[0];
                   champ2.id = interm[1] + "1";
                   // valeur de l'attribut 
                   champ2.value = interm3[1];
                   // alert(interm2[0]);
                   var bloc1 = document.createElement("p");
                   bloc1.appendChild(champ1);
                   bloc1.appendChild(champ2);
                   formulaire.insertBefore(bloc1, formulaire.b);
                   formulaire.insertBefore(champ5, formulaire.b);
                   formulaire.insertBefore(champ3, formulaire.b);
                   formulaire.insertBefore(champ1, formulaire.b);
                   formulaire.insertBefore(champ4, formulaire.b);
                   formulaire.insertBefore(champ2, formulaire.b);
               }

               if (interm[2] == 'picklist') {
                   lookup_bool[i] = "n";
                   name_attribut[i] = interm[0];
                   id_attribut[nbre] = interm[1];
                   nbre = nbre + 1;
                   interm1 = interm[3].split(reg2);
                   // select
                   var champ6 = document.createElement("select");
                   // id attribut
                   champ6.id = interm[1];
                   // name
                   champ6.name = interm[0];
                   // requi
                   if (interm[4] == '1') {
                       champ6.required = "required";
                   }
                   // label
                   var champ7 = document.createElement("label");
                   champ7.innerText = interm[0] + " : ";
                   // balise <p>
                   var bloc2 = document.createElement("p");
                   bloc2.appendChild(champ6);
                   bloc2.appendChild(champ7);             
                   for (var j = 1; j < interm1.length+1; j++) {
                    
                           interm2 = interm1[j-1].split(reg3);
                           champ6.length++;
                           champ6.options[champ6.length - 1].text = interm2[0];
                           champ6.options[champ6.length - 1].id = interm2[1];					
                   }
				  
                   formulaire.insertBefore(bloc2, formulaire.b);
                   formulaire.insertBefore(champ7, formulaire.b);
                   formulaire.insertBefore(champ6, formulaire.b);
               }
               // look up
               if (interm[2] == 'lookup') {
				   var idChamp=-1;
				   for ( var j in tabAttributKey)
				   {
					if(tabAttributKey[j]==interm[1]){
						idChamp=j;
						}
				   }
			
                   lookup_bool[i] = "o";

                   // id
                   name_attribut[i] = interm[0];
                   id_attribut[nbre] = interm[3];
                   nbre = nbre + 1;
                   var bloc1 = document.createElement("p");
                   if (interm[4] == '1') 
                   {
                       bloc1.innerText = interm[0] + '*';
                   }
                   else
                   {
					   bloc1.innerText = interm[0]; 
				   }
				  // Crée un nouvel élément de type "input"
                   var champ9 = document.createElement("input");
                   // Les valeurs encodée dans le formulaire seront stockées dans un tableau
                   champ9.name = interm[0];
                   champ9.type = "text";
                   champ9.id = interm[3];
                   champ9.disabled = "disabled";
                   
				    if(indice!= -1){
			
               			champ9.value=tabAttributValue[indice];
						champ9.title =tabLookup[idChamp] ;
			   				}
			   			else { champ9.value=" "; 
						        champ9.title ="" ;
						}
                   if (interm[2] == '1') {
                       champ9.required = "required";
                   }
                   var bloc = document.createElement("p");                  
                   var champB = document.createElement("input");
                  // champB.id = interm[3];
				   champB.type="button";						 						 
				   champB.setAttribute("onClick", "viewRecord("+i+"); return false;");
				   champB.style.background='url("img/Searchicon.png")';
				   champB.style.width="32px";
				   champB.style.height="32px";
				   champB.style.marginLeft="2px";
                   bloc1.appendChild(champ9);                      
                   formulaire.insertBefore(bloc1, formulaire.b);
                   formulaire.insertBefore(champ9, formulaire.b);
                   formulaire.insertBefore(champB, formulaire.b);
			   }
           }
       }
   }
   var retourLigne = document.createElement("br");
   formulaire.insertBefore(retourLigne, formulaire.b);
}


/******************************************Lookup Customer***************************************/
/***************************** Closing Virtual Frame ********************************************/
function CloseButton()
{
customerLookup=0;
document.getElementById('viewALLContact').innerHTML='';	
}
/*********************************************************************** Back to account Form **********************************************/
function retour()
{

if((sessionStorage.getItem("EntityName")=="task") || (sessionStorage.getItem("EntityName") =="phonecall") ||(sessionStorage.getItem("EntityName")=="hli_alerte") ||(sessionStorage.getItem("EntityName")=="hli_sms"))
{
window.location="activities.html";
}else
{
window.location=sessionStorage.getItem("EntityName")+"View.html";
}
}
/************************************************************************* Update Record ***************************************************/
/************************************************************************** RetrieveRecord***************************************************/
function CallServiceRetrieving() {
   
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
            ServiceSucceededRetrieving(msg);
        },
        error: ServiceFailed  // When Service call fails
    });
}

function ServiceSucceededRetrieving(result) {
       if (DataType == "json") {
       var resultObject = result.doretrieveResult;     
	   
		var expr = JSON.stringify(resultObject);
	
		if (resultObject) {
			for( var i in resultObject.Attributes)
				{
			  	 tabAttributKey[i]=resultObject.Attributes[i].key; 
		    	 if(resultObject.Attributes[i].value=="[object Object]")
			  		 {
				  		tabAttributValue[i]=resultObject.Attributes[i].value.Name;
				  		tabLookup[i]=resultObject.Attributes[i].value.Id;
					 }					
					else{
				  		tabAttributValue[i]=resultObject.Attributes[i].value;
						}
				}						
			for( var i in resultObject.FormattedValues)
				{
				tabFormattedtKey[i]=resultObject.FormattedValues[i].key;
				tabFormattedValue[i]=resultObject.FormattedValues[i].value;
				}   
				// Corriger le probleme avec les picklist
				for (var i=0; i<tabFormattedtKey.length;i++)
				{
				for (var j in tabAttributKey)
					{
					if(tabFormattedtKey[i]==tabAttributKey[j])
						{	
							tabAttributValue[j]=tabFormattedValue[i];
							break;
						}
					}
				}
		     modification();
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
	$('#busy').hide();
	var div=document.getElementById('List');
	div.innerHTML="erreur de chargement";
    Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
}

function doretrieve() {

	var guid=sessionStorage.getItem("guidEntity");
	var Entityname=sessionStorage.getItem("EntityName");
	//alert(guid);
	//alert(Entityname);
    var request = { u: { login:  window.localStorage.getItem("login"), pw:  window.localStorage.getItem("pw"),urlOrg:  window.localStorage.getItem("urlOrg") ,id: guid,name: Entityname} };
    var jsondata = JSON.stringify(request);
//	alert(jsondata);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/doretrieve";
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    CallServiceRetrieving();
}
/**********Suppression**********/
function AskDelete()
{
	$('#divModalDialog1').append('<div id="deleteRecord"></div>');
	$('#deleteRecord').append(' <h1>Voulez-vous vraiment supprimer ce(tte)'+sessionStorage.getItem("DisplayName")+'?</h1><ul><center><a href="#" onClick="DeleteRecord()">Oui</a> &nbsp&nbsp<a href="#" onClick="DonotDelete()">Non</a> </center></ul>  ');
}
function DonotDelete ()
{
	document.getElementById('divModalDialog1').innerHTML='';
}
function DeleteRecord(){
	//var gid=sessionStorage.getItem("Id");
	var gid=sessionStorage.getItem("Id");
	var Entityname=sessionStorage.getItem("EntityName");
	var request = { u: {login: sessionStorage.getItem('cleL'), pw: sessionStorage.getItem('cleP'), id: gid,name: Entityname } };
	var jsondata = JSON.stringify(request);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/doDeleteRecord";
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    CallServiceDeleteRecord();	
	}
function CallServiceDeleteRecord() {
   
    $.ajax({
        type: Type, //GET or POST or PUT or DELETE verb
        url: Url, // Location of the service
        data: Data, //Data sent to server
        contentType: ContentType, // content type sent to server
        dataType: DataType, //Expected data format from server
        processdata: ProcessData, //True or False
        crossDomain: true,
        success: function (msg) {
        ServiceSucceededDeleteRecord(msg);
        },
        error: ServiceFailed  // When Service call fails
    });
}
 function ServiceSucceededDeleteRecord(result) {
   if (DataType == "json") {
        var resultDelete = result.doDeleteRecordResult;
        if (resultDelete) {
		   alert("Enregistrement supprimé");
		   window.location=sessionStorage.getItem("EntityName")+"View.html";
        }
        else {
            alert("erreur");         
        }
    }
    else {
        alert("Result Data type is not JSON");
    }
}

/*****************Geolocalisation****************/
function goGeo()
{
IdEntity= sessionStorage.getItem("guidEntity");
	
sessionStorage.setItem("guidEntity",IdEntity);
window.location="gps.html";
//window.location="gps.html";
}
/***********Form modification***********/

function ModifyingData()
{
	//window.location="FormModification.html";
var form=document.getElementById("form")	;
form.innerHTML=" ";
	var reg_form_plan= new RegExp("@", "g");
	 form_plan=resultObject.split(reg_form_plan);
    var reg = new RegExp("=", "g");
	
	  tableau = form_plan[1].split(reg);
	 
    
    var interm;
    var interm1;
    var interm2;
    var interm3;
    var interm4;
    var nbre = 0;
	var total=0;
	var reg_plan = new RegExp(">", "g");
	   var reg1 = new RegExp("#", "g");
    var reg2 = new RegExp(";", "g");
    var reg3 = new RegExp("/", "g");

	 var reg_section = new RegExp("#", "g");
	 plan =form_plan[0].split(reg_plan);
	nbre_onglet=plan.length-1;
	var premier_onglet=plan[0].split(reg);
	taille_onglet=plan.length-1;

	for (var j = 0; j < plan.length-1; j++)
	{
nbreAttributsParOnglet = 0;
	plan_onglet=plan[j].split(reg);
	if(j==0)
	{
$('#form').append('<div id="div'+j+'"  style="margin-left: 20;display:block;" onclick="affichageOnglet(this);" ><img id="img'+j+'" onclick="affichageOnglet(this);" src="img/down.png" ><b><FONT size="20px"> <B style="font-size:20;color:blue;">'+plan_onglet[0]+'</B></font></b></div><div id="div1'+j+'" style="margin-left: 20;display:block;"></div> <br id=div2'+j+'> ');
}else
{
$('#form').append('<div id="div'+j+'"  style="margin-left: 20;" onclick="affichageOnglet(this);" ><img id="img'+j+'" onclick="affichageOnglet(this);" src="img/regroup.png" > <b><FONT size="20px"> <B style="font-size:20;color:blue;">'+plan_onglet[0]+'</B></font></b></div><div id="div1'+j+'"  style="margin-left: 20;display:none;" > </div> <br id=div2'+j+'>');

}		  
	section=plan_onglet[1].split(reg_section);
	
var x=j+1;
	
	//section
nbreAttributsParSection = 0;
		for(var l= 0; l < section.length; l++)	
		{
		var id_section="s"+section.length*j+j+l;
		
		if(section[l]=="notshowlabel")
		{
		$('#div1'+j).append('<div id='+id_section+' style="width:95%;" ></div>');
		}
		else
		{
			

		$('#div1'+j).append('<div id='+id_section+' style="width:95%;" ><b><FONT size="2"><U>'+section[l]+'</U></Font></b></div>');
//$('#'+id_section).append('<br></br>');
		}		
		//
 var indice= -1;		
		for (var i = 0; i < tableau.length; i++) {

       interm = tableau[i].split(reg1);
	   indice= -1;
for( var b=0; b<tabAttributKey.length;b++)
	   {
		
		  if (tabAttributKey[b]==interm[1])
		   {
		    indice=b;
			  break;
		    }
	   }


	  
	var _section = document.getElementById(id_section);
       if ((interm[1] != 'ownerid')&&(interm[1] != 'statecode')) {
	  
           if (interm.length == 5) {
		if((interm[4]==l) && (interm[3]==j)){
		nbreAttributsParSection = nbreAttributsParSection +1;
		nbreAttributsParOnglet =nbreAttributsParOnglet+1;
		  if(interm[1]=='regardingobjectid')
	  {
	  
	       lookup_bool[i] = "o";
                   name_attribut[i] = interm[0];
                   id_attribut[nbre] = interm[1];
                   nbre = nbre + 1;
                   var bloc1 = document.createElement("p");
                   if (interm[2] == '1') 
                   {
                       bloc1.innerText = interm[0] + '*';
                   }
                   else
                   {
					   bloc1.innerText = interm[0]; 
				   }
				  // Crée un nouvel élément de type "input"
                   var champ9 = document.createElement("input");
                   // Les valeurs encodée dans le formulaire seront stockées dans un tableau
                   champ9.name = interm[0];
                   champ9.type = "text";
                   champ9.id = interm[1];
                   champ9.disabled = "disabled";
   if(indice!= -1){
				   if ((interm[1]=="estimatedvalue")||(interm[1]=="isrevenuesystemcalculated")||(interm[1]=="totalamount")){
					   var ch=tabAttributValue[indice];
					   champ.value=tabAttributValue[indice].substring(0,ch.length-6);
					   }
					   else {
						   champ9.value=tabAttributValue[indice];
						   }
               
			   }
			   else { champ9.value=" "; }	 		


			if (interm[2] == '1') 
				   {
                       champ9.required = "required";
                   }
                   var bloc = document.createElement("p");                  
                   var champB = document.createElement("input");
                  // champB.id = interm[3];
				   champB.type="button";						 						 
				   champB.setAttribute("onClick", "viewEntity("+i+"); return false;");
				   champB.style.background='url("img/Searchicon.png")';
				   champB.style.width="32px";
				   champB.style.height="32px";
				   champB.style.cssFloat="right";
                  // bloc1.appendChild(champ9); 
				   
              _section.appendChild(bloc1);
                   _section.appendChild(champ9);
                  _section.appendChild(champB);
	  }
	  else
	  {
               lookup_bool[i] = "n";
               name_attribut[i] = interm[0];
               id_attribut[nbre] = interm[1];
               nbre = nbre + 1;

               var bloc = document.createElement("p");
               if (interm[2] == '1') {
                   bloc.innerText = interm[0] + ' *';
               }
               else
               { bloc.innerText = interm[0]; }
              var champ = null;
			      if((interm[1]=="description")||(interm[1]=="hli_compterendu"))
			   {
			     champ = document.createElement("textarea");
			   champ.style.height="200px";
			   champ.style.width="100%";
			   
			   champ.type="textarea";
			   }else
			   {
                champ = document.createElement("input");
               }
			   champ.name = interm[0];
               champ.type = "text";
               champ.id = interm[1];
               if (interm[2] == '1') {
                   champ.required = "required";
               }
			    
			     if(indice!= -1){
				   if ((interm[1]=="estimatedvalue")||(interm[1]=="isrevenuesystemcalculated")||(interm[1]=="totalamount")){
					   var ch=tabAttributValue[indice];
					   champ.value=tabAttributValue[indice].substring(0,ch.length-6);
					   }
					   else {
						   champ.value=tabAttributValue[indice];
						   }
               
			   }
			   else { champ.value=" "; }
               bloc.appendChild(champ);
               bloc.appendChild(champ);
               _section.appendChild(bloc);
                _section.appendChild(champ);
           
		   }
		   
		   
		   }
		   
		   }
		   if (interm.length == 6)  {
		 	if((interm[5]==l) && (interm[4]==j)){
		nbreAttributsParSection = nbreAttributsParSection +1;
			nbreAttributsParOnglet =nbreAttributsParOnglet+1;
                lookup_bool[i] = "n";
               name_attribut[i] = interm[0];
               id_attribut[nbre] = interm[1];
               nbre = nbre + 1;
	
	var reg4 = new RegExp(" ", "g");
	var reg5 = new RegExp("/", "g");



	var bloc = document.createElement("p");
               if (interm[3] == '1') {
                   bloc.innerText = interm[0] + ' *';
               }
               else
               { bloc.innerText = interm[0]; }
               var champ = document.createElement("input");
 if(interm[2]=="date")
 {
               champ.id = interm[1];
	          champ.title="date"; 
			  champ.className="i-txt";
			  champ.onmouseover=function(){ affDate(this);}; 
          if(indice!=-1)
			  {
	

	var date_time=tabAttributValue[indice].split(reg4);

	var date=date_time[0].split(reg5);
var date_heure="";
	if(date_time[1] != null)
	{
	date_heure=date_time[0]+" "+date_time[1];
              champ.value=date_heure;  

	}
	else
	{
	date_heure=date_time[0];	
	champ.value=date_heure; 

	}	//date_heure=date_heure.replace(",","  ");
//alert(date_heure);
	
              champ.value=date_heure;  
			  }
  }
 if(interm[2]=="money")
{
             champ.id = interm[1];
	          champ.title="money"; 
			       if(indice!= -1){
				   if ((interm[1]=="estimatedvalue")||(interm[1]=="isrevenuesystemcalculated")||(interm[1]=="totalamount")){
					   var ch=tabAttributValue[indice];
					   champ.value=tabAttributValue[indice].substring(0,ch.length-6);
					   }
					   else {
					       var regMoney = new RegExp(" ", "g");
// supprimer sigle du devise
						   var valMoneyTab=	tabAttributValue[indice];
var valMoney =	valMoneyTab.split(regMoney);				  
						  champ.value=valMoney[0];
						   }
						   }
} 
 if(interm[2]=="decimal")
{
             champ.id = interm[1];
	          champ.title="decimal"; 
			       if(indice!= -1){
				   if ((interm[1]=="estimatedvalue")||(interm[1]=="isrevenuesystemcalculated")||(interm[1]=="totalamount")){
					   var ch=tabAttributValue[indice];
					   champ.value=tabAttributValue[indice].substring(0,ch.length-6);
					   }
					   else {
						   champ.value=tabAttributValue[indice];
						   }
						   }
} 
  
   if(interm[2]=="int")
{
             champ.id = interm[1];
	          champ.title="int"; 
			       if(indice!= -1){
				   if ((interm[1]=="estimatedvalue")||(interm[1]=="isrevenuesystemcalculated")||(interm[1]=="totalamount")){
					   var ch=tabAttributValue[indice];
					   champ.value=tabAttributValue[indice].substring(0,ch.length-6);
					   }
					   else {
						   champ.value=tabAttributValue[indice];
						   }
						   }
} 
  
  
			 		   bloc.appendChild(champ);
			    _section.appendChild(bloc);
                _section.appendChild(champ);
	
		   }
		   
		   }
          if (interm.length == 7) {
  if((interm[6]==l) && (interm[5]==j)){ 
 nbreAttributsParSection = nbreAttributsParSection +1;
 	nbreAttributsParOnglet =nbreAttributsParOnglet+1;
			 if (interm[2] == 'radio') {
                    lookup_bool[i] = "n";
                   name_attribut[i] = interm[0];
                   interm1 = interm[3].split(reg2);
                   interm2 = interm1[0].split(reg3);
                   interm3 = interm1[1].split(reg3);
                   var champ5 = document.createElement("label");
                   // nom de l'attribut en francais
                   champ5.innerText = interm[0] + " : ";
                  // radio1
                   id_attribut[nbre] = interm[1] + "0";
                   nbre = nbre + 1;
                   // label1
                   var champ3 = document.createElement("label");
                   champ3.innerText = interm2[0];
                   var champ1 = document.createElement("input");
                   // Nom d'attribut en francais
                   champ1.name = interm[0];
                   champ1.type = "radio";
                   champ1.id = interm[1] + "0";
                   // valeur de l'attribut 
                   champ1.value = interm2[1];
				    // valeur de l'attribut 
                   champ1.value = interm2[1];
				   
				    if(tabAttributValue[indice]==interm2[0])
				   {
				 champ1.checked=true;
				   
				   }
				   
				
				   
                   // radio 2
                   id_attribut[nbre] = interm[1] + "1";
                   nbre = nbre + 1;
                   // label2
                   var champ4 = document.createElement("label");
                   champ4.innerText = interm3[0];
                   var champ2 = document.createElement("input");
                   // Nom d'attribut en francais
                   champ2.name = interm[0];
                   champ2.type = "radio";
                   //champ2.innerText = interm3[0];
                   champ2.id = interm[1] + "1";
              
               // valeur de l'attribut 
                   champ2.value = interm3[1];
                   if(tabAttributValue[indice]==interm3[0])
				   {
				 champ2.checked=true;
				   
				   }
                   var bloc1 = document.createElement("p");
                   bloc1.appendChild(champ1);
                   bloc1.appendChild(champ2);
                   _section.appendChild(bloc1);
                   _section.appendChild(champ5);
                    _section.appendChild(champ3);
                   _section.appendChild(champ1);
                   _section.appendChild(champ4);
                    _section.appendChild(champ2);
               }

               if (interm[2] == 'picklist') {
				  lookup_bool[i] = "n";
                   name_attribut[i] = interm[0];
                   id_attribut[nbre] = interm[1];
                   nbre = nbre + 1;
				   
                   interm1 = interm[3].split(reg2);
                   // select
                   var champ6 = document.createElement("select");
                   // id attribut
                   champ6.id = interm[1];
                   // name
                   champ6.name = interm[0];
                  // requi
                   if (interm[4] == '1') {
                       champ6.required = "required";
                   }
                   // label
                   var champ7 = document.createElement("label");
                   champ7.innerText = interm[0] + " : ";
                   // balise <p>
                   var bloc2 = document.createElement("p");
                   bloc2.appendChild(champ6);
                   bloc2.appendChild(champ7); 
champ6.length++;				   
			    champ6.options[0].text = " ";
                   for (var n = 1; n < interm1.length+1; n++) {
                 
					
					
                           interm2 = interm1[n-1].split(reg3);
                           champ6.length++;
                           champ6.options[champ6.length - 1].text = interm2[0];
						   champ6.options[champ6.length - 1].title=interm2[1];

						   
                 						   if(interm2[0]==tabAttributValue[indice])
{
champ6.selectedIndex=champ6.length - 1;
}
  
				   
				   
				   }
				   
				  
                  
                  _section.appendChild(bloc2);
                   _section.appendChild(champ7);
                   _section.appendChild(champ6);
               }
  
  // look up
			   
               if (interm[2] == 'lookup') {
	               var idChamp=-1;
				 
				
				
			
                   lookup_bool[i] = "o";

                   // id
                   name_attribut[i] = interm[0];
                   id_attribut[nbre] = interm[1];
                   nbre = nbre + 1;
                   var bloc1 = document.createElement("p");
                   if (interm[4] == '1') 
                   {
                       bloc1.innerText = interm[0] + '*';
                   }
                   else
                   {
					   bloc1.innerText = interm[0]; 
				   }
				  // Crée un nouvel élément de type "input"
                   var champ9 = document.createElement("input");
                   // Les valeurs encodée dans le formulaire seront stockées dans un tableau
				  champ9.name = interm[3];
                   champ9.type = "text";
                   champ9.id = interm[1];
				   champ9.disabled="disabled";
    if(indice!= -1){
               			champ9.value=tabAttributValue[indice];
						champ9.title ="not" ;
			   				}
			   			else { champ9.value=" "; 
						        champ9.title ="not" ;
						}				
                   if (interm[2] == '1') {
                       champ9.required = "required";
                   }
                   var bloc = document.createElement("p");                  
                 var champB = document.createElement("input");
                  // champB.id = interm[3];
				   champB.type="button";						 						 
				   champB.setAttribute("onClick", "viewEntity("+i+"); return false;");
				   champB.style.background='url("img/Searchicon.png")';
				   champB.style.width="32px";
				   champB.style.height="32px";
				   champB.style.marginLeft="2px";
				   champB.style.cssFloat="right";
                   //bloc1.appendChild(champ9);                      
                    _section.appendChild(bloc1);
                   _section.appendChild(champ9);
                   _section.appendChild(champB);
			   }
           }
         }
	   
	   
   }
		
		
		
		
		
		}
		
		if( nbreAttributsParSection == 0)
		{
		
		//$("#@420"+id_section).remove();
		$('#'+id_section).remove();
		}
		else
		{
		
		$('#'+id_section).append('<br>');
		}
		
		}
 		if(nbreAttributsParOnglet ==0)
 {

 $('#div'+j).remove();
 $('#div1'+j).remove();
 $('#div2'+j).remove();
 }
	}

	
		 if(form_plan[2]=="")
	{
	}
	else{
var	entAss="Entitées Associées";
$('#form').append('<div id="div'+nbre_onglet+'"  style="margin-left: 20;display:block;" onclick="affichageOnglet(this);" ><img id="img'+nbre_onglet+'" onclick="affichageOnglet(this);" src="img/regroup.png" > <FONT size="20">  <b style="font-size:20;color:blue;">'+"Entit\351es Associ\351es"+' </b></Font> <div id="div1'+nbre_onglet+'" style="margin-left: 20;display:none;" > </div></div> <br></br>');
	$('#div1'+nbre_onglet).append('<br></br>');
	 var reg_entite = new RegExp(",", "g");
	 var reg_entite_logical = new RegExp("/", "g");
	
	var entiteAss =form_plan[2].split(reg_entite);
	  
	for (var h = 0; h < entiteAss.length; h++)
	{

	var _ent=entiteAss[h].split(reg_entite_logical);
	 $('#div1'+nbre_onglet).append('<a id="'+_ent[1]+'" style="width: 200;" data-inline= "false" onclick="goRelatedEntity(this);"  data-role="button" data-transition="slide" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-btn-up-c ui-btn-inline ui-shadow ui-btn-corner-all"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">' +_ent[0]+ '</span></span></a><br></br> ');

	}
	
	}


	var update=document.getElementById("update");
	update.style.display="block";
 $('#busy').hide();	

 setTimeout(function(){myScroll.refresh();},100);
  
}


function DetectChange(e)
{

if(sessionStorage.getItem("EntityName") =="appointment")
{
if(e.id=="scheduledstart")
{
document.getElementById("scheduledend").value=document.getElementById("scheduledstart").value;
}
if(e.id=="scheduledend")
{
document.getElementById("scheduledstart").value=document.getElementById("scheduledend").value;
}
}

}
var position_lookup;
var lookup_attribut_name="";
function viewEntity(indice)
{
position_lookup=indice;
//$('#busy').show();
	var reg1 = new RegExp("#", "g");
	var  interm = tableau[indice].split(reg1);

	if((interm[1]=="regardingobjectid")||(interm[1]=="parentcustomerid"))
	{
	
	entityLookupName=interm[1];
	lookup_attribut_name=interm[1];
	RetrieveLookup(interm[1]);	
	
	}
	else
	{
	entityLookupName=interm[3];
	lookup_attribut_name=interm[1];
	RetrieveLookup(interm[3]);
}
}

/****************************************** Lookup **********************************************/
function RetrieveLookup(entityName){

	entityLookupName=entityName;
	
	if((entityLookupName=="customerid")|| (entityLookupName=="regardingobjectid")||(entityLookupName=="parentcustomerid"))
	{

customeridLookup(entityLookupName);
	}
	else
	{
	var request = { u: { login: window.localStorage.getItem("login"), pw: window.localStorage.getItem("pw"),urlOrg:window.localStorage.getItem("urlOrg"), entity:entityName}};
	var jsondata = JSON.stringify(request);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/SystemView";
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    CallServiceRetrievingLookupRecord();
	}
	
	}
function CallServiceRetrievingLookupRecord() { 
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
            ServiceSucceededretrievingLookupRecords(msg);
        },
        error: ServiceFailed  // When Service call fails
    });
}
function ServiceSucceededretrievingLookupRecords(result) {
   if (DataType == "json") {
        resultObjectLookup = result.SystemViewResult;
	
	var jsondata = JSON.stringify(resultObjectLookup);
        if (resultObjectLookup) {			
    		       $('#viewLookup').append('<div  id="divModalDialog1" >  </div>');	
				

					$('#divModalDialog1').append('<SELECT name="nom" style="width:95%;" id="liste" size="1" onChange=" affichView();">');
					$('#liste').append('<option >              </option>');
 						for (var i=0; i< resultObjectLookup.Entities.length;i++)
 						{
	 						 $('#liste').append('<option id='+resultObjectLookup.Entities[i].Attributes[1].value+'>'+resultObjectLookup.Entities[i].Attributes[0].value+'</option>');	 
						}
					$('#divModalDialog1').append('</SELECT>');
					$('#divModalDialog1').append('<table style="width:95%" border="0" > <tr><td> <input id="search"  type="text"  placeholder="Rechercher" style=" margin-left: -100; margin: 10;width: 80%;display:inline-block;height:30;"  data-inline="true"/></td><td style="width: 20%;"> <input href="" id="test" onclick="rechercher();"  style="width: 90%;" data-role="button" type="button" value="ok" data-inline="true"></input></td></tr> </table>');
					$('#divModalDialog1').append('<center><span id="page" > </span><center>');
						$('#divModalDialog1').append(' <center><a href="javascript:CloseButton()"  data-role="button" data-transition="slide" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-btn-up-c ui-btn-inline ui-shadow ui-btn-corner-all"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Fermer</span></span></a> </center>');
      
					$('#divModalDialog1').append('<span id="thelist"  > </span>');
					
				 }
        else {
            alert("erreur");         
        	}
    }
    else {
        alert("Result Data type is not JSON");
    }
}
/***********************Attribut Customerid Lookup up *******************/
function customeridLookup(entityLookupName)
{

 $('#viewLookup').append('<div  id="divModalDialog1" >  </div>');	
 $('#divModalDialog1').append('<SELECT name="nom" id="liste1" size="1" style="width:95%;" onChange=" affichViewCustomerid();">');
 $('#liste1').append("<option style='font-size:4px;' >Selectionner l'entit\351 </option>");
 $('#liste1').append('<option value="contact">Contact</option>');
 $('#liste1').append('<option value="account">Compte</option>');

	if(entityLookupName=="regardingobjectid")		
        {
 $('#liste1').append('<option value="lead">Piste Commerciale</option>');

	 $('#liste1').append('<option value="opportunity"> Opportunit\351 </option>');		
		}	
              

 $('#divModalDialog1').append('</SELECT>');
					
 
 $('#divModalDialog1').append('<SELECT name="nom1" id="liste" size="1" style="width:95%;" onChange=" affichView();">');

 $('#liste').append('<option >  selectionner une vue  </option>');
 $('#divModalDialog1').append('</SELECT>');
	$('#divModalDialog1').append('<table style="width:95%" border="0" > <tr><td> <input id="search"  type="text"  placeholder="Rechercher" style=" margin-left: -100; margin: 10;width: 80%;display:inline-block;height:30;"  data-inline="true"/></td><td style="width: 20%;"> <input href="" id="test" onclick="rechercher();"  style="width: 90%;" data-role="button" type="button" value="ok" data-inline="true"></input></td></tr> </table>');
									
 $('#divModalDialog1').append(' <center><a href="javascript:CloseButton()"  data-role="button" data-transition="slide" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-btn-up-c ui-btn-inline ui-shadow ui-btn-corner-all"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Fermer</span></span></a> </center>');
  					
 $('#divModalDialog1').append('<center><span id="page" > </span><center>');
$('#divModalDialog1').append('<span id="thelist"   > </span>');
     
						
			$("thelist").scroll();	
					


}
function affichViewCustomerid()
{
var d = document.getElementById('liste1');

customerEntity=d.options[d.selectedIndex].value;
	var request = { u: { login: window.localStorage.getItem("login"), pw: window.localStorage.getItem("pw"),urlOrg:window.localStorage.getItem("urlOrg") ,entity:d.options[d.selectedIndex].value}};
	var jsondata = JSON.stringify(request);

    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/SystemView";
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;

appelService();

document.getElementById("liste").length = 0; 
}

function appelService()
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
            //On Successfull service call
            ServiceSucceededretrievingLookupRecordsCustomerid(msg);
        },
        error: ServiceFailedCustomer  // When Service call fails
    });


}

function ServiceFailedCustomer(result)
{
  // alert('Service call failed: ' + result.status + '' + result.statusText);
    Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null

} 
function ServiceSucceededretrievingLookupRecordsCustomerid(result)
{

   if (DataType == "json") {
      var  resultObjectLookup1 = result.SystemViewResult;

  if (resultObjectLookup1) {			
    		      // $('#viewLookup').append('<div  id="divModalDialog1">  </div>');	
				//	var reg = new RegExp("#", "g");
				//	var reg1 = new RegExp("/", "g");
				//	var tableau= resultObjectLookup1.split(reg);
				//	var tab_nom = tableau[0].split(reg1);
           		//	var tab_id_view = tableau[1].split(reg1);
 $('#liste').append('<option > </option>');		
 
			 for (var i = 0; i < resultObjectLookup1.Entities.length; i++) 
		 {
			 
	

			$('#liste').append('<option id="'+resultObjectLookup1.Entities[i].Attributes[1].value+'" > '+resultObjectLookup1.Entities[i].Attributes[0].value+'</option>');		
		 
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
/*
function affichViewCustomeridResult()
{


 	var div = document.getElementById("thelist"); // crée un élément <table>
    div.innerHTML = '';  	
	var d=document.getElementById("liste1");     
    var request = { u: { login: window.localStorage.getItem("login"), pw: window.localStorage.getItem("pw"),urlOrg:window.localStorage.getItem("urlOrg") , idView: d.options[d.selectedIndex].id} };
    var jsondata = JSON.stringify(request);
   // alert(jsondata);
	Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/ResultatView";
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;

    CallServViewCustomerid();
}

function CallServViewCustomerid() {
    $.ajax({
        type: Type, //GET or POST or PUT or DELETE verb
        url: Url, // Location of the service
        data: Data, //Data sent to server
        contentType: ContentType, // content type sent to server
        dataType: DataType, //Expected data format from server
        processdata: ProcessData, //True or False
        crossDomain: true,
        success: function (msg) {
            ServiceSucceededCustomeridResult(msg);

        },
        error: ServiceFailed  // When Service call fails
    });
}
function ServiceSucceededCustomeridResult(result) {
	
    if (DataType == "json") {
        dataview = result.ResultatViewResult;
        if (dataview) {

		// string recu
            var List = document.List;
          
            var reg = new RegExp("#", "g");
            var reg1 = new RegExp(">", "g");
            var reg2 = new RegExp("<", "g");
            var tab_div_att_val = dataview.split(reg);
            var attribut = tab_div_att_val[0].split(reg1);
            var guid_emplacement;
          
            if (tab_div_att_val[1] != null) 
            {
                var ligne = tab_div_att_val[1].split(reg1);
            }
          // crée une ligne de tableau      
		   for (var i = 0; i < attribut.length; i++) 
            {
                if (attribut[i] == "guid") {
                    guid_emplacement = i;
                }
            }
			var col1;
			var col2;
		  if (guid_emplacement==0)
		  {
			  col1=1;
			  col2=2;
			}
		else if(guid_emplacement==1)
		{
			col1=0;
			col2=2;
			}
			else 
			{
				col1=0;
				col2=1;
			}	
            if (tab_div_att_val[1] != "") {
                for (var j = 0; j < ligne.length-1; j++) {
                   var Case = ligne[j].split(reg2);                     									
					
				$('#thelist').append('<li><a href="#" onClick="ModificationLookupCustomer('+ j +')"> <p class="line1">'+attribut[col1]+': '+Case[col1]+
				'</p> <p class="line2">'+attribut[col2]+': '+ Case[col2] +' </p></a></li> ');
				
                }            
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
*/
function ModificationLookupCustomer(i)
{
	
	var reg = new RegExp("#", "g");
            var reg1 = new RegExp(">", "g");
            var reg2 = new RegExp("<", "g");
            var tab_div_att_val = dataview.split(reg);
            var attribut = tab_div_att_val[0].split(reg1);
            var guid_emplacement;
            var ligne=new Array;
            if (tab_div_att_val[1] != null) 
            {
                ligne = tab_div_att_val[1].split(reg1);
            }
          // crée une ligne de tableau      
		   for (var j = 0; j < attribut.length; j++) 
            {
                if (attribut[j] == "guid") {
                    guid_emplacement = j;
                }
            }
	 var Case = ligne[i].split(reg2); 
	
	document.getElementById('viewLookup').innerHTML='';
	//alert(guid_emplacement);
	 idLookup=Case[guid_emplacement];
//	 alert(idLookup);
//alert(entityLookupName);



	 sessionStorage.setItem(entityLookupName,idLookup);

	 doretrieveLookupCustomer(Case[guid_emplacement],customerEntity);
	 
	 } 
	 function doretrieveLookupCustomer(id,entityRef) {
	
	var guid=id;
	var Entityname=entityRef;
	    var request = { u: {login: window.localStorage.getItem("login"), pw: window.localStorage.getItem("pw"),urlOrg:window.localStorage.getItem("urlOrg"), id: guid,name: Entityname} };
    var jsondata = JSON.stringify(request);
	//alert(jsondata);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/doretrieveLookupName";
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    CallServiceRecordLookupCustomer();
}

function CallServiceRecordLookupCustomer() {
   
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
            ServiceSucceededRetrieveLookupCustomer(msg);
        },
        error: ServiceFailed  // When Service call fails
    });
}

function ServiceSucceededRetrieveLookupCustomer(result) {
       if (DataType == "json") {
         var resultatLookup = result.doretrieveLookupNameResult;   
		if (resultatLookup) {
		    var interm;
			var reg = new RegExp("#", "g");
			interm =resultatLookup.split(reg);
			var champ=document.getElementById(entityLookupName);
	
			champ.title=interm[0];
			champ.id=entityLookupName;
			champ.name=customerEntity;
			champ.value=interm[1];
			}
        else {
            alert("erreur");
        }
    }
    else {
        alert("Result Data type is not JSON");
    }
}
	 
	 /***************************************************Close lookup***************************************/
function CloseButton()
{
document.getElementById('viewLookup').innerHTML='';	
}
/******************************Afficher Vue **************************************/

var taille_pagination1=0;
var taille_total1=0;
var cx1=0;
var page_en_cours1=0;
var bloc_en_cours1=1;
var list_par_page1=3;
var nbre_page_par_bloc1=5;
var idView="";
var userdata="";

function affichView() 
{
   //div.innerHTML = '';  
	
			
   var divpage=document.getElementById('page');
	divpage.innerHTML='';
	cx1=0;
	
	$('#busy').show();	
	var elem=document.getElementById('thelist');
	elem.innerHTML="";
	
   	var d=document.getElementById("liste");    
		idView=	d.options[d.selectedIndex].id;
	

    var request = { u: { login: window.localStorage.getItem("login"), pw: window.localStorage.getItem("pw"),urlOrg:window.localStorage.getItem("urlOrg"), idView: idView,page:0} };
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
	
    //var d = document.view.Liste;
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
        success: function (msg) {
            ServiceSucceededV(msg);

        },
        error: ServiceFailed1  // When Service call fails
    });
}
function ServiceFailed1(result) {
    //alert('Service call failed: ' + result.status + '' + result.statusText);
    Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
}
function ServiceSucceededV(result)
{
  if (DataType == "json") {
        var form = window.document.view;
        userdata = result.ResultatViewResult;
		var div = document.getElementById("thelist"); // crée un élément <table>

        if (userdata) {
		//alert(data);
		if(userdata.Entities!=0)
		{
		
		//
		
		if(cx1==0)
		{
		
		taille_total1=parseInt(userdata.EntityName);
		
		cx1=1;
		if(parseInt(taille_total1%10)==0)
		{
		taille_pagination1= parseInt(taille_total1/10);
		}
		else
		{
		taille_pagination1= parseInt(taille_total1/10)+1;
		
		}
	
		$('#page').append('<span id="debut" style="border: 1px solid #aaa;font-size: 20;"  onclick="goDebutView();" class="ui-link"> << </span> &nbsp');
		
		$('#page').append('<span id="d" style="border: 1px solid #aaa;font-size: 20;" onclick="goDView();" class="ui-link"> < </span> &nbsp');
		

		
		$('#page').append('<span id="n0" style="font-weight:bold;color: gray;border: 1px solid #aaa;font-size: 20;" onclick="goPageView(0);" class="ui-link"> 1 </span> &nbsp&nbsp');
		$('#page').append('<span id="n1" style="font-weight:normal; border: 1px solid #aaa;font-size: 20;" onclick="goPageView(1);" class="ui-link">  2 </span>&nbsp&nbsp');
		$('#page').append('<span id="n2" style="font-weight:normal;border: 1px solid #aaa;font-size: 20;" onclick="goPageView(2);" class="ui-link"> 3 </span> &nbsp&nbsp');
		$('#page').append('<span id="n3" style="font-weight:normal;border: 1px solid #aaa;font-size: 20;" onclick="goPageView(3);" class="ui-link"> 4 </span> &nbsp&nbsp');
		$('#page').append('<span id="n4" style="font-weight:normal;border: 1px solid #aaa;font-size: 20;" onclick="goPageView(4);" class="ui-link"> 5 </span> &nbsp&nbsp');
		
		
		$('#page').append('<span id="g" style="border: 1px solid #aaa;font-size: 20;" onclick="goGView();" class="ui-link"> > </span>&nbsp');
		$('#page').append('<span id="fin" style="border: 1px solid #aaa;font-size: 20;"onclick="goFinView();" class="ui-link"> >> </span>');
		if(taille_pagination1<6)
		{
		for(var v=taille_pagination1;v<5;v++)
{

var elm2=document.getElementById('n'+v);
elm2.innerHTML=" ";
}

		
		}
		
		}
		
	

		
            // string recu
			$('#busy').hide();
            //alert(data);
    
              for( var j in userdata.Entities){
/*if(j%4==0)
{
//alert(j);
$('#thelist').append('<li><a href="#" onClick="ModificationLookup('+ j +')"> <p class="line1">'+attribut[col1]+': '+Case[col1]+
				'</p> <p class="line2">'+attribut[col2]+': '+ Case[col2] +' </p></a></li> ');}
else
{
$('#thelist').append('<li style="height: 20;"><a href="javascript:goRecord('+j+')"> <img src="img/'+sessionStorage.getItem("EntityName")+'.png" style="margin: -10;" class="list-icon1"/><p class="line0" style="margin-left: 21;line-height: 0;height: 0;">'+data.Entities[j].Attributes[0].value + '</p> </a></li> <p> </p>');          

} */
$('#thelist').append('<li><a href="#" style="height: 30;margin-top: 15;" onClick="ModificationLookup('+ j +')"> <p class="line1" style="white-space: nowrap;">'+userdata.Entities[j].Attributes[0].value+
				'</p></a></li> ');     



 }
				//	setTimeout(function(){scroll.refresh();},100);
        //  		setTimeout(function(){myScroll.refresh();},100);                 
          
		
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
function goGView()
{


if(page_en_cours1< taille_pagination1-1)
{


if(page_en_cours1<taille_pagination1)
{
document.getElementById('thelist').innerHTML=" ";


if((page_en_cours1+1)/nbre_page_par_bloc1 != bloc_en_cours1)
{


var elm_prec=document.getElementById('n'+page_en_cours1%nbre_page_par_bloc1);
elm_prec.style.fontWeight = 'normal';
elm_prec.style.color='#2489CE';
var elmId=page_en_cours1%nbre_page_par_bloc1+1;
var elm=document.getElementById('n'+elmId);
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
var elm_prec=document.getElementById('n4');
elm_prec.style.fontWeight = 'normal';
elm_prec.style.color='#2489CE';
//comp=taille_pagination1/5;

var nbre_page=0;
var elm0=document.getElementById('n0');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+1;
elm0.innerHTML=" "+nbre_page+" ";
elm0.style.fontWeight = 'bold';
elm0.style.color='gray';

//elm0.style.border='border: 1px solid #aaa';
var elm1=document.getElementById('n1');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+2;
elm1.innerHTML=" "+nbre_page+" ";

var elm2=document.getElementById('n2');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+3;
elm2.innerHTML=" "+nbre_page+" ";

var elm3=document.getElementById('n3');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+4;
elm3.innerHTML=" "+nbre_page+" ";

var elm4=document.getElementById('n4');
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
var elm0=document.getElementById('n0');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+v+1;
elm0.innerHTML=" "+val+" ";
elm0.style.fontWeight = 'bold';
elm0.style.color='gray';
}
else
{
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+v+1;
var elm1=document.getElementById('n'+v);
elm1.innerHTML=" "+val+" ";
}
}
if(taille_pagination1%nbre_page_par_bloc1 !=0)
{
for(var v=taille_pagination1%nbre_page_par_bloc1;v<nbre_page_par_bloc1;v++)
{
var elm2=document.getElementById('n'+v);
//elm2.disabled = true;
elm2.innerHTML=" ";
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
var elm_prec=document.getElementById('n4');
elm_prec.style.fontWeight = 'normal';
elm_prec.style.color='#2489CE';
//comp=taille_pagination1/5;

var elm0=document.getElementById('n0');
elm0.innerHTML=(bloc_en_cours1-1)*nbre_page_par_bloc1+1;
elm0.style.fontWeight = 'bold';
elm0.style.color='gray';
var elm1=document.getElementById('n1');
elm1.innerHTML=(bloc_en_cours1-1)*nbre_page_par_bloc1+2;
var elm2=document.getElementById('n2');
elm2.innerHTML=(bloc_en_cours1-1)*nbre_page_par_bloc1+3;
var elm3=document.getElementById('n3');
elm3.innerHTML=(bloc_en_cours1-1)*nbre_page_par_bloc1+4;
var elm4=document.getElementById('n4');
elm4.innerHTML=(bloc_en_cours1-1)*nbre_page_par_bloc1+5;
}
else
{
if(comp==bloc_en_cours1)
{

var val="";
var elm0=document.getElementById('n0');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+1;
elm0.innerHTML=" "+val+" ";
elm0.style.fontWeight = 'normal';
elm0.style.color='#2489CE';

var elm1=document.getElementById('n1');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+2;
elm1.innerHTML=" "+val+" ";
elm1.style.fontWeight = 'normal';
elm1.style.color='#2489CE';

var elm2=document.getElementById('n2');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+3;
elm2.innerHTML=" "+val+" ";
elm2.style.fontWeight = 'normal';
elm2.style.color='#2489CE';

var elm3=document.getElementById('n3');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+4;
elm3.innerHTML=" "+val+" ";
elm3.style.fontWeight = 'normal';
elm3.style.color='#2489CE';

var elm4=document.getElementById('n4');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+5;
elm4.innerHTML=" "+val+" ";
elm4.style.fontWeight = 'normal';
elm4.style.color='gray';
elm4.style.fontWeight = 'bold';

if(taille_pagination1%nbre_page_par_bloc1<5)
{
for(var v=taille_pagination1%nbre_page_par_bloc1;v<nbre_page_par_bloc1;v++)
{
var elm2=document.getElementById('n'+v);
elm2.innerHTML=" ";
}
var id_val=taille_pagination1%nbre_page_par_bloc1-1;
 elm4=document.getElementById('n'+id_val);
 id_val=id_val+1;
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+id_val;
elm4.innerHTML=" "+val+" ";
elm4.style.fontWeight = 'normal';
elm4.style.color='gray';
elm4.style.fontWeight = 'bold';
}

}
else
{
//comp=taille_pagination1/5+1;
for(var v=0;v<taille_pagination1%nbre_page_par_bloc1;v++)
{
var val=0;
if(v==taille_pagination1%nbre_page_par_bloc1-1)
{
var elmId=taille_pagination1%nbre_page_par_bloc1-1;
var elm0=document.getElementById('n'+elmId);
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+v+1;
elm0.innerHTML=" "+val+" ";
elm0.style.fontWeight = 'bold';
elm0.style.color='gray';
}else
{
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+v+1;
var elm1=document.getElementById('n'+v);
elm1.style.fontWeight = 'normal';
elm1.style.color='#2489CE';
elm1.innerHTML=" "+val+" ";
}
}

for(var v=taille_pagination1%nbre_page_par_bloc1;v<nbre_page_par_bloc1;v++)
{
var elm2=document.getElementById('n'+v);
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
var elm0=document.getElementById('n0');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+1;
elm0.innerHTML="   "+val+"   " ;
elm0.style.fontWeight = 'bold';
elm0.style.color='gray';
var elm1=document.getElementById('n1');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+2;
elm1.innerHTML="  "+val+"   " ;
elm1.style.fontWeight = 'normal';
elm1.style.color='#2489CE';
var elm2=document.getElementById('n2');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+3;
elm2.innerHTML="    "+val+"  " ;
elm2.style.fontWeight = 'normal';
elm2.style.color='#2489CE';
var elm3=document.getElementById('n3');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+4;
elm3.innerHTML="    "+val+"    " ;
elm3.style.fontWeight = 'normal';
elm3.style.color='#2489CE';
var elm4=document.getElementById('n4');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+5;
elm4.innerHTML="   "+val+"   " ;
elm4.style.fontWeight = 'normal';
elm4.style.color='#2489CE';

		for(var v=taille_pagination1;v<5;v++)
{

var elm2=document.getElementById('n'+v);
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

var elm_prec=document.getElementById('n'+page_en_cours1%nbre_page_par_bloc1);
elm_prec.style.fontWeight = 'normal';
elm_prec.style.color='#2489CE';
var elmId=page_en_cours1%nbre_page_par_bloc1-1;
var elm=document.getElementById('n'+elmId);
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

var elm0=document.getElementById('n0');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+1;
elm0.innerHTML=" "+nbre_page+" ";
elm0.style.fontWeight = 'normal';
elm0.style.color='#2489CE';

var elm1=document.getElementById('n1');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+2;
elm1.innerHTML=" "+ nbre_page+ " ";

var elm2=document.getElementById('n2');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+3;
elm2.innerHTML="  "+nbre_page+"  ";

var elm3=document.getElementById('n3');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+4;
elm3.innerHTML=" "+nbre_page+" ";

var elm4=document.getElementById('n4');
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
var elm_prec=document.getElementById('n'+page_en_cours1%nbre_page_par_bloc1);
elm_prec.style.fontWeight = 'normal';
elm_prec.style.color='#2489CE';
var elm=document.getElementById('n'+j);
elm.style.fontWeight = 'bold';
elm.style.color='gray';
//alert(bloc_en_cours1);
//alert(j*5*(bloc_en_cours1-1));

//alert(j);
page_en_cours1=nbre_page_par_bloc1*(bloc_en_cours1-1)+j;
affichViewEncours();
}
}


/**************************************************************************************************************************************************/
function ModificationLookup(i)
{
	 document.getElementById('viewLookup').innerHTML='';
	 //idLookup=Case[guid_emplacement];
	 sessionStorage.setItem(entityLookupName,idLookup);
	// alert(entityLookupName);
	 if((entityLookupName!="customerid") && (entityLookupName!="regardingobjectid") && (entityLookupName!="parentcustomerid") )
	 {

	 doretrieveLookup(userdata.Entities[i].Attributes[1].value,entityLookupName);
	 }
	 else
	 {

	 doretrieveLookupCustomer(userdata.Entities[i].Attributes[1].value,userdata.Entities[i].LogicalName)
	 }
}


/**********************************Recherche rapide d'un lookup****************************************/

var entityLookup ="";

var criter="";
function rechercher() {



  var divpage=document.getElementById('page');
	divpage.innerHTML='';
	cx1=0;

$('#busy').show();	
var ent="";
	var div = document.getElementById("thelist"); 
    div.innerHTML = ''; 
	d=document.getElementById("liste1");
   	var reg1 = new RegExp("#", "g");
	var  interm = tableau[position_lookup].split(reg1);

	if((interm[1]=="regardingobjectid")||(interm[3]=="customerid") || (interm[3]=='parentcustomerid'))
	{
	//entityLookupName=interm[1];
	//RetrieveLookup(interm[1]);
	
ent=d.options[d.selectedIndex].value;	
	}
	else
	{
	//entityLookupName=interm[3];
	//RetrieveLookup(interm[3]);
	ent=interm[3];
}

if(ent != "")
{
var criteria = document.getElementById('search');
 
	criter=criteria.value;
	 page_en_cours1=0;
   //alert(criter); 
 var request = { u: { login: window.localStorage.getItem("login"), pw: window.localStorage.getItem("pw"),urlOrg:window.localStorage.getItem("urlOrg"), entity: ent, critere: criter,page:0} };
    var jsondata = JSON.stringify(request);
    //alert(jsondata);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/GetQuickSearch";
    //alert(Url);   
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    CallServsearch();
}
else
{
alert("veuillez choisir une entité");
}
}

function rechercherEncours() {
  //var divpage=document.getElementById('page');
	//divpage.innerHTML='';
	//cx1=0;
	
$('#busy').show();	
var ent="";
	var div = document.getElementById("thelist"); 
    div.innerHTML = ''; 
	d=document.getElementById("liste1");
   	var reg1 = new RegExp("#", "g");
	var  interm = tableau[position_lookup].split(reg1);
	if(interm[1]=="regardingobjectid")
	{
	
	
ent=d.options[d.selectedIndex].value;	
	}
	else
	{

	ent=interm[3];
}
cx=1;
  //  var criteria = document.getElementById('search');

  
  
	 //criter=criteria.value;
   //alert(criter); 
 var request = { u: { login: window.localStorage.getItem("login"), pw: window.localStorage.getItem("urlOrg"),urlOrg:window.localStorage.getItem("urlOrg"), entity: ent, critere: criter,page:page_en_cours1} };
    var jsondata = JSON.stringify(request);
    //alert(jsondata);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/GetQuickSearch";
    //alert(Url);   
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    CallServsearch();

}

function CallServsearch() {


    $.ajax({
        type: Type, //GET or POST or PUT or DELETE verb
        url: Url, // Location of the service
        data: Data, //Data sent to server
        contentType: ContentType, // content type sent to server
        dataType: DataType, //Expected data format from server
        processdata: ProcessData, //True or False
        crossDomain: true,
        success: function (msg) {
            ServiceSucceededQuickSerach(msg);
        },
        error: ServiceFailed3  // When Service call fails

    });

}

function ServiceSucceededQuickSerach(result)
{
  if (DataType == "json") {
        //var form = window.document.view;
        userdata = result.GetQuickSearchResult;
		var div = document.getElementById("thelist"); 
div.innerHTML="";
        if (userdata) {
		if(userdata.Entities!=0)
		{
		
		//
		
		if(cx1==0)
		{
		var page = document.getElementById("page"); 
page.innerHTML="";
		taille_total1=parseInt(userdata.EntityName);
		cx1=1;
		if(parseInt(taille_total1%10)==0)
		{
		taille_pagination1= parseInt(taille_total1/10);
		}
		else
		{
		taille_pagination1= parseInt(taille_total1/10)+1;
		
		}
		
		$('#page').append('<a id="@debut" style="border: 1px solid #aaa;font-size: 20;"  onclick="goDebutViewSearch();" class="ui-link"> << </a> &nbsp');
		
		$('#page').append('<a id="@d" style="border: 1px solid #aaa;font-size: 20;" onclick="goDViewSearch();" class="ui-link"> < </a> &nbsp');
		

		
		$('#page').append('<a id="@0" style="font-weight:bold;color: gray;border: 1px solid #aaa;font-size: 20;" onclick="goPageViewSearch(0);" class="ui-link"> 1 </a> &nbsp&nbsp');
		$('#page').append('<a id="@1" style="font-weight:normal; border: 1px solid #aaa;font-size: 20;" onclick="goPageViewSearch(1);" class="ui-link">  2 </a>&nbsp&nbsp');
		$('#page').append('<a id="@2" style="font-weight:normal;border: 1px solid #aaa;font-size: 20;" onclick="goPageViewSearch(2);" class="ui-link"> 3 </a> &nbsp&nbsp');
		$('#page').append('<a id="@3" style="font-weight:normal;border: 1px solid #aaa;font-size: 20;" onclick="goPageViewSearch(3);" class="ui-link"> 4 </a> &nbsp&nbsp');
		$('#page').append('<a id="@4" style="font-weight:normal;border: 1px solid #aaa;font-size: 20;" onclick="goPageViewSearch(4);" class="ui-link"> 5 </a> &nbsp&nbsp');
		
		
		$('#page').append('<a id="@g" style="border: 1px solid #aaa;font-size: 20;" onclick="goGViewSearch();" class="ui-link"> > </a>&nbsp');
		$('#page').append('<a id="@fin" style="border: 1px solid #aaa;font-size: 20;"onclick="goFinViewSearch();" class="ui-link"> >> </a>');
		
		
		if(taille_pagination1<6)
		{
		for(var v=taille_pagination1;v<5;v++)
{

var elm2=document.getElementById("@"+v);
elm2.innerHTML=" ";
}

		
		}
		
		}
		
	

		
            // string recu
			$('#busy').hide();
           
    
              for( var j in userdata.Entities){
$('#thelist').append('<li><a href="#" style="   height: 30;margin-top: 15;" onClick="ModificationLookup('+ j +')"> <p class="line1" style="white-space: nowrap;">'+userdata.Entities[j].Attributes[0].value+'</p></a></li> ');     
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
function goGViewSearch()
{


if(page_en_cours1< taille_pagination1-1)
{


if(page_en_cours1<taille_pagination1)
{
document.getElementById('thelist').innerHTML=" ";


if((page_en_cours1+1)/nbre_page_par_bloc1 != bloc_en_cours1)
{


var elm_prec=document.getElementById("@"+page_en_cours1%nbre_page_par_bloc1);
elm_prec.style.fontWeight = 'normal';
elm_prec.style.color='#2489CE';
var elm=document.getElementById("@"+page_en_cours1%nbre_page_par_bloc1+1);
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
var elm0=document.getElementById('@0');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+1;
elm0.innerHTML=" "+nbre_page+" ";
elm0.style.fontWeight = 'bold';
elm0.style.color='gray';

//elm0.style.border='border: 1px solid #aaa';
var elm1=document.getElementById('@1');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+2;
elm1.innerHTML=" "+nbre_page+" ";

var elm2=document.getElementById('@2');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+3;
elm2.innerHTML=" "+nbre_page+" ";

var elm3=document.getElementById('@3');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+4;
elm3.innerHTML=" "+nbre_page+" ";

var elm4=document.getElementById('@4');
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
var elm0=document.getElementById('@0');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+v+1;
elm0.innerHTML=" "+val+" ";
elm0.style.fontWeight = 'bold';
elm0.style.color='gray';
}
else
{
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+v+1;
var elm1=document.getElementById("@"+v);
elm1.innerHTML=" "+val+" ";
}
}
if(taille_pagination1%nbre_page_par_bloc1 !=0)
{
for(var v=taille_pagination1%nbre_page_par_bloc1;v<nbre_page_par_bloc1;v++)
{
var elm2=document.getElementById("@"+v);
//elm2.disabled = true;
elm2.innerHTML=" ";
}
}
}

}
//alert(page_en_cours1);
rechercherEncours();
}
//alert('ok');
}
}
function goFinViewSearch()
{
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
var elm_prec=document.getElementById('@4');
elm_prec.style.fontWeight = 'normal';
elm_prec.style.color='#2489CE';
//comp=taille_pagination1/5;

var elm0=document.getElementById('@0');
elm0.innerHTML=(bloc_en_cours1-1)*nbre_page_par_bloc1+1;
elm0.style.fontWeight = 'bold';
elm0.style.color='gray';
var elm1=document.getElementById('@1');
elm1.innerHTML=(bloc_en_cours1-1)*nbre_page_par_bloc1+2;
var elm2=document.getElementById('@2');
elm2.innerHTML=(bloc_en_cours1-1)*nbre_page_par_bloc1+3;
var elm3=document.getElementById('@3');
elm3.innerHTML=(bloc_en_cours1-1)*nbre_page_par_bloc1+4;
var elm4=document.getElementById('@4');
elm4.innerHTML=(bloc_en_cours1-1)*nbre_page_par_bloc1+5;
}
else
{


for(var v=0;v<taille_pagination1%nbre_page_par_bloc1;v++)
{
var val=0;
if(v==taille_pagination1%nbre_page_par_bloc1-1)
{
var id=taille_pagination1%nbre_page_par_bloc1-1;
var elm0=document.getElementById("@"+id);
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+v+1;
elm0.innerHTML=" "+val+" ";
elm0.style.fontWeight = 'bold';
elm0.style.color='gray';
}else
{
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+v+1;
var elm1=document.getElementById("@"+v);
elm1.style.fontWeight = 'normal';
elm1.style.color='#2489CE';
elm1.innerHTML=" "+val+" ";
}
}

for(var v=taille_pagination1%nbre_page_par_bloc1;v<nbre_page_par_bloc1;v++)
{
var elm2=document.getElementById("@"+v);
elm2.innerHTML=" ";
}





}
rechercherEncours();
}

function goDebutViewSearch()
{
//alert(taille_pagination1);
//alert(page_en_cours1);
page_en_cours1=0;
bloc_en_cours1=1;


var val=0;
var elm0=document.getElementById('@0');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+1;
elm0.innerHTML="   "+val+"   " ;
elm0.style.fontWeight = 'bold';
elm0.style.color='gray';
var elm1=document.getElementById('@1');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+2;
elm1.innerHTML="  "+val+"   " ;
elm1.style.fontWeight = 'normal';
elm1.style.color='#2489CE';
var elm2=document.getElementById('@2');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+3;
elm2.innerHTML="    "+val+"  " ;
elm2.style.fontWeight = 'normal';
elm2.style.color='#2489CE';
var elm3=document.getElementById('@3');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+4;
elm3.innerHTML="    "+val+"    " ;
elm3.style.fontWeight = 'normal';
elm3.style.color='#2489CE';
var elm4=document.getElementById('@4');
val=(bloc_en_cours1-1)*nbre_page_par_bloc1+5;
elm4.innerHTML="   "+val+"   " ;
elm4.style.fontWeight = 'normal';
elm4.style.color='#2489CE';

		for(var v=taille_pagination1;v<5;v++)
{

var elm2=document.getElementById('@'+v);
elm2.innerHTML=" ";
}


rechercherEncours();
}

function goDViewSearch()
{
if(page_en_cours1>0)
{
if(page_en_cours1>=0)
{
var exist_page_ds_en_cours= parseInt( (page_en_cours1-1)/nbre_page_par_bloc1);
if(exist_page_ds_en_cours+1 == bloc_en_cours1)
{

var elm_prec=document.getElementById("@"+page_en_cours1%nbre_page_par_bloc1);
elm_prec.style.fontWeight = 'normal';
elm_prec.style.color='#2489CE';
var elm=document.getElementById("@"+page_en_cours1%nbre_page_par_bloc1-1);
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

var elm0=document.getElementById('@0');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+1;
elm0.innerHTML=" "+nbre_page+" ";
elm0.style.fontWeight = 'normal';
elm0.style.color='#2489CE';

var elm1=document.getElementById('@1');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+2;
elm1.innerHTML=" "+ nbre_page+ " ";

var elm2=document.getElementById('@2');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+3;
elm2.innerHTML="  "+nbre_page+"  ";

var elm3=document.getElementById('@3');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+4;
elm3.innerHTML=" "+nbre_page+" ";

var elm4=document.getElementById('@4');
nbre_page=(bloc_en_cours1-1)*nbre_page_par_bloc1+5;
elm4.innerHTML=" "+nbre_page+" ";
elm4.style.fontWeight = 'bold';
elm4.style.color='gray';

}
rechercherEncours();
}
}
}

function goPageViewSearch(j)
{
//alert(page_en_cours1);
//
if((page_en_cours1 !=nbre_page_par_bloc1*(bloc_en_cours1-1)+j)&&(nbre_page_par_bloc1*(bloc_en_cours1-1)+j<taille_pagination1))
{
var elm_prec=document.getElementById("@"+page_en_cours1%nbre_page_par_bloc1);
elm_prec.style.fontWeight = 'normal';
elm_prec.style.color='#2489CE';
var elm=document.getElementById("@"+j);
elm.style.fontWeight = 'bold';
elm.style.color='gray';
//alert(bloc_en_cours1);
//alert(j*5*(bloc_en_cours1-1));

//alert(j);
page_en_cours1=nbre_page_par_bloc1*(bloc_en_cours1-1)+j;
rechercherEncours();
}
}


function ServiceFailed3(result) {

   // alert('Service call failed: ' + result.status + '' + result.statusText);

    Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;

}


/***************************** Retrieve Record Lookup Name**************************************************/
function doretrieveLookup(id,entityRef) {

	var guid=" "+id+" ";
	var Entityname=entityRef;
	
	//alert(guid)
    var request = { u: {login: window.localStorage.getItem("login"), pw: window.localStorage.getItem("pw"),urlOrg: window.localStorage.getItem("urlOrg") ,id: guid,name: Entityname} };
    var jsondata = JSON.stringify(request);
	//alert(jsondata);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/doretrieveLookupName";
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    CallServiceRecordLookup();
}

function CallServiceRecordLookup() {
   
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
            ServiceSucceededRetrieveLookup(msg);
        },
        error: ServiceFailed  // When Service call fails
    });
}

function ServiceSucceededRetrieveLookup(result) {
       if (DataType == "json") {
         var resultatLookup = result.doretrieveLookupNameResult;   
		if (resultatLookup) {
		    var interm;
			var reg = new RegExp("#", "g");
			interm =resultatLookup.split(reg);
			//alert (interm[0]+ "  ssssss  "+interm[1]);
	
			var champ=document.getElementById(lookup_attribut_name);
			champ.title=interm[0];
			//alert(champ.title);
			champ.value=interm[1];
			//alert("IHM: "+champ.value);
        }
        else {
            alert("erreur");
        }
    }
    else {
        alert("Result Data type is not JSON");
    }
}


/*********************************************************************** Back to account Form **********************************************/
function goback()
{
window.location=sessionStorage.getItem("EntityName")+"Form.html";
}
/************************************************************************* Update Record ***************************************************/
var erreur=0;
/*
function getAttr_val() {

 
   var j = 0;
    for (var i = 0; i < id_attribut.length; i++) {
        var paragraph = document.getElementById(id_attribut[i]);
              if(paragraph.type=='select-one')
              {
      	if (paragraph.selectedIndex != 0)
					
					{
					
                      var strUser = paragraph.options[paragraph.selectedIndex].title;
                      chaine_attribut = chaine_attribut.concat(id_attribut[i]);
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat(strUser);
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat("OptSet");
                      // "OptSet"
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat("Select");
                      chaine_attribut = chaine_attribut.concat("#");
}
                      j = j + 1;

                  
              }
			  
			  if(paragraph.type=='date')
			  {     

					
					if (paragraph.selectedIndex != 0)
					
					{
					
					var reg = new RegExp("-", "g");
                     date_att = paragraph.value.split(reg);
					 if (date_att.length=="3")
					 {
		  	 	    var paragraph1 = document.getElementById(id_attribut[i]+"date");
				//alert(paragraph1.value);
				if(date_att != "")
				{
				if(paragraph1.value !="")
				{
					chaine_attribut = chaine_attribut.concat("date");
              		chaine_attribut = chaine_attribut.concat("="); 
		  	 	    chaine_attribut = chaine_attribut.concat(id_attribut[i]);
              		chaine_attribut = chaine_attribut.concat("=");     
              		chaine_attribut = chaine_attribut.concat(date_att[2]+"-"+date_att[1]+"-"+date_att[0]+" "+paragraph1.value);
              		chaine_attribut = chaine_attribut.concat("#");  
					 
				}	 
					
				}	 
					 }
					
					
					
					
					
					}
                      j = j + 1;
					  // estimatedclosedate
			}
              if(paragraph.type=='text')
          {
	
			
if((paragraph.required == true) &&  (paragraph.value=="")  ){


affichAlert("veuillez remplir "+paragraph.name,paragraph.id);

erreur=1;
	  
		  
		  }
		  else
		  {
		  
		  if(paragraph.value!=" ")
		  {
		  	
			  
			 if (paragraph.title!="date") {
            

		if(paragraph.id=="regardingobjectid")
			 {
			 if(paragraph.title !="")
			 {
               chaine_attribut = chaine_attribut.concat(id_attribut[i]);
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat(paragraph.title);
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat(paragraph.name);
                      chaine_attribut = chaine_attribut.concat("#");
                      j = j + 1;
			  }
			  }
			
		else  
			{
		
		if(paragraph.title=="")
                  {   
				  chaine_attribut = chaine_attribut.concat(id_attribut[i]);
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat(paragraph.value);
                      chaine_attribut = chaine_attribut.concat("#");
                      j = j + 1;
					  
					}  
					  			else
{
		if (paragraph.value != "") {
				  
				if(paragraph.title !="not")
				{
			
                      chaine_attribut = chaine_attribut.concat(paragraph.id);
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat(paragraph.title);
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat(paragraph.name);
                      chaine_attribut = chaine_attribut.concat("#");
                      j = j + 1;
}                 
				 }

}			
				  

         
			}
			
		
              
			  }
			  
			  
			  
              else
              {
			  
                
if(paragraph.title=="date") {


		  	 	//    var paragraph1 = document.getElementById(id_attribut[i]+"date");
//alert(paragraph1.value);
if((paragraph.value == "")&&(paragraph.required==true))
{

affichAlert("Veuillez remplir l'heure du "+paragraph.name,paragraph.id+"date");
}
else{
if(paragraph.value !="")
{
var date_heure= paragraph.value;
date_heure=date_heure.replace("/","-");
date_heure=date_heure.replace("/","-");

chaine_attribut = chaine_attribut.concat("date"); 
	chaine_attribut = chaine_attribut.concat("="); 
		  	 	    chaine_attribut = chaine_attribut.concat(id_attribut[i]);
              		chaine_attribut = chaine_attribut.concat("=");     
              		chaine_attribut = chaine_attribut.concat(date_heure);
              		chaine_attribut = chaine_attribut.concat("#");  
					 j = j + 1;

}
}
					  
					  
					  }

			  }
          
          
	}
		  }
		  
		  
		  
		  
		  }
		  
		  
		  
		  

          if (paragraph.type == 'radio') 
          {
              if (paragraph.checked) {
                
                  var id_att = id_attribut[i].substring(0, id_attribut[i].length - 1)
                  chaine_attribut = chaine_attribut.concat(id_att);
                  chaine_attribut = chaine_attribut.concat("=");
                  chaine_attribut = chaine_attribut.concat(paragraph.value);
                  chaine_attribut = chaine_attribut.concat("=");
                  chaine_attribut = chaine_attribut.concat("OptSet");
                  chaine_attribut = chaine_attribut.concat("=");
                  chaine_attribut = chaine_attribut.concat("Radio");
                  chaine_attribut = chaine_attribut.concat("#");
              }
          }
            
            }
	if(document.getElementById("description") != null)
{

if(document.getElementById("description").Value !=" ")
{
          chaine_attribut = chaine_attribut.concat("description");
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat(document.getElementById("description").value);
                      chaine_attribut = chaine_attribut.concat("#");
}
}

	if(document.getElementById("hli_compterendu") != null)
{

if(document.getElementById("hli_compterendu").Value !=" ")
{
          chaine_attribut = chaine_attribut.concat("hli_compterendu");
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat(document.getElementById("hli_compterendu").value);
                      chaine_attribut = chaine_attribut.concat("#");
}
}	
chaine_attribut = chaine_attribut.substring(0, chaine_attribut.length - 1)

    }
*/
function getAttr_val() {

 
   var j = 0;
    for (var i = 0; i < id_attribut.length; i++) {
        var paragraph = document.getElementById(id_attribut[i]);
              if(paragraph.type=='select-one')
              {
      	if (paragraph.selectedIndex != 0)
					
					{
					
                      var strUser = paragraph.options[paragraph.selectedIndex].title;
                      chaine_attribut = chaine_attribut.concat(id_attribut[i]);
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat(strUser);
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat("OptSet");
                      // "OptSet"
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat("Select");
                      chaine_attribut = chaine_attribut.concat("#");
}
                      j = j + 1;

                  
              }
			  
			  if(paragraph.type=='date')
			  {     

					
					if (paragraph.selectedIndex != 0)
					
					{
					
					var reg = new RegExp("-", "g");
                     date_att = paragraph.value.split(reg);
					 if (date_att.length=="3")
					 {
		  	 	    var paragraph1 = document.getElementById(id_attribut[i]+"date");
				//alert(paragraph1.value);
				if(date_att != "")
				{
				if(paragraph1.value !="")
				{
					chaine_attribut = chaine_attribut.concat("date");
              		chaine_attribut = chaine_attribut.concat("="); 
		  	 	    chaine_attribut = chaine_attribut.concat(id_attribut[i]);
              		chaine_attribut = chaine_attribut.concat("=");     
              		chaine_attribut = chaine_attribut.concat(date_att[2]+"-"+date_att[1]+"-"+date_att[0]+" "+paragraph1.value);
              		chaine_attribut = chaine_attribut.concat("#");  
					 
				}	 
					
				}	 
					 }
					
					
					
					
					
					}
                      j = j + 1;
					  // estimatedclosedate
			}
              if(paragraph.type=='text')
          {
	
			
if((paragraph.required == true) &&  (paragraph.value=="")  ){

if((paragraph.id=="customerid")|| (paragraph.id=="regardingobjectid"))
{
affichAlert("veuillez remplir "+name_attribut[i],paragraph.id);
}
else
{
affichAlert("veuillez remplir "+paragraph.name,paragraph.id);

}
erreur=1;
	  
		  
		  }
		  else
		  {
		  
		  if(paragraph.value!="")
		  {
		  			if(paragraph.id=="regardingobjectid")
			 {
			 if(paragraph.title !="")
			 {
               chaine_attribut = chaine_attribut.concat(id_attribut[i]);
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat(paragraph.title);
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat(paragraph.name);
                      chaine_attribut = chaine_attribut.concat("#");
                      j = j + 1;
			  }
			  }
			  
			  else if (paragraph.title=="") {
              
			
                      chaine_attribut = chaine_attribut.concat(id_attribut[i]);
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat(paragraph.value);
                      chaine_attribut = chaine_attribut.concat("#");
                      j = j + 1;
                  
				
				  
				  
				  
				 
              
			  }
			  
			  
			  
             
			  
                
else if(paragraph.title=="date") {


		  	 	//    var paragraph1 = document.getElementById(id_attribut[i]+"date");
//alert(paragraph1.value);
if((paragraph.value == "")&&(paragraph.required==true))
{

affichAlert("Veuillez remplir l'heure du "+paragraph.name,paragraph.id+"date");
}
else{
if(paragraph.value !="")
{
var date_heure= paragraph.value;
date_heure=date_heure.replace("/","-");
date_heure=date_heure.replace("/","-");
chaine_attribut = chaine_attribut.concat("date"); 
	chaine_attribut = chaine_attribut.concat("="); 
		  	 	    chaine_attribut = chaine_attribut.concat(id_attribut[i]);
              		chaine_attribut = chaine_attribut.concat("=");     
              		chaine_attribut = chaine_attribut.concat(date_heure);
              		chaine_attribut = chaine_attribut.concat("#");  
					 j = j + 1;

}
}
					  
					  
					  

					  }

else if(paragraph.title=="int")
{
if(paragraph.value !="")
{

chaine_attribut = chaine_attribut.concat("int"); 
	chaine_attribut = chaine_attribut.concat("="); 
		  	 	    chaine_attribut = chaine_attribut.concat(id_attribut[i]);
              		chaine_attribut = chaine_attribut.concat("=");     
              		chaine_attribut = chaine_attribut.concat(paragraph.value );
              		chaine_attribut = chaine_attribut.concat("#");  
					 j = j + 1;

}
}
else if(paragraph.title=="decimal")
{
if(paragraph.value !="")
{

chaine_attribut = chaine_attribut.concat("decimal"); 
	chaine_attribut = chaine_attribut.concat("="); 
		  	 	    chaine_attribut = chaine_attribut.concat(id_attribut[i]);
              		chaine_attribut = chaine_attribut.concat("=");     
              		chaine_attribut = chaine_attribut.concat(paragraph.value );
              		chaine_attribut = chaine_attribut.concat("#");  
					 j = j + 1;

}
}
else if(paragraph.title=="money")
{
if(paragraph.value !="")
{

chaine_attribut = chaine_attribut.concat("money"); 
	chaine_attribut = chaine_attribut.concat("="); 
		  	 	    chaine_attribut = chaine_attribut.concat(id_attribut[i]);
              		chaine_attribut = chaine_attribut.concat("=");     
              		chaine_attribut = chaine_attribut.concat(paragraph.value );
              		chaine_attribut = chaine_attribut.concat("#");  
					 j = j + 1;

}
}					  
					  
					  

					  
					  
					  else
{
              
				if (paragraph.value != "") {
				  
				if(paragraph.title !="")
				{
				if (paragraph.title != "not")
				{
                      chaine_attribut = chaine_attribut.concat(paragraph.id);
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat(paragraph.title);
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat(paragraph.name);
                      chaine_attribut = chaine_attribut.concat("#");
                      j = j + 1;
}                } 
				 }
              
			  
			  
			  }
			  
          
          
	}
		  }
		  
		  
		  
		  
		  }
		  
		  
		  
		  

          if (paragraph.type == 'radio') 
          {
              if (paragraph.checked) {
                
                  var id_att = id_attribut[i].substring(0, id_attribut[i].length - 1)
                  chaine_attribut = chaine_attribut.concat(id_att);
                  chaine_attribut = chaine_attribut.concat("=");
                  chaine_attribut = chaine_attribut.concat(paragraph.value);
                  chaine_attribut = chaine_attribut.concat("=");
                  chaine_attribut = chaine_attribut.concat("OptSet");
                  chaine_attribut = chaine_attribut.concat("=");
                  chaine_attribut = chaine_attribut.concat("Radio");
                  chaine_attribut = chaine_attribut.concat("#");
              }
          }
            
            }
	if(document.getElementById("description") != null)
{

if(document.getElementById("description").value != null)
{
          chaine_attribut = chaine_attribut.concat("description");
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat(document.getElementById("description").value);
                      chaine_attribut = chaine_attribut.concat("#");
}
}	

	if(document.getElementById("hli_compterendu") != null)
{
if(document.getElementById("hli_compterendu").value != "")
{
          chaine_attribut = chaine_attribut.concat("hli_compterendu");
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat(document.getElementById("hli_compterendu").value);
                      chaine_attribut = chaine_attribut.concat("#");
}
}



chaine_attribut = chaine_attribut.substring(0, chaine_attribut.length - 1)

    }

	 function affichAlert(_erreur,id)
 {
  alert(_erreur);
  $('#'+id).addClass('error');
 erreur=1;
 
 }

function update()

{  

	chaine_attribut="entityName="+sessionStorage.getItem("EntityName")+"#id="+sessionStorage.getItem("guidEntity")+"#";
	erreur=0;
getAttr_val();


if(erreur==0){
 $('#busy').show();

    var request = {data:{login: window.localStorage.getItem("login"), pw: window.localStorage.getItem("pw"),urlOrg:window.localStorage.getItem("urlOrg"), chaine:chaine_attribut}};
    var jsondata = JSON.stringify(request);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/updateRecord";
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    CallServiceUpdate();  
}
else
{
 $('#busy').hide();
}
	}
function CallServiceUpdate() {
   
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
            ServiceSucceededUpdate(msg);
        },
        error: ServiceFailed  // When Service call fails
    });
}
function ServiceSucceededUpdate(result) {
       if (DataType == "json") {
        resultObject = result.updateRecordResult;     
		var expr = JSON.stringify(resultObject);
	       if (resultObject) {
		    $('#busy').hide();
			   alert(expr);
		window.location=sessionStorage.getItem("EntityName")+"Form.html";			
        		
				}
       		 else {
            alert("erreur");
        		}
    }
    else {
        alert("Result Data type is not JSON");
    }
}
/************************************************************************** RetrieveRecord***************************************************/




/************************************************************************** Page on Load ****************************************************/


















/*************************************Fin modification****************************************************/
/************************************************************************** Page on Load ****************************************************/
$(document).ready
(
function () {
 $('#busy').show();	
 if((sessionStorage.getItem("EntityName") !="quote") || ( sessionStorage.getItem("EntityName") !="account")||(sessionStorage.getItem("EntityName") !="opportunity"))
{
	var update=document.getElementById("update");
	update.style.display="none";
}
	doretrieve();  
}
);