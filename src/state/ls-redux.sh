#!/bin/sh

function li_dir {
	path=$(pwd)"/$1";
	echo;
	echo;
	echo ----------------------;
	echo $path;
	echo;
	ls -lh $path;
#	echo;
}

li_dir "errors";
li_dir "game";
li_dir "middleware";
li_dir "pause";
li_dir "player";
li_dir "round";
li_dir "score";
li_dir "ui-state";
li_dir "utilities";


