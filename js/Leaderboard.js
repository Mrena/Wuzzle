var Leaderboard = (function Leaderboard() {
    var scores = Array(),
        names = Array(),
        highScore = 0,
        numberOfScores = 0,
        tempIndex,
        tempScore,

    init = function () {

        try {
            getScores();
            getNames();
            getCurrentHighScore();
            getNumberOfScores();
        } catch (ex) {

            console.log(ex + " in init()");
        }


    },

    getScores = function(){
        try {
            scores = JSON.parse(localStorage[Settings.game_name+'Scores']);

        }catch(ex){
            scores = Array(0,0,0,0,0);
            localStorage[Settings.game_name+'Scores'] = JSON.stringify(this.scores);
        }

    },

    getNames = function(){

        try {
            names = JSON.parse(localStorage[Settings.game_name+'Names']);
           
        }
        catch (ex) {
            names = Array("Teddy Roxpin","Ritz Raynolds","Hannibal King","Iman Omari","Sir Michael Rocks");
            localStorage[Settings.game_name+'Names'] = JSON.stringify(names);
            
        }


    },

   getCurrentHighScore = function(){
        try {
            $.each(scores, function(index, value){
                if (highScore < value)
                    highScore = value;
            });
            
        } catch (ex) {
            console.log(ex + " in getHighScore()");
        }
    },

    getNumberOfScores = function(){

        numberOfScores = scores.length;
    },
    
    setHighScore = function(name,scoreIndex){
        try {
         // we assume this.tempIndex and this.tempScore has been changed
            names[scoreIndex] = name;
            scores[scoreIndex] = tempScore;
            console.log(Settings.game_name+"Scores "+scores);
            console.log(Settings.game_name+"Names "+names);

            localStorage[Settings.game_name+'Scores'] = JSON.stringify(scores);
            localStorage[Settings.game_name+'Names'] = JSON.stringify(names);

            tempIndex = -1;
            tempScore = -1;
        } catch (ex) {
            console.log(ex + " in setHighScore()");
        }

    },
            
    getHighScore = function(){
        return highScore;
    },        
    checkForHighScore = function (name,score) {

			
		  var scoreIndex = 100; 
        try {
            $.each(scores,function(index,value){
                if (score > value & scoreIndex === 100){
                     scoreIndex = index;
                	}
				});

            if (scoreIndex !== 100) {
                tempScore = score;
                setHighScore(name,scoreIndex);

            }
            
        } catch (ex) {
            console.log(ex + " in checkHighScore()");
        }

    },

    displayLeaderboard = function(){
          
        try {
            $("#leaderb").html("");
            $("#leaderb").html("<div style='text-align:left;color:teal;'>High Score: "+scores[0]+"</div>");
            $("#leaderb").append("<center>");
            $("#leaderb").append("<div class'ui-grid-b'>");
            $("#leaderb").append("<div><span class'ui-block-a'>Name</span><span class='ui-block-b'>Number</span></div>");
            var count = 1;
	$.each(names, function(value, index) {
                $("#leaderb").append("<div><span class'ui-block-a'>" + index + "</span><span class='ui-block-b'>" + count + "</span></div>");
                count++;
            });
            $("#leaderb").append("</div>");
            $("#leaderb").append("</center>");

        } catch (ex) {
            console.log(ex + " in displayLeaderboard()");
        }
    };
    return {
        
                      init : init,
         checkForHighScore :  checkForHighScore,
        displayLeaderboard :  displayLeaderboard,
              getHighScore : getHighScore
        
    };
})();

