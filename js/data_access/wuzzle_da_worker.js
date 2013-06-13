

addEventListener("message",function(data){
    //data = JSON.parse(data);
    //console.log(data);
    if(data.words){
        var db = data.db,
            words = data.words,
            words_len = words.length;
            word_len;
        words.forEach(function(word,index){
            word_len = word.trim().length;
            if(word_len>1){
                db.transaction(function(tx){
                    var time = +Date;
                    tx.executeSql("INSERT INTO Words(word_id,word,word_length) VALUES(?,?,?)",[time,word,word_len],function(tx,result){
                      //  console.log("Adding word...");
                        if(index===words_len){
                            postMessage({"complete":true});
                        }
                    },function(tx,e){
                        //console.log("Error adding word ",e);
                    });
                });
            }
        });
        
    }
    
},false);