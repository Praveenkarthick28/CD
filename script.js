/* Cravings Destiny Complete script.js */
const MENU = {'Fries': [('French Fries (M)', 59), ('French Fries (L)', 99), ('Peri Peri Fries', 79), ('Saucy Fries', 79), ('Masala Fries', 89), ('Chicken Loaded Fries', 149)], 'Momos': [('Veg Steamed', 89), ('Veg Fried', 99), ('Paneer Fried', 149), ('Chicken Fried', 119), ('Chicken Tikka', 149)], 'Nuggets': [('Chicken Nuggets (5)', 109), ('Chicken Nuggets (10)', 189), ('Cheese Nuggets (5)', 119), ('Cheese Nuggets (10)', 199)], 'Fried Chicken': [('Classic (M)', 89), ('Classic (L)', 139), ('Peri Peri (M)', 109), ('Peri Peri (L)', 149), ('Chicken Strips (4)', 109), ('Chicken Strips (6)', 149), ('Peri Peri Strips (4)', 129), ('Peri Peri Strips (6)', 159)], 'Wraps': [('Veg Wrap', 79), ('Chicken Wrap', 109), ('Paneer Corn Wrap', 119), ('Tandoori Chicken Wrap', 129), ('Cheesy Chicken Wrap', 139)], 'Spring Rolls': [('Veg Spring Roll', 119), ('Chicken Spring Roll', 149)], 'Sandwiches': [('Veg Sandwich', 89), ('Cheese Sandwich', 109), ('Paneer Sandwich', 129), ('Chicken Sandwich', 149), ('Cheesy Chicken Sandwich', 159)], 'Burgers': [('Veg Burger', 89), ('Chicken Burger', 109), ('Cheesy Chicken Burger', 129)], 'Bread Omelette': [('Classic', 89), ('Cheesy', 109)], 'Fried Rice': [('Veg Fried Rice', 99), ('Chicken Fried Rice', 119)], 'Chicken 65': [('Chicken 65', 109)], 'Milkshakes': [('Strawberry', 79), ('Blackcurrant', 79), ('KitKat', 79), ('Oreo', 79), ('Chocolate', 79), ('Blueberry', 79)], 'Mojitos': [('Flirty Granadine', 89), ('Classic', 89), ('Mint Lime', 89), ('Blue Curacao', 89)], 'Tea': [('Classic', 59), ('Ginger', 69), ('Cardamom', 69)], 'Add-ons': [('Mayo', 19), ('Tandoori Mayo', 19), ('Chipotle Mayo', 19), ('Chilli Sauce', 19), ('Tomato Sauce', 19), ('Cheese Slice', 19)]};

let cart=JSON.parse(localStorage.getItem('cd-cart')||'{}');
const $=id=>document.getElementById(id);

function save(){localStorage.setItem('cd-cart',JSON.stringify(cart));renderCart();}
function addItem(n,p){cart[n]??={price:p,qty:0};cart[n].qty++;save();}
function updateQty(n,d){if(!cart[n])return;cart[n].qty+=d;if(cart[n].qty<=0)delete cart[n];save();}

function renderMenu(){
const root=$('menu'); if(!root)return;
root.innerHTML='';
for(const [cat,items] of Object.entries(MENU)){
 const card=document.createElement('div');card.className='card';
 card.innerHTML=`<h2>${cat}</h2>`;
 items.forEach(([n,p])=>{
   const row=document.createElement('div');
   row.className='item';
   row.innerHTML=`<div><strong>${n}</strong><br>₹${p}</div><button>Add</button>`;
   row.querySelector('button').onclick=()=>addItem(n,p);
   card.appendChild(row);
 });
 root.appendChild(card);
}
}

function renderCart(){
const list=$('cartItems'); if(!list)return;
list.innerHTML='';
let total=0,count=0;
Object.entries(cart).forEach(([n,v])=>{
 total+=v.qty*v.price; count+=v.qty;
 const r=document.createElement('div');
 r.className='item';
 r.innerHTML=`<div><b>${n}</b><br>₹${v.price}</div><div><button class='m'>-</button> ${v.qty} <button class='p'>+</button></div>`;
 r.querySelector('.m').onclick=()=>updateQty(n,-1);
 r.querySelector('.p').onclick=()=>updateQty(n,1);
 list.appendChild(r);
});
if($('cartCount'))$('cartCount').textContent=count;
if($('cartTotal'))$('cartTotal').textContent=total;
if($('drawerTotal'))$('drawerTotal').textContent=total;
$('cartBar')?.classList.toggle('hidden',count===0);
}

$('openCart')?.addEventListener('click',()=>$('drawer').classList.add('show'));
$('closeCart')?.addEventListener('click',()=>$('drawer').classList.remove('show'));

$('locBtn')?.addEventListener('click',()=>{
 if(!navigator.geolocation){alert('Geolocation not supported');return;}
 const b=$('locBtn'); b.disabled=true; b.textContent='Getting Location...';
 navigator.geolocation.getCurrentPosition(pos=>{
   const link=`https://www.google.com/maps?q=${pos.coords.latitude},${pos.coords.longitude}`;
   if($('custGps'))$('custGps').value=link;
   if($('locStatus')){$('locStatus').textContent='✓ Location captured';$('locStatus').style.color='green';}
   b.disabled=false;b.textContent='✓ Location Added';
 },err=>{
   alert('Location unavailable. Please enter address manually.');
   b.disabled=false;b.textContent='📍 Use My Location';
 },{enableHighAccuracy:true,timeout:15000,maximumAge:0});
});

$('waBtn')?.addEventListener('click',()=>{
 const name=$('custName')?.value.trim()||'';
 const phone=$('custPhone')?.value.trim()||'';
 const addr=$('custAddr')?.value.trim()||'';
 if(!name||!phone||!addr){alert('Please enter name, phone and address');return;}
 let msg="Hi Cravings Destiny!\n\nI'd like to place an order.\n\n";
 let total=0,items=0;
 Object.entries(cart).forEach(([n,v])=>{msg+=`• ${n} x ${v.qty} - ₹${v.qty*v.price}\n`;total+=v.qty*v.price;items+=v.qty;});
 msg+=`\nItems: ${items}\nTotal: ₹${total}\n\nName: ${name}\nPhone: ${phone}\nAddress: ${addr}\n`;
 if($('custGps')?.value) msg+='Location: '+$('custGps').value+'\n';
 window.open('https://wa.me/917305551983?text='+encodeURIComponent(msg),'_blank');
});

document.addEventListener('DOMContentLoaded',()=>{renderMenu();renderCart();});
