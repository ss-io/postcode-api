"use client";

import { useState } from 'react';
import style from './PostcodeWidget.module.scss';

export default function PostcodeWidget() {

    const [ postcode, setPostcode ] = useState('');
    const [ postcodeData, setPostcodeData ] = useState(null);
    const [ error, setError ] = useState(null);
    const [ loading, setLoading ] = useState(false);

    // Handle button click, get postcode data
    const getPostcodeData = async () => {
        setLoading(true);
        setError(null);
        setPostcodeData(null);

        // Check if postcode is set
        if(postcode) {
            try {
                // Fetching data from the postcode API endpoint
                const res = await fetch(`/api/search/by-postcode/${postcode}`);
                const data = await res.json();
                setLoading(false);

                // If response is 200 set response data
                if (res.ok) {
                    setPostcodeData(data);
                }
                // If response is not 200 set error data
                else {
                    setError(data);
                }
            } catch (error) {
                console.error(error.message);
            }
        }
        else {
            setLoading(false);
            setError({
                code: '400',
                error: 'Bad Request',
                message: 'Please enter postcode/s, e.g. 3000 or 3000,3004,3005 etc'
            });
        }
    }

    // Function to handle when input changed.
    const handleInputChange = (e) => {
        // Get intput value
        let _input = e.target.value.trim();
        setPostcode(_input);
    }

    return (
        <div className={style.postcode_widget_wrapper}>
            <div className={style.postcode_widget}>
                <div className={style.postcode_widget__search}>
                    <input
                        type="text"
                        className={style.postcode_widget__search_input}
                        placeholder="Enter postcode"
                        onChange={handleInputChange}
                    />
                    <button
                        className={style.postcode_widget__search_btn}
                        onClick={getPostcodeData}
                    >
                        Get Postcode
                    </button>
                </div>

                {
                    loading && (
                        <div className={style.postcode_widget__info}>
                            'Loading postcode info ...'
                        </div>
                    )
                }
                { 
                    error && (
                        <div className={style.postcode_widget__info}>
                            {error.message}
                        </div>
                    )
                }
                {
                    postcodeData?.length > 0 && (
                        <div className={style.postcode_widget__info}>
                            <ul>
                            {
                                postcodeData.map((data, index) => (
                                <li key={index}>
                                <p>State: {data.state}</p>
                                <p>Postcode: {data.postcode}</p>
                                <p>Locality: {data.locality}</p>
                                </li>
                                ))
                            }
                            </ul>
                        </div>
                    )
                }
                </div>

        </div>
    )
}

