let dropdown = document.getElementById('dropdown');
let table = document.getElementById('table');
let message = document.getElementById('message');
let jsonPath = "list.json";

function buildBox(){
    // Read data from json and build dropdown and table
    let xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function(){
        if(this.readyState == 1 || this.readyState == 2 || this.readyState == 3 && this.status == 200){
            message.innerHTML = "<h3 class='text-center'>Loading...</h3>";
            dropdown.innerHTML = "";
            table.innerHTML = "";
        }
        else if(this.readyState == 4 && this.status == 200){
            let msg = "";
            try{
                let items = JSON.parse(this.responseText).items;
                msg = "";
                buildDropdown(items);
                buildTable(items,'all');
            }
            catch(err){
                msg = "<h3 class='text-center'>Sorry! Invalid data in table.</h3>";
                dropdown.innerHTML = "";
                table.innerHTML = "";
            }
            finally {
                message.innerHTML = msg;
            }
        }
        else if(this.status == 404){
            message.innerHTML = "<h3 class='text-center'>404! List not found.</h3>";
            dropdown.innerHTML = "";
            table.innerHTML = "";
        }
        else{
            message.innerHTML = "<h3 class='text-center'>Sorry! Something went wrong.</h3>";
            dropdown.innerHTML = "";
            table.innerHTML = "";
        }
    };
    
    xhttp.open("GET",jsonPath,true);
    xhttp.send();
}

function refreshBox(selectedDept){
    // Read data from json and refresh table
    let xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function(){
        if(this.readyState == 1 || this.readyState == 2 || this.readyState == 3 && this.status == 200){
            message.innerHTML = "<h3 class='text-center'>Loading...</h3>";
            table.innerHTML = "";
        }
        else if(this.readyState == 4 && this.status == 200){
            let msg = "";
            try{
                let items = JSON.parse(this.responseText).items;
                msg = "";
                buildTable(items,selectedDept);
            }
            catch(err){
                msg = "<h3 class='text-center'>Sorry! Invalid data in table.</h3>";
                table.innerHTML = "";
            }
            finally{
                message.innerHTML = msg;
            }
        }
        else if(this.status == 404){
            message.innerHTML = "<h3 class='text-center'>404! List not found.</h3>";
            table.innerHTML = "";
        }
        else{
            message.innerHTML = "<h3 class='text-center'>Sorry! Something went wrong.</h3>";
            table.innerHTML = "";
        }
    };
    
    xhttp.open("GET",jsonPath,true);
    xhttp.send();
}

function buildDropdown(itemsList){
    // Build dropdown list from the set of departments in json.
    let uniqueDepts = [];
    let dropdownContent = "<p>CATEGORY</p>";
    dropdownContent += "<select class='form-control' onchange='refreshBox(this.value);' name='dept' id='dept'>";
    dropdownContent += "<option value='all' selected>All</option>";
    for (let i in itemsList){
        if(uniqueDepts.indexOf(itemsList[i].department) === -1){
            dropdownContent += `<option value='${itemsList[i].department}'>${itemsList[i].department}</option>`;
            uniqueDepts.push(itemsList[i].department);
        }
    }
    dropdownContent += "</select>";
    dropdown.innerHTML = dropdownContent;
}

function buildTable(itemList,dept){
    // Build table from the objects in json.
    let tableContent = "<table class='table table-borderless table-hover table-responsive-md'>";
    tableContent += "<tr style='background-color:black; color:white;'><th>Sl.No.</th><th>Name</th><th>Quantity</th><th>Unit</th><th>Department</th><th>Notes</th></tr>"
    for (let i in itemList){
        if(dept === 'all' || dept === itemList[i].department){
            tableContent += "<tr>"
            tableContent += `<td>${itemList[i].sno}</td>`;
            tableContent += `<td>${itemList[i].name}</td>`;
            tableContent += `<td>${itemList[i].qty}</td>`;
            tableContent += `<td>${itemList[i].unit}</td>`;
            tableContent += `<td>${itemList[i].department}</td>`;
            tableContent += `<td>${itemList[i].notes}</td>`;
            tableContent += "</tr>";
        }
    }
    tableContent += "</table>";
    table.innerHTML = tableContent;
}

window.addEventListener('load',buildBox);