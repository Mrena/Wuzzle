

var Wuzzle_DA = (function Wuzzle_DA(){
       
       var db,
	   db_name = "Wuzzle",
	   db_version = "1.0",
	   db_descr = "Wuzzle Manager",
	   db_size = 5 * 1024 * 1024, // 5MB
           word_ids = [],
           initialized = false,
           words,
           word,
           last_picked = 0,
	 
		// Opens or creates a new Wuzzle database
		openDB = function(){
		
		   db = openDatabase(db_name,db_version,db_descr,db_size);
                   $("#game").triggerHandler("database_opened");
		   console.log("Database opened");
		},
		// Gets database resource
                 getDB = function(){
                     
                     if(!db){
                         openDB();
                     }
                   return db;  
                 },
                 // Creates Words table        
		createTables = function(){
			
			db.transaction(function(tx){
			   tx.executeSql("CREATE TABLE IF NOT EXISTS Words(word_id INTEGER PRIMARY KEY NOT NULL,word TEXT NOT NULL,word_length INTEGER NOT NULL)",[],function(tx,rs){
                                console.log("Word table created");
                                localStorage['wuzzle_startup'] = "true";
			},function(tx,e){
			  console.log("Error: "+e.message);
			});
			
		 });
			
		},
                emptyTable = function(){
                    
                    db.transaction(function(tx){
                        tx.executeSql("TRUNCATE Words",[],function(tx,result){
                            console.log("Words Table emptied");
                        },function(tx,e){
                            console.log("Error:",e);
                        });
                    });
                    
                },
                populateWords = function(words){
                    
                    try{
                            var word_len,
                                words_len = words.length;
                        words.forEach(function(word,index){
                            word_len = word.trim().length;
                            if(word_len>1){
                                    db.transaction(function(tx){
                                        var time = new Date().getTime();
                                        console.log(time);
                                        tx.executeSql("INSERT INTO Words(word_id,word,word_length) VALUES(?,?,?)",[time,word,word_len],function(tx,result){
                                            word_ids.push(time);
                                            if((words_len-1) === index){
                                                localStorage['word_ids'] = JSON.stringify(word_ids);
                                                $("#road").trigger("words_ready");
                                               
                                            }
                                                
                                    },function(tx,e){
                                         console.log("Error adding word ",e);
                                    });
                                });
                            }
                        });
                        
                    }catch(e){
                        console.log("Error:",e);
                    }   
                },
                getWords = function(number_of_letters){
                     
                     words = [];
                     db.transaction(function(tx){
                        tx.executeSql("SELECT word FROM Words WHERE word_length = ?",[number_of_letters],function(tx,result){
                         
                         try{
                             
                            for(var i=0;i<result.rows.length;i++){
                                
                                words.push(result.rows.item(i).word);
                                if((result.rows.length-1)===i){
                                    var word_index = Math.floor(Math.random()*words.length);
                                        word = words[word_index];
                                   
                                }
                                
                            }
                            
                        }catch(e){
                            console.log("Error",e);
                          }
                            
                     },function(tx,e){
                            console.log("An error occured ",e);
                        });
                        
                    });
                },
                pickWord = function(number_of_letters){
                    
                   if(last_picked !== number_of_letters){
                           getWords(number_of_letters);
                           last_picked = number_of_letters;
                           
                   }else{
                       
                        var word_index = Math.floor(Math.random()*words.length);
                        word = words[word_index];
                   }
                    
                },
                getWord = function(){
                       
                        return word;
                }, 
                checkWord = function(word,where){
                    
                    db.transaction(function(tx){
                        tx.executeSql("SELECT word FROM Words WHERE word = ?",[word],function(tx,result){
                            
                        try{
                            
                            if(result.rows && result.rows.length===1){
                                
                                if(where.row){
                                   
                                    $("#road").triggerHandler({
                                        type : "correct_row",
                                        "row_number" : where.row
                                    });
                                }else if(where.column){
                                    
                                    $("#road").triggerHandler({
                                        type : "correct_column",
                                        "column_number" : where.column
                                    });
                                }else if(where.diagonal){
                                    
                                    $("#road").triggerHandler({
                                        type : "correct_diagonal",
                                        "diagonal" : where.diagonal
                                    });
                                }else {
                                    throw Error("The second argument should be a row, column, or diagonal section of the table");
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
		// Deletes Wuzzle database tables
		deleteTables = function(){
			
			db.transaction(function(tx){
				tx.executeSql("DROP TABLE Words",[],function(tx,rs){
				   console.log("Words Dropped");
				},function(tx,e){
				   console.log("Error: "+e.message);
				});
			});
			
		    delete localStorage['wuzzle_startup'];	
		},
                init = function(words){
                  
                  openDB();
                if(!localStorage['wuzzle_startup']){
                      createTables();
                      populateWords(words);
                  }
                  
                  //deleteTables();
                 
                };
             return {
                 init : init,
             pickWord : pickWord,        
              getWord : getWord,
            checkWord : checkWord,
            getDB     : getDB
                 
                };
                
   })();