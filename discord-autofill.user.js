// ==UserScript==
// @name         Discord Auto Preencher
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Preenche automaticamente o formulário do Discord
// @author       Creator
// @match        https://discord.com/register
// @grant        none
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';
    
    function gerarUsername() {
        const prefixos = ['Sky', 'Dark', 'Light', 'Star', 'Moon', 'Ako', 'Master', 'Night'];
        const sufixos = ['sk', 'nd', 'kt', 'zx', 'qw'];
        const numeros = Math.floor(Math.random() * 9000) + 1000;
        return prefixos[Math.floor(Math.random() * prefixos.length)] + 
               sufixos[Math.floor(Math.random() * sufixos.length)] + numeros;
    }
    
    function gerarEmail() {
        const dominios = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com', 'protonmail.com'];
        const nome = 'user' + Date.now() + Math.floor(Math.random() * 999);
        return nome + '@' + dominios[Math.floor(Math.random() * dominios.length)];
    }
    
    function gerarSenha() {
        return 'Disc@' + Math.random().toString(36).substring(2, 10) + '!123';
    }
    
    const dados = {
        email: gerarEmail(),
        username: gerarUsername(),
        password: gerarSenha()
    };
    
    function preencher() {
        const emailInput = document.querySelector('input[name="email"]');
        const usernameInput = document.querySelector('input[name="username"]');
        const passwordInput = document.querySelector('input[name="password"]');
        const confirmInput = document.querySelector('input[name="confirm_password"]');
        
        if(emailInput) emailInput.value = dados.email;
        if(usernameInput) usernameInput.value = dados.username;
        if(passwordInput) passwordInput.value = dados.password;
        if(confirmInput) confirmInput.value = dados.password;
        
        alert('✅ DADOS PREENCHIDOS!\n\n📧 Email: ' + dados.email + '\n👤 Usuário: ' + dados.username + '\n🔐 Senha: ' + dados.password);
    }
    
    setTimeout(preencher, 1000);
})();
