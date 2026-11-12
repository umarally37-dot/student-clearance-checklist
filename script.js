const addForm = document.getElementById("add-form");
const newOffice = document.getElementById("new-office");
const newName = document.getElementById("new-name");
const formMessage = document.getElementById("form-message");
const list = document.getElementById("requirement-list");
const percentText = document.getElementById("percent-text");
const progressBar = document.getElementById("progress-bar");
const remainingText = document.getElementById("remaining-text");
const remainingList = document.getElementById("remaining-list");
const officeFilter = document.getElementById("office-filter");
const statusFilter = document.getElementById("status-filter");
const emptyMessage = document.getElementById("empty-message");

let requirements = [
  {
    id: 1,
    office: "Library",
    name: "Return all borrowed books",
    status: "pending",
  },
  {
    id: 2,
    office: "Finance",
    name: "Clear all tuition fees",
    status: "complete",
  },
  {
    id: 3,
    office: "Registry",
    name: "Submit final results form",
    status: "pending",
  },
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

  percentText.textContent =
    percent + "% complete (" + completeCount + " of " + total + ")";
  progressBar.value = percent;

  if (total > 0 && completeCount === total) {
    remainingText.textContent = "All requirements cleared!";
  } else {
    remainingText.textContent = total - completeCount + " remaining:";
  }
}

function showRequirements() {
  const visible = getFilteredRequirements();
  list.innerHTML = "";

  for (let i = 0; i < visible.length; i++) {
    const item = visible[i];

    const li = document.createElement("li");
    li.className = item.status;

    const text = document.createElement("span");
    text.className = "text";
    text.textContent = item.office + ": " + item.name;

    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = item.status;

    li.appendChild(text);
    li.appendChild(badge);
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

function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.className = type;
}

function nextId() {
  let highest = 0;
  for (let i = 0; i < requirements.length; i++) {
    if (requirements[i].id > highest) {
      highest = requirements[i].id;
    }
  }
  return highest + 1;
}

addForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const office = newOffice.value;
  const name = newName.value.trim();

  if (office === "") {
    showMessage("Please choose an office.", "error");
    return;
  }

  if (name.length < 3) {
    showMessage("The requirement must be at least 3 characters.", "error");
    return;
  }

  for (let i = 0; i < requirements.length; i++) {
    if (
      requirements[i].office === office &&
      requirements[i].name.toLowerCase() === name.toLowerCase()
    ) {
      showMessage(
        "That requirement already exists for " + office + ".",
        "error",
      );
      return;
    }
  }

  requirements.push({
    id: nextId(),
    office: office,
    name: name,
    status: "pending",
  });
  addForm.reset();
  showMessage("Requirement added.", "success");
  showRequirements();
});
officeFilter.addEventListener("change", showRequirements);
statusFilter.addEventListener("change", showRequirements);
showRequirements();
