

export const Heart = ({ color, size, margin, transform }) => {

    return <>
        <svg style={{ margin: `${margin}`, transform: `${transform}` }}
            fill={color}
            width={size} height={size}
            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="Isolation_Mode" data-name="Isolation Mode">

            <path d="M12,23.462l-.866-.612C9.994,22.044,0,14.783,0,8.15A7.036,7.036,0,0,1,6.75.875,6.57,6.57,0,0,1,12,3.582,6.57,6.57,0,0,1,17.25.875,7.036,7.036,0,0,1,24,8.15c0,6.633-9.994,13.894-11.134,14.7ZM6.75,3.875A4.043,4.043,0,0,0,3,8.15c0,3.916,5.863,9.21,9,11.611,3.137-2.4,9-7.695,9-11.611a4.043,4.043,0,0,0-3.75-4.275A4.043,4.043,0,0,0,13.5,8.15h-3A4.043,4.043,0,0,0,6.75,3.875Z" />

        </svg>

    </>
}