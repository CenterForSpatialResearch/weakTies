import tweepy
import csv
import time


hashtags = ["nypdoutofMTA","Ecocide","EverybodyNow","gazaunderattack","DecolonizeThisPlace"]

    
def checkForDuplicateTweets(inputFile):
    existing = []
    rawInput = open("raw_data/"+inputFile,"r")
    rawReader = csv.reader(rawInput)
    cleanOutput = open("no_duplicates/"+inputFile,"w")
    cleanWriter = csv.writer(cleanOutput)
    duplicateCount = 0
    uniqueCount = 0
    for row in rawReader:
        userId = row[0]
        timestamp = row[1]
        combinedString = userId +"_"+timestamp
        if combinedString in existing:
           # print "duplicate", combinedString
            duplicateCount+=1
            existing.append(combinedString)
        else:
            uniqueCount+=1
            cleanWriter.writerow(row)
            existing.append(combinedString)
    print inputFile, "duplicates:", duplicateCount ,"uniques:",uniqueCount   
    
    
    
def getTopRetweets(inputFile):
    rawInput = open("no_duplicates/"+inputFile,"r")
    rawReader = csv.reader(rawInput)
    retweets = {}
    
    for row in rawReader:
        #print row
        tweet = row[2]
        print row
        if tweet[0:4]=="RT @":
            print tweet[0:4]
            print tweet.split(":")[0]
        break
   
def getTopAuthors(inputFile):
    authors = {}
    rawInput = open("no_duplicates/"+inputFile,"r")
    rawReader = csv.reader(rawInput)
    
    frequencyOutput = open("top_authors/"+inputFile,"w")
    frequncyWriter = csv.writer(frequencyOutput)
    
    for row in rawReader:
        author = row[0]
        if author in authors.keys():
            authors[author]+=1
        else:
            authors[author]=1
            
    authorsList = []
    for a in authors:
        authorsList.append((a, authors[a]))
        
    sortedAuthors = sorted(authorsList,key=lambda x:(-x[1],x[0]))
    
    for i in sortedAuthors:
        #print i
        frequncyWriter.writerow(i)
        
        
for ht in hashtags:
    print ht
    #checkForDuplicateTweets(ht+".csv")
    #getTopAuthors(ht+".csv")
    getTopRetweets(ht+".csv")


