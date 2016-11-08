'use strict';

angular.module('starter.controllers', [])

.controller('contohCtrl', function($scope, $state, $database, $ionicPopup, $ionicModal) {

$scope.reverse  = false;  // set the default sort order
$scope.AddCatMode = true;

  $scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
  }

  $scope.katEdit = {
        nama: null,
        subnama: null,
        satuan: null
  };

  $scope.specialValue = {
        "id": "12345",
        "value": "green"
  };

  $scope.kategori = [];

  $scope.deleteId = function(id, table) {
    let state = "landing.contoh";
    $database.deleteFromTable(id, table, state);
    cekTableKategori();
    $scope.modalAddCat.hide();
  }

function cekTableKategori() {

// try use some promises
  let table = 'Category'
  var p1 = new Promise(
        // The resolver function is called with the ability to resolve or
        // reject the promise
        function(resolve, reject) {
            // We fulfill the promise !
        //$database.test('Category');
        let cat = $database.showAllTable(table);
        resolve(cat);
        }
  );

  p1.then(function(cat){
    $scope.kategori = cat;
  }).catch(function(reason){
    console.log('Handle rejected promise ('+reason+') here.');
  })
}

cekTableKategori();

  
  // An alert dialog
 $scope.showAlert = function() {
   var alertPopup = $ionicPopup.alert({
     title: 'Satuan!',
     subTitle: '(Kg, Liter, Lusin, dsb))',
     scope: $scope,
     //
     buttons: [
      { text: 'Cancel' },
      {
        text: '<b>Save</b>',
        type: 'button-positive',
        onTap: function(e) {
          if (!$scope.katEdit.satuan) {
            e.preventDefault();
          } else {
            return $scope.katEdit.satuan;
          }
        }
      }
    ], 
    //in here, we can use templateUrl too
    // templateUrl: 'app/templates/blablabla.html' // example
     template: '<label><input type="radio" ng-model="katEdit.satuan" value="Lusin">Lusin</label><br/><label><input type="radio" ng-model="katEdit.satuan" ng-value="specialValue">KG</label><br/><label><input type="radio" ng-model="katEdit.satuan" value="Liter">Liter</label><br/>'

   });

   alertPopup
    .then(function(res) {
     console.log(res);
   })
    .catch(function(err){
        console.log(err);  
    });
 };

  $scope.createCategory = function(katEdit) {
    let toArray;

    if(!$scope.AddCatMode) {
      toArray = [];
      toArray.push(katEdit.katId);
    } else {
      toArray = [null];  
    }
    
    toArray.push(katEdit.nama);
    toArray.push(katEdit.subnama);
    toArray.push(katEdit.satuan);

    let table = 'Category';
    let row = [ 'katId', 'nama', 'subnama', 'satuan' ];

    if(katEdit.nama != null){
        $database.updateToTable(toArray, table, row);
        $scope.modalAddCat.hide()
        cekTableKategori(); 
    }
}

  $scope.editCat = function(data){
    $scope.AddCatMode = false;
    $scope.openModalAddCat();
    $scope.katEdit.katId = data.katId;
    $scope.katEdit.nama = data.nama;
    $scope.katEdit.subnama = data.subnama;
    $scope.katEdit.satuan = data.satuan;
  }

  $scope.AddCat = function(){
    $scope.katEdit = {
        katId: null,
        nama: null,
        subnama: null,
        satuan: null
      }; 
    $scope.AddCatMode = true;
    $scope.openModalAddCat();
  }
 

  $ionicModal.fromTemplateUrl('templates/contohsubModal.html', {
    scope: $scope,
  }).then(function(modal) {
    $scope.modalAddCat = modal;
  });

  $scope.openModalAddCat = function() {
    $scope.modalAddCat.show();
  };
  $scope.closeModalAddCat = function() {
    $scope.modalAddCat.hide();
  };
})


.controller('menuCtrl', function($scope) {})