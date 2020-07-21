function dataBase() {
    let data =  [
        {
           barcode: 'ITEM000000',
           name: 'Coca-Cola',
           price: 3
         },
         {
           barcode: 'ITEM000001',
           name: 'Sprite',
           price: 3
         },
         {
           barcode: 'ITEM000002',
           name: 'Apple',
           price: 5
         },
         {
           barcode: 'ITEM000003',
           name: 'Litchi',
           price: 15
         },
         {
           barcode: 'ITEM000004',
           name: 'Battery',
           price: 2
         },
         {
           barcode: 'ITEM000005',
           name: 'Instant Noodles',
           price: 4
         }
     ];
     return data;
}


function printReceipt(barcodes) {
    let cartItems = caluItemNum(barcodes);
    let cartItemDetails = getItemDetails(cartItems);
    let cartItemDetailsWithTotalPrice = caluEachItemTotalPrice(cartItemDetails);
    let totalPrice = caluAllItemTotalPrice(cartItemDetailsWithTotalPrice);
    let receipt = fomatReceipt(cartItemDetailsWithTotalPrice, totalPrice);
    console.log(receipt);
}

function caluItemNum(barcodes) {
    let cartItems = [];
    let barcode = '';
    let hasCode = '';
    for (let index = 0; index < barcodes.length; index++) {
        if(hasCode.indexOf(barcodes[index])>=0) {
            continue;
        }
        hasCode += barcodes[index];
        barcode = barcodes[index];
        let quantity = 0;
        barcodes.forEach(e => {
            if(e===barcode) {
                quantity++;
            }
        });
        cartItems.push({barcode:barcode,quantity:quantity});
    }
    return cartItems;
}

function getItemDetails(cartItems) {
    let cartItemDetails = [];
    let itemData = dataBase();
    cartItems.forEach(item => {
        let data = itemData.find((data) => 
            item.barcode === data.barcode
        )
        item = Object.assign(item, data);
        cartItemDetails.push(item);
    });
    return cartItemDetails;
}

function caluEachItemTotalPrice(cartItemDetails) {
    cartItemDetails.forEach(e => {
        e.totalPrice = e.quantity * e.price;
    });
    return cartItemDetails;
}

function caluAllItemTotalPrice(cartItemDetailsWithTotalPrice) {
    let totalPrice = 0;
    cartItemDetailsWithTotalPrice.forEach(e => {
        totalPrice = totalPrice + e.totalPrice;
    });
    return totalPrice;
}

function fomatReceipt(cartItemDetailsWithTotalPrice, totalPrice) {
    let receiptInfo = '';
    let receipt = '';
    for (let i = 0; i < cartItemDetailsWithTotalPrice.length; i++) {
        const e = cartItemDetailsWithTotalPrice[i];
        receiptInfo = receiptInfo + `Name: ${e.name}, Quantity: ${e.quantity}, Unit price: ${e.price} (yuan), Subtotal: ${e.totalPrice} (yuan)`;
        if(i < cartItemDetailsWithTotalPrice.length-1) {
            receiptInfo += '\n';
        }
    }
    receipt = `
***<store earning no money>Receipt ***
${receiptInfo}
----------------------
Total: ${totalPrice} (yuan)
**********************`;
    
    return receipt;

  
}



module.exports = {
    printReceipt
};