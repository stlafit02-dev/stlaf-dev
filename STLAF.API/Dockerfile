# Build Stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copy csproj and restore distinct layers
COPY ["STLAF.API.csproj", "./"]
RUN dotnet restore "STLAF.API.csproj"

# Copy remaining source code and publish
COPY . .
RUN dotnet publish "STLAF.API.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Runtime Stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final
WORKDIR /app
COPY --from=build /app/publish .

ENTRYPOINT ["dotnet", "STLAF.API.dll"]