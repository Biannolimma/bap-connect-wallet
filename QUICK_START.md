# Guia de Início Rápido - BAP Connect Wallet

Este guia fornece instruções rápidas para começar a desenvolver o BAP Connect Wallet.

## 🚀 Início Rápido (5 minutos)

### 1. Clone e Instale

\`\`\`bash
# Clone o repositório
git clone https://github.com/Biannolimma/bap-connect-wallet.git
cd bap-connect-wallet

# Instale as dependências
npm install
\`\`\`

### 2. Execute em Desenvolvimento

\`\`\`bash
# Inicie o servidor de desenvolvimento
npm run dev
\`\`\`

Acesse: `http://localhost:5173`

### 3. Construa a Extensão

\`\`\`bash
# Construa para produção
npm run build
\`\`\`

Os arquivos serão gerados na pasta `dist/`

### 4. Carregue no Chrome

1. Abra `chrome://extensions/`
2. Ative "Modo de desenvolvedor" (canto superior direito)
3. Clique em "Carregar extensão sem pacote"
4. Selecione a pasta `dist/` gerada pelo build
5. A extensão BAP Connect Wallet aparecerá na barra de ferramentas

## 📂 Estrutura Rápida

\`\`\`
src/
├── components/       # Componentes React (Receive, Send, etc.)
├── utils/           # Utilitários (validation, wallet, etc.)
├── styles/          # Arquivos CSS
├── i18n/            # Traduções (pt.json, en.json)
├── assets/          # Imagens e recursos
└── App.jsx          # Componente principal
\`\`\`

## 🛠️ Comandos Úteis

\`\`\`bash
# Desenvolvimento
npm run dev           # Servidor de desenvolvimento

# Build
npm run build         # Build de produção
npm run preview       # Preview do build

# Qualidade de Código
npm run lint          # Verificar erros de lint
npm run lint:fix      # Corrigir erros de lint automaticamente
npm run format        # Formatar código com Prettier

# Testes
npm test             # Executar testes
npm run test:watch   # Executar testes em modo watch
\`\`\`

## �� Próximos Passos

### Para Desenvolvedores

1. **Familiarize-se com a estrutura**
   - Leia `README.md` para visão completa do projeto
   - Consulte `IMPLEMENTATION_SUMMARY.md` para detalhes técnicos
   - Revise `CONTRIBUTING.md` antes de contribuir

2. **Explore os componentes**
   - Veja como cada componente funciona
   - Entenda o sistema de internacionalização
   - Teste as validações e utilitários

3. **Comece a desenvolver**
   - Conecte com a rede BAP real
   - Implemente funcionalidades de blockchain
   - Adicione testes automatizados

### Para Designers

1. Substitua o logo placeholder em `src/assets/`
2. Crie ícones para a extensão (16, 32, 48, 128px)
3. Revise e ajuste a paleta de cores em `src/styles/`
4. Crie assets para tokens BAP e NFX

### Para Testadores

1. Carregue a extensão no navegador
2. Teste cada componente e fluxo
3. Verifique responsividade mobile
4. Teste em diferentes navegadores
5. Reporte bugs encontrados

## 🔧 Configuração Adicional

### VS Code

Instale as extensões recomendadas:
- ESLint
- Prettier
- Vite

### Variáveis de Ambiente

Crie um arquivo `.env.local` para configurações locais:

\`\`\`env
VITE_BAP_NETWORK_URL=https://api.bap.network
VITE_EXPLORER_URL=https://explorer.bap.network
\`\`\`

## 📚 Documentação Completa

- **README.md**: Documentação principal do projeto
- **CONTRIBUTING.md**: Guia de contribuição
- **IMPLEMENTATION_SUMMARY.md**: Resumo técnico da implementação
- **src/assets/README.md**: Diretrizes para assets

## 🆘 Ajuda

Se encontrar problemas:

1. Verifique se Node.js 16+ está instalado
2. Limpe cache: `rm -rf node_modules package-lock.json && npm install`
3. Verifique logs do console no navegador
4. Abra uma issue no GitHub

## ✨ Dicas

- Use `npm run dev` durante desenvolvimento para hot reload
- Execute `npm run lint:fix` antes de commits
- Teste a extensão após cada mudança significativa
- Mantenha os componentes pequenos e reutilizáveis

---

**Pronto para começar!** 🚀

Para dúvidas ou sugestões, abra uma issue no GitHub ou entre em contato com a equipe BAP.
