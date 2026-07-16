const menu={
"Fries":[["French Fries (M)",59],["French Fries (L)",99],["Peri Peri Fries",79],["Saucy Fries",79],["Masala Fries",89],["Chicken Loaded Fries",149]],
"Burgers":[["Veg Burger",89],["Chicken Burger",109],["Cheesy Chicken Burger",129]],
"Wraps":[["Veg Wrap",79],["Chicken Wrap",109],["Paneer Corn Wrap",119],["Tandoori Chicken Wrap",129],["Cheesy Chicken Wrap",139]],
"Milkshakes":[["Strawberry",79],["Blackcurrant",79],["KitKat",79],["Oreo",79],["Chocolate",79],["Blueberry",79]],
"Mojitos":[["Flirty Granadine",89],["Classic",89],["Mint Lime",89],["Blue Curacao",89]]
};
let cart=JSON.parse(localStorage.getItem("cd-cart")||"{}");
const menuDiv=document.getElementById("menu");
function renderMenu(){
menuDiv.innerHTML="";
Object.entries(menu).forEach(([cat,items])=>{
const c=document.createElement("div");c.className="card";
c.innerHTML=`<h2>${cat}</h2>`;
items.forEach(([n,p])=>{
const d=document.createElement("div");d.className="item";
d.innerHTML=`<div><b>${n}</b><br>₹${p}</div><button>Add</button>`;
d.querySelector("button").onclick=()=>{if(!cart[n])cart[n]={price:p,qty:0};cart[n].qty++;save();};
c.appendChild(d);
});
menuDiv.appendChild(c);
});
}
function save(){localStorage.setItem("cd-cart",JSON.stringify(cart));renderCart();}
function renderCart(){
let items=0,total=0;
const ci=document.getElementById("cartItems");ci.innerHTML="";
Object.entries(cart).forEach(([n,v])=>{
if(v.qty<1)return;
items+=v.qty;total+=v.qty*v.price;
const row=document.createElement("div");row.className="item";
row.innerHTML=`<div>${n}<br>₹${v.price}</div>
<div class="qty"><button>-</button><span>${v.qty}</span><button>+</button></div>`;
const bs=row.querySelectorAll("button");
bs[0].onclick=()=>{v.qty--;if(v.qty<=0)delete cart[n];save();};
bs[1].onclick=()=>{v.qty++;save();};
ci.appendChild(row);
});
document.getElementById("cartCount").textContent=items;
document.getElementById("cartTotal").textContent=total;
document.getElementById("drawerTotal").textContent=total;
document.getElementById("cartBar").classList.toggle("hidden",items===0);
}
document.getElementById("openCart").onclick=()=>drawer.classList.add("show");
document.getElementById("closeCart").onclick=()=>drawer.classList.remove("show");
document.getElementById("waBtn").onclick=()=>{
let msg="Hi Cravings Destiny!%0A%0AI'd like to place an order.%0A%0A";
let total=0,qty=0;
Object.entries(cart).forEach(([n,v])=>{msg+=`${n} x ${v.qty} - ₹${v.qty*v.price}%0A`;total+=v.qty*v.price;qty+=v.qty;});
msg+=`%0AItems: ${qty}%0ATotal: ₹${total}%0A%0AName:%0AAddress:`;
window.open("https://wa.me/917305551983?text="+msg,"_blank");
};
renderMenu();renderCart();
