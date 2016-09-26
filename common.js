
	$(document).ready(function() {

		$("a.group").fancybox({
			'transitionIn'	:	'elastic',
			'transitionOut'	:	'elastic',
			'speedIn'		:	600, 
			'speedOut'		:	200, 
			'overlayShow'	:	false,
			'hideOnContentClick': true,
			'titleShow':true,
			'titlePosition' : 'inside'
		});
		
		
		
		
		
		
		$(".feedbackForm2").submit(function(){ // перехватываем все при событии отправки$
			//alert($("#form-type").val());
			var form = $(this); // запишем форму, чтобы потом не было проблем с this
			var error = false; // предварительно ошибок нет
			/*form.find('input, textarea').each( function(){ // пробежим по каждому полю в форме
				alert($(this).val());
				if ($(this).val() == '') { // если находим пустое
					alert('Заполните поле "'+$(this).attr('placeholder')+'"!'); // говорим заполняй!
					error = true; // ошибка
				}
			});*/
			
			//alert(error);
			
			
			
			if (!error) { // если ошибки нет
				var data = form.serialize(); // подготавливаем данные
				$.ajax({ // инициализируем ajax запрос
				   type: 'POST', // отправляем в POST формате, можно GET
				   url: '/bitrix/templates/profstile_pages/ajax/feedback2.php', // путь до обработчика, у нас он лежит в той же папке
				   dataType: 'json', // ответ ждем в json формате
				   data: data, // данные для отправки
				   beforeSend: function(data) { // событие до отправки
						form.find('input[type="submit"]').attr('disabled', 'disabled'); // например, отключим кнопку, чтобы не жали по 100 раз
					  },
				   success: function(data){ // событие после удачного обращения к серверу и получения ответа
						if (data['error']) { // если обработчик вернул ошибку
							alert(data['error']); // покажем её текст
						} else { // если все прошло ок
							form.find('input,textarea').not('input[type="submit"]').val('');
							alert('Письмо отправлено! Ждите звонка менеджера.'); // пишем что все ок
							$('#close_feedback').click();
						}
					 },
				   error: function (xhr, ajaxOptions, thrownError) { // в случае неудачного завершения запроса к серверу
						alert(xhr.status); // покажем ответ сервера
						alert(thrownError); // и текст ошибки
					 },
				   complete: function(data) { // событие после любого исхода
						form.find('input[type="submit"]').prop('disabled', false); // в любом случае включим кнопку обратно
					 }
							  
					 });
			}
			return false; // вырубаем стандартную отправку формы
		});		
		
		

			
			$('#submitbutton').click(function(){
			
				var form = $('#formmail'); // запишем форму, чтобы потом не было проблем с this
				var error = false; // предварительно ошибок нет
				form.find('input[type=text], input[type=file]').each( function(){ // пробежим по каждому полю в форме
					if ($(this).val() == '') { // если находим пустое
						alert('Заполните поле "'+$(this).attr('placeholder')+'"!'); // говорим заполняй!
						error = true; // ошибка
					}
				});			
			
				if (!error) {
					var formData = new FormData($('#formmail')[0]); //Получение данных из формы
					// В полсе url в ajax запросе запишите полный путь до php файла (в примере файл .html, .php лежали в одной папке (javascript находился в html файле))
					$.ajax({
						type: "POST",
						processData: false,
						contentType: false,
						url: '/bitrix/templates/profstile_pages/ajax/mail.php', 
						data: formData,
						success: function(result){
						//$('#formmail').remove();
						$('#formmail').find('input,textarea').not('input[type="submit"]').val('');
						$('#success').html(result);
						}
					});//закрытие ajax запроса, при успешной отправке выведет ответ от php файла
				}
			});

			
			var wrapper = $( ".file_upload" ),
			inp = wrapper.find( "input" ),
			btn = wrapper.find( "button" ),
			lbl = wrapper.find( "div" );			
			
			 var file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false;

				inp.change(function(){
					var file_name;
					if( file_api && inp[ 0 ].files[ 0 ] )
						file_name = inp[ 0 ].files[ 0 ].name;
					else
						file_name = inp.val().replace( "C:\\fakepath\\", '' );

					if( ! file_name.length )
						return;

					if( lbl.is( ":visible" ) ){
						lbl.text( file_name );
						//btn.text( "Выбрать" );
					}else
						btn.text( file_name );
				}).change();			



			
	}); 


		



