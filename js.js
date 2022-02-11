// Add Customers 
//  Global  
const dataTypes = ["name", "username", "Balance", "email", "phone", "address", "company", "Transaction"]
const customerdata = document.querySelector("#customerdata")
const datawrap = document.querySelector("#datawrap")
const apiURL = "https://jsonplaceholder.typicode.com/users"
const table = document.querySelector("#titles")
const editdatapage = document.querySelector("#customerdataedit")
const Transactionpage = document.querySelector("#Transaction")
// const dealWithPackage = require('D:\college\nti\tasks\Bank 1st\node_modules\dealWithPackages.js')
// add customer data to storge
////////////////////////////////////////////////////////////////////////////
const writeDataToStorge = (title, data) => {
    try {
        localStorage.setItem(title, JSON.stringify(data))

    } catch (e) {
        console.log(e)
    }

}
////////////////////////////////////////////////////////////////////////////
const readCustomerData = (storageItem) => {

    let data
    try {
        data = JSON.parse(localStorage.getItem(storageItem))
        if (!Array.isArray(data)) throw new Error("Data not array")
    }
    catch (e) {
        data = []
    }
    return data
}
const createMyOwnElement = (element) => {
    try {
        let myElement = document.createElement(element.element)
        element.parent.appendChild(myElement)
        if (element.textContent) myElement.textContent = element.textContent
        if (element.classes) myElement.classList = element.classes  // <option class> 
        element.attributes.forEach(attribute => {
            myElement.setAttribute(attribute.key, attribute.val)
        })
        return myElement
    }
    catch (e) {
        console.log(e)
    }
}
//////////////////////////////////////////////////////////
const elementObjCreator = (element, parent, textContent, classes, attributes) => {
    return { element, parent, textContent, classes, attributes }
}
//////////////////////////////////////////////////////////
const drawRow = (e) => {
    createMyOwnElement(elementObjCreator("th", table, e, null, []))
}
////////////////////////////////////////////////////////////////
const onecycle = (e) => {

    for (m in e[1]) {
        drawRow(m)

    }
    return

}
//////////////////////////////////////////////////////////////////////////
const fillTheTable = (cust) => {

    cust.forEach((element, i) => {
        const tr = createMyOwnElement(elementObjCreator("tr", datawrap, null, null, []))
        // element = object
        let index = 0
        for (oneArtibute in element) {
            let st = "";
            if (typeof Object.values(element)[index] === "object") {

                for (i = 0; i < Object.values(Object.values(element)[index]).length; i++) {

                    if (typeof Object.values(Object.values(element)[index])[i] === "object") {

                        for (m = 0; m < Object.values(Object.values(Object.values(element)[index])[i]).length; m++) {
                            st = st + "-" + Object.values(Object.values(Object.values(element)[index])[i])[m]


                        }
                    } else {
                        st = st + "-" + Object.values(Object.values(element)[index])[i]
                    }

                }
                createMyOwnElement(elementObjCreator("td", tr, st, null, []))

            }
            else {
                createMyOwnElement(elementObjCreator("td", tr, Object.values(element)[index], null, []))
            }
            index = index + 1





        }
        const td = createMyOwnElement(elementObjCreator("td", tr, null, null, []))
        const Transaction = createMyOwnElement(
            elementObjCreator("button", td, "Transaction", "btn btn-success mx-3", [])
        )
        Transaction.addEventListener("click", () => {
            let data = []
            data[0] = element
            writeDataToStorge("transaction", data)
            transaction()
        })


        const editbtn = createMyOwnElement(
            elementObjCreator("button", td, "edit", "btn btn-info mx-3", [])
        )
        editbtn.addEventListener("click", () => {
            let data = []
            data[0] = element
            writeDataToStorge("show", data)
            editdata()

        })
        const delBtn = createMyOwnElement(
            elementObjCreator("button", td, "delete", "btn btn-danger mx-3", [])
        )
        delBtn.addEventListener("click", () => deletCustomer(element))

    })

}
///////////////////////////////////////////////////////////////////////////
const edit = (oldData, newData) => {
    index = 0
    oldData.forEach(element => {

        if (element.id == newData.id) {
            oldData[index] = newData
            writeDataToStorge("customers", oldData)
        }

        index = index + 1
    });
}
//////////////////////////////////////////////////////////////////////////////
// Taking data from form
////////////////////////// ADD CUSTOMER PAGE ///////////////////////////////////
const takeInput = (customerdata) => {
    customerdata.addEventListener("submit", function (e) {
        e.preventDefault()
        let cust = { id: Date.now() }
        try {
            dataTypes.forEach(head => {
                if (head == "Transaction") {
                    cust[head] = []
                }
                cust[head] = customerdata.elements[head].value

            })

            // check validation for data
        } catch (e) {

        }
        // check validation for data

        if (isNaN(cust.Balance)) {
            alert("Balance should be Integer Only")
            customerdata.reset()
        }
        else {
            // update the stoarge
            const temp = readCustomerData("customers")
            temp.push(cust)
            writeDataToStorge("customers", temp)

        }

    })
}
//////////////////////////////////////////////////////////////////////////////
if (customerdata) {
    takeInput(customerdata)
}
//////////////////////////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////////////////////////
///////////////////////// DRAW DATA AT SHOW ALL CUSTOMERS /////////////////////////

