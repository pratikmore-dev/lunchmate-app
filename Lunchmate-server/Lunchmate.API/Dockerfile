# -------- Build Stage --------
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# ✅ match EXACT folder names from your project
COPY Lunchmate.API/Lunchmate.API.csproj         Lunchmate.API/
COPY Lunchmate.CORE/Lunchmate.CORE.csproj       Lunchmate.CORE/
COPY Lunchmate.DATA/Lunchmate.DATA.csproj       Lunchmate.DATA/

RUN dotnet restore Lunchmate.API/Lunchmate.API.csproj

COPY . .

RUN dotnet publish Lunchmate.API/Lunchmate.API.csproj \
    -c Release -o /app/publish

# -------- Runtime Stage --------
FROM mcr.microsoft.com/dotnet/aspnet:8.0
WORKDIR /app
EXPOSE 5000
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "Lunchmate.API.dll"]