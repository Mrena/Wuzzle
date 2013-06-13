$("#settings").on({
		 pagehide : function(){
			 
			 Settings.music = $("#music").val();
			 Settings.music_volume = parseInt($("#music_volume").val());
                         Settings.sound = $("#sound").val();
			 Settings.sound_volume = parseInt($("#sound_volume").val());
			 Settings.force_feedback = $.trim($("#force_feedback").val());
			 Settings.password_protect = $.trim($("#password_protect").val());
			 Settings.socialHub_username = $.trim($("#socialHub_username").val());
			 Settings.password = $.trim($("#password").val());
			 Settings.question = $.trim($("#password_recovery_q").val());
			 Settings.answer = $.trim($("#answer").val());
			 
			 Settings.difficulty = $("#difficulty").val() == undefined ?  0 : $("#difficulty").val();
			 
			 Settings.saveToLocal();
			 GameController.applySettings();	
			
			 
			 
	 },
	 
	    pageinit : function(){
                    Settings.prepopulate();
		    Settings.socialHub_active === "no" ? $("#edit_username").hide() : $("#edit_username").show();
		    Settings.game_has_levels === "no" ? $("#levels").hide() : $("#levels").show();
		 
	       }
	 }); 

   $("#volume, #sound").on("slidestop",function(){
	   console.log("sound settings changed");
	   Settings.sound = $("#sound").val();
	   Settings.volume = $("#volume").val();
	   
	   GameController.adjustVolume();
	   GameController.setSound();
	   
    });


     //when the user clicks the signIn button on the login popup, we check if the password is
	// correct and if it we redirect the user to the index page, otherwise we show the popup again, 
	// this time with an error message
	$("#signIn").on("vclick",function(e){
		GameController.validateLogin();
		e.preventDefault();
		
	});
	var forgotClicked = false;
	var forgotBackClicked = false;
	$("#popupLogin, #popupforgotpass").on({
		  popupafterclose : function(){
			    if($(this).attr("id") === "popupLogin" && !(forgotClicked) || $(this).attr("id") === "popupforgotpass" && !(forgotBackClicked)){
			    	GameController.validateLogin();
			    }   
		  }
	});
	
	
	$("#forgotPassword").on("vclick",function(e){
	 		forgotClicked = true;
	 		$.mobile.changePage("#index");
	 		$("#popupLogin").popup("close");
	 		
	 		setTimeout(function(){
	 		    $("#popupforgotpass").popup("open");
	 		    $("#recovery_answer").focus();
	 		},100);
	 		forgotClicked = false;
	 		e.preventDefault();
	 	});
	
	$("#passwordRecoveryBack").on("vclick",function(e){
	 		forgotBackClicked = true;
	 		$.mobile.changePage("#index");
	 		
	 		setTimeout(function(){ 
				$("#popupLogin").popup("open");
				$("#loginPassword").val("").focus();
				},100);
	 		
	 		e.preventDefault();
	 	});
	

  $("#showPassword").on("vclick",function(e){
	 		
	 if($("#recovery_question").val() === Settings.question && $("#recovery_answer").val() === Settings.answer){
	 	console.log(Settings.password);
	 	$("#passwordNote").html("Your password is: "+Settings.password).css("color","teal");
	 	$("#recovery_answer").val("");
	 	
      }else{
	 $("#passwordNote").html("Incorrect answer or question<br />").css("color","red");
	 $("#recovery_answer").val("");
      }
	 		
     e.preventDefault();
   });
