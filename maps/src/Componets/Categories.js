import { useDispatch, useSelector } from "react-redux";
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect } from "react";
import { getCategory, getImage } from "../Redux/categorySlice";

const Categories = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);
    const images = useSelector(state => state.categories.images);
    useEffect(() => {
        dispatch(getCategory());
    }, [])

    useEffect(() => {
        if (images.length > 1) {
            console.log(images);
        }
    }, [images]);

    useEffect(() => {
        if (categories.length > 1) {
            // console.log(products);
            categories.forEach(category => {
                dispatch(getImage(category.urlImage))
                // .then((img1) => {
                //     console.log(images);
                // }).catch((error) => {
                //     console.error(error);
                // });
            });
        }
    }, [categories]);
    return ( <>
<div className='product'>
            {categories.map(category => (
                <div className='mycard' key={category.id}>
                    <button className='plus'> +</button>
                    {<CardMedia
                        className='categoryImg'
                        component="img"
                        image={images[category.id+1]}
                        alt={category.name}
                        style={{ width: '40%', height: '25vh', objectFit: 'cover' }}
                    />}
                    <CardContent style={{ width: '75%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <Typography gutterBottom variant="h6" component="div">
                                {category.name}
                            </Typography>                      
                        </div>                     
                        {/* <button onClick={() => nav('/productEdit')}>edit</button> */}
                    </CardContent>
                </div>
            ))}
        </div>
    </> );
}
 
export default Categories;