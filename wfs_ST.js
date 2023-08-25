var mainElement = document.createElement("div")
mainElement.id = "mainElement"
mainElement.innerHTML = `
  <div id = "menuButton"> <div>Product Information</div> <div>Revenue Calculator</div> <div>Watched Items</div> </div>
  
  <div id = "productInfo">
  <i>UPC: </i> <o></o><br>
  <i>Item ID: </i> <o></o><br><br>
  <i>Manufacturer Part Number: </i><o></o><br>
  <i>Review Count: </i><o></o><br>
  <i>Positive Review Count: </i><o></o><br>
  <i>Negative Review Count: </i><o></o><br>
  <i>Availability: </i><o></o><br>
  <i>Stock Level: </i><o></o><br>
  <i>Order Limit: </i><o></o><br>
  <i>Returnable: </i><o></o><br>
  <i>Number of Variant: </i><o></o><br>
  <i>Fulfillment: </i><o></o><br>
  </div>

  <div id = "revCalc">
  <i>Competitor's Price:</i> <input> <br>
  <i>Source Price:</i> <input class = "numCalc" id = "sourcePrice"> <br>
  <i>Qty:</i> <input class = "numCalc" id = "qty"> <br>
  <i>Shipping Cost:</i> <input class = "numCalc" id = "shipCost" value = "0"> <br>
  <i>Tax:</i> <input class = "numCalc" id = "tax" value = "5%"> <br>
  <i>Minimum Margin 123%:</i> <input class = "numCalc"> <br>
  <i>Maximum Margin 200%:</i> <input class = "numCalc"> <br>
  <i>Selling Price:</i> <input class = "numCalc" id = "sellPrice"> <br>
  <i>Net Profit:</i> <input class = "numCalc"> <br>
  <i>Profit Margin:</i> <input class = "numCalc"> <br>
  <i>Competitive:</i> <input class = "numCalc" id = "compete"> <br>
  </div>

  <div id = "watchedItems">
  <p></p>
  </div>
  <footer>
  <button id = "monitorButton">Watch this item?</button><br>
  <div>This is a test extension and was made for personal use.</div>
  <div>Created by: <a href="https://www.facebook.com/brianesmade">ian</a> --- Message or contact <a href="https://www.facebook.com/brianesmade">ian</a> for suggestions or revisions</div>
  <div>Extensions for Amazon, tracking number scrapers etc.. are also available</div>
  </footer>
`
setInterval(()=>{

if (document.URL.indexOf("/ip") > 0){
  if(document.getElementById("mainElement") == null){
    document.querySelector(".w_4HBV").append(mainElement)    
  }
  if (document.getElementById("mainElement") != null && document.getElementById("productInfo").children[4].innerHTML == ""){
    y = JSON.parse(document.getElementById("__NEXT_DATA__").textContent)
    v = document.getElementById("productInfo").children
    v[1].innerHTML = y.props.pageProps.initialData.data.product.upc ?? "Data Not Available"
    v[4].innerHTML = y.props.pageProps.initialData.data.product.usItemId ?? "Data Not Available"
    v[8].innerHTML = y.props.pageProps.initialData.data.product.manufacturerProductId ?? "Data Not Available"
    v[11].innerHTML = y.props.pageProps.initialData.data.product.numberOfReviews ?? y.props.pageProps.initialData.data.reviewstotalReviewCount
    v[14].innerHTML = Number(y.props.pageProps.initialData.data.reviews.ratingValueFiveCount) + Number(y.props.pageProps.initialData.data.reviews.ratingValueFourCount) + Number(y.props.pageProps.initialData.data.reviews.ratingValueThreeCount) ?? "Unable to Fetch"
    v[17].innerHTML = Number(y.props.pageProps.initialData.data.reviews.ratingValueTwoCount) + Number(y.props.pageProps.initialData.data.reviews.ratingValueOneCount) ?? "Unable to Fetch"
    v[20].innerHTML = y.props.pageProps.initialData.data.product.availabilityStatus ?? "Data Not Available"
    v[23].innerHTML = y.props.pageProps.initialData.data.product.fulfillmentOptions[0].availableQuantity ?? "Data Not Available"
    v[26].innerHTML = y.props.pageProps.initialData.data.product.fulfillmentOptions[0].orderLimit ?? "Data Not Available"
    v[29].innerHTML = y.props.pageProps.initialData.data.product.returnPolicy.freeReturns ? "Yes":"No"
    v[35].innerHTML = y.props.pageProps.initialData.data.product.fulfillmentType == "FC" ? "WFS": "MF"
    document.querySelector("#revCalc > input:nth-child(2)").value = y.props.pageProps.initialData.data.product.priceInfo.currentPrice.variantPriceString
    if(y.props.pageProps.initialData.data.product.selectedVariantIds.length > 0){
      v[32].innerHTML = y.props.pageProps.initialData.data.product.variantCriteria[0].variantList.length
    //   for (var i = 0; i < y.props.pageProps.initialData.data.product.variantCriteria[0].variantList.length; i++){
    //   let x = y.props.pageProps.initialData.data.product.variantCriteria[0].variantList[i].products[0]
    //   let v = y.props.pageProps.initialData.data.product.variantsMap[x]
    // }
    }else{
      v[32].innerHTML = "No Variation Found"
    }  
  }

  if (document.getElementById("mainElement") != null && location.pathname.indexOf(document.querySelector("#productInfo > o:nth-child(5)").innerHTML) == -1){
    getThis()
  }
  if (document.getElementById("mainElement") != null){
    document.getElementById("mainElement").addEventListener("click",(e)=>{
      if (e.target.innerHTML == "Product Information"){
        document.querySelectorAll("#menuButton")[0].children[0].style.backgroundColor = "rgb(95, 131, 95)"
        document.querySelectorAll("#menuButton")[0].children[1].style.backgroundColor = "rgb(175, 209, 175)"
        document.querySelectorAll("#menuButton")[0].children[2].style.backgroundColor = "rgb(175, 209, 175)"
        document.getElementById("revCalc").style.display = "none"
        document.getElementById("watchedItems").style.display = "none"
        document.getElementById("productInfo").style.display = "inline-block"
      }if (e.target.innerHTML == "Revenue Calculator"){
        document.querySelectorAll("#menuButton")[0].children[0].style.backgroundColor = "rgb(175, 209, 175)"
        document.querySelectorAll("#menuButton")[0].children[1].style.backgroundColor = "rgb(95, 131, 95)"
        document.querySelectorAll("#menuButton")[0].children[2].style.backgroundColor = "rgb(175, 209, 175)"
        document.getElementById("revCalc").style.display = "inline-block"
        document.getElementById("watchedItems").style.display = "none"
        document.getElementById("productInfo").style.display = "none"
      }if (e.target.innerHTML == "Watched Items"){
        document.querySelectorAll("#menuButton")[0].children[0].style.backgroundColor = "rgb(175, 209, 175)"
        document.querySelectorAll("#menuButton")[0].children[1].style.backgroundColor = "rgb(175, 209, 175)"
        document.querySelectorAll("#menuButton")[0].children[2].style.backgroundColor = "rgb(95, 131, 95)"
        document.getElementById("revCalc").style.display = "none"
        document.getElementById("watchedItems").style.display = "inline-block"
        document.getElementById("productInfo").style.display = "none"
       if(localStorage.getItem("wmSKU") != null){
        document.querySelector("#watchedItems > p").innerHTML = JSON.parse(localStorage.getItem("wmSKU")).length + " Listings Monitored... "
       }if (localStorage.getItem("wmSKU") == "[]" || localStorage.getItem("wmSKU") == null) {
        document.querySelector("#watchedItems > p").innerHTML = "No Listings Monitored yet.."
       }
      }
    })
    document.getElementById("revCalc").addEventListener("change",(e)=>{
      v = document.querySelectorAll(".numCalc")
      if (e.target.id == "sourcePrice"){
        e.target.value.indexOf("$") > -1 ? e.target.value = e.target.value.replace("$",""):e.target.value = e.target.value
      }
      if (e.target.id == "qty" && v[0].value != ""){
        tt = v[3].value.includes(5) ? 1.05:1.09
        v[4].value = Number(((Number(v[0].value) * Number(e.target.value) * tt) + Number(v[2].value)) * 1.23).toLocaleString("en-US",{style: "currency",currency: "USD"})
        v[5].value = Number(((Number(v[0].value) * Number(e.target.value) * tt) + Number(v[2].value)) * 2).toLocaleString("en-US",{style: "currency",currency: "USD"})
        v[9].value = v[4].value.replace("$","") <= document.querySelector("#revCalc > input:nth-child(2)").value.replace("$","") ? "Yes":"No" 
        v[9].value.includes("Yes") ? v[9].style.backgroundColor = "lightgreen" : v[9].style.backgroundColor = "rgb(204, 132, 132)"
      }
      if (e.target.id == "tax" && v[0].value != ""){
        e.target.value.indexOf("%") == -1 ? e.target.value = e.target.value + "%": e.target.value = e.target.value
        tt = v[3].value.includes(5) ? 1.05:1.09
        v[4].value = Number(((Number(v[0].value) * Number(v[1].value) * tt) + Number(v[2].value)) * 1.23).toLocaleString("en-US",{style: "currency",currency: "USD"})
        v[5].value = Number(((Number(v[0].value) * Number(v[1].value) * tt) + Number(v[2].value)) * 2).toLocaleString("en-US",{style: "currency",currency: "USD"})
      }
      if (e.target.id == "shipCost" && v[0].value != "" && v[1].value != ""){
        tt = v[3].value.includes(5) ? 1.05:1.09
        v[4].value = Number(((Number(v[0].value) * Number(v[1].value) * tt) + Number(e.target.value)) * 1.23).toLocaleString("en-US",{style: "currency",currency: "USD"})
        v[5].value = Number(((Number(v[0].value) * Number(v[1].value) * tt) + Number(e.target.value)) * 2).toLocaleString("en-US",{style: "currency",currency: "USD"})
        v[9].value = v[4].value.replace("$","") <= document.querySelector("#revCalc > input:nth-child(2)").value.replace("$","") ? "Yes":"No" 
        v[9].value.includes("Yes") ? v[9].style.backgroundColor = "lightgreen" : v[9].style.backgroundColor = "rgb(204, 132, 132)"
      }
      if (e.target.id == "sellPrice" && v[0].value != "" && v[1].value != ""){
        tt = v[3].value.includes(5) ? 1.05:1.09
        e.target.value.indexOf("$") > -1 ? e.target.value = e.target.value.replace("$",""):e.target.value = e.target.value
        total = Number((Number(v[0].value) * Number(v[1].value) * tt) + Number(v[2].value))
        referral =  (Number(e.target.value) * 1.15) - Number(e.target.value)
        v[7].value = Number(Number(e.target.value) - referral - total).toLocaleString("en-US",{style: "currency",currency: "USD"})
        v[8].value = Number(((Number(e.target.value) - referral - total) / total) * 100).toFixed(2) + "%"
      }
    })
  }
}  

if(document.URL.indexOf("search?") > 0 || document.URL.indexOf("browse/") > 0){

  if (document.getElementById("ggmon") == null){
    var gg = document.createElement("div")
    gg.id = "ggmon"
    gg.innerHTML =  `<button>Hide Walmart</button><button>Hide Third-Party</button><br>`
    document.getElementsByClassName("dark-gray flex flex-row items-center ml-auto flex-shrink-0")[0].insertAdjacentElement("beforebegin",gg)
    document.getElementById("ggmon").addEventListener("click",(e)=>{
      v = document.getElementsByClassName("flex flex-wrap w-100 flex-grow-0 flex-shrink-0 ph2 pr0-xl pl4-xl mt0-xl")[0].children
      if (e.target.innerHTML == "Hide Walmart"){
        for (var i = 0; i < v.length; i++){
          if(v[i].innerText.indexOf("Pickup") > 0 && v[i].innerText.indexOf("Options") < 0){
            v[i].innerHTML = ""
          }
        }
      }if(e.target.innerHTML == "Hide Third-Party"){
        for (var i = 0; i < v.length; i++){
          if(v[i].innerText.indexOf("Pickup") < 0 && v[i].innerText.indexOf("Options") < 0){
            v[i].innerHTML = ""
          }
        }
      }
    })
  }
}

},2000)


