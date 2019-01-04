/// функция для гирлянды (и музыки)
garlandCount = 0;

function draw() {
	
	music = document.getElementById('player');
	garlandCount ++; /// счетчик для ограничения нажатий на первую кнопку
	
	
	/// если меньше 5 раз нажимали, то выполняем переключения
	if (garlandCount <= 5) {
		
		/// включаем и выключаем музыку в зависимости от надписи на кнопке
		/// и не забываем поменять на кнопке надпись
		if ($('#drawLights').text() == 'Нарядить ёлку и включить музыку') {
			music.play();
			$('#drawLights').text('Убрать гирлянду и остановить музыку');
		} else {
			music.pause();
			music.currentTime = 0;
			$('#drawLights').text('Нарядить ёлку и включить музыку');
		}
		
		/// проходим по каждой лампочке в гирлянде
		for (i=1; i<24; i++) {
			numStar = $('.star'+i)[0];
			/// и убираем/добавляем аттрибут hiiden
			if (numStar.hasAttribute('hidden')) {
				numStar.removeAttribute('hidden');
			} else {
				numStar.setAttribute('hidden', '');
			}
		}
	} else { /// если нажали уже >5 раз, то хватит уже играться. Отключаем кнопку.
		$('#drawLights').attr('disabled', true).text('Хватит играться ;)');
	}
}


/// функция для снега

$('#drawSnow').click(function() {     /// вызов функции при нажатии на кнопку
	var snowfall = setInterval(       /// установка интревала для каждой снежинки
		function snow() {             /// дальше идет сама функция
		/// переменные для получения рандомных размеров, скорости и позиции снежинки
		snowSize = Math.floor(Math.random()*10 + 5) + 'px';      /// min=5      max=15
		fallTime = Math.floor(Math.random()*18001 + 10000);      /// min=10000  max=18000
		left = Math.floor(Math.random()*98 + 1) + '%';
		/// создаем <div>, указывая ему стили
		$("<div>", { 
			css: {
				position: 'absolute',
				top: '0px',
				left: left,
				color: 'red',
				width: snowSize,
				height: snowSize,
				borderRadius: '50%',
				background: '#fff',
			},
		})
		/// приписываем нужную анимацию
		.animate(
			{
				top: '100%',
				opacity: '0.6',
			}, 
			fallTime,       /// время падения 
			'linear',       /// траектория падения (равномерная или swing - медленно-быстро-медленно)
			function() {    /// и удаляем <div> после того, как завершится анимация
				$(this).remove()
			}
		)
		/// и цепляем этот блок к нашей рабочей области
		.appendTo(".wrap");
	}, 100);  /// тут интервал отрисовывания новой снежинки (100 = 0.1с)
	
	/// отключаем кнопку, чтобы не перегружали снегом экран :)
	$('#drawSnow').attr('disabled', true).text('А снег идёт...');
});

/// функция для изменения цвета надписи
function coloring() {
	var changeCol = setInterval(function() {
		/// берем рандомные числа от 0 до 255
		r = Math.floor(Math.random()*256 + 1);
		g = Math.floor(Math.random()*256 + 1);
		b = Math.floor(Math.random()*256 + 1);
		/// и применяем их к анимации цвета
		$('h3').animate(
			{
				color: 'rgb('+r+','+g+','+b+')'
			},
			3000, /// время выполнения анимации
			'linear',
		);
	}, 2000); /// время интервала между анимациями
	
	/// отключаем кнопку
	$('#addColor').attr('disabled', true).text('Сделано! :)');
	/// и включаем анимацию для body по @keyframes (прописаны в css)
	$('body').css('animation', 'anima 60s ease infinite');
}
