# Documentação do Site de Acompanhamento ENEM com Análise TRI

## Visão Geral
Este projeto implementa um sistema web completo para registro, análise e visualização de desempenho em testes e simulados de preparação para o ENEM, incluindo classificação automática de erros segundo parâmetros TRI.

## Estrutura do Projeto

### Frontend (Next.js)
- **Autenticação**: Sistema completo de login e cadastro com JWT
- **Dashboard**: Visualizações gráficas do desempenho com Chart.js
- **Análise de Erros**: Classificação por dificuldade e área de conhecimento
- **Registro de Testes**: Formulário para inserção de resultados
- **Layout Responsivo**: Adaptável para dispositivos móveis e desktop

### Backend (Express.js)
- **API RESTful**: Endpoints para todas as funcionalidades
- **Autenticação**: Middleware JWT para proteção de rotas
- **Controladores**: Lógica de negócio para usuários e testes
- **Análise TRI**: Implementação da classificação de questões

### Banco de Dados (PostgreSQL)
- **Tabelas**: Usuários, Testes, Resultados por Área, Questões, Respostas, Parâmetros TRI
- **Funções e Triggers**: Cálculo automático de dificuldade baseado em parâmetros TRI
- **Índices**: Otimização de consultas frequentes

## Modelo de Dados
1. **Usuário**: id, nome, email, hash_senha, data_criacao
2. **Teste**: id, usuario_id, data_teste, tipo_teste, tempo_gasto_min, nota_redacao
3. **Resultado_Area**: id, teste_id, area, total_questoes, acertos
4. **Questao**: id, area, parametro_a, parametro_b, parametro_c
5. **Resposta**: id, teste_id, questao_id, acertou
6. **Parametros_TRI**: id, questao_id, parametro_a, parametro_b, parametro_c, dificuldade

## Funcionalidades Implementadas
- **Registro de Testes**: Formulário para inserção de resultados por área
- **Dashboard Interativo**: KPIs e gráficos de evolução temporal
- **Análise de Erros**: Visualização de erros por dificuldade e área
- **Feedback Personalizado**: Recomendações baseadas no padrão de erros
- **Filtros**: Seleção por período, tipo de teste, área e dificuldade

## Tecnologias Utilizadas
- **Frontend**: Next.js, React, Tailwind CSS, Chart.js
- **Backend**: Node.js, Express.js, JWT
- **Banco de Dados**: PostgreSQL, Sequelize ORM
- **Integração**: Contextos React, Fetch API

## Instruções de Execução

### Requisitos
- Node.js (v14+)
- PostgreSQL (v12+)

### Configuração Local
1. Clone o repositório
2. Configure o banco de dados:
   ```
   sudo -u postgres psql -c "CREATE DATABASE enem_tracker;"
   sudo -u postgres psql -c "CREATE USER enem_user WITH PASSWORD 'senha_segura'; GRANT ALL PRIVILEGES ON DATABASE enem_tracker TO enem_user;"
   cat /caminho/para/migrations/initial.sql | sudo -u postgres psql enem_tracker
   ```

3. Configure as variáveis de ambiente:
   - Backend (.env): PORT, DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET
   - Frontend (.env.local): NEXT_PUBLIC_API_URL

4. Instale as dependências:
   ```
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ..
   npm install
   ```

5. Execute a aplicação:
   ```
   # Backend (em um terminal)
   cd backend
   npm start
   
   # Frontend (em outro terminal)
   npm run dev
   ```

6. Acesse a aplicação em: http://localhost:3000

## Implantação em Produção
- **Frontend**: Vercel, Netlify ou similar
- **Backend**: Heroku, AWS, GCP ou similar
- **Banco de Dados**: PostgreSQL gerenciado (AWS RDS, GCP Cloud SQL)

## Segurança
- Senhas armazenadas com hash bcrypt
- Autenticação via JWT
- Proteção de rotas no backend e frontend
- Validação de dados em ambos os lados

## Manutenção e Extensão
Para adicionar novas funcionalidades:
1. Crie novos modelos no backend se necessário
2. Implemente novos endpoints na API
3. Adicione componentes React correspondentes no frontend
4. Atualize os contextos para incluir as novas funcionalidades
5. Teste a integração completa

## Contato e Suporte
Para suporte ou dúvidas sobre o sistema, entre em contato com o desenvolvedor.
