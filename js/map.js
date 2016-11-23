/*
	Map
*/
function initLoadMap(){
	initializeMap({
		zoom:16,
		mapLatitude:50.417298231818364,
		mapLongitude:30.52179819353114,
		elemId:'map',
		
		});
}
function initializeMap(t) {
	var mapCenter = new google.maps.LatLng(t.mapLatitude, t.mapLongitude);
	var mapOptions = {
		zoom: t.zoom,
		center: mapCenter,
		//draggable: false,
		scrollwheel: false,
		navigationControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	var map = new google.maps.Map(document.getElementById(t.elemId), mapOptions);
	
	var infowindow = new google.maps.InfoWindow({
	maxWidth: 245	
	});
	var onMarkerClick = function() {
      var marker = this;
      var latLng = marker.getPosition();
      infoWindow.setContent(marker.content);

      infoWindow.open(map, marker);
    };
    google.maps.event.addListener(map, 'click', function() {
      infoWindow.close();
    });
	
	
	new google.maps.Marker({
		icon: 'http://mediapost.ua/wp-content/themes/mp_ru/images/marker-map.png',
		position: new google.maps.LatLng(50.41848619872934,30.520013585705783),
		map: map,
		clickable: false,
		title: 'Рекламное агентство Медиа Пост Украина',
		content: '<strong class="logo map-logo">Рекламное агентство Медиа Пост Украина</strong>'
	});
	// var marker2 = new google.maps.Marker({
	// 	icon: 'http://mediapost.ua/wp-content/themes/mp_ru/images/du.png',
	// 	clickable: false,
	// 	position: new google.maps.LatLng(50.42041178778451,30.52072260528803),
	// 	map: map
	// });
	// var marker3 = new google.maps.Marker({
	// 	icon: 'http://mediapost.ua/wp-content/themes/mp_ru/images/lb.png',
	// 	clickable: false,
	// 	position: new google.maps.LatLng(50.41242604275613,30.524864941835403),
	// 	map: map
	// });
	// var marker4 = new google.maps.Marker({
	// 	icon: 'http://mediapost.ua/wp-content/themes/mp_ru/images/dn.png',
	// 	clickable: false,
	// 	position: new google.maps.LatLng(50.41813016337134,30.545184016227722),
	// 	map: map
	// });
	// var marker5 = new google.maps.Marker({
	// 	icon: 'http://mediapost.ua/wp-content/themes/mp_ru/images/pch.png',
	// 	clickable: false,
	// 	position: new google.maps.LatLng(50.42670787982429,30.53879365324974),
	// 	map: map
	// });
	
};