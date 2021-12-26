'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////
// Modal window


const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// button Scrolling

btnScrollTo.addEventListener('click', function(e){
  const s1coords = section1.getBoundingClientRect();// lấy dữ liệu về vị trí, thông số của section1 !!! lưu ý đây là vị trí của section1 với VIEWPORT KHÔNG PHẢI VỚI DOCUMENT!!
  console.log(s1coords); 
  console.log(e.target.getBoundingClientRect()); // vị trí của nút scroll to
  console.log('Current scroll X/Y: ', window.pageXOffset, window.pageYOffset); // vị trí của các cạnh viewport(cửa sổ hiện tại) với các cạnh thực sự của trang web
  console.log('height/width of viewport: ', document.documentElement.clientHeight, document.documentElement.clientWidth); // độ cao và rộng của cửa sổ hiện thời
  
  // Scrolling 1.way
  //window.scrollTo(s1coords.left + window.pageXOffset, s1coords.top + window.pageYOffset);

  // Scrolling 2.way
  /* window.scrollTo({
    left: s1coords.left + window.pageXOffset,
    top: s1coords.top + window.pageYOffset,
    behavior: 'smooth',
  }); */

  section1.scrollIntoView({behavior: 'smooth'});
})

///////////////////////////////////////
// page navigation

/* document.querySelectorAll('.nav__link').forEach(function(el){
  el.addEventListener('click', function(e) {
    e.preventDefault(); // stop go to the anchor (#element), which is in the html doc 
    const id = this.getAttribute('href');
    //console.log(this.href);
    document.querySelector(id).scrollIntoView({behavior: 'smooth'})
    //id.scrollIntoView({behavior: 'smooth'});
  })
}) */

// dùng event bubbling để bắt sự kiện khi sự kiện bubble để không phải gán quá nhiều phương trình vào element với nav__link, thay vào đó chỉ cần gán vào nav__links
document.querySelector('.nav__links').addEventListener('click', function(e){
  e.preventDefault();
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior: 'smooth'});
  }
})

///////////////////////////////////////
///////////////////////////////////////

/*
// Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

document.querySelector('.header');

console.log(document.getElementsByClassName('section'));
console.log(document.getElementById('section--2'));
console.log(document.getElementsByTagName('button'));

const sectionAll = document.querySelectorAll('.section');
console.log(sectionAll);
sectionAll.forEach(sec => console.log(sec));
console.log(sectionAll.length);
for(let sec of sectionAll) {
  console.log(sec);
}

// creating and inserting elements
//insertAdjacentHTML

const header = document.querySelector('.header')
const message = document.createElement('div');
message.classList.add('cookie-message');
//message.textContent = 'We use cookied for improved functionality and analytics'
message.innerHTML = 'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

//console.log(head);
console.log(document.head);

//header.prepend(message); // hiện ở đầu header
header.append(message); // hiện ở cuối header
// do message là live element trong Dom nên chỉ xuất hiện ở 1 nơi, bởi vậy nếu dùng cả prepend và append thì sẽ chỉ xuất hiện ở 1 cái sau
// nếu muốn message xuất hiện ở 2 nơi thì phải có 1 copy của nó
//header.prepend(message.cloneNode(true)); // true se bao gom cac tp con cua node do

document.querySelector('.btn--close-cookie').addEventListener('click', function(){
  message.remove();
})

console.log(document.body.childNodes);

//Style

message.style.backgroundColor = '#37383d';
message.style.width = '120%';

// lệnh message.style chỉ lấy được style inline chứ không lấy được style trong css file hay trong html style on head tag
console.log(message.style.color);
console.log(message.style.backgroundColor);

// muốn lấy tất cả style của element ta dùng lệnh getComputedStyle(element).xxx : trong đó xxx là property của element
console.log(getComputedStyle(message).height);
console.log(getComputedStyle(message).backgroundColor);

//có thể chỉnh lại các property của element bằng cách dùng getComputedStyle()
message.style.height = Number.parseFloat(getComputedStyle(message).height,10) + 30 + 'px'; // nếu giá trị height là int thì để parseInt

document.documentElement.style.setProperty('--color-primary', 'orangered');
console.log(document.documentElement.style.getPropertyValue('--color-primary'));
 
// tất cả standard attribute sẽ output được 
const logo = document.querySelector('.nav__logo');
console.log(logo.getAttribute('src')); // relative url
console.log(logo.src); // absolute url
console.log(logo.alt);
console.log(logo.className);
console.log(logo.id);
console.log(logo.getAttribute('className'));
logo.setAttribute('designer', 'huy')
//Non-standard attribute output sẽ là undefined
console.log(logo.desinger); // output : undefined


console.log(logo.dataset.versionNumber); // dataset.xxx dùng để gọi data attribute data-xxx

const link = document.querySelector('.nav__link--btn');
console.log(link.href); // .href sẽ ra absolute link của href (không phải link trong '')
console.log(link.getAttribute('href')); // .getAttribute('href') sẽ ra relative link 

//console.log(logo.classList.getAttribute(''));

console.log(link.classList);
console.log(link.classList.add('a', 'b')); //thêm class vào 
//console.log(link.classList);
console.log(link.classList.remove('a'));
//console.log(link.classList);
console.log(link.classList.toggle('c')); // có rồi thì bỏ đi , chưa có thì thêm vào
//console.log(link.classList);
console.log(link.classList.contains('a')); // kiểm tra xem có không
//console.log(link.classList);

// dont use , vì nếu dùng sẽ thay thế toàn bộ class (ghi đè tất cả class) bằng class này, nên dùng add và remove bên trên
//link.className = 'hehe';

const h1 = document.querySelector('h1');

// cach 1
const h1Alert = function(e) {
  alert('mouseenter : you are reading the header');
}

h1.addEventListener('mouseenter', h1Alert);

setTimeout(() => h1.removeEventListener('mouseenter', h1Alert), 3000);

*/
// cach 2
/* h1.onmouseenter = function(e) {
  alert('mouseenter : you are in the header');
} */

