wordDict = {}
print("put words below :)")
lines = []
counter = 1
while True:
    words = input()
    #if user pressed Enter without a value, break out of loop
    if words == '':
        break
    else:
        lines.append(words)
#print(lines)
for e in lines:
    s = e.split(".,")

    #string stuff
    s[0] = s[0].lower()
    s[0] = s[0].replace("á", "ā")
    s[0] = s[0].replace("é", "ē")
    s[0] = s[0].replace("í", "ī")
    s[0] = s[0].replace("ó", "ō")
    s[0] = s[0].replace("ú", "ū")


    wordDict[s[0]] = s[1]
    print("Current word: " + str(counter) + ", "+e)
    counter+=1

#print(wordDict)
#singleWord = words.split(".,")

for i in wordDict:
    print(i + " - " + "\x1B[3m" + wordDict[i] + "\x1B[0m")
