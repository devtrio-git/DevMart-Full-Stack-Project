import { useEffect, useState } from "react";

export default function useGridCore({ api, defaultPagination, dependencies }) {
    const default_pagination = defaultPagination ?? {
        page: 0,
        size: 5,
    };

    const validated_dependencies = (Array.isArray(dependencies)) ? dependencies : [];
    useEffect(() => {
        onRefresh();
    }, validated_dependencies ?? []);


    const [active_pagination, setPagination] = useState(default_pagination);
    const [responsePagination, setResponsePagination] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    async function callApi(req) {
        setLoading(true);
        setError(null);

        try {
            const res = await api(req);
            return res;
        } catch (error) {
            console.log(error, 'its not axios err its behave like normal async call ');
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    async function onRefresh() {
        const req = { ...active_pagination }
        setPagination(req);
        const resp = await callApi(req);
        setResponsePagination(resp);
    }

    const defaultColumnProperties = {
        filterable: true,
        sortable: true,
        editable: false,
        resizable: true,
    };


    return { loading, error, defaultColumnProperties, onRefresh };
}