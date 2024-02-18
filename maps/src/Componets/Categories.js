import { useDispatch, useSelector } from "react-redux";
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { getCategory, getImageC } from "../Redux/categorySlice";

const Categories = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);
    const images = useSelector(state => state.categories.imagesC);
    useEffect(() => {
        dispatch(getCategory());
    }, [])
    // useEffect(() => {
    //     console.log(categories);
    //     console.log(images);
    // },[])
    // useEffect(() => {
    //     if (images.length > 1) {
    //         console.log(images);
    //     }
    // }, [images]);

    const [hasLoadedImages, setHasLoadedImages] = useState(false);

    useEffect(() => {
        if (categories.length === 3 && !hasLoadedImages) {
            setHasLoadedImages(true);
            categories.forEach(category => {
                dispatch(getImageC(category.urlImage));
            });
        }
    }, [categories, hasLoadedImages]);
    
    return (<>
        <div className='product'>
           {categories.length>1&&categories.map(category => (
                <div className='mycard' key={category.id}>
                    <button className='plus'> +</button>
                    {<CardMedia
                        className='categoryImg'
                        component="img"
                        image={images[category.id-1]}
                        alt={category.name}
                        style={{ width: '40%', height: '25vh', objectFit: 'cover' }}
                    />}
                    <CardContent style={{ width: '75%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <Typography gutterBottom variant="h6" component="div">
                                {category.name}
                            </Typography>                      
                        </div>                     
                    </CardContent>
                </div>
            ))} 
        </div>
    </>);
}

export default Categories;