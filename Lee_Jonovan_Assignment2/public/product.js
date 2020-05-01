var products =
[
   {
       "product":"Strawberry Cake",
       "Price":40.00,
       "image":"./images/strawberryshortcake.jpg",
   }, 
   {
        "product":"Brownies",
        "Price":20.00,
        "image":"./images/brownies.jpg",
}, 
{
        "product":"Pies",
        "Price":30.00,
        "image":"./images/pies.jpg",
}, 
{
        "product":"Ice Cream Cake",
        "Price":35.00,
        "image":"./images/icecreamcake.jpg",
}, 
{
        "product":"Donuts",
        "Price":2.00,
        "image":"./images/donuts.jpg",
}, 
{
        "product":"Malasadas",
        "Price":1.50,
        "image":"./images/malasadas.jpg",
}, 

];
if (typeof module !='undefined') {
    module.exports.products = products;
}