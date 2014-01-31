'use strict' ;

var L = L,
    google = google,
    markers = [] ;

$(document).ready(function(){

    var nextMarker = function(i){

        markers[i].closePopup() ;

        map.setView(markers[i].getLatLng(), 5) ;

        setTimeout(function(){

            map.setView(markers[i].getLatLng(), 3) ;

            setTimeout(function(){

                map.setView(markers[i].getLatLng(), 5) ;

                setTimeout(function(){
        
                    markers[i].openPopup() ;
                    map.setView(markers[i].getLatLng(), 8) ;                   

                    setTimeout(function(){

                        i++;
                        if(i === 27) {
                            //because there is a bug i cant fix last moment
                            location.reload() ;
                        }

                        nextMarker(i);
                    }, 5000) ;

                }, 1000) ;

            }, 1000) ;

        }, 1000) ;

    } ;

    // var map = L.map('map').setView([51.923943445544715, 5.1416015625], 7);
    var map = L.map('map').setView([52.3731, 4.8922], 4),
        labels = {
            'Student': 'label-success',
            'Staff': 'label-info',
            'Part-time staff': 'label-info',
            'School Leader': 'label-info'
        } ;

    L.tileLayer('http://{s}.tile.cloudmade.com/8E10386EF81C4270B374C76464C939C2/113231/256/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    }).addTo(map);

    // $.getJSON('https://spreadsheets.google.com/feeds/cells/0ApT5f0KS7hjVdEJIVGVMUWdiNlQzbTBxMDVPSlVzb3c/od6/public/basic?alt=json-in-script&callback=?', function(r){
    $.getJSON('https://spreadsheets.google.com/feeds/cells/0AqA2xvkYssxvdGg3WW1oc2JsZ3dBRUdwUmVLRmt5LUE/od6/public/basic?alt=json-in-script&callback=?', function(r){

        var numOfColumns = 7,
            lists = [],
            data = {} ;

        //first transform this data into an usable object
        $.each(r.feed.entry, function(index, value){

            console.log(value.content.$t) ;

            var columnIndex = index % numOfColumns ;

            if(lists[columnIndex] === undefined){
                lists[columnIndex] = [] ;
            }

            lists[columnIndex].push(value.content.$t) ;

        }) ;

        console.log(lists) ;

        $.each(lists, function(index, value){
            data[value.shift().replace(/ /g, '_').toLowerCase()] = value ;
        }) ;

        console.log(data) ;

        $.each(data.first_name, function(index, value){

            var marker = L.marker([data.lat[index], data.lon[index]]).bindPopup(
                '<img src="' + data.photo[index] + '"><p>' + value + '<span class="label label-inverse">' + data.role[index] + '</span></p><p class="muted">' + data.city[index] + ', ' + data.country[index] + '</p>',
                {
                    offset: [0, 0],
                    autoPanPaddingTopLeft: 10,
                    autoPanPaddingBottomRight: 10
                }
            ).openPopup() ;

            markers.push(marker) ;
            map.addLayer(marker) ;

        }) ;

        if(window.location.hash === '#play') {
            nextMarker(0) ;
        }

        // markers[0].openPopup() ;
        // map.setView(markers[0].getLatLng(), 6) ;

    }) ;

}) ;