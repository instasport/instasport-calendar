jQuery(document).ready(function($){

    // page is now ready, initialize the calendar...
    console.log( "ready!" );

    jQuery('#calendar').fullCalendar({

    dayClick: function(date, jsEvent, view) {
    	    href = "/club/acro/date/1/" + date.format();
            window.location.href = href;
    },

	header: {
		left: 'prev,next,today',
		center: 'title',
		right: 'month,agendaWeek,agendaDay'
	},

	defaultView: 'month',
	defaultTimedEventDuration: '01:00:00',
	forceEventDuration: true,

    minTime: '14:00',
	maxTime: '22:00',

	height: 'auto',
	
	eventSources: [
	
	{
	events: [
		{
			title: 'Акробатика для детей',
			start: '2016-11-16T18:00',
			end:   '2016-11-16T19:00',
			url: "/club/acro/event/6357/",
		},
	],
	textColor: '#000000',
	color: '#ffff00',
	},
	
	{
	events: [
		{
			title: 'Акробатика для взрослых + стретчинг',
			start: '2016-11-17T20:00',
			end:   '2016-11-17T21:15',
			url: "/club/acro/event/6360/",
		},
	],
	textColor: '#ffffff',
	color: '#7161d9',
	},
	
	{
	events: [
		{
			title: 'Акробатика для детей',
			start: '2016-11-18T18:00',
			end:   '2016-11-18T19:00',
			url: "/club/acro/event/6358/",
		},
	],
	textColor: '#000000',
	color: '#ffff00',
	},
	
	{
	events: [
		{
			title: 'Акробатика для взрослых 2',
			start: '2016-11-19T14:00',
			end:   '2016-11-19T15:00',
			url: "/club/acro/event/6361/",
		},
	],
	textColor: '#fffafa',
	color: '#7161d9',
	},
	
	{
	events: [
		{
			title: 'Акробатика для взрослых 2',
			start: '2016-11-20T14:00',
			end:   '2016-11-20T15:00',
			url: "/club/acro/event/6362/",
		},
	],
	textColor: '#fffafa',
	color: '#7161d9',
	},
	
	{
	events: [
		{
			title: 'Акробатика для детей',
			start: '2016-11-21T18:00',
			end:   '2016-11-21T19:00',
			url: "/club/acro/event/6346/",
		},
	],
	textColor: '#000000',
	color: '#ffff00',
	},
	
	{
	events: [
		{
			title: 'Акробатика для взрослых 2',
			start: '2016-11-22T20:00',
			end:   '2016-11-22T21:00',
			url: "/club/acro/event/6349/",
		},
	],
	textColor: '#fffafa',
	color: '#7161d9',
	},
	
	{
	events: [
		{
			title: 'Акробатика для детей',
			start: '2016-11-23T18:00',
			end:   '2016-11-23T19:00',
			url: "/club/acro/event/6347/",
		},
	],
	textColor: '#000000',
	color: '#ffff00',
	},
	
	{
	events: [
		{
			title: 'Акробатика для взрослых + стретчинг',
			start: '2016-11-24T20:00',
			end:   '2016-11-24T21:15',
			url: "/club/acro/event/6350/",
		},
	],
	textColor: '#ffffff',
	color: '#7161d9',
	},
	
	{
	events: [
		{
			title: 'Акробатика для детей',
			start: '2016-11-25T18:00',
			end:   '2016-11-25T19:00',
			url: "/club/acro/event/6348/",
		},
	],
	textColor: '#000000',
	color: '#ffff00',
	},
	
	{
	events: [
		{
			title: 'Акробатика для взрослых 2',
			start: '2016-11-26T14:00',
			end:   '2016-11-26T15:00',
			url: "/club/acro/event/6351/",
		},
	],
	textColor: '#fffafa',
	color: '#7161d9',
	},
	
	{
	events: [
		{
			title: 'Акробатика для взрослых 2',
			start: '2016-11-27T14:00',
			end:   '2016-11-27T15:00',
			url: "/club/acro/event/6352/",
		},
	],
	textColor: '#fffafa',
	color: '#7161d9',
	},
	
	]
	

    })

});
