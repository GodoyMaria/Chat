function inicia_ajax(){
	var req;
	try{
		req = new ActiveXObject("Microsoft.XMLHTTP");
	}catch(e){
		try{
			req = new ActiveXObject("Msxml2.XMLHTTP");
		}
		catch(ex){
			try{
				req = new XMLHttpRequest();
			}
			catch(exc){
				alert("Sem suporte para Ajax");
				req=false;
			}
		}
	}
	return req;
}

function enviar () {
    var req = inicia_ajax();

    if (req) {
        req.onreadystatechange = function() {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    document.getElementById ("chat").innerHTML = req.responseText;
                }
            }

            var mensagem = document.getElementById ("texto").ariaValueMax;
            var url = "msg.php?msg=" + escape (mensagem);
            req.open ("get", url, true);
            req.send (null);
        }

        document.getElementById("texto").value = "";
    }
}

window.onload = ler();

function ler () {
    var req = inicia_ajax();

    if (req) {
        req.onreadystatechange = function (){
            if (req.readyState == 4) {
                if (req.status == 200) {
                    document.getElementById("chat").innerHTML = req.responseText;
                }
            }

            setTimeout("ler()", 3000);
        }

        req.open("get", "msg.php", true);
        req.send(null);
    }
}