## Sistema de Controle de Presença - Pontu
Projeto de trabalho de conclusão de curso para o curso de Tecnologia em Análise e Desenvolvimento de Sistemas da Universidade Federal do Paraná, desenvolvido para
atender as necessidades da multinacional American Axle &amp.

## Sobre o Projeto

O Pontu é um software empresarial de controle de presença e gerenciamento de eventos. Ele permite a criação, atualização de dados de participação e assiduidade
de funcionários em eventos internos, promovendo a maior integração corporativa e a participação ativa dos funcionários no aprendizado. Ele oferece suporte à leitura biométrica
para a verificação da autenticidade e permite a geração e exportação de relatórios e certificados de participação.  

## 🔧 Tecnologias Utilizadas
- Angular
- Java Spring Boot
- JWT para autenticação
- PostgreSQL para banco de dados
- Open SSL para Protocolo HTTPs

# Integrantes da Equipe
Aruni van Amstel  
Giovani Trierweiler  
Lucas Souza de Oliveira  

## Docker

Construção e execução de todo o sistema (backend, frontend e banco de dados):

```bash
docker-compose up --build
```

A aplicação backend ficará disponível em http://localhost:8080 e o frontend em http://localhost:4300.

## Tutorial de Instalação

- **Pré-requisitos**:
	- Docker (Desktop) com Docker Compose (v2+) instalado
	- Opcional (desenvolvimento local): `node` + `npm` (para frontend) e `Java 17` + `Maven` (para backend)

- **Rodando com Docker (recomendado)**:

	1. Abra um terminal na raiz do repositório.
	2. Execute:

```bash
docker-compose up --build
```

	 3. Acesse:
		 - Frontend: http://localhost:4300
		 - Backend (API): http://localhost:8080

	- Para parar e remover containers e volumes de dados do banco:

```bash
docker-compose down -v
```

- **Rodando somente o frontend (desenvolvimento)**:

	```powershell
	cd sitema-controle-presenca
	npm install
	npm start
	```

	O servidor de desenvolvimento do Angular usa `proxy.conf.json` para encaminhar chamadas de API para o backend (por padrão `http://localhost:8080`). Ajuste `proxy.conf.json` se necessário.

- **Rodando somente o backend (desenvolvimento)**:

	```powershell
	cd presenca-system
	./mvnw spring-boot:run      # mac/linux
	.\mvnw.cmd spring-boot:run  # Windows PowerShell
	```

- **Banco de Dados**:
	- O serviço usa PostgreSQL com as credenciais padrão definidas em `docker-compose.yml` (DB: `sistema_presenca`, user: `postgres`, senha: `postgres`).
	- Os dados persistem no volume `db-data`.

- **Variáveis de ambiente e HTTPS**:
	- O `docker-compose.yml` fornece variáveis básicas para o backend e desabilita SSL para facilitar testes (o `application.properties` original tem configuração de HTTPS com keystore). Para ativar HTTPS no container, monte o keystore e ajuste as variáveis de ambiente/`application.properties` conforme necessário.
	- Se preferir manter segredos fora do `docker-compose.yml`, posso adicionar suporte a um arquivo `env` (`.env`) e atualizar o compose.

- **Depuração / logs**:

```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

- **Problemas comuns**:
	- Porta em uso: libere a porta ou altere o mapeamento em `docker-compose.yml`.
	- Erro de conexão com o DB: verifique se o serviço `db` subiu e as variáveis de ambiente do backend estão corretas.

Se quiser, eu adiciono um arquivo `env` com as variáveis principais e atualizo o `docker-compose.yml` para usá-lo.


