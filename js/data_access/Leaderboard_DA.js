


var Leaderboard_DA = (function Leaderboard_DA(){
    
    var db,
    createTable = function(){
        
        db.transaction(function(tx){
            tx.executeSql("CREATE TABLE IF NOT EXISTS Leaderboard(leader_id INTEGER PRIMARY KEY,name TEXT NOT NULL,score INTEGER NOT NULL)",[],function(tx,result){
                console.log("Leaderboard table created");
                localStorage["Leaderboard_created"] = "true";
            },function(tx,e){
                console.log("Error:",e);
            });
        });
        
    },
    deleteTable = function(){
        
        db.transaction(function(tx){
            tx.executeSql("DROP TABLE Leaderboard",[],function(tx,result){
                console.log("Leaderboard deleted");
                delete localStorage["Leaderboard_created"];
            },function(tx,e){
                console.log("Error:",e);
            });
        });
        
    },
    addLeader = function(name,score){
        
        db.transaction(function(tx){
            tx.executeSql("INSERT INTO Leaderboard(name,score) VALUES(?,?)",[name,score],function(tx,result){
                console.log("Leader added.");
            },function(tx,e){
                console.log("Error:",e);
            });
            
        });
        
    },
    getTop5Leaders = function(){
        
        db.transaction(function(tx){
            tx.executeSql("SELECT name,score FROM Leaderboard ORDER BY name DESC",[],function(tx,result){
                   try{
                if(result.rows.length){
                       var top5 = [];
                       for(var i=0;i<5;i++){
                           top5.push(result.rows.item(i));
                           if(i===4){
                               
                           }
                       }
                   }
                   
                 }catch(e){
                   console.log("Error:",e);
                }
            },function(tx,e){
                console.log("Error:",e);
            });
        });
        
    },
    init = function(){
        
        db = Wuzzle_DA.getDB();
        if(!localStorage["Leaderboard_created"]){
              createTable();
        }
        
       // deleteTable();
        
    };
    return {
       init : init,
  addLeader : addLeader        
        
    };
    
})();