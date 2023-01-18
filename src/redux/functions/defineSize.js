
export const defineSize = (frameWidth) => {
    const size = frameWidth > 139 ? 'широкие'
        : frameWidth > 134 ? 'средние'
            : frameWidth > 127 ? 'узкие'
                : 'детские';
    return size;
}




