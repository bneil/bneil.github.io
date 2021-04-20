---
title: "Migrating to Dynamo"
date: 2021-04-20T10:15:26-06:00
Description: "Another day, another migration"
Tags: ["aws"]
Categories: ["golang", "aws"]
thumbnail:  "/images/standing.jpg"
DisableComments: false
---

## Another store getting migrated

Today's pivotal tasks are all related towards moving things
away from redis and into dynamo. So far ive gotten the
underpinnings done by creating a dynamo store

The main struct looks like this
```go
type DynamoStore struct {
    tableName  string
    primaryKey string
    store      *dynamodb.DynamoDB
}
```

The funny thing is that im basically treating dynamo in
the same way I was treating redis. Which is as primarily
a key value  store. *sigh*

factory
```go
func NewDynamoStore(tableName, pk string) *DynamoStore {
    s := DynamoStore{}
    s.store = store.GetDynamoStore().Store
    s.SetPrimaryKey(pk)
    return s.SetTableName(tableName)
}
```

Then the actual underpinnings, which are the usual crud methods

Forget:
```go
func (s *DynamoStore) Forget(key string) error {
    params := &dynamodb.DeleteItemInput{
        Key: map[string]*dynamodb.AttributeValue{
            s.primaryKey: {
                S: aws.String(key),
            },
        },
        TableName: aws.String(s.tableName),
    }
  
    _, err := s.store.DeleteItem(params)
    if err != nil {
        return err
    }

    return nil
}
```

Put:
```go
func (s *DynamoStore) Put(key string, val interface{}) error {
b, err := json.Marshal(val)
if err != nil {
}

	params := &dynamodb.PutItemInput{
		Item: map[string]*dynamodb.AttributeValue{
			s.primaryKey: {
				S: aws.String(key),
			},
			"jsonValue" : {
				S: aws.String(string(b)),
			},
		},
		TableName: aws.String(s.tableName),
	}
	_, err = s.store.PutItem(params)
	if err != nil {
		return err
	}

	return nil
}
```

So note the json value, that was something I dont know if I like or not. 
But for right now I think its a necessary evil since im not looking
to separate my objects into composite keys.

Get:
```go
func (s *DynamoStore) Get(key string, val interface{}) error {
    input := &dynamodb.GetItemInput{
        Key: map[string]*dynamodb.AttributeValue{
            s.primaryKey: {
                S: aws.String(key),
            },
        },
        TableName: aws.String(s.tableName),
    }
    resp, err := s.store.GetItem(input)
    if err != nil {
        return err
    }
    if resp == nil {
        return errors.New("table key wasnt found")
    }

	found := false
	for s2, value := range resp.Item {
		if s2 == "jsonValue" {
			if value != nil {
				if value.S != nil {
					err = json.Unmarshal([]byte(*value.S), val)
					if err != nil {
						log.Println("unable to unmarshal from get")
						return err
					}
					found = true
				}
			}
		}
	}
	if !found {
		return errors.New("jsonValue was not found in table")
	}

	return err
}
```

Now the most controversal piece of code, setters and getters in golang.
I feel like this is an antipattern but golang feels OO so im trying it out.
/me hide from the gods of golang
```go
func (s *DynamoStore) SetTableName(tableName string) *DynamoStore {
  if len(tableName) != 0 {
    s.tableName = fmt.Sprintf("%s", tableName)
  } else {
    s.tableName = ""
  }
  return s
}


func (s *DynamoStore) SetPrimaryKey(pk string) *DynamoStore {
  if len(pk) != 0 {
    s.primaryKey = fmt.Sprintf("%s", pk)
  } else {
    s.primaryKey = "token"
  }
  return s
}
```

I didnt upload a gist of this code, sorry :)