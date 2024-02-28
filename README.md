# soho-spaces.com
Soho Spaces Portfolio 


for i in *.jpeg; do
convert -strip -interlace Plane -gaussian-blur 0.05 -quality 85% "${i}" "${i%}_compressed.jpeg"
done

// convert and compress .mov to mp4
ffmpeg -i powder.mov -qscale 0 powder.mp4

// ffmpeg -an flag will strip audio 
// https://superuser.com/questions/268985/remove-audio-from-video-file-with-ffmpeg