import { useDispatch, useSelector } from "react-redux";
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { getCategory, getImageC } from "../Redux/categorySlice";

const Categories = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);
    const imagesC = useSelector(state => state.categories.imagesC);
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


    useEffect(() => {
        if (Array.isArray(categories)&&categories.length>1) {
            categories.forEach(category => {
                dispatch(getImageC(category.urlImage));
            });
        }
    }, [categories]);

    return (<>
        <div className='product'>
            {Array.isArray(categories)&&categories?.length && categories?.map(category => (
                <div className='mycard' key={category.id}>
                    {/* <button className='plus'> +</button> */}
                    <CardMedia
                        className='categoryImg'
                        component="img"
                        image={imagesC[category.id - 1]}
                        alt={category.name}
                        style={{ width: '40%', height: '25vh', objectFit: 'cover' }}
                    />
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