import glob
import hashlib

#current folder is a placeholder
allPhotos = glob.glob('/Users/scarlett/Downloads/images/test duplicates/*') #finds all files in folder
photoToHash = {}
duplicates = []

for name in allPhotos:
    h = hashlib.sha1()
    with open(name, 'rb') as file:
        h.update(file.read())

    hash_value = h.hexdigest() #calculates hash value
    if hash_value in photoToHash.keys(): # if key (hash) already is in dict
        duplicates.append(name)
    else: #adds filename to dict as value and hash as key
        photoToHash[hash_value] = [name]

print(duplicates)