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