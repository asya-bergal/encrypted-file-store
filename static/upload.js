function arrayBufferToBase64( buffer ) {
    var binary = '';
    var bytes = new Uint8Array( buffer );
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return window.btoa( binary );
}

function encryptFileAndUpload() {
    var firstFile = document.getElementById('file').files[0];
    var reader = new FileReader();
    reader.onload = function() {
        var base64file = arrayBufferToBase64(reader.result);
        var encrypted = CryptoJS.AES.encrypt(base64file, document.getElementById("password").value);
        document.encrypted.data.value = encrypted;
        document.encrypted.submit();
    }
    reader.readAsArrayBuffer(firstFile);
}
