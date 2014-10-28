#! /bin/bash
#STRING="Hello World"
#echo $STRING

DIR="/home/james/Dropbox"

find $DIR -type f -printf '%T@ %p\n' | sort -n | tail -20 | cut -f2- -d" " > last_used_documents.txt 

#Retrieve the last 10 commands used on the console.
history 10 #From permissions can't be run in a script

echo "10 most CPU heavy"
echo "============================="
#Get the 10 most CPU-heavy processes in descending order.
ps -eo pcpu,pid,user,fname | sort -k1 -r | head -10

find $DIR \( -name "*.txt" -or -name "*.js"  -or -name "*.exe" \)

