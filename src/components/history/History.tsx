import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {inputDataURL, tableParametersURL} from "../../config";

interface IHistoryProps {
    currentPage: string;
}

const History: React.FC<IHistoryProps> = ({ currentPage }) => {
    const [records, setRecords] = useState<Array<any>>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const url = currentPage === tableParametersURL
                ? tableParametersURL
                : inputDataURL;
            const result = await axios(url);
            setRecords(result.data);
            setLoading(false);
        };

        fetchData();
    }, [currentPage]);

    return (
        <div>
            <h3>History</h3>
            {loading ? <p>Loading...</p> : (
                <ul>
                    {records.map((record: any) => (
                        <li key={record.id} onClick={() => handleRecordClick(record)}>
                            {record.id}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

const handleRecordClick = (record: any) => {
    // code to fill the fields with the data from the record
};

export default History;