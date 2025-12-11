# PlaySafe 🛡️💰

![PlaySafe](https://img.shields.io/badge/PlaySafe-BAP%2FNFX-blue)
![License](https://img.shields.io/badge/license-MIT-green)

**PlaySafe** é uma extensão de carteira digital segura e fácil de usar, desenvolvida especificamente para o ecossistema **Block And Play (BAP/NFX)**. Esta carteira permite que usuários gerenciem tokens nativos, realizem transações e interajam com a rede BAP de forma segura, rápida e intuitiva, com foco em proteção e simplicidade.

## 🎯 Visão do Projeto

O PlaySafe foi criado para ser a ponte segura e confiável entre os usuários e o ecossistema Block And Play, oferecendo:

- **Gestão Segura de Tokens**: Suporte completo aos tokens BAP e NFX com proteção avançada
- **Interface Intuitiva**: Design moderno, limpo e fácil de usar
- **Segurança em Primeiro Lugar**: Implementação de melhores práticas de segurança para carteiras digitais
- **Multilíngue**: Suporte completo para Português e Inglês
- **Extensão de Navegador**: Acessível diretamente do seu navegador de forma conveniente

## ✨ Recursos Principais

### Funcionalidades Implementadas

- 📥 **Receber Tokens**: Visualize seu endereço e QR Code para receber tokens
- 📤 **Enviar Tokens**: Envie tokens BAP/NFX para outros endereços
- 📊 **Lista de Tokens**: Visualize todos os seus tokens e saldos
- 📜 **Histórico**: Acompanhe todas as suas transações
- 🌐 **Alternador de Idiomas**: Suporte para Português e Inglês

### Componentes Principais

O projeto está estruturado com os seguintes componentes:

- **Receive**: Componente para receber tokens, exibindo endereço e QR Code
- **Send**: Formulário para envio de tokens com validação
- **TokenList**: Lista de tokens disponíveis com saldos atualizados
- **History**: Histórico de transações realizadas
- **LanguageSwitcher**: Alternador de idiomas para internacionalização

## 🚀 Como Começar

### Pré-requisitos

- Node.js 16+ e npm/yarn instalados
- Navegador compatível (Chrome, Firefox, Edge)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/Biannolimma/bap-connect-wallet.git

# Entre no diretório
cd bap-connect-wallet

# Instale as dependências
npm install

# Execute em modo de desenvolvimento
npm run dev

# Compile para produção
npm run build
```

### Carregando a Extensão no Navegador

1. Execute `npm run build` para gerar a versão de produção
2. Abra o navegador e vá para `chrome://extensions/` (Chrome) ou `about:debugging#/runtime/this-firefox` (Firefox)
3. Ative o "Modo de desenvolvedor"
4. Clique em "Carregar extensão sem pacote" e selecione a pasta `dist`
5. A extensão PlaySafe estará pronta para uso!

## 📁 Estrutura do Projeto

```
playsafe-wallet/
├── src/
│   ├── components/         # Componentes React
│   │   ├── Receive.jsx
│   │   ├── Send.jsx
│   │   ├── TokenList.jsx
│   │   ├── History.jsx
│   │   └── LanguageSwitcher.jsx
│   ├── assets/            # Imagens, ícones, logos
│   ├── i18n/              # Arquivos de internacionalização
│   │   ├── pt.json
│   │   └── en.json
│   ├── utils/             # Funções utilitárias
│   └── styles/            # Arquivos de estilo CSS/SCSS
├── public/                # Arquivos públicos
├── manifest.json          # Configuração da extensão
├── package.json           # Dependências do projeto
└── README.md             # Este arquivo
```

## 🎨 Identidade Visual

### Paleta de Cores - PlaySafe

- **Primária**: `#2563eb` (Azul Segurança)
- **Secundária**: `#10b981` (Verde Confiança)
- **Destaque**: `#7c3aed` (Roxo NFX)
- **Sucesso**: `#10b981`
- **Alerta**: `#f59e0b`
- **Erro**: `#ef4444`
- **Fundo**: `#ffffff` / `#1f2937` (Modo Claro/Escuro)

### Tipografia

- **Fonte Principal**: Inter, system-ui, sans-serif
- **Fonte Monospace**: 'Courier New', monospace (para endereços)

### Ícones

Utilizar biblioteca de ícones moderna como Heroicons ou Lucide para consistência visual, com foco em ícones de segurança e facilidade de uso.

## 🔄 Fluxo de Telas

### 1. Tela Inicial (Wallet Dashboard)
- Saldo total em destaque
- Lista de tokens com ícones
- Botões de ação: Enviar, Receber
- Histórico recente (últimas 5 transações)

### 2. Tela de Recebimento
- Endereço da carteira em formato legível
- QR Code grande para scan
- Botão de copiar endereço
- Opção de compartilhar

### 3. Tela de Envio
- Campo de endereço destino com validação
- Seletor de token
- Campo de quantidade com saldo disponível
- Estimativa de taxa de rede
- Botão de confirmação

### 4. Tela de Histórico
- Lista cronológica de transações
- Filtros: Todas, Enviadas, Recebidas
- Detalhes ao clicar: hash, data, status
- Scroll infinito ou paginação

### 5. Configurações
- Alternador de idioma
- Preferências de visualização
- Opções de segurança
- Informações sobre a versão

## 🔐 Segurança

### Boas Práticas Implementadas

- **Armazenamento Seguro**: Criptografia avançada para chaves privadas
- **Validação Rigorosa**: Validação de endereços antes de qualquer transação
- **Confirmação Dupla**: Confirmação adicional para transações de alto valor
- **Timeout Automático**: Sessão expira automaticamente para maior segurança
- **Proteção de Dados**: Chaves privadas nunca são expostas no código
- **Isolamento**: Ambiente isolado para execução segura

### Recomendações para Evolução

- Implementar autenticação biométrica (quando disponível)
- Suporte para hardware wallets
- Backup e recuperação de carteira com seed phrases seguras
- Detecção e bloqueio de endereços maliciosos
- Limite de taxa de transações para proteção adicional
- Auditoria de segurança regular

## 🌍 Internacionalização

O projeto suporta múltiplos idiomas através do sistema i18n. Atualmente disponíveis:

- 🇧🇷 Português (pt)
- 🇺🇸 Inglês (en)

Para adicionar novos idiomas, crie um arquivo JSON em `src/i18n/` seguindo a estrutura dos arquivos existentes.

## 🛣️ Roadmap

### Fase 1: Estrutura Básica ✅
- [x] Estrutura de diretórios
- [x] README explicativo
- [x] Componentes exemplo
- [x] Sistema de internacionalização

### Fase 2: Funcionalidades Core (Em Desenvolvimento)
- [ ] Conexão com a rede BAP
- [ ] Gerenciamento de carteira (criar/importar)
- [ ] Visualização de saldo e tokens
- [ ] Envio de transações
- [ ] Recebimento de tokens

### Fase 3: Recursos Avançados
- [ ] Histórico completo de transações
- [ ] Suporte para NFTs do ecossistema BAP
- [ ] Integração com DApps
- [ ] Modo escuro
- [ ] Notificações de transações

### Fase 4: Segurança e Otimização
- [ ] Auditoria de segurança
- [ ] Testes automatizados completos
- [ ] Otimização de performance
- [ ] Documentação completa da API

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

### Diretrizes de Código

- Use ESLint e Prettier para formatação
- Escreva testes para novas funcionalidades
- Mantenha o código limpo e bem documentado
- Siga os padrões de commit convencionais

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para questões, sugestões ou problemas:

- Abra uma issue no GitHub
- Entre em contato com a equipe PlaySafe
- Consulte a documentação completa

## 🔄 Nota sobre o Repositório

Este repositório mantém o nome original `bap-connect-wallet` por questões de compatibilidade. Se desejar renomear o repositório para `playsafe-wallet`, você pode fazer isso nas configurações do GitHub:

1. Vá para Settings > General no GitHub
2. Em "Repository name", altere para `playsafe-wallet`
3. Atualize os remotes locais: `git remote set-url origin https://github.com/Biannolimma/playsafe-wallet.git`

**Nota**: Renomear o repositório é opcional e o GitHub redireciona automaticamente o nome antigo.

## 🙏 Agradecimentos

- Equipe Block And Play pelo suporte e visão do projeto
- Comunidade BAP/NFX por feedback e testes
- Todos os contribuidores que ajudaram a tornar este projeto realidade

---

**Desenvolvido com ❤️ e 🛡️ para o ecossistema Block And Play**