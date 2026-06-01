let map =
L.map('map').setView(
[31.4697,74.2728],
12
);

L.tileLayer(
'https://tile.openstreetmap.org/{z}/{x}/{y}.png'
).addTo(map);

pumps.forEach(p=>{

let color =
p.trust >= 70
? "green"
: "red";

let marker =
L.circleMarker(
[p.lat,p.lng],
{
color:color,
radius:10
}
).addTo(map);

marker.bindPopup(
`
<h3>${p.name}</h3>

Rating : ${p.rating}

<br>

Trust : ${p.trust}%

<br>

<button onclick="greenFlag(${p.id})">
Green Flag
</button>

<button onclick="redFlag(${p.id})">
Red Flag
</button>

<button onclick="ratePump(${p.id})">
Rate
</button>
`
);

});
function loadReviews(pumpName){

let reviews =
JSON.parse(
localStorage.getItem("approvedReviews")
) || [];

let filtered =
reviews.filter(
r=>r.pump===pumpName
);

let html="";

filtered.forEach(r=>{

html += `
<div class="review">

<h4>${r.user}</h4>

<p>${r.review}</p>

<img src="${r.image}" width="150">

<p>✅ Verified By Admin</p>

</div>
`;

});

document.getElementById(
"reviewsContainer"
).innerHTML = html;

}