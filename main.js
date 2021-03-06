const XLSX = require('xlsx');
const Apify = require('apify');

function toXlsxBuffer(array){
    //flattenRecords(array)
    const ws = XLSX.utils.json_to_sheet(array);
    const wb = {SheetNames:['results'], Sheets:{'results': ws}};
    const wopts = {bookType:'xlsx', bookSST:false, type:'binary'};
    const wbout = XLSX.write(wb, wopts);
     
    function s2ab(s){
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for(let i=0; i!=s.length; ++i){
            view[i] = s.charCodeAt(i) & 0xFF;
        }
        return Buffer.from(buf);
    }
    
    return s2ab(wbout);
}

function flattenRecord(record){
    if(record && typeof record === 'object'){
        for(const key in record){
            const value = record[key];
            if(value && Array.isArray(value)){
                if(value.length > 0){
                    record[key] = undefined;
                    //delete record[key];
                    flattenRecords(value);
                    for(let i = 0; i < value.length; i++){
                        record[key + '/' + i] = value[i];
                    }
                }
            }
        }
    }
}

function flattenRecords(data){
    for(let i = 0; i < data.length; i++){
        flattenRecord(data[i]);
    }
}

Apify.main(async () => {
    const input = await Apify.getValue('INPUT');
    let buffer;
    
    if(Array.isArray(input)){
        buffer = toXlsxBuffer(input);
    }
    else if(input.storeId && input.key){
        const jsonFromStore = await Apify.client.keyValueStores.getRecord(input);
        buffer = toXlsxBuffer(jsonFromStore.body);
    }
    else{
        throw new Error('Invalid input');
    }
    
    const storeId = (await Apify.getEnv()).defaultKeyValueStoreId;
    const url = "https://api.apifier.com/v2/key-value-stores/" + storeId + "/records/results.xlsx?rawBody=1&disableRedirect=1";
    const type = "application/octet-stream";
    await Apify.setValue('results.xlsx', buffer, {contentType: type});
    await Apify.setValue('OUTPUT', {output: url});
    console.log('Output URL: ' + url);
});
