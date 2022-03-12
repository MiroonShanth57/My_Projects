///////////search Customer ///////////
function SearchCustomer(id){
    for (let i = 0; i < customerDB.length; i++) {
        if (customerDB[i].getCustomerID()==id){
            $("#CustNameO").val(customerDB[i].getCustomerName());
            $("#CustAddreO").val(customerDB[i].getCustomerAddress());
            $("#CustSalaO").val(customerDB[i].getCustomerName());

            return;
        }
    }
}
/////////////////////////////////////

/////////////////////search Item ///////////
function SearchItem(code){
    for (let i = 0; i < itemDB.length; i++) {
        if (itemDB[i].getItemCode()==code){
            $("#nameItemO").val(itemDB[i].getItemName());
            $("#quantityItemO").val(itemDB[i].getItemQuantity());
            $("#priceItemO").val(itemDB[i].getItemPrice());

            return;
        }
    }
}
//////////////////////////////////////////////

/////btn Search Customer//////////////

$("#CustIDO").keydown(function (searchCustomer){
    if (searchCustomer.key=="Enter"){
        if ($("#CustIDO").val()==''){
            alert("Field is empty! try again..")
             return;
        }
        alert("Customer Found");

        SearchCustomer($("#CustIDO").val());
    }
});

////////////////////////////////////

/////btn Search Item//////////////

$("#itemCodeO").keydown(function (searchItem){
    if (searchItem.key=="Enter"){
        if ($("#itemCodeO").val()==''){
            alert("Field is empty! try again..")
            return;
        }
        alert("Item Found");

        SearchItem($("#itemCodeO").val());
    }
});

/////////////////////////////////////////

//////////////Add item to final table//////
let ItemTempTotal=0;
let ItemSubTempTotal=0;

$("#AddToCrtO").click(function (){
    let TotalValueOfItem=$("#priceItemO").val()*$("#quantityForSaleItemO").val();
    ItemTempTotal=ItemTempTotal+TotalValueOfItem;

    let row=`<tr><td>${$("#itemCodeO").val()}</td><td>${$("#nameItemO").val()}</td><td>${$("#quantityForSaleItemO").val()}</td><td>${TotalValueOfItem}</td></tr>`;
    $("#CustomerFinalTableO").append(row)

///////////Quantity - form array/////

    let currentLastQuantity=$("#quantityItemO").val()-$("#quantityForSaleItemO").val();
    $("#quantityItemO").val(currentLastQuantity);

 ////////////////////enter new value to item array//////////////////
    let newQuantityForAdd=searchFomArrayItem($("#itemCodeO").val());
    if(newQuantityForAdd!=1){
        itemDB[newQuantityForAdd].setItemQuantity(currentLastQuantity);
        LoadAllItem();
        SetTextToFieldsItem();
        return;
    }
    /////////////////////////////////////////////////////////////////
});

////////////////////////reduce item///////////////////////////////////

// function (){
//
// }

////////////////////////////////////////////////////////////////













//////////////////////////////////////////