//<script>    
$(document).ready(function () {  
  responsiveNav('.main-nav');
	
});


/*мобильное меню с перекрытием родительского блока*/
function responsiveNav(menu) {

  var nav = $(menu);
  var mobileNavWidth = $(nav).width();

  var hambNav = $('.mobile_nav');
  var mobileWrapper = $('.mobile-wrapper');

  $(hambNav).click(function () {
    navShow();
    $('#header-c-menu').css('display','none');
  });

  $(mobileWrapper).click(function () {
    navHide();
	if(($("html").width()) > 750){
	    $('#header-c-menu').css('display','block');
	}
  });

  function navShow() {
    nav.css({
      'left': '0'
    });
    mobileWrapper.css({
      'display': 'block'
    });   
  }

  function navHide() {
    nav.css({
      'left': -mobileNavWidth - 120 + 'px'
    });
    mobileWrapper.css({
      'display': 'none'
    });    
  }
}
/*модальное окно на кнопке "Получить рассчёт"*/
		$('.url_feedback').click(function() {
				if ($(this).attr('id') == "btn-calc")
				{
					$("#form-title").html("Закажите расчет от нашего менеджера:");
					$("#form-type").val("calc");
				}
				else
				{
					$("#form-title").html("Закажите звонок от нашего менеджера:");
					$("#form-type").val("call");
				}
				$('#shadow_feedback').show();
				$('#window_feedback').show();
			});
			$('#close_feedback').click(function() {
				$('#shadow_feedback').hide();
				$('#window_feedback').hide();
			});		
/*модальное окно на кнопке "подробнее об акции"*/		
		$('.sale_baner').click(function() {
				
				$('#shadow_feedback').show();
				$('#window_sale_baner').show();
				$('#close_sale_baner').css('display', 'block');
			});
        $('#close_sale_baner').click(function() {
				$('#shadow_feedback').hide();
				$('#window_sale_baner').hide();
				$('#close_sale_baner').css('display', 'none');
			});	

/*заказать рассчёт div.form*/
$(".feedbackForm").submit(function(){ // перехватываем все при событии отправки
			var form = $(this); // запишем форму, чтобы потом не было проблем с this
			var error = false; // предварительно ошибок нет
			form.find('input[type=text]').each( function(){ // пробежим по каждому полю в форме
				if ($(this).val() == '') { // если находим пустое
					alert('Заполните поле "'+$(this).attr('placeholder')+'"!'); // говорим заполняй!
					error = true; // ошибка
				}
			});
			if (!error) { // если ошибки нет
				var data = form.serialize(); // подготавливаем данные
				$.ajax({ // инициализируем ajax запрос
				   type: 'POST', // отправляем в POST формате, можно GET
				   url: '/bitrix/templates/profstile_pages/ajax/feedback.php', // путь до обработчика, у нас он лежит в той же папке
				   dataType: 'json', // ответ ждем в json формате
				   data: data, // данные для отправки
				   beforeSend: function(data) { // событие до отправки
						form.find('input[type="submit"]').attr('disabled', 'disabled'); // например, отключим кнопку, чтобы не жали по 100 раз
					  },
				   success: function(data){ // событие после удачного обращения к серверу и получения ответа
						if (data['error']) { // если обработчик вернул ошибку
							alert(data['error']); // покажем её текст
						} else { // если все прошло ок
							form.find('input,textarea').not('input[type="submit"]').val('');
							alert('Письмо отвравлено! Ждите звонка менеджера.'); // пишем что все ок
						}
					 },
				   error: function (xhr, ajaxOptions, thrownError) { // в случае неудачного завершения запроса к серверу
						alert(xhr.status); // покажем ответ сервера
						alert(thrownError); // и текст ошибки
					 },
				   complete: function(data) { // событие после любого исхода
						form.find('input[type="submit"]').prop('disabled', false); // в любом случае включим кнопку обратно
					 }
							  
					 });
			}
			return false; // вырубаем стандартную отправку формы
		});		
//</script>