document.addEventListener("DOMContentLoaded", () => {
  // Preencher os selects de dia e ano
  const diaSelect = document.getElementById('dia');
  for (let i = 1; i <= 31; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    diaSelect.appendChild(option);
  }

  const anoSelect = document.getElementById('ano');
  const currentYear = new Date().getFullYear();
  for (let i = currentYear; i >= 1900; i--) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    anoSelect.appendChild(option);
  }

  // Abrir modais
  document.querySelectorAll("[data-open]").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.open);
      if (target) target.showModal();
    });
  });

  // Fechar modais
  document.querySelectorAll("[data-close]").forEach(btn => {
    btn.addEventListener("click", () => {
      const target = document.getElementById(btn.dataset.close);
      if (target) target.close();
    });
  });

  // Cadastro
  document.getElementById("btnAvancar").addEventListener("click", async () => {
    const nome = document.getElementById("nome").value;
    const celular = document.getElementById("celular").value;
    const mes = document.getElementById("mes").value;
    const dia = document.getElementById("dia").value;
    const ano = document.getElementById("ano").value;

    if (!nome || !celular || !mes || !dia || !ano) {
      alert("⚠️ Preencha todos os campos!");
      return;
    }

    const nascimento = `${dia}/${mes}/${ano}`;

    try {
      const response = await fetch('http://localhost:3000/api/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, celular, nascimento })
      });

      const result = await response.json();
      if (response.ok) {
        alert('✅ Cadastro realizado!');
        document.getElementById("criarConta").close();
      } else {
        alert(`❌ Erro: ${result.error}`);
      }
    } catch (error) {
      alert('❌ Erro ao conectar com o servidor.');
    }
  });

  // Login
  document.getElementById("btnEntrar").addEventListener("click", async () => {
    const loginCelular = document.getElementById("loginCelular").value;
    if (!loginCelular) {
      alert("⚠️ Digite o celular para login!");
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ celular: loginCelular })
      });

      const result = await response.json();
      if (response.ok) {
        alert(`✅ Bem-vindo, ${result.user.nome}!`);
        document.getElementById("entrarConta").close();
      } else {
        alert(`❌ Erro: ${result.error}`);
      }
    } catch (error) {
      alert('❌ Erro ao conectar com o servidor.');
    }
  });
});
