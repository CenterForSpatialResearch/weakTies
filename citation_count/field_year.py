##make dictionaries for all columns
import csv
import json
import collections
import operator


def countByYear(inputFile):
    output = {}
    with open(inputFile,"U")as inputFile:
        reader = csv.reader(inputFile)
        for row in reader:
            yearIndex = row.index("PY")
            break
        for row in reader:
            year = row[yearIndex]
            if year in output.keys():
                output[year]+=1
            else:
                output[year]=1
        return output

def countByYearTotal(inputFile):
    output = {}
    with open(inputFile,"U")as inputFile:
        reader = csv.reader(inputFile)
        for row in reader:
            yearIndex = row.index("Year")
            break
        for row in reader:
            year = row[yearIndex]
            if year in output.keys():
                output[year]+=1
            else:
                output[year]=1
        return output

fields = ["business.csv","computerscience.csv","economics.csv","informationscience_libraryscience.csv","management.csv","sociology.csv"]


counts = {}
totals = countByYearTotal("weak_ties_allFields.csv")
counts["totals"]=totals
for f in fields:
    key = f.replace(".csv","")
    counts[key]=countByYear("../data_topfields/"+f)

with open("counts.csv","w")as outputFile:
    writer = csv.writer(outputFile)
    columns = counts.keys()
    header = ["Year"]+columns
    writer.writerow(header)
    for y in range(1970,2020):
        newRow = [y]
        tops = 0
        for c in columns:
            print c
            field = counts[c]
            print field.keys(),y
            if str(y) in field.keys():
                newRow.append(field[str(y)])
            else:
                newRow.append(0)
        writer.writerow(newRow)
        
            
            
        
        
        
    