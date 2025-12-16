# Stage 1: build with Maven on Jammy (to match working branch)
FROM eclipse-temurin:17-jdk-jammy AS builder
WORKDIR /app

# Copiar o wrapper do Maven e o pom.xml para aproveitar cache
COPY .mvn/ .mvn
COPY mvnw pom.xml ./

# Baixar dependências para cache
RUN ./mvnw dependency:go-offline -B

# Copiar código-fonte e executar build
COPY src ./src
RUN ./mvnw package -DskipTests -B

# Stage 2: runtime leve
FROM eclipse-temurin:17-jre-jammy
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
