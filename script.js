let cart = [];

function openPage(pageId){

document.getElementById("homePage").style.display="none";

document.querySelectorAll(".page").forEach(page=>{
page.classList.remove("active");
});

document.getElementById(pageId).classList.add("active");

window.scrollTo(0,0);

}

function goHome(){

document.getElementById("homePage").style.display="block";

document.querySelectorAll(".page").forEach(page=>{
page.classList.remove("active");
});

window.scrollTo(0,0);

}

function toggleCart(){

document
.getElementById("cart")
.classList
.toggle("open");

}

function addToCart(button){

const product =
button.closest(".product");

const name =
product.querySelector(".productTitle").innerText;

const priceText =
product.querySelector(".price").innerText;

const price =
parseInt(priceText);

const exists =
cart.find(item => item.name === name);

if(exists){

exists.qty++;

}else{

cart.push({
name:name,
price:price,
qty:1
});

}

renderCart();

}

function renderCart(){

let box =
document.getElementById("cartItems");

let totalBox =
document.getElementById("total");

let count =
document.getElementById("cartCount");

box.innerHTML="";

let total = 0;

if(cart.length === 0){

box.innerHTML =
'<div style="opacity:.6;">السلة فارغة</div>';

}

cart.forEach(item=>{

let subtotal =
item.price * item.qty;

total += subtotal;

box.innerHTML += `

<div class="cartItem">

<div>

<div>${item.name}</div>

<small>
${item.qty} × ${item.price}
</small>

<div>
${subtotal} د.ع
</div>

</div>

<div>

<button onclick="changeQty('${item.name}',1)">
+
</button>

<button onclick="changeQty('${item.name}',-1)">
-
</button>

</div>

</div>

`;

});

totalBox.innerHTML =
`المجموع: ${total} د.ع`;

count.innerHTML =
cart.length;

}

function changeQty(name,amount){

const item =
cart.find(i => i.name === name);

if(!item) return;

item.qty += amount;

if(item.qty <= 0){

cart =
cart.filter(i => i.name !== name);

}

renderCart();

}

function sendWhatsApp(){

if(cart.length === 0){

alert("السلة فارغة");

return;

}

let phone = "9647XXXXXXXX";

let message =
"طلب جديد:%0A%0A";

let total = 0;

cart.forEach(item=>{

let subtotal =
item.price * item.qty;

total += subtotal;

message +=
`- ${item.name}%0A`;

message +=
`الكمية: ${item.qty}%0A`;

message +=
`السعر: ${subtotal} د.ع%0A%0A`;

});

message +=
`المجموع النهائي: ${total} د.ع`;

let url =
`https://wa.me/${phone}?text=${message}`;

window.open(url,"_blank");

}
