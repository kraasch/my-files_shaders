#!/bin/bash

mkdir -p ./showcase

function append_readme() {
	num="$1"
	ending="$2"
	beg="<img width='100' alt='demo' src='./examples/"
	end="'>|"
	echo "${beg}${num}.${ending}${end}" >> README.md.example
}

for x in {01..37}; do
	frame_rate=5
	cp "$x"* 00_new.frag
	rm -rf ./abcxyz
	mkdir ./abcxyz
	glslViewer -l -x 5 -y 500 -w 180 -h 180 00_new.frag -E "sequence,0,10,$frame_rate"
	mv *png ./abcxyz
	cd ./abcxyz
	res=$(diff 00000.png 00001.png)
	if $(test -z "$res"); then
		mv 00000.png ../showcase/"$x".png
		append_readme "$x" png
	else
		# NOTE: for mp4 export.
		# ffmpeg -framerate "$frame_rate" -pattern_type glob -i '*.png' -c:v libx264 -pix_fmt yuv420p ../showcase/"$x".mp4
		convert -delay 10 -loop 0 *.png ../showcase/"$x".gif
		append_readme "$x" gif
	fi
	cd ..
done
rm -rf ./abcxyz
