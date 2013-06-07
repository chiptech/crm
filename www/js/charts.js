var Type;
var Url;
var Data;
var ContentType;
var DataType;


function afficherCharts(entityName) {

          $('#viewcharts').append('<div  id="divFrame">  </div>');
		  $('#divFrame').append('<SELECT style="width:95%;" id="charts" size="1" onChange="charts();">');
		  $('#divFrame').append('</SELECT>');
		  $('#divFrame').append('<center><div id ="chartDivId" style="margin-top:20px; margin-down:20px; width:80%; height:70%;">  </div></center>');			
		  $('#divFrame').append(' <center><a href="javascript:CloseButton()"  data-role="button" data-transition="slide" data-inline="true" data-corners="true" data-shadow="true" data-iconshadow="true" data-wrapperels="span" data-theme="c" class="ui-btn ui-btn-up-c ui-btn-inline ui-shadow ui-btn-corner-all"><span class="ui-btn-inner ui-btn-corner-all"><span class="ui-btn-text">Fermer</span></span></a> </center>');	

	var request = { u: { login:  window.localStorage.getItem("login"), pw:  window.localStorage.getItem("pw"),urlOrg: window.localStorage.getItem("urlOrg") ,id:" ", name:entityName} };
    var jsondata = JSON.stringify(request);
    Type = "POST";
    Url = "http://localhost/WcfMobileHLI/Service1.svc/entity";   
    Data = jsondata;
    ContentType = "application/json; charset=utf-8";
    DataType = "json";
    CallGetCharts();	 
		
}

function CloseButton()
{
document.getElementById('viewcharts').innerHTML='';	
}


function CallGetCharts(){
	
    $.ajax({
        type: Type, //GET or POST or PUT or DELETE verb
		async: false,
        url: Url, // Location of the service
        data: Data, //Data sent to server
        contentType: ContentType, // content type sent to server
        dataType: DataType, //Expected data format from server
        crossDomain: true,
        success: function (data) {
		
		        if(data.GetEntityChartsResult.length != 0 )
				{
					$.each(data.GetEntityChartsResult,function(i,v){
						$('#charts').append('<option value="'+ v.id +'">'+ v.name +'</option>');
					});  
					
					$('#charts').trigger('change');
				}	
        }
    });
	
}

function charts(){
  $chartId = $('#charts').val();
  var ajaxDataRenderer = new Array();
  var chartName , chartType ;
  $request = { u: {login:  window.localStorage.getItem("login"), pw:  window.localStorage.getItem("pw"),urlOrg: window.localStorage.getItem("urlOrg"),id:$chartId, name:""} };
          $.ajax({
			type: 'POST',
            async: false,
            url:'http://localhost/WcfMobileHLI/Service1.svc/chart',
			data: JSON.stringify($request),
			contentType: "application/json",
            dataType:'json',
            success: function(data) {
			    
				var chart = data.GetChartResult ;
				
                chartName = chart.name ;
				chartType = chart.chartType;
				$.each(chart.data , function(i,v){
					var array = $.map(v, function (item, index) {
							        if( chartType != "Bar" ){
										return [[item.x , item.y]];
									}
							        else {
									    return [[ item.y , item.x ]];
									}
							    });
					
					ajaxDataRenderer.push(array);});
            }
          });
		  
$('#chartDivId').empty();
        var options = {
        title: chartName,
        seriesDefaults: {
	        rendererOptions: {
            showDataLabels: true ,
		    dataLabels: 'value'
            },
			pointLabels:{show:true}
         }     
        };
  
  switch (chartType) {
    case "pie":
           options.seriesDefaults.renderer = $.jqplot.PieRenderer ;
		   options.legend  = { show:true , location: 'e' } ;
           $.jqplot('chartDivId',ajaxDataRenderer, options);
    break;
 
    case "Column":
		   options.seriesDefaults.renderer	= $.jqplot.BarRenderer;
		   options.axes = {
            // Use a category axis on the x axis and use our custom ticks.
                xaxis: { renderer: $.jqplot.CategoryAxisRenderer}
            
            } ;
			
		   $.jqplot('chartDivId',ajaxDataRenderer, options);
    break;
	
	case "Bar":
		   options.seriesDefaults.renderer	= $.jqplot.BarRenderer ;
		   options.seriesDefaults.rendererOptions.barDirection ='horizontal';
		   options.axes = {
                yaxis: { renderer: $.jqplot.CategoryAxisRenderer}
            } ;
		   $.jqplot('chartDivId',ajaxDataRenderer, options);
    break;
	
	case "Line" :
        options.axes = {
            // Use a category axis on the x axis and use our custom ticks.
                xaxis: { renderer: $.jqplot.CategoryAxisRenderer}
            
            };
		$.jqplot('chartDivId',ajaxDataRenderer,options);
    break;
    default: ;
}		  
		
}
