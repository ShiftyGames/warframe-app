
Function rm-dir
{
    param(
        [string]$Directory
    )

    if (Test-Path -Path $Directory) {
        echo "removing directory: $Directory"
        rm -r -force $Directory
    }
}

#rm-dir ./venv/
rm-dir ./_site/