// cach 3 dùng trực tiếp ở thẻ html, ví dụ onclick="alert('xxxxx')"

/*
//rgb(255,255,255)
const randomInt = (min,max) => Math.floor(Math.random() * (max - min + 1) + min) //// ÔN LẠI CÁCH random 1 số trong khoảng min - max

const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`

document.querySelector('.nav__link').addEventListener('click', function(e){
  this.style.backgroundColor = randomColor(); // this TRỎ ĐẾN NƠI addEventListener ATTACH
  console.log('LINK', e.target, e.currentTarget);
  console.log(this === e.currentTarget);
  console.log(this === e.target);

  // stop propagation
  //e.stopPropagation();
})

document.querySelector('.nav__links').addEventListener('click', function(e){
  this.style.backgroundColor = randomColor();
  console.log('CONTAINER', e.target, e.currentTarget);
},true) // useCapture

document.querySelector('.nav').addEventListener('click', function(e){
  this.style.backgroundColor = randomColor(); 
  console.log('NAV', e.target, e.currentTarget);
},true) // giá trị thứ 3 của function addEventListener: true -> function sẽ bắt event ở capturing phase, false -> function sẽ bắt event ở bubbling phase

*/

const h1 = document.querySelector('h1');
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orange';
[...h1.children].forEach(el => console.log(el));

console.log(h1.previousElementSibling); // không có, vì h1 là element đầu tiên của thẻ cha của nó
console.log(h1.nextElementSibling); // chỉ lấy element
console.log(h1.previousSibling); // lấy hết không cứ element
console.log(h1.nextSibling);

console.log(h1.parentElement);
console.log(h1.parentNode);

// closest -> giống querySelector nhưng thay vì chọn các thẻ con, chọn các thẻ cha
console.log(h1.closest('header'));
console.log(h1.closest('.header__title'));
console.log(h1.closest('highlight')); // không có vì các thẻ cha không có class highlight
h1.closest('h1').style.backgroundColor = 'var(--gradient-primary)';
h1.closest('header').style.background = 'var(--gradient-secondary)';

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(el => function(el){
  if(el !== h1) el.style.transform = 'scale(0.5)';
})
