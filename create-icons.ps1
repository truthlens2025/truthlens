Add-Type -AssemblyName System.Drawing

$bmp = New-Object System.Drawing.Bitmap(192, 192)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.SmoothingMode = 'AntiAlias'
$g.Clear([System.Drawing.Color]::FromArgb(124, 106, 255))

# White circle
$brush1 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::White)
$g.FillEllipse($brush1, 20, 20, 152, 152)

# Purple inner circle
$brush2 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(255, 106, 158))
$g.FillEllipse($brush2, 40, 40, 112, 112)

# Magnifier handle
$pen = New-Object System.Drawing.Pen([System.Drawing.Color]::White, 14)
$pen.StartCap = 'Round'
$pen.EndCap = 'Round'
$g.DrawLine($pen, 140, 140, 172, 172)

# Green sparkle
$brush3 = New-Object System.Drawing.SolidBrush([System.Drawing.Color]::FromArgb(45, 255, 180))
$g.FillEllipse($brush3, 145, 25, 22, 22)

$g.Dispose()
$bmp.Save("C:\Users\Administrator\.qclaw\workspace\truthlens-web\icons\icon-192.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp.Dispose()

# 512 version
$bmp2 = New-Object System.Drawing.Bitmap(512, 512)
$g2 = [System.Drawing.Graphics]::FromImage($bmp2)
$g2.SmoothingMode = 'AntiAlias'
$g2.Clear([System.Drawing.Color]::FromArgb(124, 106, 255))
$g2.FillEllipse($brush1, 50, 50, 412, 412)
$g2.FillEllipse($brush2, 100, 100, 312, 312)
$g2.DrawLine($pen, 380, 380, 470, 470)
$g2.FillEllipse($brush3, 390, 60, 62, 62)
$g2.Dispose()
$bmp2.Save("C:\Users\Administrator\.qclaw\workspace\truthlens-web\icons\icon-512.png", [System.Drawing.Imaging.ImageFormat]::Png)
$bmp2.Dispose()

Write-Host "Icons created!"
