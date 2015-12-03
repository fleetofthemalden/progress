var app = angular.module('thesePeople', []);
app.controller('peopleController', function($scope) {
	

	var getAllPeopleData = function(){
    var peopleData =  testData;
    // console.log(peopleData);
		return peopleData;
	};

  // var getThisPersonById = function(personId){
  //   var peopleData = getAllPeopleData();
  //   var disPerson = peopleData.filter(function(person){
  //     return (person.id == personId);
  //   });
  //   return disPerson[0];
  // };

  $scope.peopleData = [];
  // $scope.peopleData = getAllPeopleData();
  $scope.resultsCount = $scope.peopleData.length;
  $scope.thisPerson = 'Find people...'; //temporary placeholder
  // if($scope.peopleData.length > 0)
  //   $scope.thisPerson = $scope.peopleData[0];

  // $scope.personClick = function(personId) {
  //     $scope.thisPerson = getThisPersonById(personId);
  // };

  var showResultsDisplay = function(show){
    if(show == false){
      jQuery('.results-display').addClass('hide');
      jQuery('.voodoo-magic').removeClass('hide');
    } else {
      jQuery('.voodoo-magic').addClass('hide');
      jQuery('.results-display').removeClass('hide');
    }
  };

  var cleanLastName, cleanFirstName, cleanEmail, cleanPhone = true;

  var showHideClearFilterButton = function(){
    if(cleanLastName && cleanFirstName && cleanEmail && cleanPhone){
      jQuery('.clearButton').addClass('hide');
    } else {
      jQuery('.clearButton').removeClass('hide');
    }
  };

  $scope.clearFilters = function(){
    jQuery('input.quickSearch').val('');
    $scope.peopleFilter();//null input, clears results
    showResultsDisplay(false);
  };

  $scope.$watch('lastNameSearch', function(inputText){
    if(inputText != null && inputText.length > 0)
      cleanLastName = false;
    else
      cleanLastName = true;
    showHideClearFilterButton();
  });

  $scope.$watch('firstNameSearch', function(inputText){
    if(inputText != null && inputText.length > 0)
      cleanFirstName = false;
    else
      cleanFirstName = true;
    showHideClearFilterButton();
  });

  $scope.$watch('emailSearch', function(inputText){
    if(inputText != null && inputText.length > 0)
      cleanEmail = false;
    else
      cleanEmail = true;
    showHideClearFilterButton();
  });

  $scope.$watch('phoneSearch', function(inputText){
    if(inputText != null && inputText.length > 0)
      cleanPhone = false;
    else
      cleanPhone = true;
    showHideClearFilterButton();
  });

  $scope.peopleFilter = function(lastName, firstName, email, phone) { //this is the Quick Lookup function
      if(lastName == null)
        lastName = '';
      else
        lastName = lastName.toLowerCase().trim();
      if(firstName == null)
        firstName = '';
      else
        firstName = firstName.toLowerCase().trim();
      if(email == null)
        email = '';
      else
        email = email.toLowerCase().trim();
      if(phone == null)
        phone = '';
      else
        phone = phone.toString().toLowerCase().trim();

      if((phone + email + firstName + lastName).length == 0){
        $scope.peopleData = [];
        $scope.resultsCount = 0;
        showResultsDisplay(false);
        return;
      }


      var peopleData = getAllPeopleData();

      if(lastName.length > 0){
        peopleData = peopleData.filter(function(person){
              return (person.lastName.toLowerCase().indexOf(lastName) != -1);
            });
      }
      if(firstName.length > 0){
        peopleData = peopleData.filter(function(person){
              return (person.firstName.toLowerCase().indexOf(firstName) != -1);
            });
      }
      if(email.length > 0){
        peopleData = peopleData.filter(function(person){
              return (person.email.toLowerCase().indexOf(email) != -1);
            });
      }
      if(phone.length > 0){
        peopleData = peopleData.filter(function(person){
              return (person.phone.toString().indexOf(phone) != -1);
            });
      }

      $scope.peopleData = peopleData;
      $scope.resultsCount = peopleData.length;
      if(peopleData.length > 0)
        showResultsDisplay(true);
  };

  $scope.formatPhone = function(phoneNumber){
    var phoneString = phoneNumber.toString();
    var phoneArray = phoneString.split('');
    if(phoneString.length == 11 && phoneArray[0] == 1){ //US 11 digit
      //format as US 10 digit
      phoneString = '(' + phoneArray[1] + phoneArray[2] + phoneArray[3] + ') ' + phoneArray[4] + phoneArray[5] + phoneArray[6] + '-' + phoneArray[7] + phoneArray[8] + phoneArray[9] + phoneArray[10];
    }
    return phoneString;
  };

  $scope.calculateAge = function(DoB){
    if(DoB.ageUnknown != null && DoB.ageUnknown == true)
      return "Age Unknown";
    var dateString = DoB.year + '/' + DoB.month + '/' + DoB.day;
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  };

});

