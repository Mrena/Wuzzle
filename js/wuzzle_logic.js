// simpleMemory logic
 	
 	$("#game").on({
 		pagebeforeshow : function(){
 		  if (!Wuzzle.getProgress()) {
                        // starts the game and set the flag inProgress to true so clicking any of the td will reveal a picture
                        GameController.startGame();
                        Wuzzle.setProgress(true);
                    }
 		},
 		pagebeforehide : function(){
                    if (Wuzzle.getProgress()) {
                        GameController.pauseGame();
                        Wuzzle.setProgress(false);
                    }
 		}
 	});

    $("#saveHighScore").on("vclick",function(e) {
        saveScore();
        
        e.preventDefault();
    });
    function saveScore() {


      //  objLeaderboard.SetHighScore($("#name").val());
    }
    
    
  /*  var clickEvent = $.Event("click");
    $("#road td").on("vclick",function(e){

        $(this).trigger(clickEvent);
        e.preventDefault();
    });*/
    
    


        
        
    

  
        
        

    
    
    
    
    