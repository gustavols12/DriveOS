# DriveOS 🚗

Um sistema inteligente de gestão para oficinas automotivas, desenvolvido para centralizar e simplificar o controle do seu negócio.

## ✨ Sobre o Projeto

DriveOS é uma aplicação web moderna construída com as tecnologias mais recentes para oferecer uma solução completa e intuitiva para donos de oficinas mecânicas. O sistema permite o gerenciamento de vendas, produtos, clientes e serviços, tudo em um dashboard centralizado que fornece insights rápidos sobre a saúde do negócio.

Este projeto foi inicializado com Next.js e utiliza uma stack robusta para garantir performance, segurança e uma excelente experiência de usuário.

---

## 🛠️ Tecnologias Utilizadas

A arquitetura do DriveOS é baseada nas seguintes ferramentas e tecnologias:

- **Framework:** [Next.js](https://nextjs.org/) (React)
- **Estilização:** [Tailwind CSS](https://tailwindcss.com/)
- **Componentes UI:** [shadcn/ui](https://ui.shadcn.com/)
- **ORM / Banco de Dados:** [Prisma](https://www.prisma.io/) com MongoDB
- **Autenticação:** [NextAuth.js](https://next-auth.js.org/)
- **Notificações:** [React Hot Toast](https://react-hot-toast.com/)
- **Ícones:** [Lucide React](https://lucide.dev/)

---

## 🚀 Começando

Para executar este projeto localmente, siga os passos abaixo.

### Pré-requisitos

Você precisa ter o Node.js (versão 18 ou superior) e um gerenciador de pacotes (NPM, Yarn, ou PNPM) instalados em sua máquina.

### Instalação e Configuração

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/seu-usuario/drive-os.git
    cd drive-os
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    ```

3.  **Configure as variáveis de ambiente:**
    Crie um arquivo chamado `.env` na raiz do projeto e adicione as seguintes variáveis. Você precisará preencher com suas próprias credenciais.

    ```env
    # Banco de Dados (MongoDB)
    # Cole a sua string de conexão do MongoDB Atlas aqui.
    DATABASE_URL="mongodb+srv://seu-usuario:sua-senha@cluster.mongodb.net/sua-database"

    # Autenticação com Google (OAuth)
    # Obtenha estas credenciais no Google Cloud Console ao configurar a tela de consentimento OAuth.
    GOOGLE_CLIENT_ID="seu-id-de-cliente-do-google-aqui"
    GOOGLE_CLIENT_SECRET="seu-secret-de-cliente-do-google-aqui"

    # Configuração do NextAuth.js
    # Use este comando no terminal para gerar uma chave segura: openssl rand -base64 32
    NEXTAUTH_SECRET="cole-a-chave-segura-gerada-aqui"

    # URL base da sua aplicação para o NextAuth
    NEXTAUTH_URL="http://localhost:3000"
    ```

4.  **Sincronize o schema do Prisma com o Banco de Dados:**
    Como você está usando MongoDB, o comando correto para o Prisma é `db push`.

    ```bash
    npx prisma db push
    ```

5.  **Inicie o servidor de desenvolvimento:**

    ```bash
    npm run dev
    ```

6.  Abra [http://localhost:3000](https://www.google.com/search?q=http://localhost:3000) no seu navegador para ver o resultado\!

---

## 📦 Funcionalidades Principais

- **Dashboard Interativo:** Visualização rápida do resumo do dia, caixa, vendas e produtos.
- **Gestão de Vendas:** Registre e acompanhe todas as vendas realizadas.
- **Controle de Produtos:** Cadastre e gerencie o estoque de produtos da oficina.
- **Cadastro de Clientes:** Mantenha uma base de dados organizada dos seus clientes.
- **Gerenciamento de Serviços:** Crie e administre as ordens de serviço.
- **Autenticação Segura:** Sistema de login para proteger os dados do sistema.

---

## 🤝 Como Contribuir

Contribuições são o que tornam a comunidade de código aberto um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será **muito apreciada**.

1.  Faça um Fork do projeto
2.  Crie uma Branch para sua feature (`git checkout -b feature/AmazingFeature`)
3.  Faça o Commit de suas alterações (`git commit -m 'Add some AmazingFeature'`)
4.  Faça o Push para a Branch (`git push origin feature/AmazingFeature`)
5.  Abra um Pull Request
