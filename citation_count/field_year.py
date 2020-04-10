##make dictionaries for all columns
import csv
import json
import collections
import operator


def saveAreaCountYear(outfile,year):
    with open(str(year)+'.txt', 'rb') as tsvfile:
        reader = csv.DictReader(tsvfile, dialect='excel-tab')
         
        for row in reader:
            area = row['\xef\xbb\xbfResearch Areas']
            count = row["records"]
            if count!=None:
                print area, count
                outfile.writerow([area,count,year])

##with open("outfile.csv","a")as output:
##    writer = csv.writer(output)
##    
##
##    for i in range(2008,2019):
##        print i
##        saveAreaCountYear(writer,i)
##    


fileName = "weakties_sociology"
with open("all_citations.tsv","rb")as inputFile:
    reader = csv.reader(inputFile, delimiter="\t", quotechar='"')
    dictByYear = {}
    
    for row in reader:
        print row
        yearIndex = row.index("PY")
        year = row[yearIndex]
        print row.index("PY")
        print year
        break
        
    for row in reader:
        year = row[yearIndex]
        if year not in dictByYear.keys():
            dictByYear[year]=1
        else:
            dictByYear[year]+=1

    print dictByYear
    
    with open(fileName+"count.csv","w") as outfile:
        csvWriter = csv.writer(outfile)
        for i in dictByYear:
            print i, dictByYear[i]
            csvWriter.writerow([i,dictByYear[i]])
        
  #  with open("fieldByYear.json","w")as outputFile:
  #      json.dump(dictByYear,outputFile)
  #          
        
        