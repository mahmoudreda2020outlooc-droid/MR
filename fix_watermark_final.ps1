Add-Type -AssemblyName System.Drawing

$sourcePath = "c:\Users\user\Desktop\abot me\logo.png"
$tempPath = "c:\Users\user\Desktop\abot me\logo_fix_final.png"
$backupPath = "c:\Users\user\Desktop\abot me\logo_backup_v3.png"

# Load image
$image = [System.Drawing.Image]::FromFile($sourcePath)
$bitmap = New-Object System.Drawing.Bitmap($image)
$image.Dispose()

# Sample color from SAFE area (further top-left from the corner)
# 120px from right and bottom to get true background
$sampleX = $bitmap.Width - 120
$sampleY = $bitmap.Height - 120

# Safety check
if ($sampleX -lt 0) { $sampleX = 0 }
if ($sampleY -lt 0) { $sampleY = 0 }

$bgColor = $bitmap.GetPixel($sampleX, $sampleY)
Write-Output "Sampled Background Color: $bgColor"

# Create graphics
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceOver

# Define LARGER area to cover (bottom right 90x90 to be absolutely sure)
$watermarkSize = 90
$x = $bitmap.Width - $watermarkSize
$y = $bitmap.Height - $watermarkSize
$rect = New-Object System.Drawing.Rectangle($x, $y, $watermarkSize, $watermarkSize)

# Fill with sampled background color
$brush = New-Object System.Drawing.SolidBrush($bgColor)
$graphics.FillRectangle($brush, $rect)

# Save
$bitmap.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)

# Cleanup
$graphics.Dispose()
$brush.Dispose()
$bitmap.Dispose()

# Replace
Copy-Item $sourcePath $backupPath -Force
Move-Item $tempPath $sourcePath -Force

Write-Output "Watermark area (90x90) covered with background color."
