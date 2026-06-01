// 1. Fetch data from localStorage
let approvedReviews = JSON.parse(localStorage.getItem("approvedReviews")) || [];
let pendingReports = JSON.parse(localStorage.getItem("pendingReports")) || [];

// ==========================================
// FIX: Render User's Submitted Reports 
// ==========================================
function loadUserReports() {
    let reportsHtml = "";
    
    // Combine both pending and approved to show the user all their entries
    let allUserReports = [...pendingReports, ...approvedReviews];

    if (allUserReports.length === 0) {
        reportsHtml = "<p>You haven't submitted any reports yet.</p>";
    } else {
        allUserReports.forEach(r => {
            let statusColor = r.status === "Pending" ? "#b58100" : "green";
            reportsHtml += `
            <div class="card" style="border-left: 5px solid ${statusColor}; margin-bottom: 15px; padding: 15px; background: #f8f9fa;">
                <h4>${r.pump}</h4>
                <p>"${r.review}"</p>
                <p><small>Status: <span style="color: ${statusColor}; font-weight: bold;">${r.status}</span> | By: ${r.user}</small></p>
                ${r.image ? `<img src="${r.image}" width="150" style="display:block; margin-top:10px; border-radius:4px;">` : ''}
            </div>`;
        });
    }

    // Insert into your <div id="userReports"></div>
    if (document.getElementById("userReports")) {
        document.getElementById("userReports").innerHTML = reportsHtml;
    }
}

// ==========================================
// NEW FEATURE: Hardcoded Slideshow Card
// ==========================================
const communityReviews = [
    { pump: "PSO Johar Town", review: "InAccurate measurement! Checked with the Device and it was lower than Actual  .", user: "Ali Ahmed", date: "2 mins ago" },
    { pump: "Shell Thokar", review: "Suspected low-quality fuel. Car started knocking right after refueling here.", user: "Zainab Khan", date: "1 hour ago" },
    { pump: "Total Parco", review: "Excellent service and genuine pricing. Highly recommended!", user: "Hamza Malik", date: "Yesterday" }
];

let currentSlide = 0;

function startReviewSlideshow() {
    const feedContainer = document.getElementById("reviewsFeed");
    if (!feedContainer) return;

    function displaySlide() {
        let r = communityReviews[currentSlide];
        feedContainer.innerHTML = `
        <div class="slideshow-card" style="padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #fff; box-shadow: 0 4px 6px rgba(0,0,0,0.05); transition: all 0.5s ease;">
            <h3 style="margin-top:0; color:#0056b3;">${r.pump}</h3>
            <p style="font-style: italic; font-size: 1.1rem;">"${r.review}"</p>
            <p style="margin-bottom:0;"><small><strong>${r.user}</strong> — <span>${r.date}</span></small></p>
        </div>
        `;
        
        // Move to the next slide index (loop back to 0 at the end)
        currentSlide = (currentSlide + 1) % communityReviews.length;
    }

    // Initialize the first slide immediately
    displaySlide();

    // Change slide automatically every 4 seconds
    setInterval(displaySlide, 4000);
}


// ==========================================
// 3. Submit Evidence Function
// ==========================================
function submitEvidence(){
    let pump = document.getElementById("pumpSelect").value;
    let review = document.getElementById("reportText").value;
    let imageFile = document.getElementById("proofImage").files[0];

    if(!review){
        alert("Please enter a review");
        return;
    }

    if(!imageFile){
        alert("Please upload an image");
        return;
    }

    let currentPending = JSON.parse(localStorage.getItem("pendingReports")) || [];
    let reader = new FileReader();
    
    reader.onload = function(e){
        currentPending.push({
            pump: pump,
            review: review,
            image: e.target.result,
            status: "Pending",
            user: JSON.parse(localStorage.getItem("loggedUser"))?.name || "Anonymous"
        });

        localStorage.setItem("pendingReports", JSON.stringify(currentPending));
        alert("Report Submitted Successfully!");
        location.reload();
    };

    reader.readAsDataURL(imageFile);
}

// Execute core tasks on page load
loadUserReports();
startReviewSlideshow();