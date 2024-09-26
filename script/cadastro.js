const url = "https://go-wash-api.onrender.com/api/user"; 
async function cadastroUsuario(){
    let name = document.getElementById('name').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value
    let cpf_cnpj = document.getElementById('cpf_cnpj').value
    let birthday = document.getElementById('birthday').value
    let api = await fetch(url,{
        method:"POST",
        body:JSON.stringify({
            "name":name,
            "email":email,
            "user_type_id":1,
            "password":password,
            "cpf_cnpj":cpf_cnpj,
            "terms": 1,
            "birthday":birthday    
        }),
        headers:{
            'Content-Type':'application/json'
        }
    });

    function showAlert(message) {
        document.getElementById("alertMessage").textContent = message;
        document.getElementById("alertContainer").style.display = "flex";
    }

    if (api.ok) {
        let resposta = await api.json();
        showAlert("Cadastro realizado com sucesso!");
        console.log(resposta);
        return;
    }

    let respostaErro = await api.json();
    console.log("Erro ao cadastrar: " + respostaErro.data.errors.cpf_cnpj);
    console.log(respostaErro);

    if (respostaErro.data.errors.cpf_cnpj) {
        showAlert("Esse CPF ou CNPJ já está cadastrado!");
    }

    if (respostaErro.data.errors.email) {
        showAlert("Esse e-mail já está cadastrado!");
    }

    document.getElementById("okButton").addEventListener("click", function() {
        document.getElementById("alertContainer").style.display = "none";
    });

}

const videos = [
    'vids/cats.mp4',
    'vids/dogs.mp4',
    'vids/bird.mp4'
];

function setRandomVideo() {
    const videoSource = document.getElementById('video-source');
    const randomIndex = Math.floor(Math.random() * videos.length);
    videoSource.src = videos[randomIndex];
    document.getElementById('background-video').load();
}

window.onload = setRandomVideo;
