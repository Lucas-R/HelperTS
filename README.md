# HelperTS - Biblioteca de Helpers TypeScript

<p align="center">
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> Uma biblioteca completa de hooks e utilitários em TypeScript para facilitar o desenvolvimento web, especialmente para formulários e interações com o DOM.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Instalação](#instalação)
- [Funcionalidades](#funcionalidades)
  - [useDate - Manipulação de Datas](#usedate---manipulação-de-datas)
  - [useDom - Manipulação do DOM](#usedom---manipulação-do-dom)
  - [useFetch - Requisições HTTP](#usefetch---requisições-http)
  - [useRouter - Roteamento](#userouter---roteamento)
  - [useSelect - Manipulação de Selects](#useselect---manipulação-de-selects)
  - [useStorage - Armazenamento Local](#usestorage---armazenamento-local)
  - [useValidate - Validação de Formulários](#usevalidate---validação-de-formulários)
- [Sistema de Estilos](#sistema-de-estilos)
- [Exemplos Práticos](#exemplos-práticos)
- [Scripts Disponíveis](#scripts-disponíveis)
- [Estrutura do Projeto](#estrutura-do-projeto)

---

## 🎯 Sobre o Projeto

O **HelperTS** é uma biblioteca desenvolvida em TypeScript que oferece um conjunto de hooks e utilitários prontos para uso, facilitando tarefas comuns no desenvolvimento web como:

- Validação de formulários
- Manipulação de elementos HTML
- Requisições HTTP com cache automático
- Roteamento simples
- Manipulação de datas
- Armazenamento local
- E muito mais!

Este projeto foi criado especialmente para facilitar o desenvolvimento de formulários no ambiente Fluig, mas pode ser usado em qualquer projeto web.

---

## 📦 Instalação

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Passos para Instalação

1. Clone o repositório ou baixe os arquivos do projeto
2. Abra o terminal na pasta do projeto
3. Execute o comando:

```bash
npm install
```

Isso instalará todas as dependências necessárias para o projeto funcionar.

---

## 🚀 Funcionalidades

### useDate - Manipulação de Datas

O `useDate` é um hook que facilita o trabalho com datas no JavaScript, permitindo formatar e obter datas de forma simples.

#### O que ele faz?

- **`today()`**: Retorna a data de hoje formatada
- **`format()`**: Formata qualquer data que você passar

#### Como usar?

```typescript
import useDate from './hooks/useDate';

const { today, format } = useDate();

// Obter a data de hoje
const hoje = today(); // Exemplo: "01/12/2024"

// Obter a data de hoje com formato personalizado
const hojeCustomizado = today({
  locale: "pt-BR",
  payload: { 
    day: "2-digit", 
    month: "long", 
    year: "numeric" 
  }
}); // Exemplo: "01 de dezembro de 2024"

// Formatar uma data específica
const dataFormatada = format({
  date: new Date("2024-12-01"),
  locale: "pt-BR"
}); // Exemplo: "01/12/24"
```

#### Parâmetros

- **`locale`**: Idioma para formatação (padrão: "pt-BR")
- **`payload`**: Opções de formatação (dia, mês, ano, etc.)
- **`date`**: A data que você quer formatar (obrigatório no `format`)

---

### useDom - Manipulação do DOM

O `useDom` é um hook que facilita a manipulação de elementos HTML na página, permitindo adicionar e remover eventos de forma simples.

#### O que ele faz?

- **`current`**: O elemento HTML selecionado
- **`set()`**: Define qual elemento você quer manipular
- **`on()`**: Adiciona um evento (como clique, submit, etc.)
- **`off()`**: Remove um evento

#### Como usar?

```typescript
import useDom from './hooks/useDom';

// Selecionar um elemento pelo ID ou classe
const botao = useDom("#meuBotao");

// Adicionar um evento de clique
botao.on("click", (event) => {
  console.log("Botão clicado!");
  alert("Você clicou no botão!");
});

// Adicionar um evento de submit em um formulário
const formulario = useDom("#meuFormulario");
formulario.on("submit", (event) => {
  event.preventDefault(); // Evita que a página recarregue
  console.log("Formulário enviado!");
});

// Remover um evento
const minhaFuncao = () => console.log("Evento executado");
botao.on("click", minhaFuncao);
botao.off("click", minhaFuncao); // Remove o evento
```

#### Exemplo Prático

```typescript
const botaoSalvar = useDom("#btnSalvar");

botaoSalvar.on("click", () => {
  // Sua lógica aqui
  console.log("Salvando dados...");
});
```

---

### useFetch - Requisições HTTP

O `useFetch` é um hook que facilita fazer requisições HTTP (GET, POST, PUT, DELETE) para APIs, com sistema de cache automático para requisições GET.

#### O que ele faz?

- Faz requisições HTTP para APIs
- Cache automático de 5 minutos para requisições GET
- Tratamento de erros
- Suporte a diferentes métodos HTTP (GET, POST, PUT, DELETE, etc.)

#### Como usar?

```typescript
import { useFetch } from './hooks/useFetch';

// Requisição GET simples
const { data, error } = await useFetch("/usuarios");

if (error) {
  console.error("Erro ao buscar dados:", error);
} else {
  console.log("Dados recebidos:", data);
}

// Requisição POST com dados
const { data, error } = await useFetch({
  endpoint: "/usuarios",
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: {
    nome: "João",
    email: "joao@email.com"
  }
});

// Requisição PUT (atualizar)
const { data, error } = await useFetch({
  endpoint: "/usuarios/123",
  method: "PUT",
  body: {
    nome: "João Silva",
    email: "joao.silva@email.com"
  }
});

// Requisição DELETE
const { data, error } = await useFetch({
  endpoint: "/usuarios/123",
  method: "DELETE"
});
```

#### Características Especiais

- **Cache Automático**: Requisições GET são armazenadas em cache por 5 minutos, evitando requisições desnecessárias
- **URL Base**: A URL base da API é configurada em `src/constants/env.ts`
- **Tratamento de Erros**: Retorna erros de forma estruturada

#### Configuração da API

Edite o arquivo `src/constants/env.ts` para configurar a URL base da sua API:

```typescript
const env = {
    api: "https://sua-api.com"
}
```

---

### useRouter - Roteamento

O `useRouter` é um hook que permite criar um sistema de roteamento simples (navegação entre páginas) sem precisar recarregar a página.

#### O que ele faz?

- **`path`**: Retorna a rota atual
- **`push()`**: Navega para uma nova rota (adiciona ao histórico)
- **`replace()`**: Substitui a rota atual (não adiciona ao histórico)
- **`onChange()`**: Permite escutar mudanças de rota

#### Como usar?

```typescript
import useRouter from './hooks/useRouter';

const router = useRouter();

// Obter a rota atual
console.log(router.path); // Exemplo: "/home"

// Navegar para uma nova página
router.push("/sobre"); // Navega para /sobre

// Substituir a rota atual (sem adicionar ao histórico)
router.replace("/login");

// Escutar mudanças de rota
const unsubscribe = router.onChange((path) => {
  console.log("Rota mudou para:", path);
  
  // Você pode fazer algo baseado na rota
  if (path === "/home") {
    console.log("Mostrando página inicial");
  } else if (path === "/sobre") {
    console.log("Mostrando página sobre");
  }
});

// Para parar de escutar mudanças
unsubscribe();
```

#### Exemplo Prático Completo

```typescript
const router = useRouter();

// Criar um menu de navegação
const menu = useDom("#menu");

menu.on("click", (event) => {
  const link = event.target as HTMLAnchorElement;
  if (link.tagName === "A") {
    event.preventDefault();
    router.push(link.getAttribute("href") || "/");
  }
});

// Escutar mudanças e atualizar a página
router.onChange((path) => {
  // Atualizar o conteúdo da página baseado na rota
  atualizarConteudo(path);
});
```

---

### useSelect - Manipulação de Selects

O `useSelect` é um hook que facilita a manipulação de elementos `<select>` (listas suspensas) no HTML.

#### O que ele faz?

- **`current`**: O elemento select selecionado
- **`handle()`**: Permite manipular outros selects baseado em mudanças no select atual

#### Como usar?

```typescript
import useSelect from './hooks/useSelect';

// Selecionar um elemento select
const { current, handle } = useSelect("#categoria");

// Quando a categoria mudar, atualizar outro select
handle("#subcategoria", (subcategoria) => {
  current.addEventListener("change", (event) => {
    const target = event.target as HTMLSelectElement;
    
    // Limpar o select de subcategoria
    subcategoria.value = "";
    
    // Se uma categoria foi selecionada, habilitar o select de subcategoria
    if (target.value) {
      subcategoria.classList.remove("disabled");
      subcategoria.setAttribute("data-validate", "true");
    } else {
      subcategoria.classList.add("disabled");
      subcategoria.setAttribute("data-validate", "false");
    }
  });
});
```

#### Exemplo Prático: Selects Dependentes

```typescript
// Select de Estado
const { current: selectEstado, handle } = useSelect("#estado");

// Quando o estado mudar, atualizar o select de cidade
handle("#cidade", (selectCidade) => {
  selectEstado.addEventListener("change", async (event) => {
    const estado = (event.target as HTMLSelectElement).value;
    
    if (estado) {
      // Buscar cidades do estado selecionado
      const { data } = await useFetch(`/cidades?estado=${estado}`);
      
      // Limpar e preencher o select de cidades
      selectCidade.innerHTML = '<option value="">Selecione uma cidade</option>';
      data.forEach(cidade => {
        const option = document.createElement("option");
        option.value = cidade.id;
        option.textContent = cidade.nome;
        selectCidade.appendChild(option);
      });
      
      selectCidade.classList.remove("disabled");
    } else {
      selectCidade.innerHTML = '<option value="">Selecione uma cidade</option>';
      selectCidade.classList.add("disabled");
    }
  });
});
```

---

### useStorage - Armazenamento Local

O `useStorage` é um hook que facilita o uso do `localStorage` do navegador para armazenar dados localmente.

#### O que ele faz?

- **`get()`**: Lê dados armazenados
- **`set()`**: Salva dados (retorna `true` se salvou com sucesso, `false` se houve erro)

#### Como usar?

```typescript
import useStorage from './hooks/useStorage';

const storage = useStorage();

// Salvar dados
const sucesso = storage.set("usuario", {
  nome: "João",
  email: "joao@email.com",
  idade: 30
});

if (sucesso) {
  console.log("Dados salvos com sucesso!");
}

// Ler dados
const usuario = storage.get("usuario");
console.log(usuario); // { nome: "João", email: "joao@email.com", idade: 30 }

// Verificar se existe
if (usuario) {
  console.log("Usuário encontrado:", usuario.nome);
} else {
  console.log("Nenhum usuário salvo");
}
```

#### Exemplo Prático: Salvar Preferências do Usuário

```typescript
const storage = useStorage();

// Salvar preferências
function salvarPreferencias(tema: string, idioma: string) {
  storage.set("preferencias", {
    tema,
    idioma,
    ultimaAtualizacao: new Date().toISOString()
  });
}

// Carregar preferências ao iniciar
function carregarPreferencias() {
  const preferencias = storage.get("preferencias");
  
  if (preferencias) {
    console.log("Tema:", preferencias.tema);
    console.log("Idioma:", preferencias.idioma);
    return preferencias;
  }
  
  return null;
}
```

#### Importante

- Os dados são armazenados no navegador do usuário
- Os dados persistem mesmo após fechar o navegador
- Os dados são específicos do domínio do site
- O `localStorage` tem limite de ~5-10MB por domínio

---

### useValidate - Validação de Formulários

O `useValidate` é um dos hooks mais importantes do projeto. Ele valida formulários HTML de forma automática, verificando se os campos obrigatórios estão preenchidos.

#### O que ele faz?

- Valida automaticamente todos os campos marcados com `data-validate="true"`
- Adiciona classes CSS de erro ou sucesso aos campos
- Retorna um objeto com o resultado da validação
- Permite executar uma função de callback após a validação

#### Como usar?

**1. Primeiro, marque os campos no HTML que devem ser validados:**

```html
<form id="meuFormulario">
  <!-- Campo obrigatório -->
  <input type="text" name="nome" data-validate="true" />
  
  <!-- Campo opcional (não será validado) -->
  <input type="text" name="telefone" data-validate="false" />
  
  <!-- Outro campo obrigatório -->
  <input type="email" name="email" data-validate="true" />
  
  <button type="submit">Enviar</button>
</form>
```

**2. No JavaScript, use o hook:**

```typescript
import useValidate from './hooks/useValidate';
import useDom from './hooks/useDom';

const formulario = useDom("#meuFormulario");
const { validate } = useValidate("#meuFormulario");

formulario.on("submit", (event) => {
  event.preventDefault(); // Evita recarregar a página
  
  const resultado = validate({
    classError: "error",    // Classe CSS para campos com erro
    classValid: "valid",    // Classe CSS para campos válidos
    callback: (resultado) => {
      if (resultado.valid) {
        console.log("Formulário válido! Pode enviar.");
        // Aqui você pode enviar os dados
      } else {
        console.log("Formulário inválido!");
        console.log("Erros:", resultado.errors);
        // resultado.errors é um array com os erros encontrados
      }
    }
  });
});
```

#### Retorno da Validação

O `validate()` retorna um objeto com:

```typescript
{
  valid: true,  // true se todos os campos estão válidos, false caso contrário
  errors: [     // Array com os erros encontrados
    {
      field: "nome",           // Nome do campo com erro
      message: "Campo obrigatório."  // Mensagem de erro
    }
  ]
}
```

#### Exemplo Prático Completo

```typescript
const formulario = useDom("#formularioCadastro");
const { validate } = useValidate("#formularioCadastro");

formulario.on("submit", async (event) => {
  event.preventDefault();
  
  const resultado = validate({
    classError: "campo-erro",
    classValid: "campo-ok",
    callback: async (result) => {
      if (result.valid) {
        // Coletar dados do formulário
        const formData = new FormData(formulario.current as HTMLFormElement);
        const dados = Object.fromEntries(formData);
        
        // Enviar para a API
        const { data, error } = await useFetch({
          endpoint: "/usuarios",
          method: "POST",
          body: dados
        });
        
        if (error) {
          alert("Erro ao salvar!");
        } else {
          alert("Salvo com sucesso!");
          formulario.current?.reset();
        }
      } else {
        // Mostrar mensagens de erro
        result.errors.forEach(erro => {
          console.error(`Campo ${erro.field}: ${erro.message}`);
        });
      }
    }
  });
});
```

#### Dicas

- Use `data-validate="true"` nos campos obrigatórios
- Use `data-validate="false"` nos campos opcionais
- A classe de erro é removida automaticamente quando o usuário começa a digitar
- Você pode estilizar as classes `.error` e `.valid` no CSS

---

## 🎨 Sistema de Estilos

O projeto inclui um sistema completo de estilos CSS organizado e modular.

### Estrutura de Estilos

```
src/styles/
├── main.css              # Arquivo principal (importa todos)
├── global/
│   └── resets.css        # Reset de estilos padrão
├── variables/
│   ├── colors.css        # Cores do projeto
│   ├── breakpoints.css   # Pontos de quebra responsivos
│   ├── margins.css       # Espaçamentos (margens)
│   ├── paddings.css      # Espaçamentos (preenchimentos)
│   ├── max-widths.css    # Larguras máximas
│   └── roundeds.css      # Bordas arredondadas
├── components/
│   ├── container.css     # Estilos para containers
│   └── all.css           # Outros componentes
└── functions/
    └── index.js          # Funções CSS personalizadas
```

### Como Usar

O CSS é compilado automaticamente para `dist/css/main.css`. Basta importar no HTML:

```html
<link rel="stylesheet" href="./dist/css/main.css">
```

### Variáveis CSS

O projeto usa variáveis CSS para facilitar a customização. Você pode editar os arquivos em `src/styles/variables/` para personalizar cores, espaçamentos, etc.

---

## 💡 Exemplos Práticos

### Exemplo 1: Formulário Completo com Validação

```typescript
import useDom from './hooks/useDom';
import useValidate from './hooks/useValidate';
import { useFetch } from './hooks/useFetch';
import useStorage from './hooks/useStorage';

// Configurar formulário
const form = useDom("#formCadastro");
const { validate } = useValidate("#formCadastro");
const storage = useStorage();

form.on("submit", async (event) => {
  event.preventDefault();
  
  const resultado = validate({
    classError: "error",
    classValid: "valid",
    callback: async (result) => {
      if (result.valid) {
        const formData = new FormData(form.current as HTMLFormElement);
        const dados = Object.fromEntries(formData);
        
        // Salvar no localStorage como backup
        storage.set("formulario_backup", dados);
        
        // Enviar para API
        const { data, error } = await useFetch({
          endpoint: "/cadastro",
          method: "POST",
          body: dados
        });
        
        if (!error) {
          alert("Cadastro realizado com sucesso!");
          form.current?.reset();
        }
      }
    }
  });
});
```

### Exemplo 2: Sistema de Navegação com Roteamento

```typescript
import useRouter from './hooks/useRouter';
import useDom from './hooks/useDom';

const router = useRouter();

// Configurar links de navegação
const links = document.querySelectorAll("a[data-route]");
links.forEach(link => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const rota = link.getAttribute("data-route");
    if (rota) router.push(rota);
  });
});

// Escutar mudanças de rota
router.onChange((path) => {
  // Atualizar conteúdo baseado na rota
  const conteudo = useDom("#conteudo");
  
  if (path === "/home") {
    conteudo.current!.innerHTML = "<h1>Página Inicial</h1>";
  } else if (path === "/sobre") {
    conteudo.current!.innerHTML = "<h1>Sobre Nós</h1>";
  }
});
```

### Exemplo 3: Selects Dependentes com API

```typescript
import useSelect from './hooks/useSelect';
import { useFetch } from './hooks/useFetch';

const { current: selectPais, handle } = useSelect("#pais");

handle("#estado", async (selectEstado) => {
  selectPais.addEventListener("change", async (event) => {
    const paisId = (event.target as HTMLSelectElement).value;
    
    if (paisId) {
      const { data: estados } = await useFetch(`/estados?pais=${paisId}`);
      
      selectEstado.innerHTML = '<option value="">Selecione um estado</option>';
      estados.forEach(estado => {
        const option = document.createElement("option");
        option.value = estado.id;
        option.textContent = estado.nome;
        selectEstado.appendChild(option);
      });
      
      selectEstado.classList.remove("disabled");
    }
  });
});
```

---

## 📜 Scripts Disponíveis

O projeto possui vários scripts npm para facilitar o desenvolvimento:

### Desenvolvimento

```bash
# Compilar TypeScript em modo watch (observa mudanças)
npm run watch:tsup

# Compilar CSS em modo watch (observa mudanças)
npm run watch:css
```

### Produção

```bash
# Compilar TypeScript uma vez
npm run build:tsup

# Compilar CSS uma vez
npm run build:css

# Compilar tudo (TypeScript + CSS)
npm run build
```

### O que cada script faz?

- **`watch:tsup`**: Observa mudanças nos arquivos TypeScript e recompila automaticamente
- **`watch:css`**: Observa mudanças nos arquivos CSS e recompila automaticamente
- **`build:tsup`**: Compila o TypeScript para JavaScript uma vez
- **`build:css`**: Compila o CSS usando PostCSS uma vez
- **`build`**: Compila tudo de uma vez (útil antes de fazer deploy)

---

## 📁 Estrutura do Projeto

```
helperTS/
├── dist/                    # Arquivos compilados (gerados automaticamente)
│   ├── css/
│   │   └── main.css        # CSS compilado
│   └── js/
│       └── main.global.js  # JavaScript compilado
├── src/                     # Código fonte
│   ├── constants/          # Constantes do projeto
│   │   ├── env.ts          # Configurações de ambiente (API, etc.)
│   │   └── states.ts       # Estados do projeto
│   ├── hooks/              # Hooks principais
│   │   ├── useDate.ts      # Manipulação de datas
│   │   ├── useDom.ts       # Manipulação do DOM
│   │   ├── useFetch.ts     # Requisições HTTP
│   │   ├── useRouter.ts    # Roteamento
│   │   ├── useSelect.ts    # Manipulação de selects
│   │   ├── useStorage.ts   # localStorage
│   │   └── useValidate.ts  # Validação de formulários
│   ├── types/              # Definições de tipos TypeScript
│   ├── styles/             # Estilos CSS
│   │   ├── global/         # Estilos globais
│   │   ├── variables/      # Variáveis CSS
│   │   ├── components/     # Componentes
│   │   └── functions/      # Funções CSS
│   └── main.ts             # Arquivo principal (exemplo de uso)
├── index.html              # Página HTML de exemplo
├── package.json            # Configurações do projeto
├── tsconfig.json           # Configurações do TypeScript
├── tsup.config.js          # Configurações do compilador
└── postcss.config.js       # Configurações do PostCSS
```

---

## 🔧 Configurações Importantes

### TypeScript (tsconfig.json)

O projeto está configurado com:
- TypeScript strict mode (modo rigoroso)
- Path aliases (`@/*` aponta para `src/*`)
- Target ES2020+
- Module resolution: bundler

### Compilação (tsup.config.js)

- Formato: IIFE (para uso direto no navegador)
- Plataforma: Browser
- Entry point: `src/main.ts`
- Output: `dist/js/main.global.js`

### CSS (postcss.config.js)

O CSS é processado com:
- PostCSS Import (importar outros arquivos CSS)
- PostCSS Nested (aninhamento de seletores)
- PostCSS Simple Vars (variáveis CSS)
- Autoprefixer (adiciona prefixos de navegadores)
- CSSNano (minificação)

---

## 🎓 Conceitos Importantes para Iniciantes

### O que é um Hook?

Um "hook" é uma função que encapsula lógica reutilizável. Em vez de escrever o mesmo código várias vezes, você cria um hook e o reutiliza em diferentes partes do projeto.

### O que é TypeScript?

TypeScript é JavaScript com tipos. Isso significa que você pode especificar que tipo de dado uma variável deve ter, tornando o código mais seguro e fácil de entender.

### O que é DOM?

DOM (Document Object Model) é a representação do HTML na memória. Quando você manipula elementos HTML com JavaScript, está manipulando o DOM.

### O que é localStorage?

localStorage é um recurso do navegador que permite armazenar dados localmente no computador do usuário. Os dados persistem mesmo após fechar o navegador.

### O que é Cache?

Cache é um armazenamento temporário de dados. No caso do `useFetch`, as requisições GET são armazenadas em cache por 5 minutos, evitando fazer a mesma requisição várias vezes.

---

## 🐛 Resolução de Problemas

### Erro: "selector not found"

**Problema**: O elemento HTML não foi encontrado.

**Solução**: Verifique se:
- O elemento existe no HTML
- O seletor está correto (ID usa `#`, classe usa `.`)
- O código JavaScript está sendo executado após o HTML carregar

### Erro: "invalid date"

**Problema**: Uma data inválida foi passada para `useDate().format()`.

**Solução**: Certifique-se de passar um objeto `Date` válido:
```typescript
const data = new Date("2024-12-01"); // ✅ Correto
const data = "2024-12-01"; // ❌ Errado
```

### Requisições não funcionam

**Problema**: As requisições HTTP não estão funcionando.

**Solução**: 
1. Verifique a URL da API em `src/constants/env.ts`
2. Verifique se a API está acessível
3. Verifique o console do navegador para erros de CORS

### Validação não funciona

**Problema**: A validação do formulário não está funcionando.

**Solução**:
1. Verifique se os campos têm `data-validate="true"`
2. Verifique se o seletor do formulário está correto
3. Verifique se o evento `submit` está sendo capturado

---

## 📝 Licença

Este projeto está sob a licença ISC.

---

## 👤 Autor

**Lucas Rodrigues Bezerra**

- LinkedIn: [https://www.linkedin.com/in/lucasrodriguesbezerra/](https://www.linkedin.com/in/lucasrodriguesbezerra/)
- GitHub: [@Lucas-R](https://github.com/Lucas-R)

---

## 🙏 Agradecimentos

Este projeto foi criado para facilitar o desenvolvimento de formulários no ambiente Fluig, mas pode ser usado em qualquer projeto web que precise de funcionalidades similares.

---

## ⭐ Suporte

Se este projeto foi útil para você, considere dar uma ⭐ no repositório!

---

**Versão**: 1.0.0

**Última atualização**: Dezembro 2025
