window.addEventListener("load", function(event) {
    const url = window.location.href
    if(url.indexOf('order_id')>=0){

        const fullName = document.getElementById('billing_first_name').value + ' ' + document.getElementById('billing_last_name').value,
            email = document.getElementById('billing_email').value,
            phone = document.getElementById('billing_phone').value

        const submitButton = document.querySelector("form[name=checkout] button[type=submit]")

        submitButton.setAttribute('data-fullname', fullName)
        submitButton.setAttribute('data-email', email)
        submitButton.setAttribute('data-phone', phone)

        payWithPaydunya("form[name=checkout] button[type=submit]");

    }
});

function payWithPaydunya(btn) {

    PayDunya.setup({
        selector: $(btn),
        url: wnm_custom.template_url+"/wp-json/wp/v1/paydunya-api",
        method: "GET",
        displayMode: PayDunya.DISPLAY_IN_POPUP,
        beforeRequest: function() {
            console.log("About to get a token and the url");
        },
        onSuccess: function(token) {
            console.log("Token: " +  token);
        },
        onTerminate: function(ref, token, status) {
            alert("le paiement a été effectué avec succès")

            console.log(ref);
            console.log(token);
            console.log(status);
        },
        onError: function (error) {
            alert("Unknown Error ==> ", error.toString());
        },
        onUnsuccessfulResponse: function (jsonResponse) {
            console.log("Unsuccessful response ==> " + jsonResponse.toString());
        },
        onClose: function() {
            console.log("Close");
        }
    }).requestToken();
}