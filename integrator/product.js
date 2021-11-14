var getParams = function (url) {
  var params = {};
  var parser = document.createElement('a');
  parser.href = url;
  var query = parser.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    params[pair[0]] = decodeURIComponent(pair[1]);
  }
  return params;
};

currenturl = window.location.href

urlParams = getParams(currenturl)

cartlink = document.getElementById("CartLink")
cartlink.href = "cart.html?uname=" + urlParams["uname"]
logo = document.getElementById("log")
logo.href = "homepage.html?uname=" + urlParams["uname"]

searchPage = "search.html?uname=" + urlParams['uname'] + "&query="

function search(){
	text = document.getElementById("searchtext").value
	window.location.href = searchPage + text
}


var corsURL = ""
corsURL = "https://cors-anywhere.herokuapp.com/"

//var url = "http://127.0.0.1:67";  //Local Running
var url = "ec2-18-218-174-73.us-east-2.compute.amazonaws.com:";  //AWS Running
port = "67"
path = '/api/v1/product'
turl = url + port + path
Url = corsURL + turl

port = "67"
path = '/api/v1/recommend'
turl = url + port + path
PredictUrl = corsURL + turl

port = "67"
path = '/api/v1/cart'
turl = url + port + path
CartUrl = corsURL + turl
var bookTitle=""


function addToCart2(){
	data = {"username": urlParams['uname'], "id": parseInt(urlParams['id'])}
	json2 = JSON.stringify(data);
	console.log(data)
	console.log(json2)
	var xhttp = new XMLHttpRequest()
    xhttp.open("POST", CartUrl, true);
    xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');

    xhttp.onreadystatechange = function () {

      if (xhttp.readyState == 4 && xhttp.status == "201") {
        window.location.href = "cart.html?uname=" + urlParams['uname']
      }
      else(xhttp.readyState == 4)
      {
      	console.log(xhttp.responseText)
      	console.log(xhttp.status)
      } 

    }
    xhttp.send(json2);
}



function loadPage(){
	
	productid = urlParams["id"]
	var data = {"id": productid};
    var json = JSON.stringify(data);

    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", Url, true);
    xhttp.setRequestHeader('Content-type','application/json; charset=utf-8');

    xhttp.onreadystatechange = function () {
        
        if (xhttp.readyState == 4 && xhttp.status == "200") {

        	console.log('hi')
           
        	//Loading the page
           var item = JSON.parse(xhttp.response)
           title = document.getElementById('book_title')
           title.innerHTML = item.product_name
           author = document.getElementById('book_author')
           author.innerHTML = "by " + item.brand
           /*rate = document.getElementById('book_rating')
           rate.innerHTML = "Rating - " + item.rating */
           price = document.getElementById('price')
           price.innerHTML = "&#8377;" + item.retail_price
           desc = document.getElementById('des')
           //console.log(item.description)
           desc.innerHTML = item.description.toString()
           img = document.getElementById('book_img')
           bookTitle = item.product_name
           setTimeout(loadImage, 1);

           console.log("1")

           //Recommendations
           setTimeout(recommend, 3000);  
           
           function loadImage(){
              console.log("2");
              link = item.image
              lista = link.split(',')
              newlink = lista[0].slice(2,lista[0].length-1)
              console.log(newlink)
              img.src = newlink;
         }

    	}   

	}	
	xhttp.send(json);
}


function recommend(){
           console.log("3")
           data2 = {"bookname": bookTitle};
           json2 = JSON.stringify(data2);
           console.log(json2)
            var xhttp2 = new XMLHttpRequest();
          xhttp2.open("POST", PredictUrl, true);
          xhttp2.setRequestHeader('Content-type','application/json; charset=utf-8');

           xhttp2.onreadystatechange = function () {

              if(xhttp2.readyState==4 && xhttp2.status==200) {
                var list = xhttp2.response;
                list = JSON.parse(list);
                console.log(list)

              //carousel = document.getElementById('carousel')
              
              for(var i=0;i<list.length;i++) {
                var obj = list[i];
                document.getElementById("item-"+(i+1).toString()).src = obj.image
                nextProductPage = "product.html?uname=" + urlParams['uname'] + '&bookid=' + obj.id
                document.getElementById("a"+(i+1).toString()).href = nextProductPage
              }
              for(var i=0;i<5-list.length;i++)
              {
                document.getElementById("item-"+(5-i).toString()).style.display = "none"
                document.getElementById("a"+(5-i).toString()).style.display = "none"
              }
              }
           }
           xhttp2.send(json2)
}

window.onload = loadPage()











