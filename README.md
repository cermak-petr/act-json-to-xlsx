# act-json-to-xlsx

The act takes a JSON input and converts it to XLSX.

The resulting XLSX URL will be following:
https://api.apifier.com/v2/key-value-stores/{defaultStoreID}/records/results.xlsx?rawBody=1&disableRedirect=1

Alternatively you can obtain the result from default OUTPUT value where it is stored like this:
```javascript
{output: "result XLSX URL"}
```

The URL is also outputted in the log.
