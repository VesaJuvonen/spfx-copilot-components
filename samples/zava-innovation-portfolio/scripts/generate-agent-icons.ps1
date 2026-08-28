param([switch]$Check)

Add-Type -AssemblyName System.Drawing

$grape = [System.Drawing.Color]::FromArgb(84, 37, 104)
$gold = [System.Drawing.Color]::FromArgb(239, 169, 0)
$white = [System.Drawing.Color]::White

function Set-Quality([System.Drawing.Graphics]$Graphics) {
  $Graphics.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $Graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $Graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
}

function Add-InnovationMark(
  [System.Drawing.Graphics]$Graphics,
  [single]$Scale,
  [bool]$Monochrome
) {
  $primary = if ($Monochrome) { $white } else { $gold }
  $secondary = $white
  $bulbPen = [System.Drawing.Pen]::new($primary, 10 * $Scale)
  $linePen = [System.Drawing.Pen]::new($secondary, 7 * $Scale)
  $whiteBrush = [System.Drawing.SolidBrush]::new($secondary)
  $goldBrush = [System.Drawing.SolidBrush]::new($primary)
  try {
    $bulbPen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $bulbPen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round
    $linePen.StartCap = [System.Drawing.Drawing2D.LineCap]::Round
    $linePen.EndCap = [System.Drawing.Drawing2D.LineCap]::Round

    $Graphics.DrawArc($bulbPen, 41 * $Scale, 25 * $Scale, 88 * $Scale, 88 * $Scale, 196, 328)
    $Graphics.DrawLine($bulbPen, 59 * $Scale, 91 * $Scale, 69 * $Scale, 119 * $Scale)
    $Graphics.DrawLine($bulbPen, 111 * $Scale, 91 * $Scale, 101 * $Scale, 119 * $Scale)
    $Graphics.DrawLine($bulbPen, 69 * $Scale, 119 * $Scale, 101 * $Scale, 119 * $Scale)
    $Graphics.DrawLine($bulbPen, 72 * $Scale, 132 * $Scale, 98 * $Scale, 132 * $Scale)

    $Graphics.DrawLine($linePen, 139 * $Scale, 48 * $Scale, 165 * $Scale, 48 * $Scale)
    $Graphics.DrawLine($linePen, 145 * $Scale, 69 * $Scale, 159 * $Scale, 69 * $Scale)
    $Graphics.DrawLine($linePen, 150 * $Scale, 90 * $Scale, 154 * $Scale, 90 * $Scale)
    $Graphics.DrawLine($linePen, 152 * $Scale, 48 * $Scale, 152 * $Scale, 99 * $Scale)
    $Graphics.FillEllipse($goldBrush, 146 * $Scale, 95 * $Scale, 12 * $Scale, 12 * $Scale)

    [System.Drawing.PointF[]]$spark = @(
      [System.Drawing.PointF]::new(33 * $Scale, 39 * $Scale),
      [System.Drawing.PointF]::new(39 * $Scale, 51 * $Scale),
      [System.Drawing.PointF]::new(51 * $Scale, 57 * $Scale),
      [System.Drawing.PointF]::new(39 * $Scale, 63 * $Scale),
      [System.Drawing.PointF]::new(33 * $Scale, 75 * $Scale),
      [System.Drawing.PointF]::new(27 * $Scale, 63 * $Scale),
      [System.Drawing.PointF]::new(15 * $Scale, 57 * $Scale),
      [System.Drawing.PointF]::new(27 * $Scale, 51 * $Scale)
    )
    $Graphics.FillPolygon($whiteBrush, $spark)
  }
  finally {
    $bulbPen.Dispose(); $linePen.Dispose(); $whiteBrush.Dispose(); $goldBrush.Dispose()
  }
}

