let ids = 'x';
let base64 = '';

let arrid = JSON.parse(localStorage.getItem('PID'));
let arrname = JSON.parse(localStorage.getItem('PNAME'));
let arrimage = JSON.parse(localStorage.getItem('PIMAGE'));
let arrprice = JSON.parse(localStorage.getItem('PPRICE'));
let arrdesc = JSON.parse(localStorage.getItem('PDESC'));
// localStorage.clear();

// viewData();

document.getElementById('pimage').addEventListener('change', function() {
    let reader = new FileReader();
    reader.addEventListener('load', () => {
        base64 = reader.result;
    });
    reader.readAsDataURL(this.files[0]);
});


function clsModal() {
    document.getElementById("product-form").reset();
}


function validate() {

    let pid = document.getElementById('pid').value;
    let pname = document.getElementById('pname').value;
    let pimage = base64;
    let pprice = document.getElementById('pprice').value;
    let pdesc = document.getElementById('pdesc').value;
    let flag = true;

    if(document.getElementById('pid').disabled==false) {
        if(pid=='') {
            document.getElementById('iderr').innerHTML = "Enter product ID";
            flag = false;
        } else if(pid.length>6) {
            document.getElementById('iderr').innerHTML = "Enter valid product ID (character < 6)";
            flag = false;
        } else if(parseInt(pid)<1) {
            document.getElementById('iderr').innerHTML = "Product ID must be greater than 0";
            flag = false;
        } 
        else if(!(localStorage.getItem('PID')===null) && JSON.parse(localStorage.getItem('PID')).includes(parseInt(pid))) {
            document.getElementById('iderr').innerHTML = "Enter unique product ID";
            flag = false;
        } 
        else {
            document.getElementById('iderr').innerHTML = "";
        }
    }

    if(pname=='') {
        document.getElementById('nameerr').innerHTML = "Enter product name";
        flag = false;
    } else {
        document.getElementById('nameerr').innerHTML = "";
    }

    if(pimage=='') {
        document.getElementById('imgerr').innerHTML = "Select product image";
        flag = false;
    } else {
        document.getElementById('imgerr').innerHTML = "";
    }
    
    if(pprice=='') {
        document.getElementById('priceerr').innerHTML = "Enter product price";
        flag = false;
    } else if(parseFloat(pprice)>1000000 || parseFloat(pprice)<=0) {
        document.getElementById('priceerr').innerHTML = "Enter product price (less than 10 lakh)";
        flag = false;
    } else {
        document.getElementById('priceerr').innerHTML = "";
    }

    if(pdesc=='') {
        document.getElementById('descerr').innerHTML = "Enter product prdescriptionce";
        flag = false;
    } else {
        document.getElementById('descerr').innerHTML = "";
    }

    return flag;
}


