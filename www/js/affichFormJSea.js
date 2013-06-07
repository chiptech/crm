
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

//alert(e.id);
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

	




 $('#busy').hide();	

 setTimeout(function(){myScroll.refresh();},100);
  
}
function modification()
{
	
	/*var request = { u: {login: sessionStorage.getItem('cleL'), pw: sessionStorage.getItem('cleP'), entity:sessionStorage.getItem("ea")}};
    var jsondata = JSON.stringify(request);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/AskModify";
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;*/
	
	// formulaire entitée stockée dans locale
	resultObject=window.localStorage.getItem(sessionStorage.getItem("ea"));
		ajout();
  
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

function ServiceFailed(result) {
    //alert('Service call failed: ' + result.status + '' + result.statusText);
    Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
}
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
						        champ9.title ="not" ;
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

/*********************************************************************** Back to Page LEs entitées associées  **********************************************/
function retour()
{
window.location="entiteassocie.html";
}
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
		//alert(expr);
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
    Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
}

function doretrieve() {
	var guid=sessionStorage.getItem("guidEntityea");
	var Entityname=sessionStorage.getItem("ea");
	
    var request = { u: { login:  window.localStorage.getItem("login"), pw:  window.localStorage.getItem("pw"),urlOrg: window.localStorage.getItem("urlOrg"), id: guid,name: Entityname} };
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
/************************************************************************** Page on Load ****************************************************/
$(document).ready
(
function () {
 $('#busy').show();	
	doretrieve();  
}
);