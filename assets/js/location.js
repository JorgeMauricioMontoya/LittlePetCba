window.addEventListener('load', function(){

    emailjs.init("wL0I2WymHVertsbw-"); // 🔹 TU PUBLIC KEY

    const posElt = document.getElementById('Pos');
    const posLinkElt = document.querySelector('#PosLink > a');
    const sendBtn = document.getElementById('sendMail');

    navigator.geolocation.getCurrentPosition(geoposOK, geoposKO);

    function geoposOK(pos){

        const lat = pos.coords.latitude;
        const long = pos.coords.longitude;
        const mapUrl = `https://maps.google.com/?q=${lat},${long}`;

        posElt.textContent = `${lat}, ${long}`;
        posLinkElt.href = mapUrl;
        posLinkElt.textContent = "Mostrar tu posición en un mapa";

        sendBtn.addEventListener('click', function(){

            // 📅 Hora exacta del escaneo
            const now = new Date();
            const time = now.toLocaleString("es-AR", {
                timeZone: "America/Argentina/Buenos_Aires",
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit"
            });

            const templateParams = {
                lat: lat,
                long: long,
                map_url: mapUrl,
                time: time,
                namePet: "Brownie",
                to_email: "maumontoya99@gmail.com"
            };

            emailjs.send("service_vndscod", "template_tco7pdf", templateParams) // 🔹 SERVICE ID, TEMPLATE ID
            .then(function(response) {
                window.location.href = "index.html";
                console.log("SUCCESS!", response.status, response.text);
            }, function(error) {
                alert("Error al enviar ❌");
                console.log("FAILED...", error);
            });

        });
    }

    function geoposKO(err){
        posElt.textContent = "Error obteniendo ubicación: " + err.message;
    }

});
