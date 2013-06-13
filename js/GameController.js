
var GameController = (function GameController() {
    var moments = 1,
        sec = 1,
        min = 1,
        timer,
        timeOut = false,
        init = true,
        tempSec = 0,
        tempMin = 0,
        gameStarted = false,
        gameLevelTimes = [[0,30,1],[0,50,1],[0,70,1]],
        currentLevelTime,
        soundStatus,
        music = document.createElement("audio"),
        effect = document.createElement("audio"),
        sound,
        enteredCorrectPassword = false,
        restarted = false,
	initializing = false,
        
        getInitStatus = function(){
            return initializing;
        },
        setInitStatus = function(status){
            if(typeof status === "boolean"){
                initializing = status;
            }
        },        
        refresher = function () {

        $.mobile.loadPage("#index");
        },

        resetTimer = function(t_min,t_sec,t_moments){
		min = t_min;
		sec = t_sec;
		moments = t_moments;
	},
        clearTimer = function(){
             clearInterval(timer);
        },
       setTimer = function(func,interval){
               timer = setInterval(func,interval);
              
       },         
       setTimeOut = function(bool_value){
            if(typeof bool_value === "boolean")
                    timeOut = bool_value;
                else
                    throw Error("Invalid timeout value. The value must be of type boolean.");
           },
       getTimeOut = function(){
            return timeOut;
        }, 
        setGameStarted = function(status){
            gameStarted = status;
        },        
        getGameStarted = function(){
            return gameStarted;
        },
        setGameRestarted = function(status){
            console.log(typeof status);
            if(typeof status ==="booleen")
                restarted = status;
                else
                    throw Error("Game restarted needs to be a boolean");
        },    
        getGameRestarted = function(){
            
            return restarted;
    
        },        
	setSound = function(){
	   if(soundStatus==="on"){
		// turn the sound on
		if(music.paused){
		     music.play();
		     music.loop = true;
                     
		  }
                  
                  sound = true;
			
		}else{
		// turn the sound off
                    if(!music.paused){  
                        music.loop = false;
                        music.pause();
                        
                   }
		sound = false;	
            }
		
        },
	
      adjustVolume = function(){
		
	// set the volume to different levels depending on the value of Settings.volume
	switch(Settings.music_volume){
	     case 1: Settings.music_volume = 0.2;
		break;
	     case 2: Settings.music_volume = 0.4;
		break;
	     case 3: Settings.music_volume = 0.6;
		break;
	     case 4: Settings.music_volume = 0.8;
		break;
	     case 5: Settings.music_volume = 1.0;
		break;
	     default : Settings.music_volume = 0.2;
		}
		
             music.volume = Settings.music_volume;
             
             switch(Settings.sound_volume){
	     case 1: Settings.sound_volume = 0.2;
		break;
	     case 2: Settings.sound_volume = 0.4;
		break;
	     case 3: Settings.sound_volume = 0.6;
		break;
	     case 4: Settings.sound_volume = 0.8;
		break;
	     case 5: Settings.sound_volume = 1.0;
		break;
	     default : Settings.sound_volume = 0.2;
		}
             
             effect.volume = (Settings.sound_volume);
	
	},
        playSound = function(sound_track){
            
           if(Settings.sound==="on"){
            effect.src = sound_track;
            if(!!!document.getElementById("effect")){
                $(["<div id='effect'>",effect,"</div>"].join('')).appendTo("body");
                console.log("Effect appended");
            }
            effect.play();
           }
            
        },     
	showLoginPanel = function(){
	    $("#popupLogin").popup("open");
	    restarted = false;
	},
        showMenu = function(){
	 
            var ev = $.Event("click");
            $("#menuBtn").trigger(ev);
		
	},
	hideMenu = function(){
	   $.mobile.changePage("#game");
	},
       applySettings = function(){
	  try{
	 	
     		//$("body").append(music);
                if(!!!document.getElementById("background_music")){
                        music.src = Settings.backgroundMusicFile;
                        $(["<div id='background_music'>",music,"</div>"].join('')).appendTo("body");
                        console.log("Background appended");
                }
	 
		var settings = JSON.parse(localStorage[Settings.game_name+'Settings']);
		currentLevelTime = gameLevelTimes[parseInt(Settings.difficulty)][1];
		soundStatus = Settings.music;
		commitSettings();
	}catch(ex){
                    
		localStorage[Settings.game_name+'Settings'] = JSON.stringify(Settings);
		currentLevelTime = gameLevelTimes[parseInt(Settings.difficulty)][1];
	    	soundStatus = Settings.music;
	    	commitSettings();
	    	console.log(ex);
	}
},

   commitSettings = function(){
        resetTimer(0,currentLevelTime,1);
	setSound();
    	adjustVolume();
    	//objPigLatin.resetGame();
	},

    pauseGame = function(){
        clearInterval(timer);
    },

    countUp = function(){
        displayTime();
        // decrease the player's score every time a second elapse
	  try{
             if(parseInt(tempSec)<parseInt(sec) || tempMin < min){
             	tempSec = sec;
             	tempMin = min;
             	document.getElementById("score").innerHTML = parseInt(document.getElementById("score").innerHTML)-1;
	}
    }catch(ex){
	console.log(ex);
	console.log("score "+document.getElementById("score").innerHTML);
	console.log("tempSec "+tempSec);
	console.log("sec "+sec);
}

    moments++;
    if (moments === 60) {
            moments = 0;
            sec++;
         if (sec === 60) {
                sec = 0;
                min++;

            }

       }

  },
   countDown = function(){
		
	displayTime();
	moments--;
	if(moments === 0){
		moments = 60;
		sec--;
		// decrease the player's score every time a second elapse
                Wuzzle.setScore(Wuzzle.getScore()-1);
	        $("#score").get(0).innerHTML = Wuzzle.getScore();
		  
 	       if(sec === 0){
		    sec =60;
         	    min--;
         	}

   }
	if(min===-1){
	     min =0;
	     sec =0;
	     moments = 0;
	     displayTime();
	     console.log("Time up");
             console.log(timer);
	     clearInterval(timer);
             console.log("Timer cleared");
             console.log(timer);
	     timeOut = true;
	     setTimeout(resetTimer(0,30,1),2000);
	     gameStarted = false;
	     Wuzzle.setProgress(false);
	     Wuzzle.setScore(30);
	     Wuzzle.checkEndOfGame();
								 
	}
},

    displayTime = function () {

        if (min < 10){
            min = "0" + min.toString();
        }
        if (sec < 10){
            sec = "0" + sec.toString();
        }
        if (moments < 10){
            moments = "0" + moments.toString();
        }

        $("#timer").html(min + ":" + sec + ":" + moments);
        if (min < 10)
            min = parseInt(min.charAt(1));
        if (sec < 10)
            sec = parseInt(sec.charAt(1));
        if (moments < 10)
            moments = parseInt(moments.charAt(1));

    },
    
    validateHighScorePopup = function(){
    	
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
    		  
        timeOut = false;	 
    	$(".highscorepopup").popup("close");
    	Leaderboard.checkForHighScore(name,parseInt($("#score").html()));
    	$.mobile.changePage("#index");
    }
    	
 },
    
 validateLogin = function(){
    	
    if($.trim($("#loginPassword").val()) === Settings.password){
            $.mobile.changePage("#index");
            $("#popupLogin").popup("close");
			 
	 }else{
	     setTimeout(function(){ 
                    $("#popupLogin").popup("open");
                    $("#passwordErr").html("Incorrect password").css("color","red");
                    $("#loginPassword").val("").focus();
		},100); 
	}
    	
    },
    
    exitGame = function(){
    	blackberry.app.exit();
    },

     startGame = function () {
            gameStarted = true;
            sessionStorage['lastCorrect'] = JSON.stringify({"coord1" : "1","coord2" : "2"});				
            //this.applySettings();
            setTimer(countDown, 100); 
            
            
    	};
      return {
          startGame : startGame,
     setGameStarted : setGameStarted,
     getGameStarted : getGameStarted,
          pauseGame : pauseGame, 
          exitGame  : exitGame,        
         setTimeOut : setTimeOut,
         getTimeOut : getTimeOut,
         setTimer   : setTimer,
         clearTimer : clearTimer,
      applySettings : applySettings,
       adjustVolume : adjustVolume,
           setSound : setSound,
          playSound : playSound,
      validateLogin : validateLogin,
      getInitStatus : getInitStatus,
      setInitStatus : setInitStatus,
     showLoginPanel : showLoginPanel,
     setGameRestarted : setGameRestarted
 
      };
})();
		