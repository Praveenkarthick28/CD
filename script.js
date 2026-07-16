/* Cravings Destiny - script.js */
const MENU={
"Fries":[["French Fries (M)",59],["French Fries (L)",99],["Peri Peri Fries",79],["Saucy Fries",79],["Masala Fries",89],["Chicken Loaded Fries",149]],
"Burgers":[["Veg Burger",89],["Chicken Burger",109],["Cheesy Chicken Burger",129]],
"Wraps":[["Veg Wrap",79],["Chicken Wrap",109],["Paneer Corn Wrap",119],["Tandoori Chicken Wrap",129],["Cheesy Chicken Wrap",139]],
"Milkshakes":[["Strawberry",79],["Blackcurrant",79],["KitKat",79],["Oreo",79],["Chocolate",79],["Blueberry",79]],
"Mojitos":[["Flirty Granadine",89],["Classic",89],["Mint Lime",89],["Blue Curacao",89]]
};

let cart=JSON.parse(localStorage.getItem("cd-cart")||"{}");
const menu=document.getElementById("menu");
const cartItems=document.getElementById("cartItems");
const drawer=document.getElementById("drawer");

function save(){localStorage.setItem("cd-cart",JSON.stringify(cart));renderCart();}
function add(name,price){cart[name]??={price:price,qty:0};cart[name].qty++;save();}

function renderMenu(){
 if(!menu)return;
 menu.innerHTML="";
 Object.entries(MENU).forEach(([cat,items])=>{
   const card=document.createElement("div");
   card.className="card";
   card.innerHTML="<h2>"+cat+"</h2>";
   items.forEach(([n,p])=>{
      const row=document.createElement("div");
      row.className="item";
      row.innerHTML=`<div><strong>${n}</strong><br>₹${p}</div><button>Add</button>`;
      row.querySelector("button").onclick=()=>add(n,p);
      card.appendChild(row);
   });
   menu.appendChild(card);
 });
}

function renderCart(){
 let total=0,count=0;
 if(cartItems) cartItems.innerHTML="";
 Object.entries(cart).forEach(([n,v])=>{
   if(v.qty<1)return;
   total+=v.qty*v.price; count+=v.qty;
   if(cartItems){
    const row=document.createElement("div");
    row.className="item";
    row.innerHTML=`<div>${n}<br>₹${v.price}</div><div><button class="m">-</button> ${v.qty} <button class="p">+</button></div>`;
    row.querySelector(".m").onclick=()=>{v.qty--;if(v.qty<=0)delete cart[n];save();};
    row.querySelector(".p").onclick=()=>{v.qty++;save();};
    cartItems.appendChild(row);
   }
 });
 const cc=document.getElementById("cartCount");
 const ct=document.getElementById("cartTotal");
 if(cc)cc.textContent=count;
 if(ct)ct.textContent=total;
 const dt=document.getElementById("drawerTotal");
 if(dt)dt.textContent=total;
 const bar=document.getElementById("cartBar");
 if(bar)bar.classList.toggle("hidden",count===0);
}

document.getElementById("openCart")?.addEventListener("click",()=>drawer.classList.add("show"));
document.getElementById("closeCart")?.addEventListener("click",()=>drawer.classList.remove("show"));

document.getElementById("locBtn")?.addEventListener("click",()=>{
 if(!navigator.geolocation){alert("Geolocation not supported");return;}
 navigator.geolocation.getCurrentPosition(pos=>{
   const map=`https://maps.google.com/?q=${pos.coords.latitude},${pos.coords.longitude}`;
   const gps=document.getElementById("custGps");
   if(gps)gps.value=map;
   const s=document.getElementById("locStatus");
   if(s)s.textContent="✓ Live location captured";
 });
});

document.getElementById("waBtn")?.addEventListener("click",()=>{
 let msg="Hi Cravings Destiny!\n\nI'd like to place an order.\n\n";
 let total=0,items=0;
 Object.entries(cart).forEach(([n,v])=>{
   msg+=`${n} x ${v.qty} - ₹${v.qty*v.price}\n`;
   total+=v.qty*v.price;
   items+=v.qty;
 });
 msg+=`\nItems: ${items}\nTotal: ₹${total}\n\n`;
 ["custName","custPhone","custAddr"].forEach(id=>{
   const el=document.getElementById(id);
   if(el)msg+=`${id.replace("cust","")}: ${el.value}\n`;
 });
 const gps=document.getElementById("custGps");
 if(gps && gps.value)msg+="Location: "+gps.value;
 window.open("https://wa.me/917305551983?text="+encodeURIComponent(msg),"_blank");
});

renderMenu();
renderCart();
