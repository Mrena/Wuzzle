
var displayErrMessage = function(message){
	
	$("#newSocialErr").html(message).css("color","red");
	
	
};
//show the menu when the social hub page is shown 
	$("#socialhub").on({
		 pageshow : function(){
			    GameController.showMenu();
			 },
		pageinit : function(){
				 $("#leaderboards").hide();
				 if(Settings.socialHub_active === "yes") 
					 {
					 $("#socialHubDescription").hide();
					 $(".activeSocialHub").show();
					 }
				 else 
					 $(".activeSocialHub").hide();
				 
			 } 
		});
	

	 
	 $("#acivateSocialHub").on("vclick",function(){
		 
		 var username = $.trim($("#newSocialHub_username").val());
		 if($.trim(username)==="")
			 {
			 displayErrMessage("Please enter a username.");
			 return;
			 }
		 else if(username.length>15)
			 {
			 displayErrMessage("Your username needs to be less than 15 characters.");
			 $("#newSocialHub_username").val("");
			 return;
			 }
		 
		 
		 objSocialHub.activate(username);
	
		 
	 });
	 
	 $(".acivateSocialHub").on("tap",function(){
		 
		 var ev = $.Event("click");
		 $("#btnMenu").trigger(ev);
	 });
	 
	 
	 $("#globalLeaderboard").on("vclick",function(){
		 $(".activeSocialHub").hide();
                 $("#leaderboards").show();
	     
	 });
	 
	 
	 $("#currentGameLead").on("vclick",function(){
		 var gameName = Settings.game_name;
		 objSocialHub.displayGameLeaderboard(gameName);
		 
	 });
	 
	 $("#socialGames").on("vclick",function(){
		 $(".activeSocialHub").hide();
		 $("#socialGamesPortal").html("The Social Games feature is still under development, please check back soon.").css("color","teal");
		 
	 });

	 
	 $("#hubBack").on("vclick",function(){
		 console.log("reverse clicked");
		 $("#leaderboards").hide();
		 $("#socialHubPortal").hide();
		 $(".activeSocialHub").show();
	   
	 });
	 
	