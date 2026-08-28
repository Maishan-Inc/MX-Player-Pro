#!/usr/bin/env pwsh
param([Parameter(Mandatory = $true)][string]$Target)
$parent = Split-Path -Parent $Target
if ($parent) { New-Item -ItemType Directory -Force -Path $parent | Out-Null }
$process = New-Object System.Diagnostics.Process
$process.StartInfo.FileName = 'git'
$process.StartInfo.Arguments = 'cat-file blob HEAD:package.json'
$process.StartInfo.UseShellExecute = $false
$process.StartInfo.RedirectStandardOutput = $true
$process.StartInfo.CreateNoWindow = $true
$process.Start() | Out-Null
$file = [System.IO.File]::Open($Target, [System.IO.FileMode]::Create, [System.IO.FileAccess]::Write)
$process.StandardOutput.BaseStream.CopyTo($file)
$file.Dispose()
$process.WaitForExit()
if ($process.ExitCode -ne 0) { throw "git cat-file failed with exit code $($process.ExitCode)" }
Write-Output "Restored $Target from HEAD:package.json"
