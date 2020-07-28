# takes as input a list of services with comma deliminted lines and outputs a de-duped list
# for use in creation of a dictionary of service names and icons/emojis
import re
import json

services = []
with open('services.csv') as f:
  for line in f.readlines():
    line = line.strip()
    line = line.replace("\"","")
    line = line.replace("'","")
    for item in re.split(', |,|\n',line):
      if item and not (item in services):
        services.append(item)

print(services)

# write json
with open('categories.json','w') as f:
  f.write(json.dumps(services))

# write csv
with open('categories.csv','w') as f:
  for service in services:
    f.write(service + '\n')
