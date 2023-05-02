/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


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
		return num < 10 ? num = `0${num}` : num;
	}

	// modal
	const triggers = document.querySelectorAll('[data-modal]');
	const modal = document.querySelector('.modal');
	const close = document.querySelector('[data-close]');

	triggers.forEach(item => {
		item.addEventListener('click', showModal);
	});

	close.addEventListener('click', closeModal);

	modal.addEventListener('click', event => {
		if (event.target === modal) {
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
		modal.classList.add('fade-out');
		setTimeout(() => modal.classList.add('hide'), 1500);
		document.documentElement.style.overflow = 'unset';
	}

	function showModal() {
		modal.classList.add('show', 'fade');
		modal.classList.remove('hide', 'fade-out');
		document.documentElement.style.overflow = 'hidden';
		clearTimeout(modalTimeOut);
		window.removeEventListener('scroll', showByScroll);
	}

	window.addEventListener('scroll', showByScroll);

	function showByScroll() {
		if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
			showModal();
		}
	}

	const toTop = document.querySelector('.top-up');
	window.addEventListener('scroll', showTopButton);
	toTop.addEventListener('click', () => {
		document.documentElement.scrollTop = 0;
	});

	function showTopButton() {
		if (window.scrollY >= 700) {
			toTop.classList.add('show', 'fade');
			toTop.classList.remove('hide', 'fade-out');

		} else {
			toTop.classList.remove('show');
			toTop.classList.add('hide');
			toTop.classList.add('fade-out');
			setTimeout(() => toTop.classList.add('hide'), 1500);
		}
	}

	//Card class
	const data = [{
		src: '"img/tabs/vegy.jpg"',
		alt: '"vegy"',
		title: 'Меню "Фитнес"',
		descr: 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		price: 10

	},
	{
		src: '"img/tabs/elite.jpg"',
		alt: '"elite"',
		title: 'Меню “Премиум”',
		descr: 'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		price: 15
	},
	{
		src: '"img/tabs/post.jpg"',
		alt: '"post"',
		title: 'Меню "Постное"',
		descr: 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		price: 5

	}];

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
			this.price = this.price * this.changeCourse;
		}

		render() {
			const div = document.createElement('div');
			if(this.classes.length === 0){
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
		static produce(dataObj, className){
			dataObj.forEach(item => new className(
				item.src,
				item.alt,
				item.title,
				item.descr,
				item.price,
				2.9,
				'.menu .container',
				'menu__item'
			).render());
		}
	}

	Producer.produce(data, CardMenu);
});

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
  } //TODO realise timer


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
      days = Math.floor(t / (1000 * 3600 * 24));
      hours = Math.floor(t / (1000 * 3600) % 24);
      minutes = Math.floor(t / (1000 * 60) % 60);
      seconds = Math.floor(t / 1000 % 60);
    }

    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
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

  setTimer(deadline); //TODO add modal

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

/***/ })

/******/ });
//# sourceMappingURL=main.js.map
