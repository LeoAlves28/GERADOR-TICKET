//Drag and Drop
document.addEventListener('DOMContentLoaded', function() {
    const dropArea = document.getElementById('drop-area');
    const fileInput = document.getElementById('foto-upload');
    const previewContainer = document.getElementById('preview-container');
    const imagePreview = document.getElementById('image-preview');
    const dropZone = document.getElementById('drop-zone');
    const removeBtn = document.getElementById('remove-image');
   
    //Prevenir comportamento de drag
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
        dropArea.addEventListener(eventName, preventDefaults, false);
    });

    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    

    //Arquivos soltos
    dropArea.addEventListener('drop', handleDrop, false);

    function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;
        if (files.length) {
            fileInput.files = files;
            updateImagePreview(files[0]);
        }
    }


    //Manipular pra previsualização
    fileInput.addEventListener('change', function() {
        if (this.files && this.files[0]) {
            updateImagePreview(this.files[0]);
        }
    });

    //Previsualização
    function updateImagePreview(file) {
        if (file.type.match('image.*')) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                imagePreview.src = e.target.result;
                previewContainer.style.display = 'block';
                dropZone.style.display = 'none';
            }
            
            reader.readAsDataURL(file);
        } else {
            alert('Por favor, selecione apenas imagens (JPG ou PNG).');
        }
    }

    //Botão remover imagem
    removeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        resetFileInput();
    });

    function resetFileInput() {
        imagePreview.src = '#';
        previewContainer.style.display = 'none';
        dropZone.style.display = 'block';
        fileInput.value = '';
    }

    //Clicar - imagem
     dropArea.addEventListener('click', function(e) {
        if (e.target !== removeBtn && !previewContainer.contains(e.target)) {
            fileInput.click();
        }
    });
});




//Validar email
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

//Gerar ticket
function generateTicket() {
    const fullName = document.getElementById('full-name').value;
    const email = document.getElementById('email').value;
    const githubUsername = document.getElementById('github-username').value;
    const fotoFile = document.getElementById('foto-upload').files[0];
    const emailError = document.getElementById('email-error');

    emailError.textContent = '';

    if (!validateEmail(email)) {
        emailError.textContent = 'Por favor, insira um endereço de email válido.';
        emailError.style.color = '#ff0000';
        return;
    }

    //Erro de preenchimento
    if (!fullName || !email || !githubUsername || !fotoFile) {
        alert('Por favor, preencha todos os campos para gerar seu ticket.');
        return;
    }
    
    //Salvar dados para o ticket
    const reader = new FileReader();
    reader.onload = function(e) {
    const ticketData = {
        fullName: fullName,
        email: email,
        githubUsername: githubUsername,
        fotoUrl: e.target.result,
        timestamp: new Date().toLocaleString()
    };       
    
    localStorage.setItem('ticketData', JSON.stringify(ticketData));
        window.location.href = 'ticket.html';
    };
    reader.readAsDataURL(fotoFile);

        
}

