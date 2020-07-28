# script to merge HelloNeighbor and CharityNavigator datasets
import pandas as pd

hnurl="https://raw.githubusercontent.com/USA4UNHCR/HackforGood2020/master/Data/HelloNeighbor.csv"
hn=pd.read_csv(hnurl)
# standardize column names
# Timestamp,Name of refugee or immigrant assistance agency,City,State,Country,Website,Contact Information (Email),Contact Information (Phone Number),Contact Information (Phone Number),Partners or Collaborating Organizations,Core Program Offerings,What are the current needs for volunteers or other?,Additional comments?,Who are you? (Ok to leave blank),Your email address
hn.columns = ['timestamp','org_name','city','state','country','website','org_contact_email','org_contact_phone_1','org_contact_phone_2','partners','services','needs','notes','admin_contact_name','admin_contact_email']
hn.drop(columns = {'timestamp','admin_contact_name','admin_contact_email'}, inplace=True)

cnurl="https://raw.githubusercontent.com/USA4UNHCR/HackforGood2020/master/Data/CharityNavigator.csv"
cn=pd.read_csv(cnurl)
# standardize column names
# organization_ein,nonprofit_name,irsclassification_nteecode,category,address,city,state,zipcode,website
cn.columns = ['ein','org_name','ntee','services','address','city','state','zipcode','website']
cn.drop(columns = {'ein','ntee'}, inplace=True)

# concatenate 
hncn = pd.concat([hn,cn], sort=False)
hncn.to_json('hncn.json', orient='records')
