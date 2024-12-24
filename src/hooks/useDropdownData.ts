import { useState, useEffect } from 'react';

interface UseDropdownDataReturn {
    data: OptionType[];
    loading: boolean;
    error: Error | null;
}

const API_URL = 'https://parseapi.back4app.com/classes/Complete_List_Names?keys=Name';
const HEADERS = {
    'X-Parse-Application-Id': 'zsSkPsDYTc2hmphLjjs9hz2Q3EXmnSxUyXnouj1I',
    'X-Parse-Master-Key': '4LuCXgPPXXO2sU5cXm6WwpwzaKyZpo3Wpj4G4xXK'
};

const useDropdownData = (): UseDropdownDataReturn => {
    const [data, setData] = useState<OptionType[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_URL, {headers: HEADERS});

                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }

                const result = await response.json();
                const formattedData = result.results.map((item: any, index: number) => ({
                    id: item.objectId,
                    name: item.Name
                }));
                setData(formattedData);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error };
};

export default useDropdownData;
