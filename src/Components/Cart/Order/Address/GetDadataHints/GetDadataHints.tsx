import { FC, useCallback, useEffect, useState } from 'react';
import { useFormikContext } from "formik"
import dadataFetch from '../../../../../redux/API/dadataApi';
import { DadataSuggestionType } from '../../../../Types/types';
import c from './../Address.module.scss';


interface IGetDadataHints {
    statePart: string
    setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
}

export const GetDadataHints: FC<IGetDadataHints> = ({ statePart, setFieldValue }: IGetDadataHints) => {
    const { values } = useFormikContext()
    const query = JSON.stringify({ query: values[statePart] })
    const [hints, setHints] = useState<string[]>([])


    const getHints = useCallback(async () => {
        const responce = await dadataFetch.post('', query);
        if (responce.data.suggestions) {
            const vals = [];
            responce.data.suggestions.forEach((el: DadataSuggestionType) => vals.push(el.value))
            setHints(vals)
        }
        return responce;
    }, [query])

    useEffect(() => {
        getHints()
    }, [query, getHints])

    if (!hints.length) { return null }

    return <div className={c.hintsWrap} >
        {hints.map((el, i) => {
            return <div key={i} onClick={() => { setFieldValue(statePart, el); setHints([]) }}
                className={c.hint} style={{ top: 30 * i + 'px' }}>
                {el}
            </div>
        })}
    </div>
}