import { FC, useEffect, useRef, useState } from 'react';



export const Component = ({ value }: {value: number}) => {
    const [prevProps, setPrevProps] = useState(0)

    useEffect(() => {        
        //console.log(prevProps, value)
        setPrevProps(value)
    }, [value])


    return <div>{value}</div>
}
