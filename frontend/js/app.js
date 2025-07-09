document.addEventListener("DOMContentLoaded", () => {

  

  document.querySelectorAll("#btn-google").forEach(btn =>
    btn.addEventListener("click", () => {
      document.getElementById("modal-google").showModal();
    })
  );
  document.querySelectorAll("#btn-apple").forEach(btn =>
    btn.addEventListener("click", () => {
      document.getElementById("modal-apple").showModal();
    })
  );
  document.getElementById("btn-criar").addEventListener("click", () => {
    document.getElementById("modal-criar").showModal();
    document.getElementById("etapa-1").style.display = "block";
  });
  document.getElementById("btn-entrar").addEventListener("click", () => {
    document.getElementById("modal-entrar").showModal();
    document.getElementById("etapa-login-1").style.display = "block";
    document.getElementById("etapa-login-2").style.display = "none";
  });
  document.getElementById("btn-fechar-google").addEventListener("click", () => {
    document.getElementById("modal-google").close();
  });

  document.getElementById("btn-fechar-apple").addEventListener("click", () => {
    document.getElementById("modal-apple").close();
  });

  document.getElementById("btn-fechar-criar").addEventListener("click", () => {
    document.getElementById("modal-criar").close();
  });

  document.getElementById("btn-fechar-entrar").addEventListener("click", () => {
    document.getElementById("modal-entrar").close();
  });

  document.getElementById("btn-login-avancar").addEventListener("click", () => {
    const celular = limparMascaraCelular(document.getElementById("login-celular").value.trim());
    if (!/^\d{11}$/.test(celular)) {
      alert("Digite um celular válido com 11 números.");
      return;
    
    }
    if (!localStorage.getItem("celularUsuario") || localStorage.getItem("celularUsuario") !== celular) {
      alert("Celular não cadastrado. Por favor, crie uma conta.");    
      return;
    }
    

    document.getElementById("etapa-login-1").style.display = "none";
    document.getElementById("etapa-login-2").style.display = "block";
  });

  document.getElementById("btn-login-final").addEventListener("click", () => {
    const senha = document.getElementById("login-senha").value.trim();
    if (!localStorage.getItem("senhaUsuario") || localStorage.getItem("senhaUsuario") !==senha) {
      alert("Senha incorreta.");
      return;
    } 

    const nomeUsuario = localStorage.getItem("nomeUsuario") || "usuário";
    alert(`Bem-vindo, ${nomeUsuario}!`);

    document.getElementById("modal-entrar").close();
    window.location.href = "bemvindo.html";
  });
  document.getElementById("btn-avancar").addEventListener("click", () => {
    const nome = document.getElementById("campo-nome").value.trim();
    const celular = limparMascaraCelular(document.getElementById("campo-celular").value.trim());
    const senha = document.getElementById("campo-senha").value.trim();
    const mes = document.getElementById("campo-mes").value;
    const dia = document.getElementById("campo-dia").value;
    const ano = document.getElementById("campo-ano").value;

    if (!nome || !celular || !senha || !mes || !dia || !ano) {
      alert("Preencha todos os campos.");
      return;
    }

     /*if (nome.includes(" ")) {
      alert("Não em usuário pode haver espaços.");
      return;
    }*/

    if (!/^\d{11}$/.test(celular)) {
      alert("Celular deve ter 11 números.");
      return;
    }

   

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/.test(senha)) {
      alert("Senha deve ter maiúscula, minúscula, número e caracter especial (mín. 8).");
      return;
    }

    localStorage.setItem("nomeUsuario", nome);
    localStorage.setItem("celularUsuario", celular);
    localStorage.setItem("senhaUsuario", senha);

    alert(`Conta criada com sucesso, ${nome}!`);
    document.getElementById("modal-criar").close();
  });
  const selectDia = document.getElementById("campo-dia");
  const selectAno = document.getElementById("campo-ano");

  for (let i = 1; i <= 31; i++) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;
    selectDia.appendChild(opt);
  }

  const anoAtual = new Date().getFullYear();
  for (let i = anoAtual; i >= 1900; i--) {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = i;
    selectAno.appendChild(opt);
  }
  function aplicarMascaraCelular(valor) {
    return valor
      .replace(/\D/g, "")
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2")
      .slice(0, 15);
  }

  function limparMascaraCelular(valor) {
    return valor.replace(/\D/g, "");
  }

  ["campo-celular", "login-celular"].forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener("input", () => {
      input.value = aplicarMascaraCelular(input.value);
    });
  });

  function toggleSenha(inputId) {
    const input = document.getElementById(inputId);
    input.type = input.type === "password" ? "text" : "password";
  }

  document.getElementById("toggle-senha-cadastro").addEventListener("click", () => {
    toggleSenha("campo-senha");
  });

  document.getElementById("toggle-senha-login").addEventListener("click", () => {
    toggleSenha("login-senha");
  });
  localStorage.clear();
  ["campo-nome", "campo-senha", "login-senha"].forEach(id => {
    const input = document.getElementById(id);
    input.addEventListener("keydown", function(event) {
      if (event.key === " ") {
        event.preventDefault();
        alert("Espaços não são permitidos.");
      }
    });
  });
  
});
