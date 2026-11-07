
const list = document.getElementById("requirement-list");
const percentText = document.getElementById("percent-text");
const progressBar = document.getElementById("progress-bar");
const remainingText = document.getElementById("remaining-text");
const remainingList = document.getElementById("remaining-list");
const officeFilter = document.getElementById("office-filter");
const statusFilter = document.getElementById("status-filter");
const emptyMessage = document.getElementById("empty-message");

let requirements = [
    { id: 1, office: "Library", name: "Return all borrowed books", status: "pending" },
    { id: 2, office: "Finance", name: "Clear all tuition fees", status: "complete" },
    { id: 3, office: "Registry", name: "Submit final results form", status: "pending" },
    {id: 4, office: "IT", name: "Return borrowed equipment", status: "complete" },
];

function getFilteredRequirements() {
  const office = officeFilter.value;
  const status = statusFilter.value;

  return requirements.filter(function (item) {
    const officeMatches = office === "all" || item.office === office;
    const statusMatches = status === "all" || item.status === status;
    return officeMatches && statusMatches;
  });
}


function updateSummary() {
  let completeCount = 0;
  remainingList.innerHTML = "";

  for (let i = 0; i < requirements.length; i++) {
    const item = requirements[i];

    if (item.status === "complete") {
      completeCount = completeCount + 1;
    } else {
      const li = document.createElement("li");
      li.textContent = item.office + ": " + item.name;
      remainingList.appendChild(li);
    }
  }

  const total = requirements.length;
  let percent = 0;
  if (total > 0) {
    percent = Math.round((completeCount / total) * 100);
  }

  percentText.textContent = percent + "% complete (" + completeCount + " of " + total + ")";
  progressBar.value = percent;

  if (total > 0 && completeCount === total) {
    remainingText.textContent = "All requirements cleared!";
  } else {
    remainingText.textContent = (total - completeCount) + " remaining:";
  }
} 

function showRequirements() {
    const visible = getFilteredRequirements();
    list.innerHTML = "";
    
    for (let i = 0; i < visible.length; i++) {
        const item = visible[i];       
        
        const li = document.createElement("li");
        li.textContent = item.office + ": " + item.name + " (" + item.status + ")";

        const button = document.createElement("button");
        if (item.status === "pending") {
        button.textContent = "Mark complete";
     } else {
        button.textContent = "Mark pending";
     }
     button.addEventListener("click", function () {
        toggleStatus(item.id);
     });

     li.appendChild(button);
        list.appendChild(li);
    }

    emptyMessage.hidden = visible.length !== 0;
    updateSummary();
}
function toggleStatus(id) {
    
    for (let i = 0; i < requirements.length; i++) {
        if (requirements[i].id === id) {
            if (requirements[i].status === "pending") {
                requirements[i].status = "complete";
            } else {
                requirements[i].status = "pending";
            }
        }
    }   
    showRequirements();
}
officeFilter.addEventListener("change", showRequirements);
statusFilter.addEventListener("change", showRequirements);
showRequirements();