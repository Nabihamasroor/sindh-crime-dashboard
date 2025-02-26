
import React, { useState, useRef, useEffect } from "react";
import theft from './Image/Theft.png';
import martyred from './Image/martyred.png';
import total from './Image/Total.png';
import murder from './Image/Murder.png';
import crimes from './Image/Crimes.png';
import recovery from './Image/Recovery.png';
import work from './Image/Work.png';

export default function Explore() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const selectedImageRef = useRef(null);

    const categories = [  
        { name: "Total Crime", image: total },
        { name: "Crimes", image: crimes },              
        { name: "Vehicles Recovered", image: recovery },    //tableau's free trial ended
        { name: "Men martyred or Injured", image: martyred },
        { name: "Work done by Sindh Police", image: work },
        { name: "Murder Cases", image: murder },
        { name: "Vehicle Theft/Snatched", image: theft },
    ];

    useEffect(() => {
        if (selectedCategory && selectedImageRef.current) {
            selectedImageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [selectedCategory]);

    return (
        <div className="container">
            <h3 className="Title">Explore Crimes Categories</h3>
           <div className="explore">
                 <p className="aboutPara">
                     Dive into various crime categories through detailed visualizations.
                     Explore data on total crime, vehicle-related offenses, law enforcement efforts, and more
                     to better understand crime trends and their impact.
                 </p>
            <div className="row g-2">
                {categories.map((category) => (
                    <div className="col-6" key={category.name}>
                        <div
                            className="category-item"
                            onClick={() => setSelectedCategory(category.name)}
                        >
                            <img
                                src={category.image}
                                alt={`${category.name} Chart`}
                                className="category-image"
                            />
                            {category.name}
                        </div>
                    </div>
                ))}
            </div>

            {selectedCategory && (
                <div className="selected-image-container" ref={selectedImageRef}>
                    <img
                        src={categories.find((cat) => cat.name === selectedCategory).image}
                        alt={`${selectedCategory} Chart`}
                        className="selected-image"
                    />
                </div>
            )}
        </div>
        </div>
    );
}



