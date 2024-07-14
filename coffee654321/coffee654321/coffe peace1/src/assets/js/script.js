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

getResource('http://localhost:3000/menu')
    .then(data => {
        data.forEach(({img, altimg, title, descr, price}) => {
            new MenuCard(img, altimg, title, descr, price, ".exclusive-coffee .container .slider-container .slider .").render();
        });
    });
   

});