function Write-ColorIcon([string]$Path) {
  $bitmap = [System.Drawing.Bitmap]::new(192, 192, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  try {
    Set-Quality $graphics
    $graphics.Clear($grape)
    Add-InnovationMark $graphics 1 $false
    $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  }
  finally { $graphics.Dispose(); $bitmap.Dispose() }
}

function Write-OutlineIcon([string]$Path) {
  $bitmap = [System.Drawing.Bitmap]::new(32, 32, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
  try {
    Set-Quality $graphics
    $graphics.Clear([System.Drawing.Color]::Transparent)
    Add-InnovationMark $graphics ([single](1 / 6)) $true
    for ($x = 0; $x -lt $bitmap.Width; $x++) {
      for ($y = 0; $y -lt $bitmap.Height; $y++) {
        $pixel = $bitmap.GetPixel($x, $y)
        if ($pixel.A -gt 0) { $bitmap.SetPixel($x, $y, [System.Drawing.Color]::FromArgb($pixel.A, 255, 255, 255)) }
      }
    }
    $bitmap.Save($Path, [System.Drawing.Imaging.ImageFormat]::Png)
  }
  finally { $graphics.Dispose(); $bitmap.Dispose() }
}

function Assert-Icon([string]$Path, [int]$Size, [bool]$TransparentCorners, [bool]$WhiteOnly) {
  $bitmap = [System.Drawing.Bitmap]::new($Path)
  try {
    if ($bitmap.Width -ne $Size -or $bitmap.Height -ne $Size) { throw "$(Split-Path $Path -Leaf) must be ${Size}x${Size}." }
    $corners = @($bitmap.GetPixel(0,0), $bitmap.GetPixel($Size-1,0), $bitmap.GetPixel(0,$Size-1), $bitmap.GetPixel($Size-1,$Size-1))
    if ($TransparentCorners -and ($corners | Where-Object { $_.A -ne 0 })) { throw "$(Split-Path $Path -Leaf) needs transparent corners." }
    $visible = 0
    for ($x = 0; $x -lt $Size; $x++) { for ($y = 0; $y -lt $Size; $y++) {
      $pixel = $bitmap.GetPixel($x,$y)
      if ($pixel.A -gt 0) {
        $visible++
        if ($WhiteOnly -and ($pixel.R -ne 255 -or $pixel.G -ne 255 -or $pixel.B -ne 255)) { throw "Outline icon must contain only white visible pixels." }
      }
    }}
    if ($visible -lt [Math]::Floor($Size * $Size * 0.08)) { throw "$(Split-Path $Path -Leaf) has insufficient visible coverage." }
  }
  finally { $bitmap.Dispose() }
}

$root = Resolve-Path (Join-Path $PSScriptRoot '..')
$colorPath = Join-Path $root 'copilot/color.png'
$outlinePath = Join-Path $root 'copilot/outline.png'

if ($Check) {
  $temp = Join-Path ([System.IO.Path]::GetTempPath()) "zava-innovation-icons-$([Guid]::NewGuid().ToString('N'))"
  New-Item -ItemType Directory $temp | Out-Null
  try {
    $generatedColor = Join-Path $temp 'color.png'; $generatedOutline = Join-Path $temp 'outline.png'
    Write-ColorIcon $generatedColor; Write-OutlineIcon $generatedOutline
    Assert-Icon $generatedColor 192 $false $false; Assert-Icon $generatedOutline 32 $true $true
    Assert-Icon $colorPath 192 $false $false; Assert-Icon $outlinePath 32 $true $true
    if ((Get-FileHash $generatedColor).Hash -ne (Get-FileHash $colorPath).Hash) { throw 'color.png is stale.' }
    if ((Get-FileHash $generatedOutline).Hash -ne (Get-FileHash $outlinePath).Hash) { throw 'outline.png is stale.' }
  }
  finally { Remove-Item $temp -Recurse -Force -ErrorAction SilentlyContinue }
}
else {
  Write-ColorIcon $colorPath; Write-OutlineIcon $outlinePath
  Assert-Icon $colorPath 192 $false $false; Assert-Icon $outlinePath 32 $true $true
}

Write-Host "$(if ($Check) { 'Verified' } else { 'Generated' }) Zava Innovation Hub icons"
Get-FileHash $colorPath, $outlinePath -Algorithm SHA256 | ForEach-Object { Write-Host "- $([IO.Path]::GetFileName($_.Path)): $($_.Hash.ToLowerInvariant())" }