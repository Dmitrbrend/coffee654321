window.addEventListener("DOMContentLoaded", () => {

	//modal  
	function bindModal(triggerSel, modalSel) {
		const trigger = document.querySelectorAll(triggerSel),
			modal = document.querySelector(modalSel);

		trigger.forEach((item) => {
			item.addEventListener("click", (e) => {
				if (e.target) {
					e.preventDefault();
				}

				modal.style.display = "block";
				document.body.style.overflow = "hidden";
			});
		});

		modal.addEventListener("click", (e) => {
			if (e.target === modal) {
				modal.style.display = "none";
				document.body.style.overflow = "";
			}
		});
	}

	bindModal(".btn", ".modal");

	//Добовление карточек экслюзивного меню 

	class MenuCard {
		constructor(src, alt, title, cost, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.price = price;
			this.cost = cost;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
		}

		render() {
			const element = document.createElement('div');

			if (this.classes.length === 0) {
				this.classes = "menu__item";
				element.classList.add(this.classes);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}

			element.innerHTML = `
      <div class="slide">
        <div class="slide-img">
        <img
          src="${this.src}"
          alt="Эксклюзивный кофе 3"
        />
      </div>
      <div class="text-slid">
        <h3>${this.title}</h3>
        <p>
         ${this.price}
        </p>
        <button class="order-button">Пред заказ ${this.cost}</button>
      </div>
     </div>
    </div>
        `;
			this.parent.append(element);
		}
	}

	// getResource('http://localhost:3000/menu')
	// 	.then(data => {
	// 		data.forEach(({ img, altimg, title, cost, price }) => {
	// 			new MenuCard(img, altimg, title, cost, price, ".exclusive-coffee .container .slider-container .slider").render();
	// 		});
	// 	});

	//slider



	let slideIndex = 1;
	const slides = document.querySelectorAll(".slide"),
		prev = document.querySelector(".offer__slider-prev"),
		next = document.querySelector(".offer__slider-next"),
		total = document.querySelector("#total"),
		current = document.querySelector("#current");

	showSlides(slideIndex);

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
	} else {
		total.textContent = slides.length;
	}

	function showSlides(n) {
		if (n > slides.length) {
			slideIndex = 1;
		}
		if (n < 1) {
			slideIndex = slides.length;
		}

		slides.forEach((item) => (item.style.display = "none"));

		slides[slideIndex - 1].style.display = "flex"; // Как ваша самостоятельная работа - переписать на использование классов show/hide

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	}

	function plusSlides(n) {
		showSlides((slideIndex += n));
	}

	prev.addEventListener("click", function () {
		plusSlides(-1);
	});

	next.addEventListener("click", function () {
		plusSlides(1);
	});




//форма отправки данных на сервер

const forms = document.querySelectorAll('form');
const input = document.querySelectorAll('input');

console.log(forms); // Должен вывести NodeList с формами
console.log(input); // Должен вывести NodeList с инпутами

const message = {
	loading: 'Загрузка...',
	success: 'Спасибо! Скоро мы с вами свяжемся',
	failure: 'Что-то пошло не так...'
};

const postData = async (url, data) => {
	let statusMessage = document.querySelector('.status');
	if (!statusMessage) {
		statusMessage = document.createElement('div');
		statusMessage.classList.add('status');
		document.body.appendChild(statusMessage); // Добавляем в тело документа
	}
	statusMessage.textContent = message.loading;
	console.log('Отправка данных...');

	let res = await fetch(url, {
		method: 'POST',
		body: data
	});

	console.log('Ответ получен');
	return await res.json();
};

const clearInputs = () => {
	input.forEach(item => {
		item.value = '';
	});
};

forms.forEach(item => {
	item.addEventListener('submit', (e) => {
		e.preventDefault();

		console.log('Форма отправляется');

		let statusMessage = document.createElement('div');
		statusMessage.classList.add('status');
		item.appendChild(statusMessage);

		const formData = new FormData(item);

		postData('server.php', formData)
			.then(res => {
				console.log('answer from server', res);
				statusMessage.textContent = message.success;
			})
			.catch((error) => {
				console.error('Ошибка при отправке данных:', error);
				statusMessage.textContent = message.failure;
			})
			.finally(() => {
				clearInputs();
				setTimeout(() => {
					statusMessage.remove();
				}, 5000);
			});

	});
});
});