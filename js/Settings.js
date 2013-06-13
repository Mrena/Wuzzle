
var Settings = {
	game_name : "Wuzzle",	
	music : "on",
	music_volume : 0.6,
        sound : "on",
	sound_volume : 0.6,
	backgroundMusicFile : "./media/wallewal.wav",
        sounds : ["./media/move.wav","./media/not_movable.wav","./media/match.wav"],
	difficulty : 7,
        level : 7,
	force_feedback : "off",
	socialHub_active : "no",
	socialHub_username : "",
	edit_username : "no",
	game_has_levels : "no",
	level_caption : Array("Level 1","Level 2","Level 3","Level 4","Level 5"),
	level_values : Array(5,10,15,20,25),
	password_protect : "no",
	password : "",
	question : "",
	answer : "",
	recovery_questions : Array("What is the name of your favourite animal?","What is the name of the person you look up to?","What is the name of you first phone?"),
	recovery_q_value : Array("animal","person","phone_make"),
	setPasswordProtect : function(status){
		if(status === "on" || status === "off"){
		      Settings.password_protect = status;
		      Settings.saveToLocal();
			}
		     
	},
	getPasswordProtect : function(){
		return Settings.password_protect;
	},
	saveToLocal : function(){
		var jsonSettings = {
				music : Settings.music,
				music_volume : Settings.music_volume,
                                sound : Settings.sound,
				sound_volume : Settings.sound_volume,
				difficulty : Settings.difficulty,
				force_feedback : Settings.force_feed,
				socialHub_username : Settings.socialHub_username,
				edit_username : Settings.edit_username,
				game_has_levels : Settings.game_has_levels,
				password_protect : Settings.password_protect,
				password : Settings.password,
				socialHub_active : Settings.socialHub_active,
				question : Settings.question,
				answer : Settings.answer
		       };
		localStorage[Settings.game_name+'Settings'] = JSON.stringify(jsonSettings);
		
		
	},
	getFromLocal : function(){
		if(!!localStorage[Settings.game_name+'Settings']){
  	  
  	 var tempSettings = JSON.parse(localStorage[Settings.game_name+'Settings']);
                        Settings.music = tempSettings.music;
                        Settings.music_volume = tempSettings.music_volume;
                        Settings.sound = tempSettings.sound;
                        Settings.sound_volume = tempSettings.sound_volume;
                        Settings.difficulty = tempSettings.difficulty;
                        Settings.force_feedback = tempSettings.force_feedback;
		 	Settings.password_protect = tempSettings.password_protect;
		 	Settings.socialHub_active = tempSettings.socialHub_active;
		 	Settings.socialHub_username = tempSettings.socialHub_username;
		 	Settings.edit_username = tempSettings.edit_username,
			Settings.game_has_levels = tempSettings.game_has_levels,
		 	Settings.password = tempSettings.password;
		 	Settings.question = tempSettings.question;
		 	Settings.answer = tempSettings.answer;
  	  }
		
	},
	prepopulate : function(){
		 
		 Settings.prepopulateLevels();
		 Settings.prepopulateVolume();
		 $("#force_feedback").val(Settings.force_feedback);
		 $("#password_protect").val(Settings.password_protect);
		 $("#socialHub_username").val(Settings.socialHub_username);
		 $("#password").val(Settings.password);
		 $("#answer").val(Settings.answer);
		
	},
	prepopulateVolume : function(){
		
		var tempVolume=0.2; 
		
		switch(Settings.volume){
			case 0.2: tempVolume = 1;
			break;
			case 0.4: tempVolume = 2;
			break;
			case 0.6: tempVolume = 3;
			break;
			case 0.8: tempVolume = 4;
			break;
			case 1.0: tempVolume = 5;
			break;
			default : tempVolume = 1;
		}
		
		 $("#volume").val(tempVolume);
		
		
	},
	prepopulateSound : function(){
		
		if(Settings.music === "on"){
			$("#musicControl").html("<option value='on'>On</option><option value='off'>Off</option>");
		}
		$("#music").val(Settings.music);
                
                if(Settings.sound === "on"){
			$("#soundControl").html("<option value='on'>On</option><option value='off'>Off</option>");
		}
		$("#sound").val(Settings.sound);
	},
	prepopulateLevels : function(){
			    $.each(Settings.level_caption,function(index,value){
				$("#level").append("<option value='"+Settings.level_values[index]+"'>"+value+"</option>");
			});
	},
	displayRecoveryQuestions : function(){
		
		$.each(Settings.recovery_questions,function(index,value){
			$("#password_recovery_q, #recovery_question").append("<option value='"+Settings.recovery_q_value[index]+"'>"+value+"</option>");
		});
		
	}
	
};