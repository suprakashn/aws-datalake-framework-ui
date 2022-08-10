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
    { name: 'Datetime', value: 'Datetime' },
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