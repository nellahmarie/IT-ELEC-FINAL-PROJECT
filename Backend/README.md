## Code-first approach

-   Configure connection string (line 13 Program.cs file)

## Run commands on Package Manager Console

-   `Add-Migration InitCreate` (Creates new migration)
-   `Update-Database` (Updates database base of migration)

### Optional, for resetting the database

-   `Update-Database -Migration 0` (Reverts previously applied migration)
-   `Remove-Migration` (Removes migration)

## Dependencies

-   Microsoft.EntityFrameworkCore v7.0.14
-   Microsoft.EntityFrameworkCore.Proxies v7.0.14
-   Microsoft.EntityFrameworkCore.SqlServer v7.0.14
-   Microsoft.EntityFrameworkCore.Tools v7.0.14
-   Microsoft.VisualStudio.Web.CodeGeneration.Design v7.0.11

## Additional Details

-   Entity Framework 7.0
-   SqlServer
