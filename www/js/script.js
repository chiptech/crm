$(function(){
    var now = new Date();
    $('.i-txt').mobiscroll().datetime({
        minDate: new Date(1980, now.getMonth(), now.getDate()),
        theme: 'android',
        lang: 'fr',
        display: 'bottom',
        mode: 'scroller'
    });    

});