import json

dict = {

    'book1':{
	'title':'Python Beginners',
 	'year': 2005 ,
	'page': 399 
	},
    'book2':{
    	'title': 'Python Developers',
    	'year': 2006 ,
	'page': 650 
	}
}
a = json.dumps(dict)
print(a)
#print("hello world")
