let myLeads = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const ulEl = document.getElementById("ul-el")
const deleteAllBtn = document.getElementById("delete-btn")
const leadsFromLocalStorage = JSON.parse( localStorage.getItem("myLeads") )
const tabBtn = document.getElementById("tab-btn")


if (leadsFromLocalStorage) {
    myLeads = leadsFromLocalStorage
    render(myLeads)
}

let deleteBtn = document.querySelectorAll(".btn-close")

tabBtn.addEventListener("click", function(){    
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    })
})

function strCut(str){
    if(str.length>20){
        return str.slice(0,50) + "..."
    }else{
        return str
    }
}

function render(leads) {
    let listItems = ""
    for (let i = 0; i < leads.length; i++) {
        listItems += `
            <li class="list-group-item bgc-transparent">
                <a target='_blank' href='${leads[i]}'>
                    ${strCut(leads[i])}
                </a>
                <button type="button" class="btn-close float-end" aria-label="Close"></button>
            </li>
        `
    }
    ulEl.innerHTML = listItems
}

deleteAllBtn.addEventListener("dblclick", function() {
    localStorage.clear()
    myLeads = []
    render(myLeads)
})

inputBtn.addEventListener("click", function() {
    if(inputEl.value.length>0){
    myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads) )
    render(myLeads)
    }
})

ulEl.addEventListener("click",function(e){
    if(e.target.type === "button"){
        let liIndex = ([...e.target.parentElement.parentElement.children].indexOf(e.target.parentElement))
        myLeads.splice(liIndex,1)
        e.target.parentNode.remove()
        localStorage.setItem("myLeads", JSON.stringify(myLeads) )
        render(myLeads)
    }
})