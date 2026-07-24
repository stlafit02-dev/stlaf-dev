# Reorg.ps1 - Run from repository root
# This script performs the file moves (git mv) and updates namespaces / import paths.

function Exec($cmd) {
    Write-Host "Executing: $cmd"
    & cmd /c $cmd
    if ($LASTEXITCODE -ne 0) {
        Write-Error "Command failed with exit code $LASTEXITCODE"
        exit $LASTEXITCODE
    }
}

# 1. Create backend department folders
if (-not (Test-Path "STLAF.API\Departments\IT")) { Exec "mkdir STLAF.API\Departments\IT" }
if (-not (Test-Path "STLAF.API\Departments\IT\Controllers")) { Exec "mkdir STLAF.API\Departments\IT\Controllers" }
if (-not (Test-Path "STLAF.API\Departments\IT\DTOs")) { Exec "mkdir STLAF.API\Departments\IT\DTOs" }
if (-not (Test-Path "STLAF.API\Departments\IT\DTOs\Asset")) { Exec "mkdir STLAF.API\Departments\IT\DTOs\Asset" }
if (-not (Test-Path "STLAF.API\Departments\IT\DTOs\Auth")) { Exec "mkdir STLAF.API\Departments\IT\DTOs\Auth" }
if (-not (Test-Path "STLAF.API\Departments\IT\DTOs\Ticket")) { Exec "mkdir STLAF.API\Departments\IT\DTOs\Ticket" }
if (-not (Test-Path "STLAF.API\Departments\IT\Models")) { Exec "mkdir STLAF.API\Departments\IT\Models" }
if (-not (Test-Path "STLAF.API\Departments\IT\Services")) { Exec "mkdir STLAF.API\Departments\IT\Services" }
if (-not (Test-Path "STLAF.API\Departments\IT\Enums")) { Exec "mkdir STLAF.API\Departments\IT\Enums" }

# Create other department placeholders
if (-not (Test-Path "STLAF.API\Departments\HR")) { Exec "mkdir STLAF.API\Departments\HR" }
if (-not (Test-Path "STLAF.API\Departments\Corporate")) { Exec "mkdir STLAF.API\Departments\Corporate" }
if (-not (Test-Path "STLAF.API\Departments\Accounting")) { Exec "mkdir STLAF.API\Departments\Accounting" }
if (-not (Test-Path "STLAF.API\Departments\Marketing")) { Exec "mkdir STLAF.API\Departments\Marketing" }
if (-not (Test-Path "STLAF.API\Departments\Litigation")) { Exec "mkdir STLAF.API\Departments\Litigation" }

# 2. Move backend IT files
if (Test-Path "STLAF.API\Controllers\AssetController.cs") { Exec "git mv STLAF.API\Controllers\AssetController.cs STLAF.API\Departments\IT\Controllers\AssetController.cs" } else { Write-Host "AssetController.cs not found; skipping" }
if (Test-Path "STLAF.API\Controllers\AuthController.cs") { Exec "git mv STLAF.API\Controllers\AuthController.cs STLAF.API\Departments\IT\Controllers\AuthController.cs" } else { Write-Host "AuthController.cs not found; skipping" }
if (Test-Path "STLAF.API\Controllers\TicketController.cs") { Exec "git mv STLAF.API\Controllers\TicketController.cs STLAF.API\Departments\IT\Controllers\TicketController.cs" } else { Write-Host "TicketController.cs not found; skipping" }

Exec "git mv STLAF.API\DTOs\Asset\AssetDto.cs STLAF.API\Departments\IT\DTOs\Asset\AssetDto.cs"
Exec "git mv STLAF.API\DTOs\Asset\CreateAssetDto.cs STLAF.API\Departments\IT\DTOs\Asset\CreateAssetDto.cs"
Exec "git mv STLAF.API\DTOs\Asset\UpdateAssetDto.cs STLAF.API\Departments\IT\DTOs\Asset\UpdateAssetDto.cs"
Exec "git mv STLAF.API\DTOs\Auth\LoginRequestDto.cs STLAF.API\Departments\IT\DTOs\Auth\LoginRequestDto.cs"
Exec "git mv STLAF.API\DTOs\Auth\LoginResponseDto.cs STLAF.API\Departments\IT\DTOs\Auth\LoginResponseDto.cs"
Exec "git mv STLAF.API\DTOs\Ticket\AssignTicketDto.cs STLAF.API\Departments\IT\DTOs\Ticket\AssignTicketDto.cs"
Exec "git mv STLAF.API\DTOs\Ticket\CreateCommentDto.cs STLAF.API\Departments\IT\DTOs\Ticket\CreateCommentDto.cs"
Exec "git mv STLAF.API\DTOs\Ticket\CreateTicketDto.cs STLAF.API\Departments\IT\DTOs\Ticket\CreateTicketDto.cs"
Exec "git mv STLAF.API\DTOs\Ticket\PublicTicketDto.cs STLAF.API\Departments\IT\DTOs\Ticket\PublicTicketDto.cs"
Exec "git mv STLAF.API\DTOs\Ticket\TicketCommentDto.cs STLAF.API\Departments\IT\DTOs\Ticket\TicketCommentDto.cs"
Exec "git mv STLAF.API\DTOs\Ticket\TicketDashboardDto.cs STLAF.API\Departments\IT\DTOs\Ticket\TicketDashboardDto.cs"
Exec "git mv STLAF.API\DTOs\Ticket\TicketDto.cs STLAF.API\Departments\IT\DTOs\Ticket\TicketDto.cs"
Exec "git mv STLAF.API\DTOs\Ticket\TicketHistoryDto.cs STLAF.API\Departments\IT\DTOs\Ticket\TicketHistoryDto.cs"
Exec "git mv STLAF.API\DTOs\Ticket\TicketQueryDto.cs STLAF.API\Departments\IT\DTOs\Ticket\TicketQueryDto.cs"
Exec "git mv STLAF.API\DTOs\Ticket\UpdateTicketDto.cs STLAF.API\Departments\IT\DTOs\Ticket\UpdateTicketDto.cs"

