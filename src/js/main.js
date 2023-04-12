'use strict';

document.addEventListener('DOMContentLoaded', () => {
//TODO realise with tabs in header
	const slides = document.querySelectorAll('.tabcontent');
	const tabs = document.querySelectorAll('.tabheader__item');
	const tabsContainer = document.querySelector('.tabheader__items');

	hide();
	show(0);

	tabsContainer.addEventListener('click', event => {
		const target = event.target;
		if (target) {
			clearActive();
			target.classList.add('tabheader__item_active');
			tabs.forEach((item, i) => {
				if (item === target) {
					hide();
					show(i);
				}
			});
		}
	});

	function clearActive() {
		tabs.forEach(item => item.classList.remove('tabheader__item_active'));
	}

	function hide() {
		slides.forEach(item => item.classList.add('hide'));
		slides.forEach(item => item.classList.remove('show', 'fade'));
	}

	function show(i) {
		slides[i].classList.add('show', 'fade');
		slides[i].classList.remove('hide');
	}


	//TODO realise timer
	const deadline = '2023-05-20';


	function timeRemain(deadline) {
		let days, hours, minutes, seconds;
		const t = Date.parse(deadline) - Date.parse(new Date());
		if (t <= 0) {
			days = 0;
			hours = 0;
			minutes = 0;
			seconds = 0;
		} else {
			days = Math.floor((t / (1000 * 3600 * 24)));
			hours = Math.floor((t / (1000 * 3600) % 24));
			minutes = Math.floor((t / (1000 * 60) % 60));
			seconds = Math.floor((t / 1000) % 60);
		}

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minutes': minutes,
			'seconds': seconds,
		};
	}

	function setTimer(deadline) {
		const daysField = document.querySelector('#days'),
			hoursField = document.querySelector('#hours'),
			minutesField = document.querySelector('#minutes'),
			secondsField = document.querySelector('#seconds');
		const timeInterval = setInterval(updateTime, 1000);
		updateTime();

		function updateTime() {
			const timer = timeRemain(deadline);
			daysField.textContent = zeroed(timer.days);
			hoursField.textContent = zeroed(timer.hours);
			minutesField.textContent = zeroed(timer.minutes);
			secondsField.textContent = zeroed(timer.seconds);
			if (timer.total <= 0) {
				clearInterval(timeInterval);
			}
		}

	}

	function zeroed(num) {
		return num <= 9 ? `0${num}` : num;
	}

	setTimer(deadline);

	//TODO add modal
	const modal = document.querySelector('.modal');
	const triggers = document.querySelectorAll('[data-modal]');
	const dataClose = modal.querySelector('.modal__close');


	triggers.forEach(item => {
		item.addEventListener('click', showModal);
	});

	dataClose.addEventListener('click', hideModal);

	modal.addEventListener('click', event => {
		if (event.target === modal) {
			hideModal();
		}
	});


	document.addEventListener('keydown', event => {
		if (event.code === 'Escape' && modal.classList.contains('show')) {
			hideModal();
		}
	});


	const modalTimerId = setTimeout(showModal, 6000);


	window.addEventListener('scroll', showModalOnScroll);

	function showModalOnScroll() {
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			showModal();
		}
	}

	function showModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearTimeout(modalTimerId);
		window.removeEventListener('scroll', showModalOnScroll);
	}

	function hideModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}
});

