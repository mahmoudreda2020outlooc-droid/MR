Add-Type -AssemblyName System.Drawing

$sourcePath = "c:\Users\user\Desktop\abot me\logo.png"
$tempPath = "c:\Users\user\Desktop\abot me\logo_fix.png"
$backupPath = "c:\Users\user\Desktop\abot me\logo_backup_v2.png"

# Load image
$image = [System.Drawing.Image]::FromFile($sourcePath)
$bitmap = New-Object System.Drawing.Bitmap($image)
$image.Dispose()

# Sample color from near the watermark (e.g., 60px from right, 20px from bottom)
# This assumes the background is uniform or a smooth gradient where this point is close enough
$sampleX = $bitmap.Width - 60
$sampleY = $bitmap.Height - 20

# Ensure coordinates are within bounds
if ($sampleX -lt 0) { $sampleX = 0 }
if ($sampleY -lt 0) { $sampleY = 0 }

$bgColor = $bitmap.GetPixel($sampleX, $sampleY)
Write-Output "Sampled Background Color: $bgColor"

# Create graphics
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceOver

# Define area to cover (bottom right 50x50)
$watermarkSize = 60
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

Write-Output "Watermark covered with background color."
