let ids = 'x';
let base64 = '';

let arrid = JSON.parse(localStorage.getItem('PID'));
let arrname = JSON.parse(localStorage.getItem('PNAME'));
let arrimage = JSON.parse(localStorage.getItem('PIMAGE'));
let arrprice = JSON.parse(localStorage.getItem('PPRICE'));
let arrdesc = JSON.parse(localStorage.getItem('PDESC'));
// localStorage.clear();

viewData();

document.getElementById('pimage').addEventListener('change', function() {
    let reader = new FileReader();
    reader.addEventListener('load', () => {
        base64 = reader.result;
    });
    reader.readAsDataURL(this.files[0]);
});

function addData() {
    let pid = parseInt(document.getElementById('pid').value);
    let pname = document.getElementById('pname').value;
    let pimage = base64;
    let pprice = parseInt(document.getElementById('pprice').value);
    let pdesc = document.getElementById('pdesc').value;

    if(ids=='x') {
        if(arrid==null) {
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
        document.getElementById('pid').value = '';
        document.getElementById('pname').value = '';
        document.getElementById('pimage').value = '';
        document.getElementById('pprice').value = '';
        document.getElementById('pdesc').value = '';

        viewData();
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

        document.getElementById('pid').value = '';
        document.getElementById('pname').value = '';
        document.getElementById('pimage').value = '';
        document.getElementById('pprice').value = '';
        document.getElementById('pdesc').value = '';
        
        viewData();
    }
}

function viewData() {
    if(arrid!='') {
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

          if(arrname[j] > arrname[j+1]) {
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

function filterProducts() {
    let entry = document.getElementById('searchBar').value;
    let html1 ='';
    if(entry!='') {
        for(let x=0; x<arrname.length; x++) {
            if(entry == arrname[x]) {
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
    } else {
        viewData();
    }
    
}

