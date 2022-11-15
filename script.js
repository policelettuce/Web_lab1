$(document).ready(function(){

	var x, y, r;

	$('input').on('focus change', function(){
		$('#error').html("");
	});

	$(".checkbox_wrapper input[type=checkbox]").click(function(){
		$(".checkbox_wrapper input[type=checkbox]").not(this).prop("checked", false);
	});

	function isInt(n) {
		return !isNaN(parseInt(n)) && isFinite(n);
	}

	function isFloat(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

	function inRange(n, start, stop) {
		return parseFloat(n) >= parseFloat(start) && parseFloat(n) <= parseFloat(stop);
	}

	function checkX(){
		x = $('select[name="x"]').val();
		return isInt(x) ? inRange(x, -5, 3) : false;
	}
	function checkY(){
		y = $('input[name="y"]').val().replace(",", ".");
		return isFloat(y) ? inRange(y, -3, 3) : false;
	}
	function checkR(){
		r = $('input[name="r"]').val()
		return isFloat(r) ? inRange(r, 1, 3) : false;
	}


	function checkInput(){
		return checkX() && checkY() && checkR();
	}



	function appendRow(id, data){
		$('#result_table tbody').append(`
			<tr class="${data.hit ? "hit" : "lose"}">
			<td>${id}</td>
			<td>${data.X}</td>
			<td>${data.Y}</td>
			<td>${data.R}</td>
			<td>${data.hit ? "Да" : "Нет"}</td>
			<td>${data.current_time}</td>
			<td>${(new Number(data.script_runtime * 1000)).toPrecision(3) + " ms"}</td>
			</tr>
			`);
	}


	$("#check_form").on('submit', function(e){
		e.preventDefault();
		if(checkInput()){
			$.ajax({
				type:"POST",
				url:"check.php",
				data: {
					"x": x,
					"y": y,
					"r": r,
				},
				success: function(response){
					localStorage.setItem(localStorage.length, JSON.stringify(response));
					appendRow(localStorage.length, response);
				},
				dataType:"json"
			});
		} else {
			$("#check_form").trigger('reset');
			$("#error").html("Проверьте корректное заполнение всех полей формы");
		}
	});


	function drawTable(){
		for (let i = 0; i < localStorage.length; i++){
			appendRow(i+1, JSON.parse(localStorage.getItem(i)));
		}
	}

	$("#button_reset").on('click', function(e){
		localStorage.clear();
		$('#result_table tbody tr:not(:first-child)').html("");
	});


	drawTable();


});