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

//Boolean, Fractional, Integral, String, Numeric
export const TARGET_DATA_TYPE = [
    { name: 'Boolean', value: 'Boolean' },
    { name: 'Fractional', value: 'Fractional' },
    { name: 'Integral', value: 'Integral' },
    { name: 'Numeric', value: 'Numeric' },
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