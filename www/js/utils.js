'use strict';

angular.module('utils', [])
 .factory('$database',['$state', '$timeout', '$ionicPopup', function($state, $timeout, $ionicPopup) {

 var self = this;
 self.db = null;

  function initDb() {
    
          self.db = window.openDatabase('dataWebDb.db','1','my',800*1024); // only available when WebSQL is available in Browser
          self.db.transaction(function (tx) {
                tx.executeSql("CREATE TABLE IF NOT EXISTS Category (katId integer primary key, nama text, subnama text, satuan text)");
              });
        console.log('Database opened');
        return self.db;
  }

   return {

    initDB: function() {
      return initDb();
    },

    showAllTable: function(table){
        var tempData = [];
            self.db.transaction(function (tx) {
            tx.executeSql("SELECT * FROM "+table, [], function (tx, results) {

            for(var i = 0; i < results.rows.length; i++){
                tempData.push(results.rows.item(i));
            }
            }, null);
         }) 
        return tempData;
   },


   // add item to table =======================================

      updateToTable: function(data, table, row) {
        
        let valueHere = [];
        let rowHere = [];
        let realValue = [];

        for (let i = 0; i < row.length; i++) {
            valueHere.push('?');
            rowHere.push(row[i]);
            realValue.push(data[i]);
              if(valueHere.length == row.length){
                updateToTableNow(table, rowHere, valueHere, realValue);
              }
        }

        function updateToTableNow(table, rowHere, valueHere, realValue){
          self.db.transaction(function (tx) {
            tx.executeSql("INSERT  OR REPLACE INTO "+table+" ("+rowHere+") VALUES ("+valueHere+")", realValue);
            return true;
          });
        }
            return true;
      },

   // DELETE
    deleteFromTable: function(id, tableId, state){
      self.db.transaction(function(tx){
        tx.executeSql("DELETE FROM "+tableId+" WHERE katId =?", [id]);
      })
      $state.go(state);
    }
}

}]);