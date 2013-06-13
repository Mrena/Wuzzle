
var Wuzzle = (function Wuzzle(){
    
     var inProgress = false, 
         score = 60,
         valid_right_diagonal = [10,21,32,43,54,65,76],
         valid_left_diagonal = [70,61,52,43,34,25,16],
         
         init = function(){
             
             $("#index").css("opacity",0.3);
             $.mobile.loading("show",{ text: "Please wait..."});
             //$("#popupSplash").popup("open");
             GameController.setInitStatus(true);
             $.get("./bin/words.txt",function(data){
                   
                    
                    var words = data.split(",");
                    words = words.filter(function(word){
                        return (word.trim()!=="");
                    });
                   
                    Wuzzle_DA.init(words);
                    if(localStorage['wuzzle_startup']){
                        populate();
                        
                    }
            });
             
         },
         setScore = function(_score){
           score = _score;
         },
         getScore = function(){
           return score;
         },        
         setProgress = function(progress){
          
           if(typeof progress === "boolean")
                 inProgress = progress;
                else{
                   throw Error("Progress must be set to either true or false"); 
                }
         }, 
        getProgress = function(){
             return inProgress;
                },
	 populate =  function(){
	        
            try{
                Wuzzle_DA.pickWord(Settings.level);
                var ids = [];
                $("#road td").each(function(){
                   if(!$(this).hasClass("head"))
                        ids.push($(this).attr("id"));
                });
                
                var word;
                setTimeout(function(){
                    word = Wuzzle_DA.getWord();
                    var thatCallee = arguments.callee;
                    if(!word){
                        setTimeout(function(){
                            thatCallee();
                        },50);
                        return;
                    }
                      if(ids.length !== 0){
                           $.each(word,function(){
                               var _id = ids[ids.length-1];
                             if(_id!=="40")
                               $("#"+_id).html("<img src='images/characters/"+this+".png' alt='"+this+"' />");
                               ids.pop();
                           });
                        
                           Wuzzle_DA.pickWord(Settings.level);
                           
                           setTimeout(function(){
                               thatCallee();
                           },100);
                         }else{
                             $.mobile.loading("hide");
                             $("#index").css("opacity",1.0);
                             //$("#popupSplash").popup("close");
                             GameController.setInitStatus(false);
                         }
                },100);
                
         }catch(e){
             console.log("Error:",e);
         }
            							
	},
        shuffleWord = function(word){
            try{
                
                var half = [];
                half[0] = word.slice(0,(Settings.level/2));
                half[1] = word.slice((Settings.level/2));
                word = half[1].concat(half[0]);
                return word;
            
            }catch(e){
                
                console.log("Error:",e);
            }
            
        },
        newWord = function(where){
            
        try{
            Wuzzle_DA.pickWord(Settings.level);
            var word;
            setTimeout(function(){
                word = Wuzzle_DA.getWord();
                word = shuffleWord(word);
                if(where.row){
                    $("#row_"+where.row+" td").each(function(index,value){
                        $(value).html("<img src='images/characters/"+word[index]+".png' alt='"+word[index]+"' />");
                    });
                    checkBoardMatch();
                }else if(where.column){
                    
                    for(var i=0,len = Settings.level;i<len;i++){
                        $("#"+where.column+""+i).html("<img src='images/characters/"+word[i]+".png' alt='"+word[i]+"' />");
                    }
                    checkBoardMatch();
                }else if(where.diagonal && where.diagonal === "right"){
                    
                    for(var i=0,len = Settings.level;i<len;i++){
                        $("#"+valid_right_diagonal[i]).html("<img src='images/characters/"+word[i]+".png' alt='"+word[i]+"' />");
                      }
                    checkBoardMatch();
                }else if(where.diagonal && where.diagonal === "left"){
            
                    for(var i=0,len = Settings.level;i<len;i++){
                        $("#"+valid_left_diagonal[i]).html("<img src='images/characters/"+word[i]+".png' alt='"+word[i]+"' />");
                      }
                    checkBoardMatch();  
                }else{
                    throw Error("Invalid where argument for newWord function");
                }
                
            },50); 
        }catch(e){
                console.log("Error:",e); 
           }
           
        },
        checkBoardMatch = function(){
            
            // horizontal
            var row_num = 6;
            (function(){
                
                    var h_word = [];
                    for(var i=0,len = Settings.level;i<len;i++){
                            h_word.push($("#row_"+row_num+" td").eq(i).find("img").attr("alt"));
                        
                        }
               
                    Wuzzle_DA.checkWord(h_word.join(''),{"row" : row});
                    while(row_num>-1){
                        --row_num;
                        arguments.callee();
                    }
         
            })();
            
            // vertical up
            var col_num_up = 6;
            (function(){
                
                  var h_word = [];
                  for(var i=(Settings.level-1),len = -1;i>len;i--){
                        h_word.push($("#"+col_num_up+""+i).find("img").attr("alt"));
                    }
                 
                 Wuzzle_DA.checkWord(h_word.join(''),{"column" : column});
                 while(col_num_up>-1){
                        --col_num_up;
                          arguments.callee();
                    }
                
            })();
            
            // vertical down
            var col_num_down = 6;
            (function(){
                
                var h_word = [];
                for(var i=0,len = Settings.level;i<len;i++){
                        h_word.push($("#"+col_num_down+""+i).find("img").attr("alt"));
                    }
               
                Wuzzle_DA.checkWord(h_word.join(''),{"column" : column});
                while(col_num_down>-1){
                        --col_num_down;
                          arguments.callee();
                    }
                
            })();
            
            // diagonal right
         h_word = [];
             [].forEach.call(valid_right_diagonal,function(index){
                 h_word.push($("#"+index).find("img").attr("alt"));
             });
         Wuzzle_DA.checkWord(h_word.join(''),{"diagonal" : "right"});
         
         // diagonal left
         h_word = [];
             [].forEach.call(valid_left_diagonal,function(index){
                 h_word.push($("#"+index).find("img").attr("alt"));
             });
         Wuzzle_DA.checkWord(h_word.join(''),{"diagonal" : "left"});
            
        },
        checkMatch = function(id){
            
           var row = id.toString().charAt(1),
               column = id.toString().charAt(0);
       
         // horizontal
         var h_word = [];
         for(var i=0,len = Settings.level;i<len;i++){
             h_word.push($("#row_"+row+" td").eq(i).find("img").attr("alt"));
         }
         Wuzzle_DA.checkWord(h_word.join(''),{"row" : row});
         
         //vertical down
         h_word = [];
         for(var i=0,len = Settings.level;i<len;i++){
             h_word.push($("#"+column+""+i).find("img").attr("alt"));
         }
         
         Wuzzle_DA.checkWord(h_word.join(''),{"column" : column});
         
         //vertical up
         h_word = [];
         for(var i=(Settings.level-1),len = -1;i>len;i--){
             h_word.push($("#"+column+""+i).find("img").attr("alt"));
         }
         
         Wuzzle_DA.checkWord(h_word.join(''),{"column" : column});
         
         // diagonal right
         h_word = [];
         if(valid_right_diagonal.indexOf(id)){
             [].forEach.call(valid_right_diagonal,function(index){
                 h_word.push($("#"+index).find("img").attr("alt"));
             });
         }
         Wuzzle_DA.checkWord(h_word.join(''),{"diagonal" : "right"});
         
         // diagonal left
         h_word = [];
         if(valid_left_diagonal.indexOf(id)){
             [].forEach.call(valid_left_diagonal,function(index){
                 h_word.push($("#"+index).find("img").attr("alt"));
             });
         }
         Wuzzle_DA.checkWord(h_word.join(''),{"diagonal" : "left"});
         
        },
        moveTo = function(id_to,id_from){
              
               var $from = $("#"+id_from),
                   $to = $("#"+id_to),    
                   content = $from.html();
                   
                   $from.html("");
                   $to.html(content);
                   GameController.playSound(Settings.sounds[0]);
                   checkMatch(id_to);     
        },
        moveBlock = function(that){
            
           var id = parseInt($(that).attr("id")),
                    id_p10 = id + 10,
                    id_m10 = id - 10,
                    id_p1 = id + 1,
                    id_m1 = id - 1;
               
               
          if($("#"+id).html()!==""){  
              
               if(!$("#"+id_p10).hasClass("head") && $("#"+id_p10).html()===""){
                   moveTo((id_p10),id);
               }else if(!$("#"+id_m10).hasClass("head") && $("#"+id_m10).html()===""){
                   moveTo((id_m10),id);
               }else if(!$("#"+id_p1).hasClass("head") && $("#"+id_p1).html()===""){
                   moveTo((id_p1),id);
               }else if(!$("#"+id_m1).hasClass("head") && $("#"+id_m1).html()===""){
                   moveTo((id_m1),id);
               }else if(!$("#"+(id_m10+1)).hasClass("head") && $("#"+(id_m10+1)).html()===""){
                   moveTo((id_m10+1),id);
               }else if(!$("#"+(id_m10-1)).hasClass("head") && $("#"+(id_m10-1)).html()===""){
                   moveTo((id_m10-1),id);
               }else if(!$("#"+(id_p10+1)).hasClass("head") && $("#"+(id_p10+1)).html()===""){
                   moveTo((id_p10+1),id);
               }else if(!$("#"+(id_p10-1)).hasClass("head") && $("#"+(id_p10-1)).html()===""){
                   moveTo((id_p10-1),id);
               }else{
                   GameController.playSound(Settings.sounds[1]);
                   $("#"+id).effect("shake",20,1).effect("bounce");
               }
        } 
            
        },
      increaseScore = function(){
            score++;
      },                  
      checkEndOfGame = function(){
             
    	$(".highscorepopup, .finishpopup").popup({
    			overlayTheme : "a"
    		 });
    	 console.log("Checking for end of the game");
    	if(GameController.getTimeOut() === true ){
            
                Scores_DA.addScore(parseInt($.trim($("#score").html())));
            
    		// check for high score and then display the appropriate game over dialog
    		if(parseInt($.trim($("#score").html()))>Leaderboard.getHighScore()){
    		  $(".highscorepopup").popup("open");
    			}else {
    			  $(".finishpopup").popup("open");
    			    }
    			
    		}	
     };           
          return {
              getScore : getScore,
              setScore : setScore,
           getProgress : getProgress,
           setProgress : setProgress,
              populate : populate,
        checkEndOfGame : checkEndOfGame,
                  init : init,
             moveBlock : moveBlock,
               newWord : newWord,
         increaseScore : increaseScore,
       checkBoardMatch : checkBoardMatch
              
          };      
						
})();