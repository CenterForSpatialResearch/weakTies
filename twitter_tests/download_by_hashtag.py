import tweepy
import csv
import time
from datetime import date
from datetime import datetime


####input your credentials here


hashtags = ["nypdoutofMTA","Ecocide","EverybodyNow","gazaunderattack","DecolonizeThisPlace"]

def hashtagDownloader(hashtag):
    consumer_key = 'x4AfoMXxnMMRQ6gU7SV00jmmw'
    consumer_secret = 'eEOgvXxPRqGsOo88mFuggzy2dEdTHg9YQyPHP3OCHdgHKimyGG'
    access_token = '15714107-D2Tvsr9JzDVWe3UQyl6aUxydJFHiPu4bsmbNwaCsT'
    access_token_secret = 'q2wbNdOJCoQjPm4FnoOyB37pxwf9RPAYtY3MgPSZUosaC'

    auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
    auth.set_access_token(access_token, access_token_secret)
    api = tweepy.API(auth,wait_on_rate_limit=True)

    today = date.today()
    print today
    current_time = datetime.now().strftime("%H:%M:%S")##.split(":").join("_")
    
    print current_time

    csvFile = open("raw_data/"+hashtag+"_"+str(today)+'.csv', 'a')
    userFile = open("raw_data/"+hashtag+"_"+str(today)+'_user.csv', 'a')
    

    csvFileND = open("raw_data/"+hashtag+'.csv', 'a')
    userFileND = open("raw_data/"+hashtag+'_user.csv', 'a')
    #Use csv Writer
    csvWriter = csv.writer(csvFile)
    csvWriter2 = csv.writer(userFile)
    
    csvWriterND = csv.writer(csvFileND)
    csvWriter2ND = csv.writer(userFileND)
    
    print
    
    for tweet in tweepy.Cursor(api.search,q="#"+hashtag,count=1000,lang="en", since=str(today)).items():
        #print tweet.author.statuses_count
        #print tweet.author.screen_name
        #print tweet.author.description
        #print tweet.author.location

        #print tweet.author.followers_count
        #print tweet.author.friends_count
        #print tweet.created_at
        #print tweet.text
        #break
        ##
        ##return
        ##print (tweet.created_at, tweet.text)
        #print [tweet.author.screen_name.encode('utf-8'),tweet.author.description.encode('utf-8'), tweet.author.location.encode('utf-8'),tweet.author.id,tweet.author.followers_count,tweet.author.friends_count, tweet.created_at, tweet.text.encode('utf-8')]
        csvWriter.writerow([current_time, tweet.author.id,tweet.created_at, tweet.text.encode('utf-8')])
        csvWriter2.writerow([current_time, tweet.author.id,tweet.author.screen_name.encode('utf-8'),tweet.author.statuses_count,tweet.author.description.encode('utf-8'), tweet.author.location.encode('utf-8'),tweet.author.followers_count,tweet.author.friends_count])
       
        csvWriterND.writerow([tweet.author.id,tweet.created_at, tweet.text.encode('utf-8')])
        csvWriter2ND.writerow([tweet.author.id,tweet.author.screen_name.encode('utf-8'),tweet.author.statuses_count,tweet.author.description.encode('utf-8'), tweet.author.location.encode('utf-8'),tweet.author.followers_count,tweet.author.friends_count])
        
        
def limit_handled(cursor):
    while True:
        try:
            yield cursor.next()
        except tweepy.RateLimitError:
            time.sleep(15 * 60)
            
for i in range(24*30):
    for ht in hashtags:
        ts = time.time()
        print ts, ht
        hashtagDownloader(ht)
    time.sleep(60*60)
    
#hashtagDownloader(hashtag)