'use strict';

document.addEventListener('DOMContentLoaded', () => {
//realise with tabs in header
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


	//Timer
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

			daysField.textContent = setZero(timer.days);
			hoursField.textContent = setZero(timer.hours);
			minutesField.textContent = setZero(timer.minutes);
			secondsField.textContent = setZero(timer.seconds);

			if (timer.total <= 0) {
				clearInterval(timeInterval);
			}
		}

	}

	setTimer(deadline);

	function setZero(num) {
		return num < 10 ? `0${num}` : num;
	}

	// modal
	const triggers = document.querySelectorAll('[data-modal]');
	const modal = document.querySelector('.modal');
	const close = document.querySelector('[data-close]');


	triggers.forEach(item => {
		item.addEventListener('click', showModal);
	});

	/*
	Теперь closeModal будет работать и для создаваемых элементов
	*/
	modal.addEventListener('click', event => {
		if (event.target === modal || event.target.getAttribute('data-close') === '') {
			closeModal();
		}
	});

	window.addEventListener('keydown', event => {
		if (event.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	const modalTimeOut = setTimeout(showModal, 360000);

	function closeModal() {
		modal.classList.remove('show', 'fade');
		modal.classList.add('hide');
		document.documentElement.style.overflow = 'unset';
		clearTimeout(modalTimeOut);
	}

	window.addEventListener('scroll', showByScroll);

	function showByScroll() {

		close.addEventListener('click', closeModal);

		modal.addEventListener('click', event => {
			if (event.target === modal) {
				closeModal();
			}
		});
	}

	document.addEventListener('keydown', event => {
		if (event.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});


	window.addEventListener('scroll', showModalOnScroll);

	function showModalOnScroll() {

		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			showModal();
		}
	}


	const toTop = document.querySelector('.top-up');
	window.addEventListener('scroll', showTopButton);
	toTop.addEventListener('click', () => {
		document.documentElement.scrollTop = 0;
	});

	function showModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.documentElement.style.overflow = 'hidden';
		clearTimeout(modalTimeOut);
		window.removeEventListener('scroll', showModalOnScroll);
	}

	function showTopButton() {
		if (window.scrollY >= 700) {
			toTop.classList.remove('hide', 'fade-out');
			toTop.classList.add('show', 'fade');
		} else {
			toTop.classList.remove('show', 'fade');
			toTop.classList.add('fade-out');
			let anim = '';
			if (toTop.getAnimations().length > 0) {
				anim = toTop.getAnimations()[0].animationName;
			}
			toTop.addEventListener('animationend', () => {
				if (anim === 'fade-out') {
					toTop.classList.add('hide');
				}
				anim = '';
			});
		}
	}

	//Card class

	class CardMenu {
		constructor(src, alt, title, descr, price, changeCourse, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.changeCourse = changeCourse;
			this.parent = document.querySelector(parentSelector);
			this.classes = classes;
			this.changePrice();
		}

		changePrice() {
			this.price = (this.price * this.changeCourse).toFixed(2);
		}

		render() {
			const div = document.createElement('div');
			if (this.classes.length === 0) {
				div.classList.add('menu__item');
			} else {
				this.classes.forEach(item => div.classList.add(item));
			}
			div.innerHTML = `<img src=${this.src} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> BYN/день</div>
                    </div>`;
			this.parent.append(div);
		}
	}

	class Producer {
		static produce({img, altimg, title, descr, price}, className) {
			new className(
				img,
				altimg,
				title,
				descr,
				price,
				2.9,
				'.menu .container',
				'menu__item'
			).render();
		}
	}

	//Producer.produce(data, CardMenu);

	// Forms
	const forms = document.querySelectorAll('form');

	forms.forEach(form => {
		bindPostData(form);
	});

	const messages = {
		success: 'С Вами скоро свяжутся',
		fail: 'Что-то пошло не так',
		loading: './img/spinner.svg'
	};

	const getResources = async (url) => {
		const req = await fetch(url);
		if (!req.ok) {
			throw new Error(`Problem with ${url}, status - ${req.status}`);
		}

		return await req.json();
	};

	getResources('http://localhost:3000/menu')
		.then(data => {
			data.forEach(item => Producer.produce(item, CardMenu));
		});

	const postData = async (url, data) => {
		const req = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: data
		});

		return await req.json();
	};

	function bindPostData(form) {
		form.addEventListener('submit', (event) => {
			event.preventDefault();

			const statusMessage = document.createElement('img');
			statusMessage.src = messages.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData('http://localhost:3000/requests', json)
				.then(data => {
					console.log(data);
					showThanksModal(messages.success);
					statusMessage.remove();
				}).catch(() => {
					showThanksModal(messages.fail);
					statusMessage.remove();
					console.log(new Error('Error in POST method'));
				}).finally(() => form.reset());
		});
	}

	function showThanksModal(message) {
		const prevModal = document.querySelector('.modal__dialog');
		prevModal.classList.add('hide');
		prevModal.classList.remove('show');
		showModal();

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
		<div class="modal__content">
               <div class="modal__close" data-close>&times;</div>
               <div class="modal__title">${message}</div>
            </div>
		`;

		document.querySelector('.modal').append(thanksModal);
		setTimeout(() => {
			closeModal();
			thanksModal.remove();
			prevModal.classList.add('show');
			prevModal.classList.remove('hide');
		}, 4000);
	}
});

