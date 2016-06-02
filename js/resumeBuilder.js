
/*
This file contains all of the code running in the background that makes resumeBuilder.js possible. We call these helper functions because they support your code in this course.
Don't worry, you'll learn what's going on in this file throughout the course. You won't need to make any changes to it until you start experimenting with inserting a Google Map in Problem Set 3.
Cameron Pittman
*/


/*
These are HTML strings. As part of the course, you'll be using JavaScript functions
replace the %data% placeholder text you see in them.
*/
var HTMLheaderName = '<h1 id="name">%data%</h1>';
var HTMLheaderRole = '<span>%data%</span><hr>';

var HTMLcontactGeneric = '<li class="flex-item"><span class="orange-text">%contact%</span><span class="white-text">%data%</span></li>';
var HTMLmobile = '<li class="flex-item"><span class="orange-text">mobile</span><span class="white-text">%data%</span></li>';
var HTMLemail = '<li class="flex-item"><span class="orange-text">email</span><span class="white-text">%data%</span></li>';
var HTMLtwitter = '<li class="flex-item"><span class="orange-text">twitter</span><span class="white-text">%data%</span></li>';
var HTMLgithub = '<li class="flex-item"><span class="orange-text">github</span><span class="white-text">%data%</span></li>';
var HTMLblog = '<li class="flex-item"><span class="orange-text">blog</span><span class="white-text">%data%</span></li>';
var HTMLlocation = '<li class="flex-item"><span class="orange-text">location</span><span class="white-text">%data%</span></li>';

var HTMLbioPic = '<img src="%data%" class="biopic">';
var HTMLwelcomeMsg = '<span class="welcome-message">%data%</span>';

var HTMLskillsStart = '<h3 id="skills-h3">Skills at a Glance:</h3><ul id="skills" class="flex-box"></ul>';
var HTMLskills = '<li class="flex-item"><span class="white-text">%data%</span></li>';

var HTMLworkStart = '<div class="work-entry col-xs-12"></div>';
var HTMLworkEmployer = '<a class="col-xs-12 col-sm-9" href="%url%" target="_blank">%data%';
var HTMLworkTitle = ' - %data%</a>';
var HTMLworkDates = '<div class="date-text col-xs-12 col-sm-3">%data%</div>';
var HTMLworkLocation = '<div class="location-text col-xs-12">%data%</div>';
var HTMLworkDescription = '<div class="col-xs-12"><em>%data%</em></div>';

var HTMLschoolStart = '<div class="education-entry col-xs-12"></div>';
var HTMLschoolName = '<a class="col-xs-12 col-sm-9" href="%url%" target="_blank">%data%';
var HTMLschoolDegree = ' -- %data%</a>';
var HTMLschoolDates = '<div class="date-text col-xs-12 col-sm-3">%data%</div>';
var HTMLschoolLocation = '<div class="location-text col-xs-12">%data%</div>';
var HTMLschoolMajor = '<div class="col-xs-12"><em>Major: %data%</em>';

var HTMLonlineClasses = '<h3 class="col-xs-12">Online Classes</h3>';
var HTMLonlineTitle = '<a class="col-xs-12 col-sm-9" href="%url%" target="_blank">%data%';
var HTMLonlineSchool = ' - %data%</a>';
var HTMLonlineDates = '<div class="date-text col-xs-12 col-sm-3">%data%</div>';
var HTMLonlineURL = '<a class="col-xs-12" href="%url%" target="_blank">%data%</a>';

var internationalizeButton = '<button>Internationalize</button>';
var googleMap = '<div id="map"></div>';

$("#mapDiv").append(googleMap);

var HTMLprojectStart = '<div class="project-entry col-xs-12"></div>';
var HTMLprojectTitle = '<div class="col-xs-12">%data%</div>';
var HTMLprojectDates = '<div class="date-text col-xs-12">%data%</div>';
var HTMLprojectDescription = '<div class="col-xs-12">%data%</div>';
var HTMLprojectImage = '<img class="col-xs-12 col-sm-6 col-md-4 img-responsive" src="%data%">';
var projects = {
  jobs: [{
    title: "Kirckoff Time/Depth Migration",
    date: "2013-now",
    description: "This is a ",
    images: ["img/kdmig.jpg","img/ktmig.jpg"]
  }],
  display: function(){
    for(i=0; i<this.jobs.length; i++){
      var tmp=HTMLprojectStart+
        HTMLprojectTitle.replace("%data%", this.jobs[i].title)+
        HTMLprojectDates.replace("%data%", this.jobs[i].date)+
        HTMLprojectDescription.replace("%data%", this.jobs[i].description);
      for(j=0; j<this.jobs[i].images.length; j++){
        tmp+=HTMLprojectImage.replace("%data%", this.jobs[i].images[j]);
      }
      $("#projects").append(tmp);
    }
  }
};
projects.display();

