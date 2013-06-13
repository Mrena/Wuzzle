

var Scores = (function Scores(){
    
    var canvas,
        months_canvas,
        context,
        canvas_height,
        canvas_width,
        months_context,
        months_canvas_height,
        months_canvas_width,
        days_x_position = [],
        months_options = [],
        month_index = 0,
        zero_position = [],
        months_color = [],
        populated_months = [],
        largest_score = 0,
        scores_y_number = [],
        scores_y_coords = [],
        chart_to_create = "linear_chart", 
       
    drawGraph = function(){
        
         var stroke_position_y = 310,
             stroke_position_x = 680;
        
            context.save();
            context.fillStyle = "white";
            context.strokeStyle = "white";
     
            context.beginPath();
            context.moveTo(20,320);
            context.lineTo(680,320);
            context.stroke();
            context.closePath();
        
            context.beginPath();
            context.moveTo(20,320);
            context.lineTo(20,20);
            context.stroke();
            context.closePath();
        
            context.beginPath();
      while(stroke_position_y>10){ 
          
            context.moveTo(10,stroke_position_y);
            context.lineTo(30,stroke_position_y);
            context.stroke();
            stroke_position_y -= 10;
            
      }
            context.closePath();
        
            context.beginPath();
          var day = 31,
              count = 2;    
      while(stroke_position_x>10){ 
            context.moveTo(stroke_position_x,310);
            context.lineTo(stroke_position_x,330);
            if(count%2 === 0 && day > -1){
                context.fillText(day,stroke_position_x-3,340);
                days_x_position.push(stroke_position_x-3);
                if(day===0){
                    zero_position[0] = stroke_position_x-3;
                    zero_position[1] = 310;
                }
                --day;
            }
            count++;
            context.stroke();
            stroke_position_x -= 10;
            
      }
            days_x_position.reverse();
            context.closePath();
            context.restore();
        
        },
   clearDays = function(){
       
       context.clearRect(30,330,700,30);
   
       },         
    populateMonthsColor = function(){
            
                months_context.clearRect(0,0,months_canvas_width,months_canvas_height);
            
            var months_x_position = 10;
                months_context.save();
                months_color.forEach(function(month){
                
                months_context.fillStyle = month.color;
                months_context.strokeStyle = month.color;
                months_context.fillText(month.name.substr(0,3),months_x_position,25);
                months_x_position += 30;
                
            });
            
                months_context.restore();
            
    },            
    setMonthIndex = function(index){
                if(month_index>-1){
                   month_index = index;    
                }
    },        
    saveMonthColor = function(month,color){
       
        var months = Scores_DA.getMonths(),
            month_name = months[month];    
       
            months_color.push({
                "name" : month_name,
                "color" : color
            });
        
    },
    findLargestScore = function(scores){
        
        var temp_large = 0;
        for(var i=0,len = scores.length;i<len;i++){
            if(scores[i].score>temp_large){
                temp_large = scores[i].score;
            }
            
        }
        largest_score = temp_large;

    }, 
    mapYAxis = function(){
        
        var number_position_y = 310;
        
        // adjust spacing
        var spacing;
            if(largest_score<6){
                spacing = 36;
            }else if(largest_score<11){
                spacing = 31;
            }else if(largest_score<16){
                spacing = 26;
            }else if(largest_score<21){
                spacing = 21;
            }else if(largest_score<26){
                spacing = 16;
            }else if(largest_score<31){
                spacing = 11;
            }else if(largest_score<36){
                spacing = 6;
            }else{
                spacing = 4;
            }
           
           
            scores_y_number = [];
            scores_y_coords = [];
        var count = 0,
            score_number;    
            context.save();
            context.fillStyle = "white";
      while(largest_score > 0){ 
          
              score_number = ++count;
              context.fillText(score_number,4,number_position_y);
              scores_y_number.push(count);
              scores_y_coords.push(number_position_y);
            --largest_score;
              number_position_y -= spacing;
            
      }
            
            context.restore();
        
    },
    drawLinearChart = function(scores){
        
        var score_point_center;
        
         populated_months.push(scores[0].month);
        
            context.save();
        var rand_num1 = Math.floor(Math.random()*256),
            rand_num2 = Math.floor(Math.random()*256),
            rand_num3 = Math.floor(Math.random()*256);
    
            context.strokeStyle = "rgb("+[rand_num1,rand_num2,rand_num3].join(',')+")";
            context.fillStyle = "rgb("+[rand_num1,rand_num2,rand_num3].join(',')+")";
            saveMonthColor(scores[0].month,"rgb("+[rand_num1,rand_num2,rand_num3].join(',')+")");
        
            context.beginPath();
            context.lineWidth = 1;
            context.moveTo(zero_position[0],zero_position[1]);
        while(scores.length){
            
           var x = days_x_position[scores[0].day],
               y = 290;    
       
                 if(scores_y_number.indexOf(scores[0].score) >- 1){
                     y = scores_y_coords[scores_y_number.indexOf(scores[0].score)];
                 }    
          
                if(score_point_center){
                    context.moveTo(score_point_center.x,score_point_center.y);
                }
            
            context.lineTo(x,y); 
            context.stroke();
            context.arc(x,y,3,(Math.PI/180)*0,(Math.PI/180)*360,false);
            score_point_center = {
                "x": x+(3*0.5),
                "y": y+(3*0.5)        
                            };
            context.fill();
            scores.shift();
            
        }
            context.closePath();
            context.restore();
        
            populateMonthsColor();


    },       
    drawBarChart = function(scores){
        
            populated_months.push(scores[0].month);
           
                    context.save();
                    context.beginPath();
            while(scores.length){
                
                var rand_num1 = Math.floor(Math.random()*256),
                    rand_num2 = Math.floor(Math.random()*256),
                    rand_num3 = Math.floor(Math.random()*256);
    
                    context.strokeStyle = "rgba("+[rand_num1,rand_num2,rand_num3].join(',')+",0.5)";
                    context.fillStyle = "rgba("+[rand_num1,rand_num2,rand_num3].join(',')+",0.5)";
            
                var x = days_x_position[scores[0].day],
                    y = 200;
            
                    if(scores_y_number.indexOf(scores[0].score) >- 1){
                        y = scores_y_coords[scores_y_number.indexOf(scores[0].score)];
                 }   
            
                    context.fillRect(x-5,y,16,(canvas_height-y)-30);
                    scores.shift();
            }
            
            context.closePath();
            context.restore();
            
        
    },
    drawRadialChart = function(scores){
            
            
                        populated_months.push(scores[0].month);
                    var populated_x = [],
                        populated_y = [],
                        radius = [];
                        context.save();
                        context.beginPath();
                        context.fillStyle = "green";
            while(scores.length){
                var x = days_x_position[scores[0].day],
                    y = 200;
            
                    if(scores_y_number.indexOf(scores[0].score) >- 1){
                        y = scores_y_coords[scores_y_number.indexOf(scores[0].score)];
                 }   
                   
                    if(populated_x.indexOf(x)>-1 && populated_y.indexOf(y)>-1){
                         if(radius[populated_x.indexOf(x)]){
                                radius[populated_x.indexOf(x)] += 5;
                                context.arc(x,y,radius[populated_x.indexOf(x)],(Math.PI/180)*0,(Math.PI/180)*360,false);
                                    }else{
                                        context.arc(x,y,20,(Math.PI/180)*0,(Math.PI/180)*360,false);
                                        radius[populated_x.indexOf(x)] = 25;
                                    }
                    }else{
                            context.arc(x,y,20,(Math.PI/180)*0,(Math.PI/180)*360,false);
                    }
                    context.fill();
                    populated_x.push(x);
                    populated_y.push(y);
                    scores.shift();
            }
                    context.closePath();
                    context.restore();
            
    },  
   drawPieChart = function(months_aggregated,scores_aggregated,total){
       
       var pie_radius = 150;
       
         if(!months_aggregated)
            Scores_DA.getAllScores();
           else{
              
               // the scores are available, draw the pie chart
                context.save();
                context.clearRect(0,0,canvas_width,canvas_height);
                months_context.clearRect(0,0,months_canvas_width,months_canvas_height);
                context.beginPath();
                context.fillStyle = "#000000";
                context.arc(canvas_width/2,canvas_height/2,pie_radius,(Math.PI/180)*0,(Math.PI/180)*360,false);
                context.fill();
                context.closePath();
                context.restore();
                
                context.save(); 
                context.beginPath();
                context.fillStyle = "green";
                context.arc((canvas_width/2),(canvas_width*0.5)-((pie_radius+25)),5,(Math.PI/180)*0,(Math.PI/180)*360,false);
                context.fill();
                context.closePath();
                
                        context.beginPath();
                
                    var month_color = ["orange","green","red","yellow","blue","purple","maroon","pink","brown","#000000","navy","white"];
                
                scores_aggregated.forEach(function(score,index){
                    
                        context.fillStyle = month_color[index];
                        context.strokeStyle = month_color[index];
                    var percent = parseInt((score/total)*100),
                        pie_percent = parseInt((percent/pie_radius)*100);
                        context.moveTo((canvas_width/2),(canvas_width*0.5)-((pie_radius+25)));
                        context.lineTo((pie_percent)+(canvas_width/2),pie_radius);
                        context.stroke();
                        
                    
                        console.log("score",score,"percent",percent,"pie percent",pie_percent);
                        //context.arc(canvas_width/2,canvas_height/2,pie_radius,(Math.PI/180)*0,(Math.PI/180)*pie_percent,true);
                        //context.fill();
                    
                });
                
                        context.closePath();
                        context.restore();
                
           }
       
    },         
    mapScores = function(scores){
        
    if(populated_months.indexOf(scores[0].month)<0){
        
        if(populated_months.length===0){
            findLargestScore(scores);
            mapYAxis();
            
            switch(chart_to_create){
                case "linear_chart" : drawLinearChart(scores);
                        break;
                case "bar_chart" : drawBarChart(scores);
                        break;
                case "radial_chart": drawRadialChart(scores);
                              break;         
               }
            
            
            
        }else{
        
            switch(chart_to_create){
                case "linear_chart" : drawLinearChart(scores);
                        break;
               
               }
            
        
           }
        
        }

    },        
    visualizeMonth = function(append){
        
             if(!append){
                 
                  context.clearRect(0,0,canvas_width,canvas_height);
                  months_context.clearRect(0,0,months_canvas_width,months_canvas_height);
                  months_color = [];
                  populated_months = [];
                  drawGraph();
                  
              }
              Scores_DA.getScoreDataByMonth(month_index);

    },            
    populateMonths = function(){
            
        var months = Scores_DA.getMonths();
            months.forEach(function(month,index){
           
                months_options.push("<option value='",index,"'>",month,"</option>");
                if(index===(months.length-1)){
                    document.getElementById("months").innerHTML = "<option>Select Month(s)</option>"+months_options.join('');
                }
            
          });
        
      },  
    setChartToCreate = function(chart_name){
                chart_to_create = chart_name;
    },          
    init = function(){
        
            canvas = document.getElementById("visualize");
            canvas_height = canvas.height;
            canvas_width = canvas.width;
            context = canvas.getContext("2d");
        
             months_canvas = document.getElementById("months_color");
             months_canvas_height = months_canvas.height;
             months_canvas_width = months_canvas.width;
             months_context = months_canvas.getContext("2d");
        
            drawGraph();
            
        
       
    };
    return {
        
                 init : init,
        setMonthIndex : setMonthIndex,
       visualizeMonth : visualizeMonth,
            mapScores : mapScores,
     setChartToCreate : setChartToCreate,
     drawPieChart     : drawPieChart
      
    };
})();