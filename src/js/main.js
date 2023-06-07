'use strict';

document.addEventListener('DOMContentLoaded', () => {
//realise with tabs in header
	const slides = document.querySelectorAll('.tabcontent');
	const tabs = document.querySelectorAll('.tabheader__item');
	const tabsContainer = document.querySelector('.tabheader__items');
	const REQUESTS_URL = 'http://localhost:3000/requests';
	const MENU_URL = 'http://localhost:3000/menu';
	const USD_COURSE = 2.89;

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
	const deadline = '2023-06-20';

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
		static produce({img, altimg, title, descr, price}, usd, className) {
			new className(
				img,
				altimg,
				title,
				descr,
				price,
				usd,
				'.menu .container',
				'menu__item'
			).render();
		}
	}


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

	const getData = async url => {
		const res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Error with ${url}, status ${res.status}`);
		}
		return await res.json();
	};

	getData(MENU_URL).then(data => {
		data.forEach(obj => {
			Producer.produce(obj, USD_COURSE, CardMenu);
		});
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: data
		});

		return await res.json();
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

			const jsonObj = JSON.stringify(Object.fromEntries(formData.entries()));
			console.log(jsonObj);

			postData(REQUESTS_URL, jsonObj)
				.then(data => {
					console.log(data);
					showThanksModal(messages.success);
				}).catch(() => {
					showThanksModal(messages.fail);
				}).finally(() => {
					form.reset();
					statusMessage.remove();
				});

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

	//Slider
	class CustomSlider {
		constructor(parentSlider,
			sliderCounterWrapper,
			sliderPrevBtn,
			sliderNextBtn,
			sliderCountCurrent,
			sliderCountTotal,
			sliderWrapper,
			slideSelector) {
			this.parentSlider = document.querySelector(parentSlider);
			this.sliderCounterWrapper = document.querySelector(sliderCounterWrapper);
			this.sliderPrevBtn = this.sliderCounterWrapper.querySelector(sliderPrevBtn);
			this.sliderNextBtn = this.sliderCounterWrapper.querySelector(sliderNextBtn);
			this.sliderCountCurrent = this.sliderCounterWrapper.querySelector(sliderCountCurrent);
			this.sliderCountTotal = this.sliderCounterWrapper.querySelector(sliderCountTotal);
			this.sliderWrapper = document.querySelector(sliderWrapper);
			this.slidesTotal = this.sliderWrapper.querySelectorAll(slideSelector);
			this.slidesCount = this.slidesTotal.length; // количество всех слайдов
			this.totalWidth = this.slidesCount * 100; // общая ширина обертки слайдов
			this.startSlideIndex = 1; // стартовое значение индекса в sliderCounterWrapper
			this.stepTranslate = 100 / this.slidesCount;
			this.startTranslate = 100 - this.stepTranslate; // начальное смещение всех слайдов
			this.currentTranslate = this.startTranslate; //текущее смещение слайдов
			this.currentSlide = this.startSlideIndex; //текущий индекс слайда в sliderCounterWrapper
		}

		formatSlidesLength(length) {
			return length >= 10 ? `${length}` : `0${length}`;
		}

		stylize() {
			this.sliderWrapper.style.display = 'flex';
			this.sliderWrapper.style.width = `${this.totalWidth}%`;
			this.sliderWrapper.style.transform = `translateX(${this.startTranslate}%)`;
			this.sliderWrapper.style.transition = 'all 0.5s ease';
			this.parentSlider.style.overflow = 'hidden';
			this.sliderCountTotal.textContent = this.formatSlidesLength(this.slidesCount);
			this.sliderCountCurrent.textContent = this.formatSlidesLength(this.currentSlide);
		}

		init() {
			this.stylize();
			this.sliderCounterWrapper.addEventListener('click', event => {
				if (event.target === this.sliderNextBtn) {
					this.currentTranslate -= this.stepTranslate;
					if (this.currentTranslate < 0) {
						this.currentSlide = this.startSlideIndex;
						this.currentTranslate = this.startTranslate;
						this.sliderCountCurrent.textContent = this.formatSlidesLength(this.currentSlide);
					} else {
						this.sliderCountCurrent.textContent = this.formatSlidesLength(++this.currentSlide);
					}
					this.sliderWrapper.style.transform = `translateX(${this.currentTranslate}%)`;
				}
				if (event.target === this.sliderPrevBtn) {
					this.currentTranslate += this.stepTranslate;
					if (this.currentTranslate >= 100) {
						this.currentSlide = this.slidesCount;
						this.currentTranslate = 0;
						this.sliderCountCurrent.textContent = this.formatSlidesLength(this.currentSlide);
					} else {
						this.sliderCountCurrent.textContent = this.formatSlidesLength(--this.currentSlide);
					}
					this.sliderWrapper.style.transform = `translateX(${this.currentTranslate}%)`;

				}
			});
		}

	}

	new CustomSlider('.offer__slider',
		'.offer__slider-counter',
		'.offer__slider-prev',
		'.offer__slider-next',
		'#current',
		'#total',
		'.offer__slider-wrapper',
		'.offer__slide')
		.init();
});

// Calculator

const result = document.querySelector('.calculating__result span');
let gender, height, weight, age, ratio;

if (localStorage.getItem('gender')) {
	gender = localStorage.getItem('gender');
} else {
	gender = 'female';
	localStorage.setItem('gender', gender);
}

if (localStorage.getItem('ratio')) {
	ratio = localStorage.getItem('ratio');
} else {
	ratio = '1.375';
	localStorage.setItem('ratio', ratio);
}

function init(parentSelector, activeClass) {
	const elements = document.querySelectorAll(`${parentSelector} div`);
	elements.forEach(item => item.classList.remove(activeClass));
	elements.forEach(item => {
		if (item.hasAttribute('data-ratio') && item.getAttribute('data-ratio') === ratio) {
			item.classList.add(activeClass);
			return;
		}
		if (item.hasAttribute('id') && item.getAttribute('id') === gender) {
			item.classList.add(activeClass);
		}
	});
}

init('#gender', 'calculating__choose-item_active');
init('.calculating__choose_big', 'calculating__choose-item_active');
check();
calcTotal();

function calcTotal() {
	if (!check()) {
		return;
	}
	if (gender === 'male') {
		result.textContent = `${Math.round(ratio * (88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)))}`;
		return;
	}
	if (gender === 'female') {
		result.textContent = `${Math.round(ratio * (447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)))}`;
	}
}

function getStaticInformation(parentSelector, activeClass) {
	const elements = document.querySelectorAll(`${parentSelector} div`);
	elements.forEach(item => {
		item.addEventListener('click', event => {
			if (event.target.hasAttribute('data-ratio')) {
				ratio = +event.target.getAttribute('data-ratio');
				setActive(elements, event.target, activeClass);
				localStorage.setItem('ratio', ratio);
			} else {
				gender = event.target.getAttribute('id');
				setActive(elements, event.target, activeClass);
				localStorage.setItem('gender', gender);
			}
			calcTotal();
		});
	});

}

function getDynamicInformation(selector) {
	const input = document.querySelector(selector);
	input.addEventListener('input', () => {

		if (input.value.match(/\D\./g)) {
			input.style.border = 'solid 1px red';
		} else {
			input.style.border = 'none';
		}

		switch (input.getAttribute('id')) {
		case 'height':
			height = +input.value;
			break;
		case 'weight':
			weight = +input.value;
			break;
		case 'age':
			age = +input.value;
			break;
		}
		calcTotal();
	});
}

function setActive(elements, target, activeClass) {
	elements.forEach(item => {
		if (item === target) {
			target.classList.add(activeClass);
		} else {
			item.classList.remove(activeClass);
		}
	});
}

function check() {
	if (!gender || !height || !weight || !age || !ratio) {
		result.textContent = '0';
		return false;
	} else {
		return true;
	}
}

getStaticInformation('#gender', 'calculating__choose-item_active');
getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
getDynamicInformation('#height');
getDynamicInformation('#weight');
getDynamicInformation('#age');