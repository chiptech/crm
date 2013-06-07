
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

var tabAttributKey=new Array;
var tabAttributValue=new Array;	
var tabFormattedtKey=new Array;
var tabLookup=new Array;
var tabFormattedValue=new Array;
var customerLookup=0;
var changeCustomer=0;

function modification()
{
	
	var request = { u: {login: sessionStorage.getItem('cleL'), pw: sessionStorage.getItem('cleP'), entity:sessionStorage.getItem("EntityName")}};
    var jsondata = JSON.stringify(request);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/AskModifyActivity";
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    CallServiceAskingModification();	
}

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
        resultObject = result.AskModifyActivityResult;
			var expr = JSON.stringify(resultObject);
	//alert(expr);
		if (resultObject) {
		CreateFormModify(resultObject);
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
function CreateFormModify(resultObject)
{	
var formulaire = window.document.FormModification;	
//alert(resultObject);
    var reg = new RegExp("=", "g");
    tableau = resultObject.split(reg);
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
	var _section = document.getElementById("FormModification");
		for (var i = 0; i < tableau.length; i++) {

       interm = tableau[i].split(reg1);
	   //alert(interm.length);
	   indice= -1;
for( var b=0; b<tabAttributKey.length;b++)
	   {
		
		  if (tabAttributKey[b]==interm[1])
		   {
		  //alert(tabAttributKey[b]);
		  //alert(b);
			  indice=b;
			  break;
		    }
	   }
	  
	//var _section = document.getElementById("FormModification");
       if ((interm[1] != 'ownerid')&&(interm[1] != 'statecode')&&(interm[1] != 'activitytypecode')) {
	  
           if (interm.length == 4) {
			 //alert(section[l]);
	  
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
               var champ = document.createElement("input");
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
			  // alert("cc");
               _section.appendChild(bloc);
                _section.appendChild(champ);
           }
		   if (interm.length == 5) {
		   // alert(interm[5]);
			
			// alert(section[l]);
			//
		//	alert(interm);
                lookup_bool[i] = "n";
               name_attribut[i] = interm[0];
               id_attribut[nbre] = interm[1];
               nbre = nbre + 1;
	
	//alert(tabAttributValue[indice]);
	var reg4 = new RegExp(" ", "g");
	var reg5 = new RegExp("/", "g");
	//alert(tabAttributValue);
	if(indice!= " ")
	{
	var date_time=tabAttributValue[indice].split(reg4);
	//alert(date_time[0]);
	var date=date_time[0].split(reg5);
	//alert(date[2]+"-"+date[1]+"-"+date[0]);
               var bloc = document.createElement("p");
               if (interm[3] == '1') {
                   bloc.innerText = interm[0] + ' jj-mm-aaaa *';
               }
               else
               { bloc.innerText = interm[0]+'  jj-mm-aaaa '; }
               // Crée un nouvel élément de type "input"
               var champ = document.createElement("input");
               // Les valeurs encodée dans le formulaire seront stockées dans un tableau
               champ.name = interm[0];
			  
              champ.value=date[2]+"-"+date[1]+"-"+date[0];  
			  // champ.value=date[2]+"-"+date[1]+"-"+date[0];
			  // champ.type = "date";
               champ.id = interm[1];
	           champ.title='date';
    		  
			  /*if(indice!= -1){
               champ.value=tabAttributValue[indice];
			 
			   }
			   else 
			   { 
			   champ.value=" "; 
			   }*/
                  // Crée un nouvel élément de type "input"
               var champ1 = document.createElement("input");
			    //champ1.type = "time";
               champ1.id = interm[1]+"date";
           champ1.value=date_time[1];
	}else{
	
               var bloc = document.createElement("p");
               if (interm[3] == '1') {
                   bloc.innerText = interm[0] + ' jj-mm-aaaa *';
               }
               else
               { bloc.innerText = interm[0]+'  jj-mm-aaaa '; }
               // Crée un nouvel élément de type "input"
               var champ = document.createElement("input");
               // Les valeurs encodée dans le formulaire seront stockées dans un tableau
               champ.name = interm[0];
			  
//              champ.value=date[2]+"-"+date[1]+"-"+date[0];  
			  // champ.value=date[2]+"-"+date[1]+"-"+date[0];
			  // champ.type = "date";
               champ.id = interm[1];
	           champ.title='date';
    		  
			  /*if(indice!= -1){
               champ.value=tabAttributValue[indice];
			 
			   }
			   else 
			   { 
			   champ.value=" "; 
			   }*/
                  // Crée un nouvel élément de type "input"
      //         var champ1 = document.createElement("input");
			    //champ1.type = "time";
    //           champ1.id = interm[1]+"date";
  //         champ1.value=date_time[1];
	
	
	
	
	
	}		   
			   
			   bloc.appendChild(champ);
               //bloc.appendChild(champ1);
			    _section.appendChild(bloc);
                _section.appendChild(champ);
            //  _section.appendChild(champ1);
		   }
          if (interm.length == 6) {
 //alert(interm[6]); 

 
			 if (interm[2] == 'radio') {
			// alert(interm);
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
                   _section.appendChild(bloc1);
                   _section.appendChild(champ5);
                    _section.appendChild(champ3);
                   _section.appendChild(champ1);
                   _section.appendChild(champ4);
                    _section.appendChild(champ2);
               }

               if (interm[2] == 'picklist') {
			  //alert("pick");
			//alert( tabAttributKey[indice]);
			//alert(resultObject.Attributes[indice].Value)
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
//alert(interm2[0]);
						   if(interm2[0]==tabAttributValue[indice])
{
//alert('cc');
//alert(interm2[1]);

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
				 //  alert("picklist");
				 
				 
				   for ( var w in tabAttributKey)
				   {
					if(tabAttributKey[w]==interm[1]){
		
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
//alert(interm[1]) ;                 
				  champ9.name = interm[1];
                   champ9.type = "text";
//alert(interm[3]);                
				champ9.id = interm[3];
				   //alert(interm);
                   champ9.disabled = "disabled";
                //   alert(tabAttributValue[indice]);
				//alert(tabAttributValue);
				    if(indice!= -1){
				// alert(tabAttributValue[indice]);
               			champ9.value=tabAttributValue[indice];
						//champ9.title =tabLookup[idChamp] ;
			   				champ9.title ="undefined" ;
							}
			   			else { champ9.value=" "; 
						        //champ9.title ="not" ;
								champ9.title ="undefined" ;
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
                    _section.appendChild(bloc1);
                   _section.appendChild(champ9);
                    _section.appendChild(champB);
			   }
           
         }
	   
	   
   }
		
		
		
		
		
		}
	
   var retourLigne = document.createElement("br");
   _section.appendChild(retourLigne);
}
function viewAccount()
{
	RetrieveContacts();
}

function viewRecord(indice)
{
	var reg1 = new RegExp("#", "g");
	var  interm = tableau[indice].split(reg1);
	//alert(interm[3]);
	if (interm[1]=="customerid"){
		//alert("ok customerid");
		RetrieveLookupCustomer("account");
		}
		else {
		alert(interm[3]);
	RetrieveLookup(interm[3]);
		}
}

/******************************************Lookup Customer***************************************/
function RetrieveLookupCustomer(entityName){
	entityLookupName=entityName;
	var request = { u: { login: sessionStorage.getItem('cleL'), pw: sessionStorage.getItem('cleP'),entity:entityName}};
	var jsondata = JSON.stringify(request);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/SystemView";
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    CallServiceRetrievingLookupRecordCustomer();
	}
function CallServiceRetrievingLookupRecordCustomer() { 
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
            ServiceSucceededretrievingLookupRecordsCustomer(msg);
        },
        error: ServiceFailed  // When Service call fails
    });
}
 function ServiceSucceededretrievingLookupRecordsCustomer(result) {
   if (DataType == "json") {
        resultObjectLookup = result.SystemViewResult;
		var jsondata = JSON.stringify(resultObjectLookup);
        if (resultObjectLookup) {		
		if (customerLookup==0){	
			  customerLookup=1;
    		  affichageStart(resultObjectLookup);     
		}
		  else {
			   Affichage2(resultObjectLookup);
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
function affichageStart(resultObjectLookup)
{
	 $('#viewALLContact').append('<div  id="divModalDialog1">  </div>');	
					var reg = new RegExp("#", "g");
					var reg1 = new RegExp("/", "g");
					var tableau= resultObjectLookup.split(reg);
					var tab_nom = tableau[0].split(reg1);
           			var tab_id_view = tableau[1].split(reg1);		
					$('#divModalDialog1').append('<SELECT name="nomEntity" id="listeEntity" size="1" onChange=" choiceTypeCustomer();">');
					$('#listeEntity').append('<option id="account" > Compte </option>');
					$('#listeEntity').append('<option id="contact" > Contact </option>');
					$('#divModalDialog1').append('<SELECT name="nom" id="liste" size="1" onChange=" affichView();">');
					$('#liste').append('<option >              </option>');
 					for (var i=0; i< tab_nom.length-1;i++)
 						{
	 						 $('#liste').append('<option id='+tab_id_view[i]+'>'+tab_nom[i]+'</option>');	 
						}
					$('#divModalDialog1').append('</SELECT>');
					$('#divModalDialog1').append('<span id="AfficherVue" > </span>');
					$('#divModalDialog1').append(' <center><a href="javascript:CloseButton()"  data-role="button" data-transition="slide" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-btn-up-c ui-btn-inline ui-shadow ui-btn-corner-all"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Fermer</span></span></a> </center>');
}
function choiceTypeCustomer ()
{
	var d = document.getElementById("listeEntity");
    var ent = d.options[d.selectedIndex].id;
	//alert(ent);
	RetrieveLookupCustomer(ent);
}

function Affichage2(resultObjectLookup)
{
	//alert(resultObjectLookup);
	var d = document.getElementById("liste");
	d.length=0;
					var reg = new RegExp("#", "g");
					var reg1 = new RegExp("/", "g");
					var tableau= resultObjectLookup.split(reg);
					var tab_nom = tableau[0].split(reg1);
           			var tab_id_view = tableau[1].split(reg1);	
					 for (var i = 0; i < tab_nom.length; i++) {
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
					
}
/****************************************** Lookup **********************************************/
function RetrieveLookup(entityName){
	entityLookupName=entityName;
	var request = { u: { login: sessionStorage.getItem('cleL'), pw: sessionStorage.getItem('cleP'),entity:entityName}};
	var jsondata = JSON.stringify(request);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/SystemView";
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    CallServiceRetrievingLookupRecord();
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
    		       $('#viewALLContact').append('<div  id="divModalDialog1">  </div>');	
					var reg = new RegExp("#", "g");
					var reg1 = new RegExp("/", "g");
					var tableau= resultObjectLookup.split(reg);
					var tab_nom = tableau[0].split(reg1);
           			var tab_id_view = tableau[1].split(reg1);
					
					
					//$('#divModalDialog1').append('<center><input type="button" value="Fermer" onClick="CloseButton();"/></center>');
					$('#divModalDialog1').append('<SELECT name="nom" id="liste" size="1" onChange=" affichView();">');
					$('#liste').append('<option >              </option>');
 					for (var i=0; i< tab_nom.length-1;i++)
 						{
	 						 $('#liste').append('<option id='+tab_id_view[i]+'>'+tab_nom[i]+'</option>');	 
						}
					$('#divModalDialog1').append('</SELECT>');
					$('#divModalDialog1').append('<span id="AfficherVue" > </span>');
					$('#divModalDialog1').append(' <center><a href="javascript:CloseButton()"  data-role="button" data-transition="slide" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-btn-up-c ui-btn-inline ui-shadow ui-btn-corner-all"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Fermer</span></span></a> </center>');
        }
        else {
            alert("erreur");         
        	}
    }
    else {
        alert("Result Data type is not JSON");
    }
}
/***************************** Closing Virtual Frame ********************************************/
function CloseButton()
{
customerLookup=0;
document.getElementById('viewALLContact').innerHTML='';	
}
/************************************************* Afficher Vue ***************************************/
function affichView() 
{
	
 	var div = document.getElementById("AfficherVue"); // crée un élément <table>
    div.innerHTML = '';  	
	var d=document.getElementById("liste");     
    var request = { u: { login: sessionStorage.getItem('cleL'), pw: sessionStorage.getItem('cleP'),  idView: d.options[d.selectedIndex].id} };
    var jsondata = JSON.stringify(request);
   // alert(jsondata);
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
        error: ServiceFailed  // When Service call fails
    });
}
function ServiceSucceededV(result) {
	
    if (DataType == "json") {
        dataview = result.ResultatViewResult;
        if (dataview) {
            // string recu
            var List = document.List;
            //alert(data);
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
						
			$('#AfficherVue').append('<li><a href="#" onClick="ModificationLookup('+ j +')"> <p class="line1">'+attribut[col1]+': '+Case[col1]+
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
/***************************** Modification lookup ***********************************************/
 function ModificationLookup(i)
{
	customerLookup=0;
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
	 document.getElementById('viewALLContact').innerHTML='';
	 idLookup=Case[guid_emplacement];
	// alert(entityLookupName);
	 sessionStorage.setItem(entityLookupName,idLookup);
	 doretrieveLookup(Case[guid_emplacement],entityLookupName);
}

/***************************** Retrieve Record Lookup Name**************************************************/
function doretrieveLookup(id,entityRef) {
	
	var guid=" "+id+" ";
	var Entityname=entityRef;
    var request = { u: {login: sessionStorage.getItem('cleL'), pw: sessionStorage.getItem('cleP'),id: guid,name: Entityname} };
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
     /*  if (DataType == "json") {
         var resultatLookup = result.doretrieveLookupNameResult;   
	//	 alert(resultatLookup);
		// alert(entityLookupName);
		 
		if (resultatLookup) {
		    var interm;
			var reg = new RegExp("#", "g");
			interm =resultatLookup.split(reg);
			if ((sessionStorage.getItem("EntityName")!="account")||(sessionStorage.getItem("EntityName")!="contact"))
			{
				if ((entityLookupName=="account")||(entityLookupName=="contact"))
				{
				alert('tay');
			
					
					var champ=document.getElementById("customerid");
					champ.title=interm[0]+"+"+entityLookupName; //id+ contact ou account
					champ.value=interm[1]; // full name
				}
				else 
				{
					var champ=document.getElementById(entityLookupName);
					champ.title=interm[0];
					champ.value=interm[1];	
				}
			}
			else 
			{
			var champ=document.getElementById(entityLookupName);
			champ.title=interm[0];
			champ.value=interm[1];	
			}
        }
        else {
            alert("erreur");
        }
    }
    else {
        alert("Result Data type is not JSON");
    }
	*/
	if (DataType == "json") {
         var resultatLookup = result.doretrieveLookupNameResult;   
		
		if (resultatLookup) {
		//alert(resultatLookup);
		    var interm;
			var reg = new RegExp("#", "g");
			interm =resultatLookup.split(reg);
		//alert(entityLookupName);
			var champ=document.getElementById(entityLookupName);
			champ.title=interm[0];
			champ.value=interm[1];	
			document.getElementById('viewALLContact').innerHTML='';
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


function extractUrlParams(){	
	IdContactPrincipal= location.search.substring(1).split('?');
}
/*********************************************************************** Back to account Form **********************************************/
function retour()
{
window.location=sessionStorage.getItem("EntityName")+"Form.html?"+sessionStorage.getItem("Id");
}
/************************************************************************* Update Record ***************************************************/
/*function update()

{  

	chaine_attribut="entityName="+sessionStorage.getItem("EntityName")+"#id="+sessionStorage.getItem("Id")+"#";
	//alert(chaine_attribut);
	var j = 0;
	for (var i = 0; i < id_attribut.length; i++) 
	{
	

	var paragraph = document.getElementById(id_attribut[i]);
	
	  			if(paragraph.type=='select-one')
              		{
 			    if (paragraph.selectedIndex != 0){
                  var strUser = paragraph.options[paragraph.selectedIndex].id;
				  chaine_attribut = chaine_attribut.concat("select=");
                  chaine_attribut = chaine_attribut.concat(id_attribut[i]);
                  chaine_attribut = chaine_attribut.concat("=");
                  chaine_attribut = chaine_attribut.concat(strUser);
                  chaine_attribut = chaine_attribut.concat("#");        
             		 }
					 j = j + 1;
					}
				if(paragraph.type=='text')
          		{ 
				   if (paragraph.title!=""){ 
				     if(paragraph.title!="not"){
					chaine_attribut = chaine_attribut.concat("lookup");
              		chaine_attribut = chaine_attribut.concat("="); 
					chaine_attribut = chaine_attribut.concat(id_attribut[i]);
              		chaine_attribut = chaine_attribut.concat("=");     
              		chaine_attribut = chaine_attribut.concat(paragraph.title);
              		chaine_attribut = chaine_attribut.concat("#");
					 }
				   }
				   else{
					   if (paragraph.value != " "){
		  	 	    chaine_attribut = chaine_attribut.concat(id_attribut[i]);
              		chaine_attribut = chaine_attribut.concat("=");     
              		chaine_attribut = chaine_attribut.concat(paragraph.value);
              		chaine_attribut = chaine_attribut.concat("#");     
					   }
				   }
				   j = j + 1; 
				}
				if(paragraph.type=='date')
          		{
				if (paragraph.selectedIndex != 0){
					var reg = new RegExp("-", "g");
                     date_att = paragraph.value.split(reg);
					 if (date_att.length=="3"){
		  	 	    chaine_attribut = chaine_attribut.concat("date");
              		chaine_attribut = chaine_attribut.concat("="); 
		  	 	    chaine_attribut = chaine_attribut.concat(id_attribut[i]);
              		chaine_attribut = chaine_attribut.concat("=");     
              		chaine_attribut = chaine_attribut.concat(date_att[2]+"/"+date_att[1]+"/"+date_att[0]);
              		chaine_attribut = chaine_attribut.concat("#");  
					 }
				}
				   j = j + 1; 
				}
		   		if (paragraph.type == 'radio') 
          		{    
				//alert("radio entering");
                     
				//var radioButtons = document.getElementsById(id_attribut[i]);
    		  		
        			
					if (paragraph.checked) 
             				{
							//alert(paragraph.value);
                 			//  alert("You checked " + radioButtons[x].value);
                			 var id_att = id_attribut[i].substring(0, id_attribut[i].length - 1)
							chaine_attribut = chaine_attribut.concat("radio=");
							chaine_attribut = chaine_attribut.concat(id_att);
                 			chaine_attribut = chaine_attribut.concat("=");
                 			chaine_attribut = chaine_attribut.concat(paragraph.value);
                 			chaine_attribut = chaine_attribut.concat("#");
                 			j = j + 1;
                 			i = i + 2;
             				}
       						
          		}	
	}
	alert(chaine_attribut);
    var request = {data:{login: sessionStorage.getItem('cleL'), pw: sessionStorage.getItem('cleP'), chaine:chaine_attribut}};
    var jsondata = JSON.stringify(request);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/updateRecord";
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    CallServiceUpdate();  
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
			   //alert(resultObject);
		window.location=sessionStorage.getItem("EntityName")+"Form.html?"+sessionStorage.getItem("Id");			
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

function update()

{  

	chaine_attribut="entityName="+sessionStorage.getItem("EntityName")+"#id="+sessionStorage.getItem("idActivity")+"#";
	//alert(sessionStorage.getItem("guidEntity"));
	var j = 0;
	for (var i = 0; i < id_attribut.length; i++) 
	{
	

	var paragraph = document.getElementById(id_attribut[i]);
	
	  			if(paragraph.type=='select-one')
              		{
					
 			
			//alert('cc');	
                  var strUser = paragraph.options[paragraph.selectedIndex].id;
				  chaine_attribut = chaine_attribut.concat("select=");
                  chaine_attribut = chaine_attribut.concat(id_attribut[i]);
                  chaine_attribut = chaine_attribut.concat("=");
                  chaine_attribut = chaine_attribut.concat(strUser);
                  chaine_attribut = chaine_attribut.concat("#");        
             		 
					 j = j + 1;
					}
				if(paragraph.type=='text')
          		{ 
				   // alert(paragraph.value);
              if (paragraph.title=="") {
              
			  if (paragraph.value != "") {
			  
			  
			  
                      chaine_attribut = chaine_attribut.concat(id_attribut[i]);
                      chaine_attribut = chaine_attribut.concat("=");
                      chaine_attribut = chaine_attribut.concat(paragraph.value);
                      chaine_attribut = chaine_attribut.concat("#");
                      j = j + 1;
                  
				  
				  
				  
				  
				  }
              
			  
			  
			  
			  }
              else
              {
			  
              // l'attribut de type lookup envoi sera de la forme : id_attribut/type d'entite associé/guid
                
if(paragraph.title=="date") {

	if (paragraph.selectedIndex != 0)
					
					{
					
					var reg = new RegExp("-", "g");
                     date_att = paragraph.value.split(reg);
					 if (date_att.length=="3")
					 {
		  	 	   // var paragraph1 = document.getElementById(id_attribut[i]+"date");
					
					chaine_attribut = chaine_attribut.concat("date");
              		chaine_attribut = chaine_attribut.concat("="); 
		  	 	    chaine_attribut = chaine_attribut.concat(id_attribut[i]);
              		chaine_attribut = chaine_attribut.concat("=");     
              	//	chaine_attribut = chaine_attribut.concat(date_att[2]+"-"+date_att[1]+"-"+date_att[0]+" "+paragraph1.value);
              		chaine_attribut = chaine_attribut.concat(date_att[2]+"-"+date_att[1]+"-"+date_att[0]);
              		
					chaine_attribut = chaine_attribut.concat("#");  
					 
					 
					
					 
					 }
					
					
					
					
					
					}
                      j = j + 1;



}else
{
//alert(paragraph.title);
if(paragraph.title!="not")
      {        
				if (paragraph.value != "") {
				  
				// alert(id_attribut[i]);
				  chaine_attribut = chaine_attribut.concat('lookup');
                    chaine_attribut = chaine_attribut.concat("=");                     
chaine_attribut = chaine_attribut.concat(id_attribut[i]);
                    				
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
				/*if(paragraph.type=='date')
          		{
				if (paragraph.selectedIndex != 0){
					var reg = new RegExp("-", "g");
                     date_att = paragraph.value.split(reg);
					 if (date_att.length=="3"){
		  	 	    chaine_attribut = chaine_attribut.concat("date");
              		chaine_attribut = chaine_attribut.concat("="); 
		  	 	    chaine_attribut = chaine_attribut.concat(id_attribut[i]);
              		chaine_attribut = chaine_attribut.concat("=");     
              		chaine_attribut = chaine_attribut.concat(date_att[2]+"/"+date_att[1]+"/"+date_att[0]);
              		chaine_attribut = chaine_attribut.concat("#");  
					 }
				}
				   j = j + 1; 
				}*/
		   		if (paragraph.type == 'radio') 
          		{    
				//alert("radio entering");
                     
				//var radioButtons = document.getElementsById(id_attribut[i]);
    		  		
        			
					if (paragraph.checked) 
             				{
							//alert(paragraph.value);
                 			//  alert("You checked " + radioButtons[x].value);
                			 var id_att = id_attribut[i].substring(0, id_attribut[i].length - 1)
							chaine_attribut = chaine_attribut.concat("radio=");
							chaine_attribut = chaine_attribut.concat(id_att);
                 			chaine_attribut = chaine_attribut.concat("=");
                 			chaine_attribut = chaine_attribut.concat(paragraph.value);
                 			chaine_attribut = chaine_attribut.concat("#");
                 			j = j + 1;
                 			i = i + 2;
             				}
       						
          		}	
	}
	alert(chaine_attribut);
    var request = {data:{login: sessionStorage.getItem('cleL'), pw: sessionStorage.getItem('cleP'), chaine:chaine_attribut}};
    var jsondata = JSON.stringify(request);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/updateRecord";
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    CallServiceUpdate();  
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
			   alert(expr);
		window.location="activityForm.html";			
        		}
       		 else {
            alert("erreur");
        		}
    }
    else {
        alert("Result Data type is not JSON");
    }
}


/**********************************retrieving Contact *************************************/
function CallServiceContact() {
   
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
        resultObjectContact = result.doretrieveResult;     
		var expr = JSON.stringify(resultObjectContact);
		//alert(expr);
	       if (resultObjectContact) {
			//alert (expr);
			var champ = document.getElementById("primarycontactid");
			//alert("ok");
			champ.value="";
				for( var i in resultObjectContact.Attributes)
					{
						if(resultObjectContact.Attributes[i].key=="contactid")
						{
									
						}
						else if (resultObjectContact.Attributes[i].key=="firstname")
						{
							champ.value += resultObjectContact.Attributes[i].value+" ";
						}
						else if (resultObjectContact.Attributes[i].key=="lastname")
						{
							champ.value += resultObjectContact.Attributes[i].value;
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

function ServiceFailed(result) {
   // alert('Service call failed: ' + result.status + '' + result.statusText);
    Type = null; Url = null; Data = null; ContentType = null; DataType = null; ProcessData = null;
}

function doretrieveContact() {	
	page="view";
	//var data=$('#guid').val()+ " "+$('#entityName').val();
	var guid=" "+IdContactPrincipal+" ";
	var Entityname="contact";
    var request = { u: { login: sessionStorage.getItem('cleL'), pw: sessionStorage.getItem('cleP'), id: guid,name: Entityname} };
    var jsondata = JSON.stringify(request);
	//alert(jsondata);
    Type = "POST";
    Url = "http://"+sessionStorage.getItem("hostName")+"/WcfMobileHLI/Service1.svc/doretrieve";
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    ProcessData = true;
    CallServiceContact();
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
	alert(expr);
	//alert(resultObject.FormattedValues[0].key);
		
		if (resultObject) {
			for( var i in resultObject.Attributes)
				{
			  	 tabAttributKey[i]=resultObject.Attributes[i].key; 
		    	 if(resultObject.Attributes[i].value=="[object Object]")
			  		 {
				  		tabAttributValue[i]=resultObject.Attributes[i].value.Name;
				  		tabLookup[i]=resultObject.Attributes[i].value.Id;
				//	 alert(tabAttributValue[i]);
					 }					
					else{
				  		tabAttributValue[i]=resultObject.Attributes[i].value;
					//		 alert(tabAttributValue[i]);
						}
				}
		
			for( var i in resultObject.FormattedValues)
				{
				tabFormattedtKey[i]=resultObject.FormattedValues[i].key;
				tabFormattedValue[i]=resultObject.FormattedValues[i].value;
				//alert(tabFormattedtKey[i]);
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
				//alert(tabAttributValue);
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
	var guid=sessionStorage.getItem("idActivity");
	
	var Entityname=sessionStorage.getItem("EntityName");
    //alert(Entityname);
	var request = { u: { login: sessionStorage.getItem('cleL'), pw: sessionStorage.getItem('cleP'), id: guid,name: Entityname} };
    var jsondata = JSON.stringify(request);
	//alert(jsondata);
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
	doretrieve();  
}
);