jQuery(function ($) {
	// Load dialog on page load
	//$('#basic-modal-content').modal();

	// Load dialog on click
	$('#wrapper .singlebasic').click(function (e) {
		$('#single-modal-content').modal();

		return false;
	});
	
	$('#wrapper .multibasic').click(function (e) {
		$('#multi-modal-content').modal();

		return false;
	});
	
	$('#wrapper .savedbasic').click(function (e) {
		$('#saved-modal-content').modal();

		return false;
	});
	
	$('#wrapper .availnextbtn').click(function (e) {
		$('#summary-modal-content').modal();

		return false;
	});
});