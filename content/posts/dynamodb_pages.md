---
title: "Dynamo DB Pages"
date: 2021-05-25T10:33:49-06:00
Description: "Small blog on notes"
Tags: ["notes", "aws", "golang"]
Categories: ["notes"]
DisableFront: true
DisableComments: true
---

## Dynamo code snippet

Recently got burned because we needed to do a recursive paging through dynamo

```go
var listOfThings []Whatever

err := store.ScanPages(input,
    func (page *dynamodb.ScanOutput, lastPage bool) bool {
        for _, item := range page.Items {
            var whateva Whatever
            if val, ok := item["jval"]; ok {
                err := json.Unmarshal([]byte(*val.S), &whateva)
                if err != nil {
                    return true // its like continue
                }
                listOfThings = append(listOfThings, whateva)
            }
        }
    return !lastPage
})
if err != nil {
    t.Fail()
}
```