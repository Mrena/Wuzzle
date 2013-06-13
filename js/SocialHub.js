
var SocialHub = function(){
	
	
	
	this.activate = function(username){
		
		
		$.get("socialhubPHP/adduser.php?username="+username,function(data){
			 console.log("returned data "+data);
			 var msg = "";
			  
			 data = parseInt(data);
			     if(data==0){
			    	msg = "Please enter username.";
			    	 }
			    else if(data==2){
			    	msg = "Username already exists.";
			    	$("#newSocialHub_username").val("");
			    	}
			    else if(data==3) 
	                  msg = "There was an error. Please try again.";
			    else{
			    	Settings.socialHub_active = "yes";
			    	$("#socialHubDescription").hide();
			    	$(".activeSocialHub").show();
			    	
			    	}
			     
			     
			     displayErrMessage(msg);	
		 });
		 
		
		
	}
	
	this.displayGameLeaderboard = function(gameName){
		
		$.get("socialHubPHP/getleaders.php?leadertype=gameleaders&game_name="+gameName,function(data){
			console.log(data);
			data = $.trim(data);
			if(data=="3")
				$("#leaderDisplay").html("Could not display the game's global leaderboard. Please try again later.").css("color","red");
			else
				{
				$("#leaderDisplay").html("Display Leaderboard.");
				
				}
			
		});
		
	}
	
	this.displayLeaders = function(){
	
		$.get("socialHubPHP/getleaders.php?leadertype=topleaders",function(data){
			console.log(data);
			if(data==="3")
				$("#leaderDisplay").html("Could not display the game's global leaderboard. Please try again later.").css("color","red");
			else
				{
				data = JSON.parse(data);
				$("#leaderDisplay").html("Display Leaderboard.");
				
				}
			
		});
		
	}
	
};