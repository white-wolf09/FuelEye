let rows = "";

pumps.forEach(p=>{

rows += `
<tr>

<td>${p.name}</td>

<td>${p.trust}%</td>

<td>${p.reviews.length}</td>

</tr>
`;

});

document.getElementById(
"tableData"
).innerHTML = rows;
let reports =
JSON.parse(
localStorage.getItem(
"pendingReports"
)
) || [];

function loadReports(){

let html = "";

reports.forEach((r,index)=>{

if(r.status==="Pending"){

html += `

<div class="admin-card">

<h3>${r.pump}</h3>

<p>${r.review}</p>

<p>User: ${r.user}</p>

<img
src="${r.image}"
width="250">

<br><br>

<button
onclick="approve(${index})">

Approve

</button>

<button
onclick="reject(${index})">

Reject

</button>

</div>

`;

}

});

document.getElementById(
"pendingContainer"
).innerHTML = html;

}

loadReports();
function approve(index){

reports[index].status = "Verified";

localStorage.setItem(
"pendingReports",
JSON.stringify(reports)
);

publishReview(reports[index]);

loadReports();

}

function reject(index){

reports.splice(index,1);

localStorage.setItem(
"pendingReports",
JSON.stringify(reports)
);

loadReports();

}

function publishReview(report){

let approved =
JSON.parse(
localStorage.getItem("approvedReviews")
) || [];

approved.push(report);

localStorage.setItem(
"approvedReviews",
JSON.stringify(approved)
);

}