Exec "git mv STLAF.API\Enums\AssetStatus.cs STLAF.API\Departments\IT\Enums\AssetStatus.cs"
Exec "git mv STLAF.API\Enums\AssetType.cs STLAF.API\Departments\IT\Enums\AssetType.cs"
Exec "git mv STLAF.API\Enums\TicketCategory.cs STLAF.API\Departments\IT\Enums\TicketCategory.cs"
Exec "git mv STLAF.API\Enums\TicketPriority.cs STLAF.API\Departments\IT\Enums\TicketPriority.cs"
Exec "git mv STLAF.API\Enums\TicketStatus.cs STLAF.API\Departments\IT\Enums\TicketStatus.cs"

Exec "git mv STLAF.API\Models\Asset.cs STLAF.API\Departments\IT\Models\Asset.cs"
Exec "git mv STLAF.API\Models\Ticket.cs STLAF.API\Departments\IT\Models\Ticket.cs"
Exec "git mv STLAF.API\Models\TicketComment.cs STLAF.API\Departments\IT\Models\TicketComment.cs"
Exec "git mv STLAF.API\Models\TicketHistory.cs STLAF.API\Departments\IT\Models\TicketHistory.cs"

Exec "git mv STLAF.API\Services\AuthServices.cs STLAF.API\Departments\IT\Services\AuthServices.cs"
Exec "git mv STLAF.API\Services\TicketService.cs STLAF.API\Departments\IT\Services\TicketService.cs"
Exec "git mv STLAF.API\Services\UserService.cs STLAF.API\Departments\IT\Services\UserService.cs"

# 3. Update namespaces (backend)
function UpdateNamespace($path, $old, $new) {
    (Get-Content $path) -replace $old, $new | Set-Content $path -Force
}
# Controllers
UpdateNamespace "STLAF.API\Departments\IT\Controllers\AssetController.cs" "STLAF.API.Controllers" "STLAF.API.Departments.IT.Controllers"
UpdateNamespace "STLAF.API\Departments\IT\Controllers\AuthController.cs" "STLAF.API.Controllers" "STLAF.API.Departments.IT.Controllers"
UpdateNamespace "STLAF.API\Departments\IT\Controllers\TicketController.cs" "STLAF.API.Controllers" "STLAF.API.Departments.IT.Controllers"
# DTOs
Get-ChildItem "STLAF.API\Departments\IT\DTOs" -Recurse -File | ForEach-Object { UpdateNamespace $_.FullName "STLAF.API.DTOs" "STLAF.API.Departments.IT.DTOs" }
# Models
Get-ChildItem "STLAF.API\Departments\IT\Models" -Recurse -File | ForEach-Object { UpdateNamespace $_.FullName "STLAF.API.Models" "STLAF.API.Departments.IT.Models" }
# Services
Get-ChildItem "STLAF.API\Departments\IT\Services" -Recurse -File | ForEach-Object { UpdateNamespace $_.FullName "STLAF.API.Services" "STLAF.API.Departments.IT.Services" }
# Enums
Get-ChildItem "STLAF.API\Departments\IT\Enums" -Recurse -File | ForEach-Object { UpdateNamespace $_.FullName "STLAF.API.Enums" "STLAF.API.Departments.IT.Enums" }

# 4. Frontend reorganization
Exec "mkdir stlaf.frontend\src\departments\IT"
Exec "mkdir stlaf.frontend\src\departments\IT\api"
Exec "mkdir stlaf.frontend\src\departments\IT\components"
Exec "mkdir stlaf.frontend\src\departments\IT\components\layout"
Exec "mkdir stlaf.frontend\src\departments\IT\components\tickets"

Exec "git mv stlaf.frontend\src\shared\api\axios.ts stlaf.frontend\src\departments\IT\api\axios.ts"
Exec "git mv stlaf.frontend\src\shared\api\authApi.ts stlaf.frontend\src\departments\IT\api\authApi.ts"
Exec "git mv stlaf.frontend\src\shared\components\layout\Sidebar.tsx stlaf.frontend\src\departments\IT\components\layout\Sidebar.tsx"

# 5. Update frontend import paths (simple replace)
Get-ChildItem "stlaf.frontend\src" -Recurse -Include *.tsx,*.ts | ForEach-Object {
    $file = $_.FullName
    (Get-Content $file) -replace "../../shared/api/axios", "../api/axios" | Set-Content $file -Force
    (Get-Content $file) -replace "../../shared/api/authApi", "../api/authApi" | Set-Content $file -Force
    (Get-Content $file) -replace "../../shared/components/layout/Sidebar", "../../departments/IT/components/layout/Sidebar" | Set-Content $file -Force
}

# 6. Update DI registrations in Program.cs
$program = "STLAF.API\Program.cs"
(Get-Content $program) -replace "builder.Services.AddScoped<IUserService, UserService>();", "builder.Services.AddScoped<IUserService, Departments.IT.Services.UserService>();" | Set-Content $program -Force
(Get-Content $program) -replace "builder.Services.AddScoped<IAuthService, AuthService>();", "builder.Services.AddScoped<IAuthService, Departments.IT.Services.AuthServices>();" | Set-Content $program -Force
(Get-Content $program) -replace "builder.Services.AddScoped<ITicketService, TicketService>();", "builder.Services.AddScoped<ITicketService, Departments.IT.Services.TicketService>();" | Set-Content $program -Force

Write-Host "Reorganization completed."
