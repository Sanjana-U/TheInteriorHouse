var corsURL = ""
corsURL = "https://cors-anywhere.herokuapp.com/"


//var url = "http://127.0.0.1:67";  //Local Running
var url = "ec2-18-218-174-73.us-east-2.compute.amazonaws.com:67";  //AWS Running

url = corsURL + url

nextPage = "vendor.html?uname="


//Login
function login(){
    var cUrl = url + "/api/v1/vendorlogin";
    var username = document.getElementById("luname").value;
    var password = document.getElementById("lpwd").value;
    var error = document.getElementById("loginError");
    var data = {"username":username,"password":password};
    var json = JSON.stringify(data);

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", cUrl, true);
    xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');

    xhttp.onreadystatechange = function () {

        if (xhttp.readyState == 4){
          var users = xhttp.responseText;
          console.log(users)
        }
        
        if (xhttp.readyState == 4 && xhttp.status == "200") {
          nextPage = nextPage + username
          window.location.href = nextPage;
        } 

        else if(xhttp.readyState == 4) {
          error.innerHTML = xhttp.status + " : " + xhttp.statusText + " : " + xhttp.responseText;
        }

    }
    xhttp.send(json);
}

//Add user
function add() {

    var cUrl = url + "/api/v1/vendorsignup";
    var username = document.getElementById("uname").value;
    var password = document.getElementById("pwd").value;
    var error = document.getElementById("signError");
    var data = {"username":username,"password":password};
    console.log(data)
    var json = JSON.stringify(data);
    console.log(data)

    nextPage = nextPage + username
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", cUrl, true);
    xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');

    xhttp.onreadystatechange = function () {

        if (xhttp.readyState == 4){
          var users = xhttp.responseText;
          console.log(users)
        }
        
        if (xhttp.readyState == 4 && xhttp.status == "201") {
          console.log("Im here")
          window.location.href = nextPage;
        } 

        else if(xhttp.readyState == 4) {
          error.innerHTML = xhttp.status + " : " + xhttp.statusText + " : " + xhttp.responseText;
        }

    }
    xhttp.send(json);

}