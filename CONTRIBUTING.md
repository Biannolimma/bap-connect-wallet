# Guia de Contribuição - BAP Connect Wallet

Obrigado por considerar contribuir com o BAP Connect Wallet! Este documento fornece diretrizes para contribuir com o projeto.

## 📋 Sumário

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Reportando Bugs](#reportando-bugs)
- [Sugerindo Melhorias](#sugerindo-melhorias)
- [Processo de Pull Request](#processo-de-pull-request)
- [Padrões de Código](#padrões-de-código)
- [Estrutura do Projeto](#estrutura-do-projeto)

## 🤝 Código de Conduta

Este projeto adota um Código de Conduta baseado em respeito mútuo e colaboração. Ao participar, você concorda em manter um ambiente acolhedor e inclusivo.

## 🚀 Como Contribuir

### 1. Fork e Clone

```bash
# Fork o repositório no GitHub
# Clone seu fork
git clone https://github.com/SEU-USUARIO/bap-connect-wallet.git
cd bap-connect-wallet

# Adicione o repositório original como upstream
git remote add upstream https://github.com/Biannolimma/bap-connect-wallet.git
```

### 2. Crie uma Branch

```bash
# Atualize sua branch main
git checkout main
git pull upstream main

# Crie uma nova branch para sua feature ou correção
git checkout -b feature/nome-da-feature
# ou
git checkout -b fix/nome-do-bug
```

### 3. Faça suas Alterações

- Escreva código limpo e bem documentado
- Siga os padrões de código do projeto
- Adicione testes quando apropriado
- Atualize a documentação se necessário

### 4. Commit suas Mudanças

Use commits convencionais:

```bash
git commit -m "feat: adiciona nova funcionalidade X"
git commit -m "fix: corrige bug Y"
git commit -m "docs: atualiza README"
git commit -m "style: formata código"
git commit -m "refactor: refatora componente Z"
git commit -m "test: adiciona testes para W"
```

### 5. Push e Pull Request

```bash
# Push suas mudanças
git push origin feature/nome-da-feature

# Abra um Pull Request no GitHub
```

## 🐛 Reportando Bugs

Ao reportar bugs, inclua:

1. **Descrição clara**: O que aconteceu e o que era esperado
2. **Passos para reproduzir**: Como reproduzir o problema
3. **Ambiente**: Navegador, versão do SO, versão da extensão
4. **Screenshots**: Se aplicável
5. **Logs de erro**: Console do navegador ou logs relevantes

### Exemplo de Issue de Bug

```markdown
**Descrição**
Ao tentar enviar tokens, o botão de confirmação não responde.

**Passos para Reproduzir**
1. Abra a extensão
2. Clique em "Enviar"
3. Preencha o endereço e valor
4. Clique em "Enviar"
5. Nada acontece

**Comportamento Esperado**
Deveria abrir uma tela de confirmação.

**Ambiente**
- Chrome 120.0.0
- Windows 11
- Extensão v0.1.0

**Screenshots**
[Anexe screenshots se aplicável]
```

## 💡 Sugerindo Melhorias

Para sugerir melhorias:

1. Verifique se já não existe uma issue similar
2. Crie uma nova issue com a tag `enhancement`
3. Descreva claramente a melhoria proposta
4. Explique por que seria útil
5. Se possível, sugira uma implementação

## 🔄 Processo de Pull Request

### Checklist antes de Submeter

- [ ] Código segue os padrões do projeto
- [ ] Testes passam localmente
- [ ] Documentação foi atualizada
- [ ] Commits seguem o padrão convencional
- [ ] Branch está atualizada com main
- [ ] Não há conflitos

### Template de Pull Request

```markdown
## Descrição
Breve descrição das mudanças

## Tipo de Mudança
- [ ] Bug fix
- [ ] Nova feature
- [ ] Breaking change
- [ ] Documentação

## Como Testar
Passos para testar as mudanças

## Screenshots
Se aplicável

## Checklist
- [ ] Código testado localmente
- [ ] Documentação atualizada
- [ ] Lint passou
- [ ] Commits convencionais
```

## 📝 Padrões de Código

### JavaScript/React

- Use ES6+ features
- Componentes funcionais com Hooks
- PropTypes ou TypeScript para validação
- Nomenclatura clara e descritiva

```jsx
// ✅ Bom
const UserProfile = ({ userName, userEmail }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  return (
    <div className="user-profile">
      <h2>{userName}</h2>
      <p>{userEmail}</p>
    </div>
  );
};

// ❌ Evite
const UP = ({ n, e }) => {
  const [l, sl] = useState(false);
  return <div><h2>{n}</h2><p>{e}</p></div>;
};
```

### CSS

- Use classes BEM ou CSS Modules
- Mobile-first approach
- Variáveis CSS para cores e tamanhos
- Evite !important

```css
/* ✅ Bom */
.button {
  padding: 12px 24px;
  background: var(--primary-color);
  border-radius: 8px;
}

.button--disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* ❌ Evite */
.btn {
  padding: 12px 24px !important;
  background: #2563eb;
}
```

### Commits

Use conventional commits:

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Documentação
- `style:` - Formatação
- `refactor:` - Refatoração
- `test:` - Testes
- `chore:` - Tarefas de manutenção

## 📁 Estrutura do Projeto

```
bap-connect-wallet/
├── src/
│   ├── components/      # Componentes React
│   ├── utils/          # Funções utilitárias
│   ├── styles/         # Arquivos CSS
│   ├── i18n/           # Traduções
│   └── assets/         # Imagens e recursos
├── public/             # Arquivos públicos
├── manifest.json       # Configuração da extensão
└── package.json        # Dependências
```

## 🧪 Executando Testes

```bash
# Instalar dependências
npm install

# Executar linter
npm run lint

# Executar testes
npm test

# Build de produção
npm run build
```

## 📚 Recursos Adicionais

- [Documentação React](https://react.dev/)
- [Chrome Extension Docs](https://developer.chrome.com/docs/extensions/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## 💬 Precisa de Ajuda?

- Abra uma issue com a tag `question`
- Entre em contato com a equipe BAP
- Consulte a documentação

## 🙏 Reconhecimento

Todas as contribuições são valorizadas e reconhecidas! Obrigado por tornar o BAP Connect Wallet melhor.
