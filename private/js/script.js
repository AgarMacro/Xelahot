$(document).ready(function() {
    //Scroll back up button
	let btn = $('#scrollUpBtn');
    
	$(window).scroll(function() {
		if ($(window).scrollTop() > 300) {
			btn.addClass('show');
		} else {
			btn.removeClass('show');
		}
		
        /*var lastElem = document.getElementById('lastElem');
		var rect = lastElem.getBoundingClientRect();
		var curPageOffset = window.pageYOffset;
        
		if (curPageOffset > (curPageOffset)) {
			window.scrollTo(0, curPageOffset)
		}*/
	});

	btn.on('click', function(e) {
		e.preventDefault();
		$('html, body').animate({scrollTop:0}, '300');
	});

	//Catégories toggles
	$(".toggables").each(function() {
        $(this).on('click', function(event) {
            $(this).removeClass("active focus"); //fix click not working on iOS
            $(this).find('img').toggleClass("minus");
            $(this).find(".collapsable").stop().slideToggle(500);
        });
    });
    
    //My Buy A License button
    let buyNowBtn = $("#buyNowBtn");
    if(buyNowBtn){
        buyNowBtn.each(function() {
            $(this).on('click', function(event) {
                $(this).removeClass("active focus"); //fix click not working on iOS
                $(this).attr("disabled", true);
                showConfirmForm("extension 1");
            });
        });
    }
    
    var stopPropagation = function(evt) {
	    evt.stopPropagation();
    };
    
    function showConfirmForm(extension) {
        let wrapperConfirm = $(".wrapperConfirm");
        if (!wrapperConfirm) return;
        
        wrapperConfirm.fadeIn(function (){
            wrapperConfirm.css('display', 'flex');
            
            //Bind click events to close the section if we click outside of it
        	//Detect any click inside the Buy now section (dont close)
        	$('.elementConfirm').bind( "click", stopPropagation);
            $(document).bind( "click", closeFormReset);
        });
        
        $("#opacityDiv").fadeTo( "slow" , 0.25, function() {
            // Animation complete.
        });
    }
    
    let isAnimating = false;
    $("#loadingIcon").css('display', 'none');
	
	$("#closeElementConfirm").on('click', function(e) {
		closeFormReset();
	});
	
	$("#termsLink").on('click', function(e) {
		closeFormReset();
		
        let termsCard = $("#termsCard");
        if(!termsCard.find('img').hasClass("minus")){
            termsCard.find('img').toggleClass("minus");
            termsCard.find(".collapsable").slideToggle(500);   
        }
	});
	
	$("#buyNowBtnOffline").on('click', function(e) {
        alertSignIng();
	});

    function closeFormReset() {
        if(isAnimating) return;
        isAnimating = true;
        //Enable buttons
        buyNowBtn.each(function() {
            $(this).attr("disabled", false);
        });
        
        //Hide the form
        let wrapperConfirm = $(".wrapperConfirm");
        if (!wrapperConfirm) return;
        
        wrapperConfirm.fadeIn(function (){
            wrapperConfirm.css('display', 'none');
        });
        
        $("#opacityDiv").fadeTo( "slow" , 1, function() {
            // Animation complete. Unbind click function that closes the Buy now section
        	$('.elementConfirm').unbind( "click", stopPropagation);
            $(document).unbind( "click", closeFormReset);
            
            isAnimating = false;
        });
    }
    
    function alertSignIng(){
        $.alert({
            title: 'Successful',
            content: 'You must sign in to make a purchase!',
            type: 'green',
            typeAnimated: true,
            buttons: {
                close: {
                text: 'Ok',
                btnClass: 'btn-info',
                action: function(){
                }
            }
            }
        });
    }
});