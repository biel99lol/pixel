<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
    <title>Discord Creator Pro</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #5865F2 0%, #4752C4 100%);
            min-height: 100vh;
            padding: 20px;
        }
        .container { max-width: 500px; margin: 0 auto; }
        .card {
            background: white;
            border-radius: 20px;
            padding: 25px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.2);
        }
        h1 { color: #5865F2; text-align: center; font-size: 24px; }
        .sub { text-align: center; color: #666; margin: 5px 0 20px; font-size: 14px; }
        .dados-box {
            background: #1e1e1e;
            color: #00ff00;
            padding: 20px;
            border-radius: 12px;
            margin: 15px 0;
            font-family: monospace;
            font-size: 13px;
            text-align: center;
        }
        button {
            width: 100%;
            padding: 14px;
            background: #5865F2;
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            margin: 8px 0;
        }
        button:hover { opacity: 0.9; transform: scale(0.98); }
        .btn-success { background: #23a55a; }
        .btn-warning { background: #faa61a; color: #333; }
        .btn-danger { background: #ed4245; }
        .status {
            background: #e8f4fd;
            padding: 12px;
            border-radius: 12px;
            margin: 10px 0;
            font-size: 13px;
            text-align: center;
        }
        .notification-badge {
            background: #ed4245;
            color: white;
            border-radius: 20px;
            padding: 5px 12px;
            font-size: 12px;
            display: inline-block;
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        .pulse {
            animation: pulse 1s infinite;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <h1>🎮 Discord Creator Pro</h1>
            <p class="sub">Sistema automático com notificações</p>

            <div class="dados-box" id="dadosBox">
                📧 <span id="email">Clique em "Nova Conta"</span><br>
                👤 <span id="username">---</span><br>
                🔐 <span id="password">---</span>
            </div>

            <button id="btnNovaConta" class="btn-success">🔄 NOVA CONTA (Gerar Dados)</button>
            <button id="btnAbrirDiscord">🔗 ABRIR DISCORD</button>
            <button id="btnCopiarDados">📋 COPIAR DADOS</button>
            <button id="btnTestarNotificacao" class="btn-warning">🔔 TESTAR NOTIFICAÇÃO</button>

            <div class="status" id="statusArea">
                ✅ Sistema pronto! Clique em "Nova Conta"
            </div>
        </div>
    </div>

    <script>
        let dadosAtuais = {
            email: '',
            username: '',
            password: ''
        };

        // Função para gerar dados
        function gerarDados() {
            const nome = 'user' + Date.now() + Math.floor(Math.random() * 999);
            const dominios = ['gmail.com', 'outlook.com', 'protonmail.com'];
            const dominio = dominios[Math.floor(Math.random() * dominios.length)];
            dadosAtuais.email = nome + '@' + dominio;
            dadosAtuais.username = 'User_' + Math.floor(Math.random() * 99999);
            dadosAtuais.password = 'Disc@' + Math.random().toString(36).substring(2, 10) + '!123';
            
            atualizarTela();
            mostrarNotificacao('🎉 DADOS GERADOS!', 'Email: ' + dadosAtuais.email + '\nUsuário: ' + dadosAtuais.username);
            
            return dadosAtuais;
        }

        function atualizarTela() {
            document.getElementById('email').innerText = dadosAtuais.email || 'Clique em "Nova Conta"';
            document.getElementById('username').innerText = dadosAtuais.username || '---';
            document.getElementById('password').innerText = dadosAtuais.password || '---';
        }

        // Função para mostrar notificação (funciona mesmo com navegador fechado)
        function mostrarNotificacao(titulo, corpo) {
            if (Notification.permission === 'granted') {
                const notificacao = new Notification(titulo, {
                    body: corpo,
                    icon: 'https://discord.com/assets/2c21aeda16de354ba5334551a883b481.png',
                    silent: false,
                    vibrate: [200, 100, 200]
                });
                
                notificacao.onclick = function() {
                    window.focus();
                    this.close();
                };
            } else if (Notification.permission !== 'denied') {
                Notification.requestPermission().then(permission => {
                    if (permission === 'granted') {
                        mostrarNotificacao(titulo, corpo);
                    }
                });
            }
        }

        // Função para copiar dados
        async function copiarDados() {
            if (!dadosAtuais.email) {
                alert('⚠️ Clique em "Nova Conta" primeiro!');
                return;
            }
            
            const texto = `${dadosAtuais.email}\n${dadosAtuais.username}\n${dadosAtuais.password}`;
            await navigator.clipboard.writeText(texto);
            
            mostrarNotificacao('📋 DADOS COPIADOS!', 'Agora cole no Discord');
            document.getElementById('statusArea').innerHTML = '✅ Dados copiados para área de transferência!';
            setTimeout(() => {
                document.getElementById('statusArea').innerHTML = '✅ Sistema pronto! Clique em "Nova Conta"';
            }, 3000);
        }

        // Função para abrir Discord (sem fechar o app)
        function abrirDiscord() {
            if (!dadosAtuais.email) {
                alert('⚠️ Gere os dados primeiro!');
                return;
            }
            
            // Abre o Discord em nova aba (app continua rodando)
            window.open('https://discord.com/register', '_blank');
            
            mostrarNotificacao('🔗 DISCORD ABERTO!', 'Cole os dados e resolva o CAPTCHA');
            document.getElementById('statusArea').innerHTML = '📋 Discord aberto! Cole os dados e resolva o CAPTCHA.';
        }

        // Inicializar notificações
        function iniciarNotificacoes() {
            if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
                Notification.requestPermission();
            }
        }

        // Manter app rodando em segundo plano (Service Worker)
        function registrarServiceWorker() {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.register('/sw.js').catch(err => {
                    console.log('Service Worker não registrado:', err);
                });
            }
        }

        // Prevenir que o navegador feche/durma o app
        function manterAtivo() {
            let wakeLock = null;
            
            const requestWakeLock = async () => {
                try {
                    if ('wakeLock' in navigator) {
                        wakeLock = await navigator.wakeLock.request('screen');
                        console.log('Wake Lock ativado - app mantido ativo');
                    }
                } catch (err) {
                    console.log('Wake Lock não suportado:', err);
                }
            };
            
            requestWakeLock();
            
            // Tentar manter awake com áudio silencioso (alternativa)
            const audio = new Audio();
            audio.src = 'data:audio/wav;base64,U3RlYWx0aCB3YXZlIGZpbGU='; // áudio silencioso
            audio.loop = true;
            audio.volume = 0;
            audio.play().catch(e => console.log('Áudio não suportado'));
        }

        // Eventos dos botões
        document.getElementById('btnNovaConta').onclick = () => {
            gerarDados();
            document.getElementById('statusArea').innerHTML = '✅ Dados gerados! Clique em "Abrir Discord"';
        };
        
        document.getElementById('btnCopiarDados').onclick = copiarDados;
        document.getElementById('btnAbrirDiscord').onclick = abrirDiscord;
        
        document.getElementById('btnTestarNotificacao').onclick = () => {
            mostrarNotificacao('🔔 NOTIFICAÇÃO TESTE', 'O app está rodando em segundo plano!');
            document.getElementById('statusArea').innerHTML = '🔔 Notificação enviada! Verifique sua tela.';
        };

        // Iniciar tudo
        iniciarNotificacoes();
        registrarServiceWorker();
        manterAtivo();
        
        // Gerar primeira conta automaticamente
        setTimeout(() => {
            if (!dadosAtuais.email) {
                gerarDados();
            }
        }, 1000);

        // Mostrar que o app está rodando
        console.log('✅ Discord Creator Pro rodando em segundo plano!');
    </script>
</body>
</html>
