//Gerar ticket
function generateTicket() {
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const githubUsername = document.getElementById('github-username').value;
    const fotoFile = document.getElementById('foto-upload').files[0];

    //Erro de preenchimento
    if (!fullName || !email || !githubUsername || !fotoFile) {
        alert('Por favor, preencha todos os campos para gerar seu ticket.');
        return;
    }

    //Capturar o horário 
    const now = new Date();
    const timestamp = now.toLocaleString();

    
        //Lera foto redirecionar para pag ticket
        const reader = new FileReader();
        reader.onload = function (e) {
            const fotoUrl = e.target.result;

            //Redirecionar para ticket.html com os dados como parâmetros na URL
            window.location.href = `ticket.html?fullName=${encodeURIComponent(fullName)}&email=${encodeURIComponent(email)}&githubUsername=${encodeURIComponent(githubUsername)}&fotoUrl=${encodeURIComponent(fotoUrl)}&timestamp=${encodeURIComponent(timestamp)}`;
        };
        reader.readAsDataURL(fotoFile);
            
            
        
    
}

