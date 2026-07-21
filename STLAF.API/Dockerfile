FROM mcr.microsoft.com/dotnet/sdk:10.0-preview AS build-env
WORKDIR /App

COPY . ./

RUN dotnet restore

RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:10.0-preview
WORKDIR /App

COPY --from=build-env /App/out .

ENTRYPOINT ["dotnet", "STLAF.API.dll"]