//required npms
var inquirer = require('inquirer');
var mysql = require('mysql');

//MySQL connection parameters
var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,

    // Your username
    user: 'root',

    // Your password
    password: 'YourRootPassword',
    database: 'Bamazon'
});

// userInput makes sure that the user is supplying only positive integers for their inputs
function userInput(value) {
    var integer = Number.isInteger(parseFloat(value));
    var sign = Math.sign(value);

    if (integer && (sign === 1)) {
        return true;
    } else {
        return 'We only sell goods, please enter a whole number greater than zero.';
    }
}

// userPurchase will prompt the user for the item and quantity they want like to purchase
function userPurchase() {

    // Prompt the user to select an item from the db
    inquirer.prompt([
        {
            type: 'input',
            name: 'item_id',
            message: 'Please enter the Item ID which you would like to purchase.',
            validate: userInput,
            filter: Number
        },
        {
            type: 'input',
            name: 'quantity',
            message: 'How many do you need?',
            validate: userInput,
            filter: Number
        }
    ]).then(function (input) {
        
        var item = input.item_id;
        var quantity = input.quantity;

        // Query db to confirm that the given item ID exists in the desired quantity
        var queryString = 'SELECT * FROM products WHERE ?';

        connection.query(queryString, { item_id: item }, function (err, data) {
            if (err) throw err;

            // If the user has selected an invalid item ID, data array will be empty

            if (data.length === 0) {
                console.log('ERROR: Invalid Item ID. Select a valid Item ID.');
                currentInventory();

            } else {
                var productData = data[0];

                // If the quantity requested by the user is in stock the users order will be placed
                if (quantity <= productData.stock_quantity) {
                    console.log('Placing your order');

                    // Construct the updating query string
                    var updateQueryString = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

                    // Update the inventory
                    connection.query(updateQueryString, function (err, data) {
                        if (err) throw err;

                        console.log('Your oder has been placed! Your total is $' + productData.price * quantity);
                        console.log('Enjoy your FREE two-day shipping from Bamazon Prime!');
                        console.log("\n---------------------------------------------------------------------\n");

                        // End the database connection
                        connection.end();
                    })
                } else {
                    console.log('Sorry, the item you requested does not have enough stock to complete your order.');
                    console.log('We are sorry for the inconvience. Please modify your order.');
                    console.log("\n---------------------------------------------------------------------\n");

                    currentInventory();
                }
            }
        })
    })
}

// currentInventory will retrieve the current inventory from the database and output it to the console
function currentInventory() {

    // Construct the db query string
    queryString = 'SELECT * FROM products';

    // Make the db query
    connection.query(queryString, function (err, data) {
        if (err) throw err;

        console.log('Current Inventory: ');
        console.log('-------------------------------------------\n');

        var stringOut = '';
        for (var i = 0; i < data.length; i++) {
            stringOut = '';
            stringOut += 'Item ID: ' + data[i].item_id + '  ||  ';
            stringOut += 'Product Name: ' + data[i].product_name + '  ||  ';
            stringOut += 'Department: ' + data[i].department_name + '  ||  ';
            stringOut += 'Price: $' + data[i].price + '\n';

            console.log(stringOut);
        }

        console.log("---------------------------------------------------------------------\n");

        //Prompt the user for item/quantity they would like to purchase
        userPurchase();
    })
}

// runBamazon will execute the main application logic
function runBamazon() {


    // Display the available inventory
    currentInventory();
}

// Run the application logic
runBamazon();