function addData() {
    arrid = JSON.parse(localStorage.getItem('PID'));
    arrname = JSON.parse(localStorage.getItem('PNAME'));
    arrimage = JSON.parse(localStorage.getItem('PIMAGE'));
    arrprice = JSON.parse(localStorage.getItem('PPRICE'));
    arrdesc = JSON.parse(localStorage.getItem('PDESC'));

    let pid = parseInt(document.getElementById('pid').value);
    let pname = document.getElementById('pname').value;
    let pimage = base64;
    let pprice = parseInt(document.getElementById('pprice').value);
    let pdesc = document.getElementById('pdesc').value;

    if(validate()) {
        if(ids=='x') {
            if(arrid==null) {
                console.log('hello');
                let data1 = [pid];
                let data2 = [pname];
                let data3 = [pimage];
                let data4 = [pprice];
                let data5 = [pdesc];

                localStorage.setItem('PID', JSON.stringify(data1));
                localStorage.setItem('PNAME', JSON.stringify(data2));
                localStorage.setItem('PIMAGE', JSON.stringify(data3));
                localStorage.setItem('PPRICE', JSON.stringify(data4));
                localStorage.setItem('PDESC', JSON.stringify(data5));

            } else {
                arrid.push(pid);
                arrname.push(pname);
                arrimage.push(pimage);
                arrprice.push(pprice);
                arrdesc.push(pdesc);

                localStorage.setItem('PID', JSON.stringify(arrid));
                localStorage.setItem('PNAME', JSON.stringify(arrname));
                localStorage.setItem('PIMAGE', JSON.stringify(arrimage));
                localStorage.setItem('PPRICE', JSON.stringify(arrprice));
                localStorage.setItem('PDESC', JSON.stringify(arrdesc));

            }
            
        } else {
            arrid[ids] = pid;
            arrname[ids] = pname;
            arrimage[ids] = pimage;
            arrprice[ids] = pprice;
            arrdesc[ids] = pdesc;

            localStorage.setItem('PID', JSON.stringify(arrid));
            localStorage.setItem('PNAME', JSON.stringify(arrname));
            localStorage.setItem('PIMAGE', JSON.stringify(arrimage));
            localStorage.setItem('PPRICE', JSON.stringify(arrprice));
            localStorage.setItem('PDESC', JSON.stringify(arrdesc));
        }
        

        if(document.getElementById('pid').disabled==false) {
            const toastTrigger = document.getElementById('addData');
            const toastLiveExample = document.getElementById('liveToast');
            if (toastTrigger) {
                // toastTrigger.addEventListener('click', () => {
                    const toast = new bootstrap.Toast(toastLiveExample);
                    toast.show();
                // })
            }
            document.getElementById("product-form").reset();
        } else {
            location.reload();
        }
    }
}

function viewData() {

    if(arrid!==null) {
        let html = '';
        for(k in arrid) {
            html += `<tr>
            <td>${arrid[k]}</td>
            <td>${arrname[k]}</td>
            <td><div style="width:100px; height:100px;"><img style="max-width: 100%; max-height:100%;" src="${arrimage[k]}"/></div</td>
            <td>${arrprice[k]}</td>
            <td>${arrdesc[k]}</td>
            <td><button class="btn" onclick="editData(${k})" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fas fa-edit"></i></button></td>
            <td><button class="btn" onclick="deleteData(${k})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`;
        }
        document.getElementById('tblrow').innerHTML = html;
    }
}

function editData(delid) {

    ids = delid;
    base64 = arrimage[delid];
    document.getElementById('pid').value = arrid[delid];
    document.getElementById('pname').value = arrname[delid];
    document.getElementById('pprice').value = arrprice[delid];
    document.getElementById('pdesc').value = arrdesc[delid];
}

function deleteData(delid) {

    arrid.splice(delid, 1);
    arrname.splice(delid, 1);
    arrimage.splice(delid, 1);
    arrprice.splice(delid, 1);
    arrdesc.splice(delid, 1);

    localStorage.setItem('PID', JSON.stringify(arrid));
    localStorage.setItem('PNAME', JSON.stringify(arrname));
    localStorage.setItem('PIMAGE', JSON.stringify(arrimage));
    localStorage.setItem('PPRICE', JSON.stringify(arrprice));
    localStorage.setItem('PDESC', JSON.stringify(arrdesc));

    viewData();
}


function sortById() {

    for(var i = 0; i<arrid.length; i++) {

        for(var j=0; j < (arrid.length-i-1); j++) {

          if(arrid[j] > arrid[j+1]) {
            var temp = arrid[j];
            arrid[j] = arrid[j + 1];
            arrid[j+1] = temp;

            temp = arrname[j];
            arrname[j] = arrname[j + 1];
            arrname[j+1] = temp;

            temp = arrimage[j];
            arrimage[j] = arrimage[j + 1];
            arrimage[j+1] = temp;

            temp = arrprice[j];
            arrprice[j] = arrprice[j + 1];
            arrprice[j+1] = temp;

            temp = arrdesc[j];
            arrdesc[j] = arrdesc[j + 1];
            arrdesc[j+1] = temp;
          }
        }
    }

    localStorage.setItem('PID', JSON.stringify(arrid));
    localStorage.setItem('PNAME', JSON.stringify(arrname));
    localStorage.setItem('PIMAGE', JSON.stringify(arrimage));
    localStorage.setItem('PPRICE', JSON.stringify(arrprice));
    localStorage.setItem('PDESC', JSON.stringify(arrdesc));

    viewData();
}

