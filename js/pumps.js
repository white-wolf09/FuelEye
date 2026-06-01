let pumps = [

{
id:1,
name:"PSO Johar Town",
lat:31.4697,
lng:74.2728,
green:25,
red:2,
rating:4.8,
trust:95,
reviews:[]
},

{
id:2,
name:"Shell Thokar",
lat:31.4600,
lng:74.2400,
green:12,
red:9,
rating:3.1,
trust:55,
reviews:[]
},

{
id:3,
name:"Total Parco",
lat:31.4800,
lng:74.2900,
green:18,
red:3,
rating:4.4,
trust:88,
reviews:[]
}
];
function calculateTrustScore(pump){

let verifiedReports =
JSON.parse(
localStorage.getItem("approvedReviews")
) || [];

let reportCount =
verifiedReports.filter(
r=>r.pump===pump.name
).length;

let score =

(
(pump.green * 3)
+
(reportCount * 5)
+
(pump.rating * 10)
);

let maxScore =

(
(pump.green + reportCount + 5)
* 10
);

pump.trust =
Math.min(
100,
Math.round(
(score/maxScore)*100
)
);

}
function greenFlag(id){

let pump =
pumps.find(p=>p.id===id);

pump.green++;

calculateTrustScore(pump);

alert("Marked Reliable");

}
function redFlag(id){

let pump =
pumps.find(p=>p.id===id);

pump.red++;

calculateTrustScore(pump);

alert("Marked Fraudulent");

}