let html = "";

pumps.forEach(p=>{

html += `
<div class="card">

<h3>${p.name}</h3>

<p>Trust Score: ${p.trust}%</p>

<p>Rating: ${p.rating}</p>

<p>
Green Flags: ${p.green}
</p>

<p>
Red Flags: ${p.red}
</p>

</div>
`;

});

document.getElementById(
"pumpList"
).innerHTML = html;