setTimeout(()=>{
 if(document.getElementById("mainElement") != null){
  document.getElementById("monitorButton").addEventListener("click",()=>{
      confirmation = window.prompt("Do you want to monitor this listing? -- Provide SKU")
      if (confirmation != ""){
        var key = [{
          sku: confirmation,
          selling_price: y.props.pageProps.initialData.data.product.priceInfo.currentPrice.variantPriceString,
          path: location.href
        }]
        if (localStorage.getItem("wmSKU") == null || localStorage.getItem("wmSKU") == "[]"){
          localStorage.removeItem("wmSKU")
          localStorage.setItem("wmSKU",JSON.stringify(key))
        }else{
          var arr = []
          for (var b = 0; b < JSON.parse(localStorage.getItem("wmSKU")).length; b++){
            arr.push(JSON.parse(localStorage.getItem("wmSKU"))[0],key[0])
          }
          localStorage.setItem("wmSKU",JSON.stringify(arr))
        }
      }
  })
 }
 if(document.querySelector("#watchedItems > p") != null){
  document.querySelector("#watchedItems > p").addEventListener("click",(e)=>{
      e.target.hidden = true
    for(var i = 0; i < JSON.parse(localStorage.getItem("wmSKU")).length; i++){
      x = JSON.parse(localStorage.getItem("wmSKU"))[i]
      doTHis(x.path, x.selling_price, x.sku)
    }
    setTimeout(()=>{
      if(document.getElementById("rm") != null){
       document.querySelectorAll("#rm").forEach((e)=>{
        e.addEventListener("click",(x)=>{
          var arr = []
          var newArr = []
          var lineToRemove = x.target.parentElement.children[0].innerHTML.replace("SKU: ","")
          arr.push(JSON.parse(localStorage.getItem("wmSKU")))
          for (var ky = 0; ky < arr[0].length; ky++){
           if(lineToRemove != arr[0][ky].sku){
           newArr.push(arr[0][ky])
           }
          }
          localStorage.setItem("wmSKU",JSON.stringify(newArr))
          x.target.parentElement.remove()
        })
       })
      }
    },2000)
  })
}
},2000)


