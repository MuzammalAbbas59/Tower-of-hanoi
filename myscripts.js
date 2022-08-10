$(document).ready(function () {
    //declared global variables for comparisons
    var parent1;
    var newchild;
    var totaldisks = $('#pole1 div').length;
    var maxTicks = 10;
    var tickCount = 0;
    var score = 0;
    var movecount = 0;


    assign_values_to_disks();
    drop();
    drag();
    reload_page();
    allow_touch_movements();
    
    var updateTime = function () {
        if (tickCount >= maxTicks) {
            end_the_game();
        }
        document.getElementById("counter").innerHTML = (maxTicks - tickCount + " s ");
        tickCount++;
    };
    var myInterval = setInterval(updateTime, 1000);


    function end_the_game(event,ui){
        clearInterval(myInterval);
        modal_show_score();
        model_title_gameover();
        $("#myModal").modal("show");
        if ($('body').click(function(e,ui){
            e.preventDefault();
            e.stopPropagation();
        }));
    }
    
   
    function assign_values_to_disks() {
        for(let i=1; i<=9; i++) $(`#disk${i}`).val(i);
    }

    function updatemoves() {
        movecount++;
        document.getElementById("moves").innerHTML = movecount;
    }

    function updatescores() {
        score = score + 2;
        document.getElementById("score").innerHTML = score;
    }

    function declare_winner() {
        score = score + 20;
        document.getElementById("score").innerHTML = score;
        win_the_game();
    }

    function win_the_game(){
            clearInterval(myInterval);
            modal_show_score();
            model_title_winner();
            $("#myModal").modal("show");
            if ($('body').click(function(){
                location.reload(true);
            }));     
    }

    function model_title_winner(){
        document.getElementById("modal-title-id").innerHTML = ("WINNER");   
    }

    function model_title_gameover(){
        document.getElementById("modal-title-id").innerHTML = ("Game Over");   
    }
    
    function modal_show_score(){
      document.getElementById("modal_body_data").innerHTML = ("YOUR SCORES ARE = "+score);  
    }

    function drag(event, ui) {
        $(".disks").draggable({
            helper: 'clone',
            start: function () {
                parent1 = $(this).parent().attr('id');
                newchild = $(this).val();
                if ($(this).attr('id') == $("#" + parent1 + " div:nth-last-child(2)").attr("id")) {
                    hide_disk_when_grabbed();
                    ($(this).css("cursor", "grabbing"));
                    return true;
                }
                else
                    return false;
            }
        });
    }

    function hide_disk_when_grabbed() {
        $("#" + parent1 + " div:nth-last-child(2)").css("visibility", "hidden");

    }

    function drop() {
        $('#pole1').droppable({
            drop: function (event, ui) {
                var lastchild = ($('#pole1 div:last-child').val());
                if ((($('#pole1 div').length) == 0) || (newchild < lastchild)) {
                    ui.draggable.css("visibility", "visible");
                    ui.draggable.appendTo($(this));
                    update_child_data();
                }
            }
        })

        $('#pole2').droppable({
            drop: function (event, ui) {
                var lastchild = ($('#pole2 div:last-child').val());
                if ((($('#pole2 div').length) == 0) || (newchild < lastchild)) {
                    ui.draggable.css("visibility", "visible");
                    ui.draggable.appendTo($(this));
                    update_child_data();
                }
            }
        })

        $('#pole3').droppable({
            drop: function (event, ui) {
                var lastchild = ($('#pole3 div:last-child').val());
                if ((($('#pole3 div').length) == 0) || (newchild < lastchild)) {
                    ui.draggable.css("visibility", "visible");
                    ui.draggable.appendTo($(this));
                    update_child_data();
                }
            }
        })

        not_dropped_on_poles();

    }

    function not_dropped_on_poles() {
        $("body").droppable({

            drop: function (event, ui) {
                ui.draggable.css("visibility", "visible");

            }
        });
    }

    function update_child_data() {
        updatemoves();
        updatescores();
        checkwin();
    }

    function checkwin() {
        var winner = [];
        if ($('#pole3 div').length == totaldisks) {
            count = 0;
            $('#pole3 div').each(function () {
                winner.push($(this).val());
            });

            for (var i = winner.length - 1; i >= 1; i--) {
                if (winner[i] > winner[i - 1]) {
                    count++;
                }
            }
            if (count == 0) {
                declare_winner();
            }
        }
    }

    function reload_page() {
        $(".restart_button").click(function () {
            location.reload(true);
        });
    }

    function touchHandler(event) {
        var touch = event.changedTouches[0];
    
        var simulatedEvent = document.createEvent("MouseEvent");
            simulatedEvent.initMouseEvent({
            touchstart: "mousedown",
            touchmove: "mousemove",
            touchend: "mouseup"
        }[event.type], true, true, window, 1,
            touch.screenX, touch.screenY,
            touch.clientX, touch.clientY, false,
            false, false, false, 0, null);
    
        touch.target.dispatchEvent(simulatedEvent);
       
    }
    
    function allow_touch_movements() {
        document.addEventListener("touchstart", touchHandler, true,{passive:false});
        document.addEventListener("touchmove", touchHandler, true,{passive:false});
        document.addEventListener("touchend", touchHandler, true,{passive:false});
        document.addEventListener("touchcancel", touchHandler, true,{passive:false});
    }
});