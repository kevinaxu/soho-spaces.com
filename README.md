# soho-spaces.com
Soho Spaces Portfolio 


for i in *.jpeg; do
convert -strip -interlace Plane -gaussian-blur 0.05 -quality 85% "${i}" "${i%}_compressed.jpeg"
done

// convert and compress .mov to mp4
ffmpeg -i powder.mov -qscale 0 powder.mp4

// ffmpeg -an flag will strip audio 
// https://superuser.com/questions/268985/remove-audio-from-video-file-with-ffmpeg

### FFMPEG Parameters

* -i input.mov: Specifies the input file name (replace input.mov with the actual filename).
* -c:v libx264: Sets the video codec to H.264 (libx264).
* -crf 23: Constant Rate Factor (CRF) for video quality. Lower values result in higher quality but larger file sizes. A CRF value of around 23 is considered a good balance.
* -preset medium: Sets the encoding preset. The medium preset offers a good balance between encoding speed and compression efficiency.
* -c:a aac -b:a 128k: Sets the audio codec to AAC with a bitrate of 128 kbps.
* -vf "scale=-1:1080": Resizes the video to a height of 1080 pixels while maintaining the aspect ratio. The -1 for width tells FFmpeg to automatically calculate the width based on the aspect ratio.
* output.mp4: Specifies the output file name (replace output.mp4 with your desired filename).
* -vf "crop=in_w:in_h-50:0:50,scale=-1:1080": This part of the command applies two video filters sequentially. First, it crops the video to remove the top 50 pixels (crop=in_w:in_h-50:0:50), then it scales the video to a height of 1080 pixels while maintaining the aspect ratio (scale=-1:1080).
* -crf 18: This sets the Constant Rate Factor (CRF) to 18, which will increase the video quality compared to the previous CRF value of 23. Lower CRF values result in higher quality, but the file size will also increase. You can further adjust this value if needed to achieve the desired balance between quality and file size.
* -an: This option tells FFmpeg to disable audio recording completely.
* -ss 2: This option tells FFmpeg to start the input from 2 seconds into the video, effectively skipping the first 2 seconds.


ffmpeg -i kitchen_lq.mov -c:v libx264 -crf 18 -preset medium -an -vf "crop=in_w:in_h-50:0:50,scale=-1:1080" kitchen_out_3.mp4