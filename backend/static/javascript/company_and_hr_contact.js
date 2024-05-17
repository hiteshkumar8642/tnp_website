function showconfirm(msg,call){
    var con_box = document.getElementById("dialog");

    var msg_box = document.createElement("div");
    msg_box.classList.add('message-box');
    msg_box.textContent=msg;
    con_box.appendChild(msg_box);

    var btn_box = document.createElement("div");
    btn_box.classList.add('button-box');
    msg_box.appendChild(btn_box);

    var yes_btn = document.createElement("button");
    yes_btn.classList.add('yes-btn');
    yes_btn.textContent="Yes";
    btn_box.appendChild(yes_btn);
    yes_btn.addEventListener('click',yesbuttonclicked);

    var no_btn = document.createElement("button");
    no_btn.classList.add('no-btn');
    no_btn.textContent="No";
    btn_box.appendChild(no_btn);
    no_btn.addEventListener('click',nobuttonclicked);

    function yesbuttonclicked(){
        call(true)
    }

    function nobuttonclicked(){
        call(false)
    }
    document.body.appendChild(con_box);
}

function complete(){
    // var submit_btn = document.querySelector("#submit-btn");
    // submit_btn.addEventListener("onclick",()=>{ 
    var alpha = document.querySelector("#company-container");
    var form = document.querySelector("#comp-form");
    var dio = document.querySelector("#dialog");
    alpha.style.visibility = "hidden";
    dio.style.display = "block";
    // alpha.style.backgroundColor = "red";
    // dio.style.backgroundColor ="pink";
    console.log("peruhuygb");
    showconfirm("Do You have it's HR contact?",function(result){
        if(result){
            form.action = "hr_contact.html";
            form.submit();
            console.log("yes");
        }
        else{
            form.action = "company_contact.html";
            form.submit();
            console.log("no");
        }
    });
}


