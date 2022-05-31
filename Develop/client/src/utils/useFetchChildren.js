import { useState, useEffect } from 'react';
import { useMutation } from "@apollo/client";
import { QUERY_ALL_CHILDREN } from "../utils/mutations";
import { useParentContext } from "../utils/GlobalState";

function useGetChildren() {
    const [children, setChildren] = useState(null);
    const { Parent } = useParentContext();
    const [getChildren, { error, c_data }] = useMutation(QUERY_ALL_CHILDREN);

    useEffect(() => {
        const { children } = getChildren({ variables: { parentId: Parent._id } });
    }
    )
}