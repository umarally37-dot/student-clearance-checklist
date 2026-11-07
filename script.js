// 1. The data: an array (list) of objects, one per requirement
let requirements = [
    { id: 1, office: "Library", name: "Return all borrowed books", status: "pending" },
    { id: 2, office: "Finance", name: "Clear all tuition fees", status: "complete" },
    { id: 3, office: "Registry", name: "Submit final results form", status: "pending" },
    {id: 4, office: "IT", name: "Return borrowed equipment", status: "complete" },
]
// 2. Find the list on the page
const list = document.getElementById("requirement-list");
// 3. A function that shows every requirement on the page
function showRequirements() {
    // 4. Clear the list first
    list.innerHTML = "";
    
    for (let i = 0; i < requirements.length; i++) {
        const item = requirements[i];
       
        // 5. Create a new list item for each requirement
        const li = document.createElement("li");
        li.textContent = item.office + ": " + item.name + " (" + item.status + ")";
        
        // 6. Add the list item to the list
        list.appendChild(li);
    }
}
// 7. Call the function to show the requirements when the page loads
showRequirements();