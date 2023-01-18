import { useState } from 'react';
import { LoadingDots } from '../../../assets/common/Preloader/LoadingDots/LoadingDots';
import { Preloader } from '../../../assets/common/Preloader/Preloader';
import instance from '../../../redux/API/api';
import c from './FilesDownLoader.module.scss';

export const FilesDownloader = ({ images, setImages }) => {


    //const [images, setImages] = useState(editMode ? (currentProduct.item.imageUrl || {} ) : { main: '', side: '', perspective: '' });

    const [downloadStatus, setDownloadStatus] = useState({ main: null, side: null, perspective: null })
    console.log(images);
    /* if (!images) {
        images = {

        }
    } */

    const handleChangeFile = async (e, currentImg) => {
        try {
            const formData = new FormData();
            const file = e.target.files[0];
            formData.append('image', file);
            setDownloadStatus({ ...downloadStatus, [currentImg]: 'pending' })
            const { data } = await instance.post('/upload', formData);
            const newI = { ...images, [currentImg]: data.url }
            setImages(newI);
            setDownloadStatus({ ...downloadStatus, [currentImg]: null })

        } catch (error) {
            console.warn(error);
            alert('не получилось загрузить фото')
            setDownloadStatus({ ...downloadStatus, [currentImg]: null })
        }
    }

    /* if (!images) {
        return <Preloader minFormat={true} />
    } */

    return <div className={c.downloader}>
        {/* <h2>Выберите файлы:</h2> */}
        <div>
            <label>
                <span>главное фото</span>
                <input type='file' id='imageUrl' name='imageUrl'
                    onChange={(e) => handleChangeFile(e, 'main')} />

            </label>
            
                {images.main && <div className={c.imgWrapper}>
                    <img src={`http://localhost:4444${images.main}`} alt='' />
                    </div>}
                {downloadStatus.main ? <LoadingDots /> : null}
            
        </div>

        <div>
            <label>
                <span>фото сбоку</span>
                <input type='file' id='imageUrl' name='imageUrl'
                    onChange={(e) => handleChangeFile(e, 'side')} />
            </label>
            
                {images.side && <div className={c.imgWrapper}>
                    <img src={`http://localhost:4444${images.side}`} alt='' />
                    </div>}
                    
                {downloadStatus.side ? <LoadingDots /> : null}

            
        </div>

        <div>
            <label>
                <span>фото в перспективе</span>
                <input type='file' id='imageUrl' name='imageUrl'
                    onChange={(e) => handleChangeFile(e, 'perspective')} />
            </label>

            {images.perspective && <div className={c.imgWrapper}>
                <img src={`http://localhost:4444${images.perspective}`} alt='' />
            </div>}
            {downloadStatus.perspective ? <LoadingDots /> : null} 

        </div>
    </div>
} 