var bio = {
  name: "Yu Zhang",
  role: "Application Developer",
  contacts:{
    mobile: "814-777-4471",
    email: "panjinzy@hotmail.com",
    github: "yzhang14300",
    twitter: "none",
    location: "Houston, TX"
  },
  welcomeMessage: "Welcome to Yu's resume page!",
  biopic: "img/biopic.jpg",
  skills: ["C/C++","CUDA","JavaScript","HTML/CSS","MPI/OMP","Linux","TorqueBPS"],
  display: function(){
      $("#header").prepend(
        HTMLheaderName.replace("%data%", this.name)+
        HTMLheaderRole.replace("%data%", this.role)
      );
      var tmp=HTMLmobile.replace("%data%", this.contacts.mobile)+
        HTMLemail.replace("%data%", this.contacts.email)+
        HTMLtwitter.replace("%data%", this.contacts.twitter)+
        HTMLgithub.replace("%data%", this.contacts.github)+
        HTMLlocation.replace("%data%", this.contacts.location);
      $("#topContacts").append( tmp );
      $("#footerContacts").append( tmp );
      tmp=HTMLbioPic.replace("%data%", this.biopic)+
        //HTMLwelcomeMsg.replace("%data%", this.welcomeMessage)+
        HTMLskillsStart;
      for(i=0; i<this.skills.length; i++){
        tmp+=HTMLskills.replace("%data%", this.skills[i]);
      }
      $("#header").append(tmp);
  }
};
bio.display();

var work = {
  jobs: [{
    employer: "Advanced Geophysical Tech",
    title: "Application Developer",
    location: "Houston, TX",
    date: "2013-now",
    description: "Full-time Job",
    url: "http://agtgeo.com"
  }],
  display: function(){
    for(i=0; i<this.jobs.length; i++){
      $("#workExperience").append(
        HTMLworkStart+
        HTMLworkEmployer.replace("%data%", this.jobs[i].employer).replace("%url%",this.jobs[i].url)+
        HTMLworkTitle.replace("%data%", this.jobs[i].title)+
        HTMLworkDates.replace("%data%", this.jobs[i].date)+
        HTMLworkLocation.replace("%data%", this.jobs[i].location)+
        HTMLworkDescription.replace("%data%", this.jobs[i].description)
      );
    }
  }
};
work.display();

var education = {
  schools: [{
    name: "Tongji University",
    location: "Shanghai, China",
    degree: "B.S.",
    majors: "Aircraft Manufacturing",
    dates: "2006-2010",
    url: "http://www.tongji.edu.cn/english/"
  },{
    name: "Pennsylvania State University",
    location: "State College, PA, US",
    degree: "M.S.",
    majors: "Industrial Engineering",
    dates: "2010-2012",
    url: "http://www.psu.edu"
  },{
    name: "Rice University",
    location: "Houston, TX, US",
    degree: "part-time M.S.",
    majors: "Geophysics",
    dates: "2016-now",
    url: "http://www.rice.edu"
  }],
  onlineCourses: [{
    title: "Front-End Web Developer Nanodegree",
    school: "Udacity",
    date: "2016",
    url: "http://www.udacity.com"
  }],
  display: function(){
    for(i=0; i<this.schools.length; i++){
      $("#education").append(
        HTMLschoolStart+
        HTMLschoolName.replace("%data%", this.schools[i].name).replace("%url%", this.schools[i].url)+
        HTMLschoolDegree.replace("%data%", this.schools[i].degree)+
        HTMLschoolDates.replace("%data%", this.schools[i].dates)+
        HTMLschoolLocation.replace("%data%", this.schools[i].location)+
        HTMLschoolMajor.replace("%data%", this.schools[i].majors)+
        ((i===this.schools.length-1)?'':'</div><div class="col-xs-12"><hr></div>')
      )
    }
    for(i=0; i<this.onlineCourses.length; i++){
      $("#education").append(
        HTMLonlineClasses+
        HTMLonlineTitle.replace("%data%", this.onlineCourses[i].title).replace("%url%", this.onlineCourses[i].url)+
        HTMLonlineSchool.replace("%data%", this.onlineCourses[i].school)+
        HTMLonlineDates.replace("%data%", this.onlineCourses[i].date)+
        //HTMLonlineURL.replace("%data%", this.onlineCourses[i].url).replace("%url%", this.onlineCourses[i].url)
        ((i===this.onlineCourses.length-1)?'':'</div><div class="col-xs-12"><hr></div>')
      )
    }
  }
};
education.display();

