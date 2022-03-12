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

    $("#billTotalO").text(ItemTempTotal + "/=");
});

//////////////////////////////finalOrder/////////////////////////
$("#finalOrderO").click(function (){
    if($("#OrderIdFixO").val()!=''&&$("#DateFixO").val()!=''&&$("#CustIDO").val()!=''&&$("#itemCodeO").val()!=''&&
        $("#reCashO").val()!=''){

        let OID=$("#OrderIdFixO").val();
        let ODate=$("#DateFixO").val();
        let OCusId=$("#CustIDO").val();
        let OPrice=ItemSubTempTotal;

    //    ///////order id check/////
        if (OrderIDCheck(OID)){
            alert(OID +" This Order ID Has Already Taken !")
        }

        if(confirm("confirm this order?")){

            let Oder=new FinalOreder(OID,ODate,OCusId,OPrice);
            orderDB.push(Oder);
            ClearTextField();
        }else {
            alert("Order Canceled for some reason")
        }

    }else {
        alert("try again...");
        return;
    }
});

////////////////////////////////////////////////////////////////

//////////////////////Oder ID Checking //////////////////////////
function OrderIDCheck(id){
    for (let i = 0; i < orderDB.length; i++) {
       if (orderDB[i].getOrderID()==id){
           return true;
       }else {
           return false;
       }
    }
}

////////////////////////////////////////////////////////////////

///////////clear All fields for new order///////////////////////
function ClearTextField(){
    $("#OrderIdFixO").val('');
    $("#DateFixO").val('');

    $("#itemCodeO").val('');
    $("#nameItemO").val('');
    $("#quantityItemO").val('');
    $("#quantityForSaleItemO").val('');
    $("#priceItemO").val('');

    $("#billTotalO").val('');
    $("#finalOrderO").val('');
    $("#discountO").val('');
    $("#reCashO").val('');
    $("#BalanceForCusO").val('');

    $("#CustIDO").val('');
    $("#CustNameO").val('');
    $("#CustAddreO").val('');
    $("#CusSala").val('');

    $("#CustomerFinalTableO>tr").remove();
}
////////////////////////////////////////////////////////////////

///////////////////Date Input Validation///////////////////////

var regExDate=/^\d{2}\/\d{2}\/\d{4}$/;
var OrderIDRegEx =/^(OID-)[0-9]{3,4}$/;

$("#DateFixO").keyup(function (){

    let text1 =$("#DateFixO").val();
    if(regExDate.test(text1)){
        $("#DateFixO").css('border', '2px solid green');

        $("#DateFixO").keydown(function (focusNextInput){

            if(focusNextInput.key=="Enter"){

                $("#OrderIdFixO").focus();

//////////////////////////////////////////////////////////////////////////////////////////////////////////
                $("#OrderIdFixO").keyup(function (){

                    let text2=$("#OrderIdFixO").val();
                    if(OrderIDRegEx.test(text2)){
                        $("#OrderIdFixO").css('border', '2px solid green');
                    }else {

                        $("#OrderIdFixO").css('border', '2px solid red');
                        $("#OrderIdFixO").focus();
                    }
                });

            }else {
                $("#DateFixO").focus();
            }
        });


    }else {
        $("#DateFixO").css('border', '2px solid red');
        $("#DateFixO").focus();
    }

});

//////////////////////////////////////////