var testData = [
   {  
      "id":0,
      "firstName": "Dixon",
      "lastName": "Minnick",
      "picture": "https://scontent-iad3-1.xx.fbcdn.net/hphotos-xft1/v/t1.0-9/12191887_10204843414153694_4436216032359096699_n.jpg?oh=8620b7e756f48fb60524dd093955b1a0&oe=56F55111",
      "DoB": {
        "day": 15,
        "month": 6,
        "year": 1993
      },
      "employment": {
        "employer": "NGP-VAN",
        "position": "Software Engineer"
      },
      "college": {
        "name": "Tufts University",
        "major": "Computer Science",
        "year": 2015
      },
      "phone" : 12088907609,
      "email" : "dixon@minnick.co"
   },
   {
    "id":7,
    "firstName": "John",
    "lastName": "Doe",
    "picture" : "http://canyouidentifyme.org/sites/default/files/Miami%20Dade%20Florida%20John%20Doe%20August%202008.jpg",
    "DoB": {
      "day": 29,
      "month": 2,
      "year": 1992
    },
    "employment": {
      "employer": "Burger King",
      "position": "cashier"
    },
    "college": {
      "name": "University of Idaho",
      "major": "Economics",
      "year": 2016
    },
    "phone" : 12085555555,
    "email" : "johnnydoeboy92@hotmail.com"
   },
   {
    "id":6,
    "firstName": "Abe",
    "lastName": "Lincoln",
    "picture" : "http://a4.files.biography.com/image/upload/c_fill,cs_srgb,dpr_1.0,g_face,h_300,q_80,w_300/MTIwNjA4NjMzODg2NTc0MDky.jpg",
    "active": true,
    "DoB": {
      "day": 12,
      "month": 2,
      "year": 1809
    },
    "employment": {
      "employer": "United States of America",
      "position": "President"
    },
    "college": {
      "name": "",
      "major": "",
      "year": 0
    },
    "phone" : 12021191864,
    "email" : "honest.abe16@mail.whitehouse.gov"
   },
   {  
      "id":5,
      "firstName": "Walt",
      "lastName": "Minnick",
      "picture": "https://scontent-iad3-1.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/401382_237639416307178_1416359716_n.jpg?oh=12cc059024ffa5ee1f3a9a0b9fa568f7&oe=56F64566",
      "DoB": {
        "day": 20,
        "month": 9,
        "year": 1942
      },
      "employment": {
        "employer": "Partnership For Responsible Growth",
        "position": "Partner"
      },
      "college": {
        "name": "Whitman College",
        "major": "Economics",
        "year": 2015
      },
      "phone" : 12088902888,
      "email" : "walt@minnick.co"
   },
   {  
      "id":4,
      "firstName": "Denali",
      "lastName": "Minnick",
      "picture": "https://scontent-iad3-1.xx.fbcdn.net/hphotos-xfa1/v/t1.0-9/10525695_10207115480673820_2580953256431600781_n.jpg?oh=7dc02be1551223011243e3f5d98d372d&oe=56EFD4F3",
      "DoB": {
        "day": 19,
        "month": 2,
        "year": 1997
      },
      "employment": {
        "employer": "",
        "position": "Student"
      },
      "college": {
        "name": "William Smith College",
        "major": "Environmental Science",
        "year": 2019
      },
      "phone" : 12088905140,
      "email" : "denali@minnick.co"
   },
   {  
      "id":1,
      "firstName": "User1",
      "lastName": "Minnick",
      "picture": "https://scontent-iad3-1.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/1503992_10200944289278009_383402407_n.jpg?oh=542d0029eb006863f35c51367d09d4fc&oe=56965B43",
      "DoB": {
        "day": 1,
        "month": 1,
        "year": 1991
      },
      "employment": {
        "employer": "NGP-VAN",
        "position": "Software Engineer"
      },
      "college": {
        "name": "Tufts University",
        "major": "Computer Science",
        "year": 2011
      },
      "phone" : 12025550001,
      "email" : "user1@minnick.co"
   },
   {  
      "id":2,
      "firstName": "User1",
      "lastName": "Minnick",
      "picture": "https://scontent-iad3-1.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/1503992_10200944289278009_383402407_n.jpg?oh=542d0029eb006863f35c51367d09d4fc&oe=56965B43",
      "DoB": {
        "day": 2,
        "month": 2,
        "year": 1992
      },
      "employment": {
        "employer": "NGP-VAN",
        "position": "Software Engineer"
      },
      "college": {
        "name": "Tufts University",
        "major": "Computer Science",
        "year": 2012
      },
      "phone" : 17815550002,
      "email" : "user2@minnick.co"
   },
   {  
      "id":3,
      "firstName": "User3",
      "lastName": "Minnick",
      "picture": "https://scontent-iad3-1.xx.fbcdn.net/hphotos-xap1/v/t1.0-9/1503992_10200944289278009_383402407_n.jpg?oh=542d0029eb006863f35c51367d09d4fc&oe=56965B43",
      "DoB": {
        "day": 3,
        "month": 3,
        "year": 1993
      },
      "employment": {
        "employer": "NGP-VAN",
        "position": "Software Engineer"
      },
      "college": {
        "name": "Tufts University",
        "major": "Computer Science",
        "year": 2013
      },
      "phone" : 16175550003,
      "email" : "user3@minnick.co"
   },
];