
 	 var restarted = false;
 	 
 	$("#leaderboard").on({
 		pageinit : function(){
 			  Leaderboard.init();
                          Leaderboard.displayLeaderboard();
 		}
 	});
    
	 $(document).ready(function docReady(){
		 
                (function(){
                    
                        Scores.init();
                        Wuzzle.init();
                        
                        Settings.getFromLocal();
                        Settings.displayRecoveryQuestions();
                     
                                
                        $(".game_name").html(Settings.game_name);
                        // show the login panel if the user has chose to password protect the game
                        Settings.password_protect === "on" && sessionStorage['restarted'] !== "true" ?  GameController.showLoginPanel() : "";
                        console.log(Settings.password_protect);
		 
                        //$(".activeSocialHub").hide();
                        $("#edit_username").hide();
                    
                })();
                
                $(".chart_type").on("change",function(e){
                     
                      var $append_month = $("#append_month"),
                          $visualize_month = $("#visualize_month"),
                          $months = $("#months");
                      
                      switch(this.id){
                          case "linear_chart": $append_month.show();
                                               $visualize_month.show();
                                               $months.show();
                              break;
                          case "bar_chart":    $append_month.hide();
                                               $visualize_month.show();
                                               $months.show();
                              break;
                          case "radial_chart": $append_month.hide();
                                               $visualize_month.show();
                                                $months.show();
                              break; 
                          case "pie_chart":  $append_month.hide();
                                             $visualize_month.hide();
                                             $months.hide();
                                             Scores.drawPieChart();
                              
                              break; 
                              
                      }
                      Scores.setChartToCreate(this.id);
                });
                
                $("#improvement").on("scores_ready",function(e){
                        Scores.mapScores(e.scores);
                });
                
                $("#improvement").on("all_scores_ready",function(e){
                    var scores = e.scores;
                        var months_data = [],
                            months_scores = [],
                            total = 0;
                    scores.forEach(function(score){
                        
                        switch(score.month){
                            
                            case 0:  months_data[score.month] ? "": (months_data[score.month] = []);
                                     months_data[score.month].push(score);
                                     months_scores[score.month] ? (months_scores[score.month]+=score.score):(months_scores[score.month] = score.score);
                                     total+=score.score;
                                break;
                            case 1:  months_data[score.month] ? "": (months_data[score.month] = []);
                                     months_data[score.month].push(score);
                                     months_scores[score.month] ? (months_scores[score.month]+=score.score):(months_scores[score.month] = score.score);
                                     total+=score.score;
                                break;  
                            case 2:  months_data[score.month] ? "": (months_data[score.month] = []);
                                     months_data[score.month].push(score);
                                     months_scores[score.month] ? (months_scores[score.month]+=score.score):(months_scores[score.month] = score.score);
                                     total+=score.score;
                                break;
                            case 3:  months_data[score.month] ? "": (months_data[score.month] = []);
                                     months_data[score.month].push(score);
                                     months_scores[score.month] ? (months_scores[score.month]+=score.score):(months_scores[score.month] = score.score);
                                     total+=score.score;
                                break;
                            case 4:  months_data[score.month] ? "": (months_data[score.month] = []);
                                     months_data[score.month].push(score);
                                     months_scores[score.month] ? (months_scores[score.month]+=score.score):(months_scores[score.month] = score.score);
                                     total+=score.score;
                                break;
                            case 5:  months_data[score.month] ? "": (months_data[score.month] = []);
                                     months_data[score.month].push(score);
                                     months_scores[score.month] ? (months_scores[score.month]+=score.score):(months_scores[score.month] = score.score);
                                     total+=score.score;
                                break;
                            case 6:  months_data[score.month] ? "": (months_data[score.month] = []);
                                     months_data[score.month].push(score);
                                     months_scores[score.month] ? (months_scores[score.month]+=score.score):(months_scores[score.month] = score.score);
                                     total+=score.score;
                                break;
                            case 7:  months_data[score.month] ? "": (months_data[score.month] = []);
                                     months_data[score.month].push(score);
                                     months_scores[score.month] ? (months_scores[score.month]+=score.score):(months_scores[score.month] = score.score);
                                     total+=score.score;
                                break;
                            case 8:  months_data[score.month] ? "": (months_data[score.month] = []);
                                     months_data[score.month].push(score);
                                     months_scores[score.month] ? (months_scores[score.month]+=score.score):(months_scores[score.month] = score.score);
                                     total+=score.score;
                                break;
                            case 9:  months_data[score.month] ? "": (months_data[score.month] = []);
                                     months_data[score.month].push(score);
                                     months_scores[score.month] ? (months_scores[score.month]+=score.score):(months_scores[score.month] = score.score);
                                     total+=score.score;
                                break;
                            case 10: months_data[score.month] ? "": (months_data[score.month] = []);
                                     months_data[score.month].push(score);
                                     months_scores[score.month] ? (months_scores[score.month]+=score.score):(months_scores[score.month] = score.score);
                                     total+=score.score;
                                break;
                            case 11: months_data[score.month] ? "": (months_data[score.month] = []);
                                     months_data[score.month].push(score);
                                     months_scores[score.month] ? (months_scores[score.month]+=score.score):(months_scores[score.month] = score.score);
                                     total+=score.score;
                                break;
                            
                        }
                        
                    });
                    
                    console.log(months_data);
                    console.log(months_scores);
                    console.log(total);
                    Scores.drawPieChart(months_data,months_scores,total)
                });
                
                $("#months").on("change",function(e){
                    
                    if($(this).val())
                       Scores.setMonthIndex($(this).val());
                    
                });
                
                $("#visualize_month").on("vclick",function(e){
                    
                    Scores.visualizeMonth(false);
                    e.preventDefault();
                });
                
                $("#append_month").on("vclick",function(e){
                    
                    Scores.visualizeMonth(true);
                    e.preventDefault();
                });
                
	 	$("#popupLogin, #popupforgotpass, #exitpopup").popup({
	 		 overlayTheme : "a"
	 		});
		 
		 $("#exit").on("vclick",function exit(e){
			 $("#exitpopup").popup("open");
			 e.preventDefault();
			 e.stopPropagation(); 
		 });
		 
		 if(localStorage[Settings.game_name+"HighScore"]){
		        $("#highScore").html(localStorage[Settings.game_name+"HighScore"]);

		    }else {
		        localStorage['highScore'] = 0;
		        $("#highScore").html(localStorage[Settings.game_name+"HighScore"]);
		    }

		
	
	 $(".back").on("vclick",function back(e){
 	
		 if(GameController.getGameStarted()===true){
			 $("#newGame h3").html("Resume");
			 $("#newGame p").html("Continue where you left off.");
	     }
	
	     GameController.clearTimer();
	     Wuzzle.setProgress(false);
	     $.mobile.changePage("#index");
	     e.preventDefault();
	     e.stopPropagation(); 
	});
	 
	 $(".btnDismiss").on("vclick",function btnDismiss(e){
	     e.preventDefault();
	     e.stopPropagation();
	     
		 //$("#score").html("30");
		 GameController.setTimeOut(false);
                 sessionStorage['restarted'] = "true";
		 window.location = "index.html";
                 /*GameController.setGameRestarted(true);
                 $("#newGame h3").html("New Game");
	         $("#newGame p").html("Start a new Game.");
                 $.mobile.changePage("index.html");
             */
		 
	 });
	 
       $("#newGame").on("vclick",function newGame(e){
		
                if(GameController.getInitStatus()){
                    e.preventDefault();
                    return;
                }
                
               /* if(GameController.getGameRestarted()){
                    
                    Wuzzle.populate();
                    GameController.setGameRestarted(false);
                    
                    
                }
                */
                
		GameController.startGame();
		Wuzzle.setProgress(true);
		$.mobile.changePage("#game");
                
                e.preventDefault();
	        e.stopPropagation(); 
	});
        
        $("#instructions").on("vclick",function(e){
             if(GameController.getInitStatus()){
                    return;
                }
        });
        
        $("#settings").on("vclick",function(e){
             if(GameController.getInitStatus()){
                    return;
                }
        });
        
        $("#leaderboard").on("vclick",function(e){
             if(GameController.getInitStatus()){
                    return;
                }
        });
        
        $("#about").on("vclick",function(e){
             if(GameController.getInitStatus()){
                    return;
                }
        });
                
    $("#road").on("correct_row",function correct_row(e){
      
       GameController.playSound(Settings.sounds[2]);
       Wuzzle.increaseScore();
       Wuzzle.newWord({"row":e.row_number});
       
    });	
    
    $("#road").on("correct_column",function correct_column(e){
      
       GameController.playSound(Settings.sounds[2]);
       Wuzzle.increaseScore();
       Wuzzle.newWord({"column":e.column_number});
       
    });	
    
     $("#road").on("correct_diagonal",function correct_diagonal(e){
      
       GameController.playSound(Settings.sounds[2]);
       Wuzzle.increaseScore();
       Wuzzle.newWord({"diagonal":e.diagonal});
       
    });
    
    $("#road").on("words_ready",function words_ready(){
        
        setTimeout(function populateTimeout(){
            Wuzzle.populate();
        },500);
        
        
    });
    
    $("#game").on("database_opened",function(){
        
        Scores_DA.init();
        Leaderboard_DA.init();
        
    });
		
  $("#road td").on("vclick",function (e) {
	
            Wuzzle.moveBlock(this);
            e.preventDefault();
	    e.stopPropagation(); 
        });
		
 	$(".finishpopup, .highscorepopup").bind({ 
 		popupafteropen : function(){
			$(".newHighScore, .currentScore").html($("#score").html());
			
		},
		popupafterclose : function(){
			if($(this).hasClass("highscorepopup") && $.trim($(".name").val())===""){
				setTimeout(function(){
					 $(".highscorepopup").popup("open");
				 },100);
				}
			
		}
 	});

 	$("#exitYes").on("vclick",function (e) {
            
 		blackberry.app.exit();
              e.preventDefault();
	      e.stopPropagation(); 	
          });
 		
    $(".enterScore").on("vclick",function(e){
    	var err = false;
   	var name = $.trim($(".name").val());
	    if(name===""){
		$(".lblName").css("color","red");
		err = true;
	}else if(name.length>15){
		$(".newScoreErr").html("Your name needs to be less than 15 characters.");
		$(".name").val("");
		err = true;
	}
   	
     if(err){
		  
	 setTimeout(function(){
		$(".highscorepopup").popup("open");
		},100);
			 
   }else{
       
	GameController.setTimeOut(false);	 
	$(".highscorepopup").popup("close");
	Leaderboard.checkForHighScore(name,parseInt($("#score").html()));
	window.location = "index.html";
	sessionStorage['restarted'] = "true";
       /* GameController.setGameRestarted(true);
        $("#newGame h3").html("New Game");
	$("#newGame p").html("Start a new Game.");
        $.mobile.changePage("index.html");
        */
   }
		 
	e.preventDefault();
	e.stopPropagation();  
 });  
    
    
    
    $("#restart").on("vclick",function(e){
    	
    	 gameStarted = false;
    	 GameController.setGameStarted(true);
    	// $.mobile.changePage("#index");
    	 var event = $.Event("click");
    	 setTimeout(function(){
    		 $("#newGame").trigger(event); 
    	 
    	 },2000);
    	 e.preventDefault();
    });
    
		
});	