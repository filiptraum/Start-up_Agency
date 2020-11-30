  document.addEventListener("DOMContentLoaded", () => {
    function gabmurgerFunc(gamburderSelector, navigationSelector, itemsSelector) {

      const gamburger = document.querySelector(gamburderSelector);
      const navigation = document.querySelector(navigationSelector);
      const items = document.querySelectorAll(itemsSelector);

      let menuOpen = false;
      gamburger.addEventListener('click', () => {
        if (!menuOpen) {
          gamburger.classList.add('open');
          menuOpen = true;
          navigation.classList.add('open');
        } else {
          gamburger.classList.remove('open');
          menuOpen = false;
          navigation.classList.remove('open');
        }
      });

      items.forEach((item) => {
        item.addEventListener("click", () => {
          gamburger.classList.remove('open');
          menuOpen = false;
          navigation.classList.remove('open');
        });
      });
    }
    gabmurgerFunc(".gamburger", ".header-menu", ".header-menu__item");;

    function scrollUp() {
      let wrapper = document.querySelector('.wrapper');
      let wrapperWidth = wrapper.clientWidth;

      function checkWidth() {
        wrapper = document.querySelector('.wrapper');
        wrapperWidth = wrapper.clientWidth;
      }

      checkWidth();

      window.addEventListener('resize', () => {
        checkWidth();
        scrollUpStyles();
      });

      function scrollUpStyles() {
        if (wrapperWidth > 650) {

          const offset = 500;
          const scrollUp = document.querySelector(".scroll-up");
          const scrollUpSvgPath = document.querySelector(".scroll-up__svg-path");
          const pathLength = scrollUpSvgPath.getTotalLength();

          scrollUpSvgPath.style.strokeDasharray = `${pathLength} ${pathLength}`;
          scrollUpSvgPath.style.transition = 'stroke-dashoffset 20ms';

          const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

          const updateDashoffset = () => {
            const height = document.documentElement.scrollHeight - window.innerHeight;
            const dashoffset = pathLength - (getTop() * pathLength / height);

            scrollUpSvgPath.style.strokeDashoffset = dashoffset;
          }

          window.addEventListener("scroll", () => {
            updateDashoffset();

            if (getTop() > offset && wrapperWidth > 650) {
              scrollUp.classList.add("scroll-up_active");
            } else {
              scrollUp.classList.remove("scroll-up_active");
            }
          });

          scrollUp.addEventListener('click', () => {
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
          });

          updateDashoffset();
        }
      }

      scrollUpStyles();
    }

    scrollUp();;

    function openMoreText(itemsSelector, btnSelector, contentSelector) {

      const itemsBlock = document.querySelector(itemsSelector);
      const btn = document.querySelectorAll(btnSelector);
      const content = document.querySelectorAll(contentSelector);

      function showContent(i) {
        if (btn[i].innerText == 'Read more') {
          content[i].classList.add('open');
          btn[i].innerText = 'Close';
        } else {
          btn[i].innerText = 'Read more';
          content[i].classList.remove('open');
        }
      }

      itemsBlock.addEventListener('click', (e) => {
        const target = e.target;
        if (target.classList.contains(btnSelector.replace(/\./, ""))) {
          btn.forEach((item, i) => {
            if (target == item) {
              showContent(i);
            }
          });
        }
      });
    }

    openMoreText(".services__row", ".services__button", ".services_hidden-text");

    function slider(container, track, btnPrev, btnNext, items) {

      let position = 0;
      const slidesToShow = 1;
      const slidesToScroll = 1;
      let sliderContainer = document.querySelector(container);
      const sliderTrack = document.querySelector(track);
      const sliderBtnPrev = document.querySelector(btnPrev);
      const sliderBtnNext = document.querySelector(btnNext);
      const sliderItems = document.querySelectorAll(items);
      const itemsCount = sliderItems.length;
      let itemWidth = sliderContainer.clientWidth / slidesToShow;
      let movePosition = slidesToScroll * itemWidth;

      function widthForItems() {
        sliderContainer = document.querySelector(container);
        itemWidth = sliderContainer.clientWidth / slidesToShow;
        movePosition = slidesToScroll * itemWidth;
        position = 0;
        setPosition();
        checkBtns();
        sliderItems.forEach((item) => {
          item.style.minWidth = `${itemWidth}px`;
        });
      }

      widthForItems();

      window.addEventListener('resize', () => {
        widthForItems();
      });

      sliderBtnNext.addEventListener('click', () => {

        const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

        position -= itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

        setPosition();
        checkBtns();
      });

      sliderBtnPrev.addEventListener('click', () => {

        const itemsLeft = Math.abs(position) / itemWidth;

        position += itemsLeft >= slidesToScroll ? movePosition : itemsLeft * itemWidth;

        setPosition();
        checkBtns();
      });

      function setPosition() {
        sliderTrack.style.transform = `translateX(${position}px)`;
      }

      function checkBtns() {
        sliderBtnPrev.disabled = position === 0;
        sliderBtnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
        if (sliderBtnPrev.disabled) {
          sliderBtnPrev.style.opacity = 0;
          sliderBtnPrev.style.pointerEvents = 'none';

        } else {
          sliderBtnPrev.style.opacity = 1;
          sliderBtnPrev.style.pointerEvents = 'visible';

        }
        if (sliderBtnNext.disabled) {
          sliderBtnNext.style.opacity = 0;
          sliderBtnNext.style.pointerEvents = 'none';
        } else {
          sliderBtnNext.style.opacity = 1;
          sliderBtnNext.style.pointerEvents = 'visible';
        }
      }
      checkBtns();
    }

    slider(".slider-testimonial", ".slider-testimonial__track", ".testimonial__left-arrow", ".testimonial__right-arrow", ".slider-testimonial__item");

    function outNumMinus(startNum, num, elem, stepNum, timeNum, delay, symbol = '', symbolright = true, needZero = true) {
      const el = document.querySelector(elem);

      const time = +timeNum;
      const step = +stepNum

      let n = startNum;
      if (el.classList.contains("no-was-Working")) {
        setTimeout(() => {
          if (el.classList.contains("_anim-active")) {
            setTimeout(() => {
              let timeOut = Math.round(time / num * step);
              let interval = setInterval(() => {
                n -= step;
                if (n == num) {
                  clearInterval(interval);
                  if (symbolright) {
                    el.innerText = num + symbol;
                  } else {
                    el.innerText = symbol + num;
                  }
                } else if (n < num) {
                  clearInterval(interval)
                  if (symbolright) {
                    el.innerText = num + symbol;
                  } else {
                    el.innerText = symbol + num;
                  }
                } else {
                  let nLenght = n.toString().length;
                  let numLenght = num.toString().length;
                  let zero = '0';
                  if (numLenght > nLenght && needZero) {
                    for (let i = 1; i < numLenght - nLenght; i++) {
                      zero += '0';
                    }
                    if (symbolright) {
                      el.innerText = zero + n + symbol;
                    } else {
                      el.innerText = symbol + zero + n;
                    }
                  } else {
                    if (symbolright) {
                      el.innerText = n + symbol;
                    } else {
                      el.innerText = symbol + n;
                    }
                  }
                }
              }, timeOut);
            }, delay);
            setTimeout(() => {
              el.classList.remove("no-was-Working");
            }, 350);
          }
        }, 350);
      }
    }

    outNumMinus(20, 14.99, "#plan-counter1", 1, 8500, 700, '$', false, false);
    outNumMinus(40, 29.99, "#plan-counter2", 1, 8500, 700, '$', false, false);
    outNumMinus(70, 54.99, "#plan-counter3", 1, 8500, 700, '$', false, false);

    window.addEventListener("scroll", () => {
      outNumMinus(20, 14.99, "#plan-counter1", 1, 8500, 700, '$', false, false);
      outNumMinus(40, 29.99, "#plan-counter2", 1, 8500, 700, '$', false, false);
      outNumMinus(70, 54.99, "#plan-counter3", 1, 8500, 700, '$', false, false);
    });;

    const animItems = document.querySelectorAll("._anim-items");

    if (animItems.length > 0) {
      window.addEventListener('scroll', animationScrolling);

      function animationScrolling() {
        for (let index = 0; index < animItems.length; index++) {
          const animItem = animItems[index];
          const animItemHeight = animItem.offsetHeight;
          const animItemOffset = offsetFunc(animItem).top;
          const animStart = 4;

          let animItemPoint = window.innerHeight - animItemHeight / animStart;
          if (animItemHeight > window.innerHeight) {
            animItemPoint = window.innerHeight - window.innerHeight / animStart;
          }

          if ((pageYOffset > animItemOffset - animItemPoint) && pageYOffset < (animItemOffset + animItemHeight)) {
            animItem.classList.add("_anim-active");
          } else {
            if (!animItem.classList.contains('_active-no-hide')) {
              animItem.classList.remove("_anim-active");
            }
          }
        }
      }

      function offsetFunc(el) {
        const rect = el.getBoundingClientRect();
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        return {
          top: rect.top + scrollTop,
          left: rect.left + scrollLeft
        }
      }

      setTimeout(() => {
        animationScrolling();
      }, 300);
    };
  })