const drawData = (data) => {
    onecycle(data)
    createMyOwnElement(elementObjCreator("th", table, "Options", null, []))
    fillTheTable(data)



}
if (table) {
    drawData(readCustomerData("customers"))
}
const deletCustomer = (customer) => {
    let index = 0
    let data = readCustomerData("customers")
    data.forEach(element => {

        if (element.id == customer.id) {
            data.splice(index, 1)
        }
        index = index + 1

    }); writeDataToStorge("customers", data)
    window.location.reload();
}

///////////////////////////////////////////////////////////////////////
const editdata = () => {
    if (!editdatapage) { location.replace("editCustomer.html") }

    const custdata = readCustomerData("show")



    const userid = document.querySelector("#id")
    const username = document.querySelector("#name")
    const userphone = document.querySelector("#phone")
    const useraddress = document.querySelector("#address")
    const useremail = document.querySelector("#Email")
    const usercompany = document.querySelector("#company")
    const userUsrname = document.querySelector("#username")
    const userbalance = document.querySelector("#Balance")
 


    console.log(custdata[0].id)
    

    userid.setAttribute("placeholder", `${custdata[0].id}`)
    username.setAttribute("placeholder", `${custdata[0].username}`)
    userphone.setAttribute("placeholder", `${custdata[0].phone}`)
    useraddress.setAttribute("placeholder", `${custdata[0].address}`)
    useremail.setAttribute("placeholder", `${custdata[0].email}`)
    usercompany.setAttribute("placeholder", `${custdata[0].company}`)
    userUsrname.setAttribute("placeholder", `${custdata[0].username}`)
    userbalance.setAttribute("placeholder", `${custdata[0].Balance}`)


    editdatapage.addEventListener("submit", function (e) {
        e.preventDefault()




        let cust = readCustomerData("customers")
        let newdata = { id: custdata[0].id }

        dataTypes.forEach(head => newdata[head] = editdatapage.elements[head].value)
        index = 0
        cust.forEach(e => {

            if (e.id == newdata.id) {
                cust[index] = newdata
                writeDataToStorge("customers", cust)
                editdatapage.reset()
                window.alert("Data Updated")
            }
            index = index + 1
        }



        )

    }

    )

}
//////////////////////////////////////////////////////////////////////////
if (editdatapage) {
    editdata()
}
const transaction = () => {
    if (!Transactionpage) { location.replace("transaction.html") }

    const withdraw = document.querySelector("#withdraw")
    const add = document.querySelector("#add")
    const type = document.getElementById("type")
    const custdata = readCustomerData("transaction")
    const btn = document.querySelector("#added")
    const balance = document.getElementById("balance")


    const userid = document.querySelector("#custid")




    userid.setAttribute("placeholder", `${custdata[0].id}`)


    withdraw.addEventListener("click", function (e) {
        type.innerText = "withdraw"

    })
    add.addEventListener("click", function (e) {
        type.innerText = "add Balance"
    })

    btn.addEventListener("click", function (e) {
        let typeofTransaction = type.innerHTML
        if (typeofTransaction == "withdraw") {



            let cust = readCustomerData("customers")
            let newdata = { id: custdata[0].id }

            //dataTypes.forEach(head => newdata[head] = Transaction.elements[head].value)
            index = 0
            cust.forEach(e => {

                if (e.id == newdata.id) {
                    cust[index]["Balance"] = cust[index]["Balance"] - balance.value
                   
           
                    cust[index]["Transaction"].push(" withDraw :"+` ${balance.value}`)
                    
                    console.log(  )
                    

                    writeDataToStorge("customers", cust)


                    window.alert("Data Updated")
                }
                index = index + 1
            })

        } else {


            let cust = readCustomerData("customers")
            let newdata = { id: custdata[0].id }

            //dataTypes.forEach(head => newdata[head] = Transaction.elements[head].value)
            index = 0
            cust.forEach(e => {

                if (e.id == newdata.id) {
                    cust[index]["Balance"] = parseInt(cust[index]["Balance"]) + parseInt(balance.value)
                    console.log(cust[index]["Balance"])
                    cust[index]["Transaction"].push(" Added :"+` ${balance.value}`)
                    
                    writeDataToStorge("customers", cust)


                    window.alert("Data Updated")
                }
                index = index + 1
            })


        }
    })




}

if (Transactionpage) {
    transaction()


}
////////////////////////////////////////////////////////////////

////////////////////////// READING USER DATA FROM API BUT COMMENTED DUE TO DATA TYPE IN IT/////////////////////
/*  const readAPI = 
     async(url,cb)=>{
        let data = await fetch(url)
        let d = await data.json()
        cb(d)
        

    } */


/*  readAPI(apiURL,data=>{
   
     temp =readCustomerData("customers")
    temp.push(data)
    writeDataToStorge("customers", temp)

    
 })
 

 */


