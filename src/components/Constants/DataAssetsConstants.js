export const BOOLEAN_VALUES = [
    { name: 'True', value: 'true' },
    { name: 'False', value: 'false' }
];
//csv, parquet, xml, json
export const FILE_TYPE = [
    { name: 'CSV', value: 'csv' },
    { name: 'Parquet', value: 'parquet' },
    { name: 'XML', value: 'xml' },
    { name: 'JSON', value: 'json' }
]

//Integer,Long,Double,String,Boolean,Datetime
export const TARGET_DATA_TYPE = [
    { name: 'Boolean', value: 'Boolean' },
    { name: 'Datetime', value: 'datetime' },
    { name: 'Double', value: 'Double' },
    { name: 'Integer', value: 'Integer' },
    { name: 'Long', value: 'Long' },
    { name: 'String', value: 'String' },  
]

export const DATA_CLASSIFICATION = [
    { name: 'Public', value: 'public' },
    { name: 'Internal', value: 'internal' },
    { name: 'Confidential', value: 'confidential' },
    { name: 'Restricted', value: 'restricted' }
]

export const TRIGGER_MECHANISM = [
    { name: 'Time Driven', value: 'time_driven' },
    { name: 'Event Driven', value: 'event_driven' },
]

export const DATE_TIME_FORMATS = [
    { name: 'mm/dd/yyyy', value: 'mm/dd/yyyy' },
    { name: 'mm/dd/yy', value: 'mm/dd/yy' },
    { name: 'dd/mm/yyyy', value: 'dd/mm/yyyy' },
    { name: 'dd/mm/yy', value: 'dd/mm/yy' },
    { name: 'dd-mm-yyyy', value: 'dd-mm-yyyy' },
    { name: 'dd-mm-yy', value: 'dd-mm-yy' },
    { name: 'mm-dd-yyyy', value: 'mm-dd-yyyy' },
    { name: 'mm-dd-yy', value: 'mm-dd-yy' },
    { name: 'yyyy-mm-dd', value: 'yyyy-mm-dd' },
    { name: 'yyyy-mm-dd hh:mm:ss', value: 'yyyy-mm-dd hh:mm:ss' },
    { name: 'yyyy-mm-dd HH:MM:SS tt', value: 'yyyy-mm-dd HH:MM:SS tt' },
    { name : 'Custom', value: 'custom'}
]