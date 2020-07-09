/*
*   modals.js
*   Responsible for showing alerts with results, getting input, etc.
*/

var swal = require("sweetalert2");

module.exports = {

    showAlert:function(title, content) {
        swal.fire(title, content);
    }

}