/*
The International Name challenge in Lesson 2 where you'll create a function that will need this helper code to run. Don't delete! It hooks up your code to the button you'll be appending.
*/
$(document).ready(function() {
  $('button').click(function() {
    var $name = $('#name');
    var iName = inName($name.text()) || function(){};
    $name.html(iName);
  });
});

/*
The next few lines about clicks are for the Collecting Click Locations quiz in Lesson 2.
*/
clickLocations = [];

function logClicks(x,y) {
  clickLocations.push(
    {
      x: x,
      y: y
    }
  );
  console.log('x location: ' + x + '; y location: ' + y);
}

$(document).click(function(loc) {
  // your code goes here!
});



/*
This is the fun part. Here's where we generate the custom Google Map for the website.
See the documentation below for more details.
https://developers.google.com/maps/documentation/javascript/reference
*/
var map;    // declares a global map variable


/*
Start here! initializeMap() is called when page is loaded.
*/
function initializeMap() {

  var locations;

  var mapOptions = {
    disableDefaultUI: true
  };

  /*
  For the map to be displayed, the googleMap var must be
  appended to #mapDiv in resumeBuilder.js.
  */
  map = new google.maps.Map(document.querySelector('#map'), mapOptions);


  /*
  locationFinder() returns an array of every location string from the JSONs
  written for bio, education, and work.
  */
  function locationFinder() {

    // initializes an empty array
    var locations = [];

    // adds the single location property from bio to the locations array
    locations.push(bio.contacts.location);

    // iterates through school locations and appends each location to
    // the locations array. Note that forEach is used for array iteration
    // as described in the Udacity FEND Style Guide:
    // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
    education.schools.forEach(function(school){
      locations.push(school.location);
    });

    // iterates through work locations and appends each location to
    // the locations array. Note that forEach is used for array iteration
    // as described in the Udacity FEND Style Guide:
    // https://udacity.github.io/frontend-nanodegree-styleguide/javascript.html#for-in-loop
    work.jobs.forEach(function(job){
      locations.push(job.location);
    });

    return locations;
  }

  /*
  createMapMarker(placeData) reads Google Places search results to create map pins.
  placeData is the object returned from search results containing information
  about a single location.
  */
  function createMapMarker(placeData) {

    // The next lines save location data from the search result object to local variables
    var lat = placeData.geometry.location.lat();  // latitude from the place service
    var lon = placeData.geometry.location.lng();  // longitude from the place service
    var name = placeData.formatted_address;   // name of the place from the place service
    var bounds = window.mapBounds;            // current boundaries of the map window

    // marker is an object with additional data about the pin for a single location
    var marker = new google.maps.Marker({
      map: map,
      position: placeData.geometry.location,
      title: name
    });

    // infoWindows are the little helper windows that open when you click
    // or hover over a pin on a map. They usually contain more information
    // about a location.
    var infoWindow = new google.maps.InfoWindow({
      content: name
    });

    // hmmmm, I wonder what this is about...
    google.maps.event.addListener(marker, 'click', function() {
      // your code goes here!
    });

    // this is where the pin actually gets added to the map.
    // bounds.extend() takes in a map location object
    bounds.extend(new google.maps.LatLng(lat, lon));
    // fit the map to the new marker
    map.fitBounds(bounds);
    // center the map
    map.setCenter(bounds.getCenter());
  }

  /*
  callback(results, status) makes sure the search returned results for a location.
  If so, it creates a new map marker for that location.
  */
  function callback(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      createMapMarker(results[0]);
    }
  }

  /*
  pinPoster(locations) takes in the array of locations created by locationFinder()
  and fires off Google place searches for each location
  */
  function pinPoster(locations) {

    // creates a Google place search service object. PlacesService does the work of
    // actually searching for location data.
    var service = new google.maps.places.PlacesService(map);

    // Iterates through the array of locations, creates a search object for each location
      locations.forEach(function(place){
      // the search request object
      var request = {
        query: place
      };

      // Actually searches the Google Maps API for location data and runs the callback
      // function with the search results after each search.
      service.textSearch(request, callback);
    });
  }

  // Sets the boundaries of the map based on pin locations
  window.mapBounds = new google.maps.LatLngBounds();

  // locations is an array of location strings returned from locationFinder()
  locations = locationFinder();

  // pinPoster(locations) creates pins on the map for each location in
  // the locations array
  pinPoster(locations);

}

/*
Uncomment the code below when you're ready to implement a Google Map!
*/

// Calls the initializeMap() function when the page loads
window.addEventListener('load', initializeMap);

// Vanilla JS way to listen for resizing of the window
// and adjust map bounds
window.addEventListener('resize', function(e) {
  //Make sure the map bounds get updated on page resize
  map.fitBounds(mapBounds);
});

$("#resume").on("shown.bs.modal", function () {
    google.maps.event.trigger(map, "resize");
    map.fitBounds(mapBounds);
});
