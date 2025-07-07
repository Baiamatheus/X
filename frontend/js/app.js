document.addEventListener("DOMContentLoaded", () => {

  document.getElementById("btn-google").addEventListener("click", () => {
    document.getElementById("modal-google").showModal();
  });
  document.getElementById("btn-apple").addEventListener("click", () => {
    document.getElementById("modal-apple").showModal();
  });
  document.getElementById("btn-criar").addEventListener("click", () => {
    document.getElementById("modal-criar").showModal();
    document.getElementById("etapa-1").style.display = "block";
    document.getElementById("etapa-2").style.display = "none";
  });
  document.getElementById("btn-entrar").addEventListener("click", () => {
    document.getElementById("modal-entrar").showModal();
    document.getElementById("etapa-login-1").style.display = "block";
    document.getElementById("etapa-login-2").style.display = "none";
  });

 
  document.querySelectorAll("dialog").forEach(modal => {
    modal.addEventListener("click", e => {
      if (e.target === modal) modal.close();
    });
  });


  const diaSelect = document.getElementById('campo-dia');
  if (diaSelect) {
    for (let i = 1; i <= 31; i++) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      diaSelect.appendChild(option);
    }
  }

  const anoSelect = document.getElementById('campo-ano');
  if (anoSelect) {
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i >= 1900; i--) {
      const option = document.createElement('option');
      option.value = i;
      option.textContent = i;
      anoSelect.appendChild(option);
    }
  }

 
  document.getElementById("btn-avancar").addEventListener("click", () => {
    const nome = document.getElementById("campo-nome").value;
    const celular = document.getElementById("campo-celular").value;
    const senha = document.getElementById("campo-senha").value;
    const mes = document.getElementById("campo-mes").value;
    const dia = document.getElementById("campo-dia").value;
    const ano = document.getElementById("campo-ano").value;

    if (!nome || !celular || !senha || !mes || !dia || !ano) {
      alert("!Preencha todos os campos!");
      return;
    }

    localStorage.setItem("cadastroTemp", JSON.stringify({ nome, celular, senha, nascimento: `${dia}/${mes}/${ano}` }));

    document.getElementById("etapa-1").style.display = "none";
    document.getElementById("etapa-2").style.display = "block";
  });

  document.getElementById("btn-concluir").addEventListener("click", () => {
    const aceitarTermos = document.getElementById("aceitar-termos").checked;

    if (!aceitarTermos) {
      alert("!Você deve aceitar os Termos, Política de Privacidade e Uso de Cookies!");
      return;
    }

    const temp = JSON.parse(localStorage.getItem("cadastroTemp"));
    if (temp) {
      localStorage.setItem("user", JSON.stringify(temp));
      localStorage.removeItem("cadastroTemp");
    }

    document.getElementById("modal-criar").close();
    alert('Cadastro salvo!');
  });

  
  document.getElementById("btn-login-avancar").addEventListener("click", () => {
    const loginCelular = document.getElementById("login-celular").value;
    if (!loginCelular) {
      alert("!Digite o celular para login!");
      return;
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.celular === loginCelular) {
      document.getElementById("etapa-login-1").style.display = "none";
      document.getElementById("etapa-login-2").style.display = "block";
    } else {
      alert("Usuário não foi encontrado.");
    }
  });

  document.getElementById("btn-login-final").addEventListener("click", () => {
    const senhaInput = document.getElementById("login-senha").value;
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.senha === senhaInput) {
      document.getElementById("modal-entrar").close();
      window.location.href = "bemvindo.html";
    } else {
      alert("!Senha incorreta!");
    }
  });
});