async function getThis(){
  var statData = await fetch(location.href)
  var nStatData = await statData.text()
  var parser = new DOMParser()
  var newBod = parser.parseFromString(nStatData,"text/html")
  y = JSON.parse(newBod.getElementById("__NEXT_DATA__").textContent)
  v = document.getElementById("productInfo").children
  v[1].innerHTML = y.props.pageProps.initialData.data.product.upc ?? "Data Not Available"
  v[4].innerHTML = y.props.pageProps.initialData.data.product.usItemId ?? "Data Not Available"
  v[8].innerHTML = y.props.pageProps.initialData.data.product.manufacturerProductId ?? "Data Not Available"
  v[11].innerHTML = y.props.pageProps.initialData.data.product.numberOfReviews ?? "Data Not Available"
  v[14].innerHTML = Number(y.props.pageProps.initialData.data.reviews.ratingValueFiveCount) + Number(y.props.pageProps.initialData.data.reviews.ratingValueFourCount) + Number(y.props.pageProps.initialData.data.reviews.ratingValueThreeCount) ?? "Unable to Fetch"
  v[17].innerHTML = Number(y.props.pageProps.initialData.data.reviews.ratingValueTwoCount) + Number(y.props.pageProps.initialData.data.reviews.ratingValueOneCount) ?? "Unable to Fetch"
  v[20].innerHTML = y.props.pageProps.initialData.data.product.availabilityStatus ?? "Data Not Available"
  v[23].innerHTML = y.props.pageProps.initialData.data.product.fulfillmentOptions[0].availableQuantity ?? "Data Not Available"
  v[26].innerHTML = y.props.pageProps.initialData.data.product.fulfillmentOptions[0].orderLimit ?? "Data Not Available"
  v[29].innerHTML = y.props.pageProps.initialData.data.product.returnPolicy.freeReturns ? "Yes":"No"
  v[35].innerHTML = y.props.pageProps.initialData.data.product.fulfillmentType == "FC" ? "WFS": "MF"
  document.querySelector("#revCalc > input:nth-child(2)").value = y.props.pageProps.initialData.data.product.priceInfo.currentPrice.variantPriceString
  if(y.props.pageProps.initialData.data.product.selectedVariantIds.length > 0){
    v[32].innerHTML = y.props.pageProps.initialData.data.product.variantCriteria[0].variantList.length
  }else{
    v[32].innerHTML = "No Variation Found"
  }
}

async function doTHis(r,t,j){
  var statData = await fetch(r)
  var nStatData = await statData.text()
  var parser = new DOMParser()
  var newBod = parser.parseFromString(nStatData,"text/html")
  y = JSON.parse(newBod.getElementById("__NEXT_DATA__").textContent)
  x = document.createElement("div")
  x.innerHTML = `<o>SKU: ${j}</o> 
  <o>Old Price: ${t}</o>
  <o>Availability: ${y.props.pageProps.initialData.data.product.availabilityStatus}</o>
  <o>Current Price: ${t}</o><i id ="rm">remove</i><br>`
  document.getElementById("watchedItems").append(x)
  if (Number(t.replace("$","")) > Number(y.props.pageProps.initialData.data.product.availabilityStatus.replace("$",""))){
    x.style.backgroundColor = "rgb(189, 109, 109)"
  }else{
    x.style.backgroundColor = "rgb(175, 209, 175)"
  }
  
}