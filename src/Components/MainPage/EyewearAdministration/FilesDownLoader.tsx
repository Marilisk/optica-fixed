import { FC, useState } from 'react';
import { LoadingDots } from '../../../assets/common/Preloader/LoadingDots/LoadingDots';
import instance, { API_URL } from '../../../redux/API/api';
import { IImageUrl } from '../../Types/types';
import c from './FilesDownLoader.module.scss';

interface IFilesDownloaderProps {
    images: IImageUrl
    setImages: (arg: IImageUrl) => void
    setFieldValue:(field: string, value: any, shouldValidate?: boolean) => void
}

export const FilesDownloader:FC<IFilesDownloaderProps> = ({ images, setImages, setFieldValue }:IFilesDownloaderProps) => {

    const [downloadStatus, setDownloadStatus] = useState({ main: null, side: null, perspective: null })
        
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
            setFieldValue('imageUrl', { ...images, [currentImg]: data.url })

        } catch (error) {
            console.warn(error);
            alert('не получилось загрузить фото')
            setDownloadStatus({ ...downloadStatus, [currentImg]: null })
        }
    }

    

    return <div className={c.downloader}>
        
        <div>
            <label>
                <span>главное фото</span>
                <input type='file' id='imageUrl' name='imageUrl'
                    onChange={(e) => handleChangeFile(e, 'main')} />

            </label>
            
                {images.main && <div className={c.imgWrapper}>
                    <img src={`${API_URL}${images.main}`} alt='' />
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
                    <img src={`${API_URL}${images.side}`} alt='' />
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
                <img src={`${API_URL}${images.perspective}`} alt='' />
            </div>}
            {downloadStatus.perspective ? <LoadingDots /> : null} 

        </div>
    </div>
} 