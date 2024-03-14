import { useDispatch, useSelector } from "react-redux";
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Stores = ({ categoryId, showNearby }) => {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const stores = useSelector(state => state.stores.stores);
    const storesNearby = useSelector(state => state.stores.storesNearby);
    const [filteredStores, setFilteredStores] = useState(null);
    const storesBycat = useSelector(state => state.categories.storesByCat);

    useEffect(() => {
        if (categoryId) {
            const filtered = [];
            storesBycat[categoryId]?.forEach(category => {
                filtered.push(...stores.filter(store => store.id === category));
            });
            setFilteredStores(filtered);
        }
        else if (showNearby) {
            const filtered = [];
            storesNearby?.forEach(storeN => {
                filtered.push(...stores.filter(store => store.id === storeN.id));
            });
            setFilteredStores(filtered);
        }
    }, [stores, showNearby])

    return (<>
        <div className='store' style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: '10vb' }}>
            {(filteredStores !== null ? filteredStores : stores)?.map(store => (
                <div className='mycard' style={{ display: 'flex', flexDirection: 'column', width: '30%', height: '43vh' }}
                    onClick={() => {
                        nav('/products/' + store.id)
                    }} key={store.id}>
                    <CardMedia
                        className='storeImg'
                        component="img"
                        image={store.imgFile}
                        alt={store.name}
                        style={{ width: '100%', height: '25vh', objectFit: 'cover' }}
                    />
                    <CardContent style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <Typography style={{ }} gutterBottom variant="h6" component="div">
                                {store.name}
                            </Typography>
                            <Typography style={{  fontSize: '3vb' }} gutterBottom variant="h6" component="div">
                                {store.address}
                            </Typography>
                        </div>

                    </CardContent>
                </div>
            ))}
        </div>

    </>);
}

export default Stores;