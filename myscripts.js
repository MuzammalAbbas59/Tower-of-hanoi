$(document).ready(function () {
	//declared global variables for comparisons
	var parent1;
	var newchild;
	var totaldisks = $('#pole1 div').length;
	var score = 0;
	var movecount = 0;
	var maxTicks = 200;
	var tickCount = 0;

	assign_values_to_disks();
	dropabble_poles();
	draggable_disks();
	reload_page_onclick();
	allow_touch_movements();
	
	function updateTime() {
		if (tickCount >= maxTicks) {
			end_the_game();
		}
		$("#counter").html(maxTicks - tickCount + " s ");
		tickCount++;
	};
	var myInterval = setInterval(updateTime, 1000);

	function end_the_game() {
		clearInterval(myInterval);
		$("#modal_body_data").html("YOUR SCORES ARE = " + score);
		$("#modal-title-id").html("Game Over");
		$("#myModal").modal("show");
	}

	function assign_values_to_disks() {
		for (let i = 1; i <= 9; i++) 
		$(`#disk${i}`).val(i);
	}

	function declare_winner() {
		score = score + 20;
		$("#score").html(score);
		$("#modal_body_data").html("YOUR SCORES ARE = " + score);
		$("#modal-title-id").html("WINNER");
		$("#myModal").modal("show");
	}

	function draggable_disks() {
		$(".disks").draggable({
			helper: 'clone',
			start: function () {
				parent1 = $(this).parent().attr('id');
				newchild = $(this).val();
				second_last=$("#" + parent1 + " div:nth-last-child(2)");
				if ($(this).attr('id') == second_last.attr("id")) {
					second_last.css("visibility", "hidden");
					($(this).css("cursor", "grabbing"));
					return true;
				}
					return false;
			}
		});
	}

	function dropabble_poles() {
		for (let i = 1; i <= 3; i++) {
			$(`#pole${i}`).droppable({
				drop: function (event, ui) {
					lastchild = $(`#pole${i} div:last-child`).val();
					if ((($(`#pole${i} div`).length) == 0) || (newchild < lastchild)) {
						ui.draggable.css("visibility", "visible");
						ui.draggable.appendTo($(this));
						update_score_moves();
					}
				}
			})
		}
		not_dropped_on_poles();
	}

	function not_dropped_on_poles() {
		$("body").droppable({
			drop: function (event, ui) {
				ui.draggable.css("visibility", "visible");
			}
		});
	}

	function update_score_moves() {
		movecount++;
		$("#moves").html(movecount);
		score = score + 2;
		$("#score").html(score);
		checkwin();
	}

	function checkwin() {
		if ($('#pole3 div').length == totaldisks) {
			declare_winner();
		}
	}

	function reload_page_onclick() {
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
		document.addEventListener("touchstart", touchHandler, true, { passive: false });
		document.addEventListener("touchmove", touchHandler, true, { passive: false });
		document.addEventListener("touchend", touchHandler, true, { passive: false });
		document.addEventListener("touchcancel", touchHandler, true, { passive: false });
	}
});