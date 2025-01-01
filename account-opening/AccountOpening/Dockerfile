# Use the official .NET runtime as the base image for running the app
FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 4000

# Use the official .NET SDK image for building the app
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src

# Copy the project file and restore dependencies
COPY ["AccountOpening.csproj", "./"]
RUN dotnet restore "./AccountOpening.csproj"

# Copy the rest of the application files
COPY . .

# Build the application
RUN dotnet build "AccountOpening.csproj" -c Release -o /app/build

# Publish the application
FROM build AS publish
RUN dotnet publish "AccountOpening.csproj" -c Release -o /app/publish

# Use the runtime image to run the app
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AccountOpening.dll"]
