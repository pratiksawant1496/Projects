         var score = 0;
        var gameover = false;
        var lastHole = 0;
        $(function () {
            $('#start').click(startGame);
            $('.game').on('click','.mole',hitMole);         //wacking a mole using hitmole() 
        });

        function hitMole(){
            //console.log($(this));
            $(this).parent().find('img').show();
            $(this).hide();
            $(this).parent().find('img').fadeOut(1000);
            score++;
            $('.score').text(score);
        }
        
        
        function startGame() {
            makeGameBoard();
            score = 0;
            $('.score').text(score);     //initially setting score to zero
            startMoles();
            gameover = false;
            setTimeout(function () {             //setting the timer 
                return gameend();
            }, 5000);
        }

        function startMoles() {
            var jumpUp = $('.hole' + randomHole() + '> .mole');
            var timer = Math.round(Math.random() *1000)+400;
            jumpUp.show();
            jumpUp.animate({           //popping up the mole
                top: '50px'
            }, 1000);
            //console.log(jumpUp);
            setTimeout(function () {         //setting timeout for popup
                    jumpUp.animate({
                        top: '250px'
                    }, 1000);
                if(!gameover) startMoles();
                },timer);
            }

            function randomHole() {                             //generating random hole
                var hole = Math.floor(Math.random() * $('.hole').length);
                if(hole ==lastHole){                    //prevent from having duplicate/same hole popup
                    return randomHole();
                }
                lastHole = hole;
                return hole;
                //console.log(hole);
            }

            function gameend() {
                gameover = true;
                $('.message').html('GAME OVER');           //displaying GAME OVER msg
            }

            function makeGameBoard() {                    //MAking gameBoard  
                var moles = 12;
                var html = ' ';                           //initially clearing up the game play area
                for (var mole = 0; mole < moles; mole++) {
                    html += '<div class="hole hole' + mole + '"><div class="mole"></div>';
                    html += '<img src="images/wack.png" class="wack"><div class="dirt"></div></div>';
                }
                $('.game').html(html);                     //dynamically creating gameBoard
            }