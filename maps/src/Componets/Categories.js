import { useDispatch, useSelector } from "react-redux";
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Categories = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);
    const nav = useNavigate();

    const filter = (categoryId) => {
        nav('/filterCategory/' + categoryId);
    }

    return (<>
        <div className='product' style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '6vb' }}>
            {Array.isArray(categories) && categories?.length && categories?.map(category => (
                <div onClick={() => filter(category.id)} className='mycard' key={category.id} style={{ display: 'flex', flexDirection: 'column', width: '17%', height: '30vh' }}>
                    <CardMedia
                        className='categoryImg'
                        component="img"
                        image={category.urlImage}
                        alt={category.name}
                        style={{ width: '100%', height: '20vh', objectFit: 'cover' }}
                    />
                    <CardContent style={{ width: '75%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div>
                            <Typography style={{ textAlign: 'right' }} gutterBottom variant="h6" component="div">
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