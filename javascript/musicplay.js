var playPauseMusic= document.getElementById("myAudio");  
          
        function play() {  
            playPauseMusic.play();  
        }  
        function pause() {  
            playPauseMusic.pause();  
        }  

        playPauseMusic.loop = true;

        playPauseMusic.volume = 0.1;

