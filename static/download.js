function base64ToUint8Array(base64) {
    var binary_string =  window.atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array( len );
    for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes;
}

// Ad-hoc function to download a file to your machine
function download(filename, bytes) {
  var element = document.createElement('a');
  element.href = window.URL.createObjectURL(new Blob([bytes], { type:'application/octet-stream'}));
  element.download = filename;
  element.style.display = 'none';

  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

function downloadFileAndDecrypt() {
    request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                var decrypted = CryptoJS.AES.decrypt(request.responseText, document.getElementById("password").value).toString(CryptoJS.enc.Utf8);
                var bytes = base64ToUint8Array(decrypted);
                var key = window.location.pathname.split('/')[1];
                download(key, bytes);
            }
        }
    };
    request.open('GET','get', true);
    request.send();
}
