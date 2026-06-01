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
let pendingReports =
JSON.parse(
localStorage.getItem("pendingReports")
) || [];

function submitEvidence(){

let pump =
document.getElementById(
"pumpSelect"
).value;

let review =
document.getElementById(
"reportText"
).value;

let image =
document.getElementById(
"proofImage"
).files[0];

if(!image){
alert("Upload proof image");
return;
}

let reader = new FileReader();

reader.onload = function(e){

pendingReports.push({

pump:pump,
review:review,
image:e.target.result,
status:"Pending",

user:
JSON.parse(
localStorage.getItem("loggedUser")
)?.name || "Anonymous",

date:new Date()

});

localStorage.setItem(
"pendingReports",
JSON.stringify(pendingReports)
);

alert(
"Evidence Submitted Successfully"
);

};

reader.readAsDataURL(image);

}