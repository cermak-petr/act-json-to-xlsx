# act-json-to-xlsx

The act takes a JSON input and converts it to XLSX.

**Types of input:**
1) JSON with array of objects, example:
```json
[
    {
        "column01": "Hello",
        "column02": "word"
    },
    {
        "column01": "Hello",
        "column02": "word"
    }
]
```

2) Reference to Apify key-value store object, where JSON is stored, example:
```json
{
    "storeId": "d6H5j8V64Hkds",
    "key": "test"
}

```

The resulting XLSX URL will be following:  
https://api.apifier.com/v2/key-value-stores/{defaultStoreID}/records/results.xlsx?disableRedirect=1

Alternatively you can obtain the result from default OUTPUT value where it is stored like this:
```javascript
{output: "result XLSX URL"}
```

The URL is also outputted in the log.
