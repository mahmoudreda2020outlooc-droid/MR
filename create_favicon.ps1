Add-Type -AssemblyName System.Drawing

$sourcePath = "c:\Users\user\Desktop\abot me\logo.png"
$destPath = "c:\Users\user\Desktop\abot me\favicon.png"

# Load image
$image = [System.Drawing.Image]::FromFile($sourcePath)
$bitmap = New-Object System.Drawing.Bitmap($image)
$image.Dispose()

# Assume the icon is square-ish on the left.
# Let's verify the height. The logo is horizontal.
# We'll take a square from the left with size = height.
$size = $bitmap.Height

# Or maybe slightly less if there's padding, but let's try height first.
# Actually the user uploaded image might have padding.
# Let's safery crop from x=0, y=0, width=height, height=height.
$rect = New-Object System.Drawing.Rectangle(0, 0, $size, $size)

$cropBitmap = $bitmap.Clone($rect, $bitmap.PixelFormat)

# Save as favicon
$cropBitmap.Save($destPath, [System.Drawing.Imaging.ImageFormat]::Png)

# Cleanup
$cropBitmap.Dispose()
$bitmap.Dispose()

Write-Output "Favicon created from logo."
