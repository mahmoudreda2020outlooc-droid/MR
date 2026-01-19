Add-Type -AssemblyName System.Drawing

$sourcePath = "c:\Users\user\Desktop\abot me\logo.png"
$tempPath = "c:\Users\user\Desktop\abot me\logo_temp.png"
$backupPath = "c:\Users\user\Desktop\abot me\logo_backup.png"

# Load image
$image = [System.Drawing.Image]::FromFile($sourcePath)
$bitmap = New-Object System.Drawing.Bitmap($image)
$image.Dispose() # Release file lock

Write-Output "Image size: $($bitmap.Width) x $($bitmap.Height)"

# Create graphics object
$graphics = [System.Drawing.Graphics]::FromImage($bitmap)
$graphics.CompositingMode = [System.Drawing.Drawing2D.CompositingMode]::SourceCopy

# Define the area to clear (bottom right corner where watermark usually is)
# Assuming watermark is about 40x40 pixels in the corner
$watermarkWidth = 50
$watermarkHeight = 50
$x = $bitmap.Width - $watermarkWidth
$y = $bitmap.Height - $watermarkHeight
$rect = New-Object System.Drawing.Rectangle($x, $y, $watermarkWidth, $watermarkHeight)

# Fill with transparent color
$brush = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::Transparent)
$graphics.FillRectangle($brush, $rect)

# Save result
$bitmap.Save($tempPath, [System.Drawing.Imaging.ImageFormat]::Png)

# Cleanup
$graphics.Dispose()
$brush.Dispose()
$bitmap.Dispose()

# Replace original
Copy-Item $sourcePath $backupPath -Force
Move-Item $tempPath $sourcePath -Force

Write-Output "Watermark removed successfully!"