function sortByName() {

    for(var i = 0; i<arrid.length; i++) {

        for(var j=0; j < (arrid.length-i-1); j++) {

          if(arrname[j].toUpperCase() > arrname[j+1].toUpperCase()) {
            var temp = arrid[j];
            arrid[j] = arrid[j + 1];
            arrid[j+1] = temp;

            temp = arrname[j];
            arrname[j] = arrname[j + 1];
            arrname[j+1] = temp;

            temp = arrimage[j];
            arrimage[j] = arrimage[j + 1];
            arrimage[j+1] = temp;

            temp = arrprice[j];
            arrprice[j] = arrprice[j + 1];
            arrprice[j+1] = temp;

            temp = arrdesc[j];
            arrdesc[j] = arrdesc[j + 1];
            arrdesc[j+1] = temp;
          }
        }
    }

    localStorage.setItem('PID', JSON.stringify(arrid));
    localStorage.setItem('PNAME', JSON.stringify(arrname));
    localStorage.setItem('PIMAGE', JSON.stringify(arrimage));
    localStorage.setItem('PPRICE', JSON.stringify(arrprice));
    localStorage.setItem('PDESC', JSON.stringify(arrdesc));

    viewData();
}

function sortByPrice() {

    for(var i = 0; i<arrid.length; i++) {

        for(var j=0; j < (arrid.length-i-1); j++) {

          if(arrprice[j] > arrprice[j+1]) {
            var temp = arrid[j];
            arrid[j] = arrid[j + 1];
            arrid[j+1] = temp;

            temp = arrname[j];
            arrname[j] = arrname[j + 1];
            arrname[j+1] = temp;

            temp = arrimage[j];
            arrimage[j] = arrimage[j + 1];
            arrimage[j+1] = temp;

            temp = arrprice[j];
            arrprice[j] = arrprice[j + 1];
            arrprice[j+1] = temp;

            temp = arrdesc[j];
            arrdesc[j] = arrdesc[j + 1];
            arrdesc[j+1] = temp;
          }
        }
    }

    localStorage.setItem('PID', JSON.stringify(arrid));
    localStorage.setItem('PNAME', JSON.stringify(arrname));
    localStorage.setItem('PIMAGE', JSON.stringify(arrimage));
    localStorage.setItem('PPRICE', JSON.stringify(arrprice));
    localStorage.setItem('PDESC', JSON.stringify(arrdesc));

    viewData();
}

function filterProducts(y) {

    let html1 ='';
    for(let x=0; x<arrid.length; x++) {
        if((arrname[x].toUpperCase()).includes(y.toUpperCase()) || (arrdesc[x].toUpperCase()).includes(y.toUpperCase())) {
            html1 += `<tr>
            <td>${arrid[x]}</td>
            <td>${arrname[x]}</td>
            <td><div style="width:100px; height:100px;"><img style="max-width: 100%; max-height:100%;" src="${arrimage[x]}"/></div</td>
            <td>${arrprice[x]}</td>
            <td>${arrdesc[x]}</td>
            <td><button class="btn" onclick="editData(${x})" data-bs-toggle="modal" data-bs-target="#staticBackdrop"><i class="fas fa-edit"></i></button></td>
            <td><button class="btn" onclick="deleteData(${x})"><i class="fa-solid fa-trash"></i></button></td>
            </tr>`;
        }
        document.getElementById('tblrow').innerHTML = html1;
    }
}
