FROM node:20-alpine AS builder
WORKDIR /app

# Instalar dependências
COPY package.json package-lock.json ./
RUN npm ci --silent

# Copiar fonte e buildar em output path compatível com a outra branch
COPY . .
RUN npm run build -- --configuration production --output-path=dist/sitema-controle-presenca/browser

FROM nginx:alpine

# Remover conteúdo padrão e copiar build
RUN rm -rf /usr/share/nginx/html/*
 # Copy potential build outputs and normalize into nginx html root
COPY --from=builder /app/dist /tmp/dist

# Move build output to nginx root regardless of exact dist structure
RUN mkdir -p /usr/share/nginx/html && \
	if [ -d /tmp/dist/sitema-controle-presenca/browser ]; then \
		cp -a /tmp/dist/sitema-controle-presenca/browser/. /usr/share/nginx/html/; \
	elif [ -d /tmp/dist/sitema-controle-presenca ]; then \
		cp -a /tmp/dist/sitema-controle-presenca/. /usr/share/nginx/html/; \
	else \
		cp -a /tmp/dist/. /usr/share/nginx/html/ || true; \
	fi && rm -rf /tmp/dist

# Copiar configuração personalizada do nginx (fallback para SPA + proxy)
COPY nginx.conf /etc/nginx/nginx.conf

# Garantir permissões corretas para que o processo nginx consiga ler os ficheiros
RUN chown -R nginx:nginx /usr/share/nginx/html || true && chmod -R 755 /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
