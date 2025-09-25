window.addEventListener('DOMContentLoaded', () => {
  // Elementos principais
  const toggles = document.querySelectorAll('.toggle');
  const loginBox = document.querySelector('.login');
  const cadastroBox = document.querySelector('.cadastro');
  const container = document.querySelector('.container');
  const inputFoto = document.getElementById('fotoPerfil');
  const circle = document.querySelector('.circle');
  const btnCadastrar = document.getElementById('btnCadastrar');
  const uploadWrapper = document.querySelector('.upload-wrapper');
  const linkVoltarCadastro = document.getElementById('linkVoltarCadastro');
  const rodape = document.querySelector('.rodape');
  const temaBtns = document.querySelectorAll('.tema-btn');
  const body = document.body;

  // Alternância entre login e cadastro
  function alternarFormularios() {
    const loginAtivo = loginBox.classList.contains('active');
    if (loginAtivo) {
      loginBox.classList.remove('active');
      cadastroBox.classList.add('active');
      ajustarAltura('cadastro');
    } else {
      cadastroBox.classList.remove('active');
      loginBox.classList.add('active');
      ajustarAltura('login');
    }
  }

  // Ajuste de altura com base no formulário ativo
  function ajustarAltura(tipo) {
    container.style.height = tipo === 'login' ? '400px' : '520px';
  }

  // Transição para área de upload
  function mostrarUpload() {
    container.style.opacity = '0';
    container.style.transform = 'scale(0.95)';
    container.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    setTimeout(() => {
      container.style.display = 'none';
      uploadWrapper.style.display = 'flex';
      uploadWrapper.style.opacity = '0';
      uploadWrapper.style.transition = 'opacity 0.5s ease';
      rodape.style.display = 'block';

      setTimeout(() => {
        uploadWrapper.style.opacity = '1';
      }, 50);
    }, 500);
  }

  // Transição de volta para cadastro
  function voltarParaCadastro() {
    uploadWrapper.style.opacity = '0';
    uploadWrapper.style.transform = 'scale(0.95)';
    uploadWrapper.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

    setTimeout(() => {
      uploadWrapper.style.display = 'none';
      container.style.display = 'block';
      container.style.opacity = '0';
      container.style.transform = 'scale(0.95)';
      container.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

      cadastroBox.classList.add('active');
      loginBox.classList.remove('active');
      ajustarAltura('cadastro');
      rodape.style.display = 'none';

      setTimeout(() => {
        container.style.opacity = '1';
        container.style.transform = 'scale(1)';
      }, 50);
    }, 500);
  }

  // Preview da imagem de perfil
  inputFoto.addEventListener('change', () => {
    const file = inputFoto.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        circle.style.backgroundImage = `url(${reader.result})`;
        circle.style.backgroundSize = 'cover';
        circle.style.backgroundPosition = 'center';
        circle.innerHTML = '';
        circle.style.border = 'none';
        circle.style.boxShadow = '0 0 10px rgba(0,0,0,0.2)';
      };
      reader.readAsDataURL(file);
    }
  });

  // Aplicação de tema
  temaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tema = btn.getAttribute('data-tema');
      body.classList.remove('tema-padrao', 'tema-claro', 'tema-escuro');
      body.classList.add(`tema-${tema}`);
    });
  });

  // Eventos
  toggles.forEach(toggle => toggle.addEventListener('click', alternarFormularios));
  ajustarAltura('login');
  btnCadastrar?.addEventListener('click', mostrarUpload);
  linkVoltarCadastro?.addEventListener('click', (e) => {
    e.preventDefault();
    voltarParaCadastro();
  });
});
