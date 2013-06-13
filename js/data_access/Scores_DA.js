

var Scores_DA = (function Scores_DA(){
    
    var db,
        months = ["January","February","March","April","May","June","July","August","September","November","December"],
        
    createTable = function(){
        
        db.transaction(function(tx){
            tx.executeSql("CREATE TABLE IF NOT EXISTS Scores (score_id INTEGER PRIMARY KEY,score INTEGER NOT NULL,month INTEGER NOT NULL,day INTEGER NOT NULL)",[],function(tx,result){
                console.log("Table Scores created");
                localStorage["Scores_created"] = "true";
            },function(tx,e){
                console.log("Error:",e);
            });
        });
        
    },
    deleteTable = function(){
        
        db.transaction(function(tx){
            tx.executeSql("DROP Table Scores",[],function(tx,result){
                console.log("Scores deleted");
                delete localStorage["Scores_created"];
            },function(tx,e){
                console.log("Error:",e);
            });
        });
        
    },
    addSampleScores = function(){
        
        var scores = [5,6,8,5,9,7,2,3,8],
            months = [1,2,3,4,5,6,7,8,9],
            days = [7,6,5,4,3,2,1];
            while(scores.length){
                
                addScore(scores[0],months[0],days[0]);
                scores.shift();
                months.shift();
                days.shift();
                
            }
                
    },
    addScore = function(score){
       
        var date = new Date(),
            month = parseInt(date.getMonth()),
            day = parseInt(date.getDay())+1; 
          
          if(arguments[1]){
              month = arguments[1];
          }
          if(arguments[2]){
              day = arguments[2];
          }
        
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM Scores WHERE score = ? AND day = ? AND month = ?",[score,day,month],function(tx,result){
                    
                if(!result.rows.length){
                    
                        db.transaction(function(tx){
                            tx.executeSql("INSERT INTO Scores(score,month,day) VALUES(?,?,?)",[score,month,day],function(tx,result){
                                 console.log("Score entered");
                        },function(tx,e){
                                console.log("Error:",e);
                            });
                        });
                    }else{
                        console.log("Score already exists");
                    }
                    
            },function(tx,e){
                console.log("Error:",e);
            });
        }); 
    },
    getAllScores = function(){
        
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM Scores",[],function(tx,result){
                var rows = result.rows,
                    scores = [];
                 if(rows.length){
                     for(var i=0,len = rows.length;i<len;i++){
                         scores.push(rows.item(i));
                         if(i===rows.length-1){
                              $("#improvement").triggerHandler({
                                  type : "all_scores_ready",
                              "scores" : scores
                              });
                         }
                     }
                 }
                
            },function(tx,e){
                console.log("Error:",e);
            });
        });
        
    },
    getMonths = function(){
        return months;
    },
    getScoreDataByMonth = function(month_index){
        
        db.transaction(function(tx){
            tx.executeSql("SELECT * FROM Scores WHERE month = ? ORDER BY score AND day",[month_index],function(tx,result){
                
                var rows = result.rows,
                    scores = [];
                
                if(rows.length){
                    for(var i=0,len = rows.length;i<len;i++){
                        scores.push(rows.item(i));
                        if(i===rows.length-1){
                            $("#improvement").trigger({
                                type : "scores_ready",
                               "scores" : scores
                            });  
                        }
                    }
                    
                }
                
            },function(tx,e){
                console.log("Error:",e);
            });
            
        });
    },        
    init = function(){

        db = Wuzzle_DA.getDB();
       if(!localStorage["Scores_created"]){
            createTable();
            addScore(2);
        }
        // deleteTable();
        //addSampleScores();

    };        
    return {
               init : init,
           addScore : addScore,
          getMonths : getMonths,
getScoreDataByMonth : getScoreDataByMonth,
        deleteTable : deleteTable,
       getAllScores :  getAllScores
          
    };
    
})();