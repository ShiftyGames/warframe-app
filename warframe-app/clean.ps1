
[CmdletBinding()]
param (
    [Parameter(Mandatory=$true)]
    [string]$Path,

    [Parameter(Mandatory=$false)]
    [switch]$Recurse = $false
)

if (Test-Path -Path $Path) {
    echo "removing: $Path"
    rm -r:$Recurse -force $Path
}
