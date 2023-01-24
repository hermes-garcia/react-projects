import {useState} from 'react';
import {AddCategory, GifGrid} from './components';

export const GifExpertApp = () => {
    const [categories, setCategories] = useState(['Homer']);
    const handleAddCategory = (newCategory) => {
        if ( categories.includes(newCategory) ) return;
        setCategories([newCategory,...categories]);
    };

    return (
        <>
            <h1>Gif Expert App</h1>

            <AddCategory onNewCategory={handleAddCategory} />

            {categories.map( category => (
                <GifGrid
                    key={category}
                    category={category}
                />
            ))}
        </>
    );
};