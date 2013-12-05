'use strict' ;

var L = L,
    google = google,
    popups = [] ;

$(document).ready(function(){

    
    console.log('sup') ;

    // var map = L.map('map').setView([51.923943445544715, 5.1416015625], 7);
    var map = L.map('map').setView([52.3731, 4.8922], 3),
        labels = {
            'Accepted': 'label-success',
            'Process': 'label-warning',
            'Praying': 'label-default'
        } ;

    map.on('zoomend', function(){
            console.log('end of zoom') ;
            $.each(popups, function(index, popup){
                popup.openPopup() ;
            }) ;
        }
    ) ;

    L.tileLayer('http://{s}.tile.cloudmade.com/8E10386EF81C4270B374C76464C939C2/113231/256/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    }).addTo(map);



    $.getJSON('https://spreadsheets.google.com/feeds/cells/0ApT5f0KS7hjVdGs3Y1FMMV8xdlFYc0R6M2hRa1ZkRUE/od6/public/basic?alt=json-in-script&callback=?', function(r){

        var numOfColumns = 5,
            lists = [],
            data = {} ;

        //first transform this data into an usable object
        $.each(r.feed.entry, function(index, value){

            var columnIndex = index % numOfColumns ;

            if(lists[columnIndex] === undefined){
                lists[columnIndex] = [] ;
            }

            lists[columnIndex].push(value.content.$t) ;

        }) ;

        $.each(lists, function(index, value){
            data[value.shift().replace(/ /g, '_').toLowerCase()] = value ;
        }) ;

        console.log(data) ;

        $.each(data.name, function(index, value){

            console.log('checking for', value, index) ;

            var geocoder = new google.maps.Geocoder(),
                address = data.city[index] + ', ' + data.country[index] ;

            geocoder.geocode({
                'address': address
            }, function(results, status) {

                if (status === google.maps.GeocoderStatus.OK) {

                    var lat = results[0].geometry.location.lat(),
                        lon = results[0].geometry.location.lng() ;

                    var marker = L.marker([lat, lon], {
                        icon: L.divIcon({
                            className: 'icon',
                            html: '<img src="' + data.photo[index] + '"><p>' + value + '<span class="label ' + labels[data.status[index]] + '">' + data.status[index] + '</span></p>'
                        }),

                    }).addTo(map) ;
                
                }

        });
        }) ;

    }) ;




}) ;