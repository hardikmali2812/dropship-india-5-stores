Add-Type -AssemblyName System.IO.Compression
Add-Type -AssemblyName System.IO.Compression.FileSystem

$sourceDir = 'E:\Dropshiping\arrowsghar-theme'
$zipPath = 'E:\Dropshiping\arrowsghar-theme.zip'

if (Test-Path $zipPath) { Remove-Item $zipPath -Force }

$zip = [System.IO.Compression.ZipFile]::Open($zipPath, [System.IO.Compression.ZipArchiveMode]::Create)

Get-ChildItem -Path $sourceDir -Recurse -File | ForEach-Object {
    $relPath = $_.FullName.Substring($sourceDir.Length + 1).Replace('\', '/')
    # Exclude dev files
    if ($relPath -notlike '*validate_and_fix*' -and $relPath -notlike '*package_theme*' -and $relPath -notlike '*.git*') {
        [System.IO.Compression.ZipFileExtensions]::CreateEntryFromFile($zip, $_.FullName, $relPath)
    }
}

$zip.Dispose()
Write-Host 'Zip created successfully with forward slashes'
